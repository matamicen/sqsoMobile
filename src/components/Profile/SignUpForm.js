import AsyncStorage from '@react-native-community/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
//import Amplify, { Auth, API, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  DatePickerAndroid,
  FlatList,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { connect } from 'react-redux';
import {
  doFetchPublicFeed,
  doFollowFetch,
  doLatestUsersFetch,
  doFetchFieldDaysFeed,
  followersAlreadyCalled,
  getUserInfo,
  newqsoactiveFalse,
  postPushToken,
  resetQso,
  setQra,
  setToken,
  setUrlRdsS3,
  welcomeUserFirstTime
} from '../../actions';
import awsconfig from '../../aws-exports';
import global_config from '../../global_config.json';
import { hasAPIConnection } from '../../helper';
import I18n from '../../utils/i18n';
import VariosModales from '../Qso/VariosModales';
import ConfirmSignUp from './ConfirmSignUp';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

//Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const NORTH_AMERICA = ['CA', 'MX', 'US'];

class SignUpForm extends React.PureComponent {
  //   static navigationOptions = {
  //       tabBarLabel: 'Profile'

  //   }

  constructor(props) {
    super(props);

    this.usernotfound = false;
    this.error = false;
    this.qraAlreadySignUp = '';
    this.diffyears = 0;

    this.jwtToken = '';
    this.qra = '';
    this.errorSignin = '';

    this.state = {
      qra: '',
      email: '',
      emailVerification: '',
      birthdate: I18n.t('signupBirthdate'),
      password: '',
      passwordConfirm: '',
      country: I18n.t('signupCountry'),
      phone: '',
      lastname: '',
      firstname: '',
      indicator: 0,
      loginerror: 0,
      errormessage: '',
      chosenDate: new Date(),
      pickerDateIOS: false,
      day: 0,
      month: 0,
      year: 0,
      confirmSignup: false,
      confirmationcode: '',
      confirmationcodeError: 0,
      color: 'red',
      heightindicator: 0,
      heighterror: 0,
      nointernet: false,
      pickerCountry: false,
      buttonsEnabled: false,
      terms: false,
      cca2: 'US',
      callingCode: '',
      namec: '',
      showFlag: false,

      privacy: false,
      date: new Date(),
      mode: 'date',
      show: false,
      // showD: I18n.t('signupBirthdate'),
      // showDate: new Date().toLocaleDateString(I18n.locale.substring(0, 2), {
      //   month: 'short'
      // }),
      showDate: I18n.t('signupBirthdate')
    };
  }

  componentDidMount() {
    console.log('COMPONENT did mount SignupForm');
    console.log('SignUp Did PushToken:' + this.props.pushtoken);
  }

  // nuevo Componente DATE

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    if (selectedDate !== undefined) {
      // por si apreta Cancel en fecha
      if (I18n.locale.substring(0, 2) === 'es') {
        showD = moment(currentDate).format('D MMM YYYY');
      } else {
        showD = moment(currentDate).format('MMM D YYYY');
      }
    } else showD = this.state.showDate;

    this.setState({
      show: Platform.OS === 'ios',
      date: currentDate,
      showDate: showD
    });
    console.log('fecha seleccionada: ' + currentDate);
    console.log('showD: ' + showD);

    console.log(
      'dia: ' +
        currentDate.getDate() +
        ' mes: ' +
        currentDate.getMonth() +
        ' año: ' +
        currentDate.getFullYear()
    );
    today = new Date();
    this.diffyears = today.getFullYear() - currentDate.getFullYear();
    console.log('diferencia: ' + this.diffyears);
    this.setState({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear()
    });
  };

  showMode = (currentMode) => {
    this.setState({ show: true, mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  //  showTimepicker = () => {
  //   this.showMode('time');
  // };

  closeDatePicker = () => {
    this.setState({ show: false });
  };

  // Fin nuevo componente DATE

  close_confirmSignup = () => {
    this.setState({ confirmSignup: false });
  };

  birthday_convert = () => {
    if (this.state.day < 10) dia = '0' + this.state.day;
    else dia = this.state.day;
    if (this.state.month < 10) mes = '0' + this.state.month;
    else mes = this.state.month;
    fechanac = mes + '/' + dia + '/' + this.state.year;
    console.log('fecha cumple:' + fechanac);
    return fechanac;
  };

  signUp = async () => {
    if (await hasAPIConnection()) {
      this.setState({
        heightindicator: 35,
        indicator: 1,
        heighterror: 0,
        loginerror: 0
      });

      this.state.email = this.state.email.trim();
      this.state.emailVerification = this.state.emailVerification.trim();
      this.state.qra = this.state.qra.trim();

      if (this.state.password !== this.state.passwordConfirm) {
        this.setState({
          errormessage: I18n.t('signupValidPass'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.passwordRef.focus();
      }

      if (this.state.password.length < 6) {
        this.setState({
          errormessage: I18n.t('signupValidPassMin'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.passwordRef.focus();
        // this.flatlist.scrollToIndex(0);
        //   this.flatlist.scrollToIndex({animated:true , index: 1, viewPosition: 0.5})
      }

      if (this.state.email !== this.state.emailVerification) {
        this.setState({
          errormessage: I18n.t('signupValEmailIdent'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.emailRef.focus();
      }

      if (
        this.state.email.length === 0 ||
        this.state.emailVerification.length === 0
      ) {
        this.setState({
          errormessage: I18n.t('signupValEmailEmpty'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.emailRef.focus();
      }

      var re = /^[a-zA-Z0-9]+$/;
      if (!re.exec(this.state.qra)) {
        this.setState({
          errormessage: I18n.t('signupValInvalidCharact'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.qraRef.focus();
      }

      if (this.state.qra == '') {
        this.setState({
          errormessage: I18n.t('signupValcallsignEmpty'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.qraRef.focus();
      }

      if (this.state.qra.length > 10) {
        this.setState({
          errormessage: I18n.t('signupValcallsignLong'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.qraRef.focus();
      }

      if (this.state.firstname == '') {
        this.setState({
          errormessage: I18n.t('signupValFirstName'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.firstnameRef.focus();
      }
      if (this.state.lastname == '') {
        this.setState({
          errormessage: I18n.t('signupValLastName'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.lastnameRef.focus();
      }

      if (this.state.country == I18n.t('signupCountry')) {
        this.setState({
          errormessage: I18n.t('signupValCountry'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        // this.countryRef.focus();
      }

      if (this.diffyears < 13) {
        this.setState({
          errormessage: I18n.t('signupValDiffYears'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        //  this.birthdateRef.focus();
      }

      if (this.state.birthdate == 'birthdate') {
        this.setState({
          errormessage: I18n.t('signupValBirthDate'),
          heightindicator: 0,
          indicator: 0,
          heighterror: 25,
          loginerror: 1
        });
        this.error = true;
        //  this.birthdateRef.focus();
      }

      console.log('variable error:' + this.error);

      if (!this.error && this.qraAlreadySignUp === this.state.qra) {
        this.setState({
          heightindicator: 0,
          indicator: 0,
          confirmSignup: true
        });
      } else {
        if (!this.error) {
          this.setState({ indicator: 0 });
          // Open Terms & Conditions
          //   this.setState({terms: true});
          this.SignUpAfterTerms();
        } else {
          this.error = false;
          Keyboard.dismiss();
        }
      }
    } else {
      this.setState({ indicator: 0 });
      this.setState({ nointernet: true });
    }
  };

  resendCode = async () => {
    Keyboard.dismiss();
    if (await hasAPIConnection()) {
      this.setState({ indicator: 1, confirmationcodeError: 0 });

      await Auth.resendSignUp(this.state.email.toLowerCase())
        .then(() => {
          console.log('Resend Ok!');
          this.setState({
            errormessage2: I18n.t('signupValConfirmCode'),
            color: '#8BD8BD',
            heightindicator: 0,
            indicator: 0,
            confirmationcodeError: 1
          });
        })
        .catch((err) => {
          console.log('Error sending the confirmation code, try again.', err);
          this.setState({
            errormessage2: I18n.t('signupValErrorSendingConfCode'),
            color: 'red',
            heightindicator: 0,
            indicator: 0,
            confirmationcodeError: 1
          });
          // kinesis_catch('#021',err,this.state.qra.toUpperCase());
          crashlytics().setUserId(this.state.qra.toUpperCase());
          crashlytics().log('error: ' + JSON.stringify(err));
          if (__DEV__)
            crashlytics().recordError(new Error('Auth.resendSignUp_DEV'));
          else crashlytics().recordError(new Error('Auth.resendSignUp_PRD'));
        });

      this.setState({ heightindicator: 0, indicator: 0 });
    } else {
      this.close_confirmSignup();
      this.setState({ indicator: 0 });
      this.setState({ nointernet: true });
    }
  };

  signInAfterConfirmed = async () => {
    await Auth.signIn(this.state.email.toLowerCase(), this.state.password)
      .then((result) => {
        console.log('entro!');
        this.qra = result.signInUserSession.idToken.payload['custom:callsign'];
        this.jwtToken = result.signInUserSession.idToken.jwtToken;
        this.usernotfound = false;
      })
      .catch((err) => {
        console.log('error:', err.code);
        this.usernotfound = true;
        this.errorSignin = err.message;
        // kinesis_catch('#022',err,this.state.qra.toUpperCase());
        crashlytics().setUserId(this.state.qra.toUpperCase());
        crashlytics().log('error: ' + JSON.stringify(err));
        if (__DEV__)
          crashlytics().recordError(new Error('signInAfterConfirmed_DEV'));
        else crashlytics().recordError(new Error('signInAfterConfirmed_PRD'));
      });

    if (!this.usernotfound) {
      try {
        const { identityId } = await Auth.currentCredentials();
        console.log('PASO POR SIGNIN la credencial es:' + identityId);
        var res = identityId.replace(':', '%3A');
        // this.props.setUrlRdsS3('https://s3.amazonaws.com/sqso/protected/'+res+'/');
        // this.props.setUrlRdsS3(res,'https://d1dwfud4bi54v7.cloudfront.net/1/'+res+'/');
        this.props.setUrlRdsS3(res, global_config.s3Cloudfront + res + '/');
        this.props.resetQso('QSO'); // seteo uno por defecto pero lo uso para que me resetee varias cosas que importan
        this.props.newqsoactiveFalse();

        // this.props.followersAlreadyCalled(false);

        console.log('la credencial RES:' + res);
      } catch (error) {
        console.log('caught error', error);
        crashlytics().setUserId(this.qra);
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__)
          crashlytics().recordError(new Error('SignUpCredentials_DEV'));
        else crashlytics().recordError(new Error('SignUpCredentials_PRD'));

        // kinesis_catch('#023',e,this.state.qra.toUpperCase());
        // Handle exceptions
      }
      //  var session = await Auth.currentSession();
      //    console.log("PASO POR SIGNIN token: " + session.idToken.jwtToken);

      await this.props.setToken(this.jwtToken);

      this.props.getUserInfo(this.jwtToken);
      this.props.doFetchPublicFeed();
      this.props.doFetchFieldDaysFeed();
      this.props.doFollowFetch();
      this.props.doLatestUsersFetch();

      //   this.props.fetchQraProfileUrl(this.state.qra.toUpperCase(),'profile',session.idToken.jwtToken);
      this.props.followersAlreadyCalled(true);

      // seteo el usuario logueado en store
      console.log('antes de llamar a setQra');
      this.props.setQra(this.qra);
      console.log('despues de llamar a setQra');
      // guardo en local storage el username
      try {
        await AsyncStorage.setItem('username', this.qra);
        await AsyncStorage.setItem('identity', res);
        // ese setItem de userLogin luego debe ser elimando, se usaba para la webview, pero LoginForm
        // chequea si existe este campo para autologin o mandarlo a la pnatalla de Login
        await AsyncStorage.setItem('userlogin', this.state.email.toLowerCase());
      } catch (error) {
        console.log('caught error', error);
        crashlytics().setUserId(this.state.qra.toUpperCase());
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__) crashlytics().recordError(new Error('SignUpStorage_DEV'));
        else crashlytics().recordError(new Error('SignUpStorage_PRD'));
        // kinesis_catch('#024',error,this.state.qra.toUpperCase());
        // Error saving data
      }

      //envio nuevo QRA y pushToken para que se asocie en el backend
      try {
        //  await AsyncStorage.setItem('pushtoken', this.props.pushtoken);
        var pushtoken = await AsyncStorage.getItem('pushtoken');
        //  await AsyncStorage.setItem('qratoken', 'empty');

        this.props.postPushToken(
          pushtoken,
          this.qra,
          Platform.OS,
          this.jwtToken
        );

        console.log(
          'grabo pushtoken en AsyncStorage porque hizo signUp un usuario nuevoy llama API de backend ' +
            Platform.OS
        );
      } catch (error) {
        console.log(
          'caught error setItem pushtoken y qratoken dentro de ConfirmSignUp ',
          error
        );
        // kinesis_catch('#025',error,this.state.qra.toUpperCase());
        crashlytics().setUserId(this.qra);
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__)
          crashlytics().recordError(new Error('SignUpGetPushTok_DEV'));
        else crashlytics().recordError(new Error('SignUpGetPushTok_PRD'));
      }

      console.log('antes de welcomeUserFirstTime');

      this.props.welcomeUserFirstTime(true);
      this.setState({ indicator: 0 });
      // this.props.navigation.navigate('AppNavigator2');
      this.props.navigation.navigate('Home');
    } else {
      this.setState({ indicator: 0 });

      if (this.errorSignin === 'User is disabled.') {
        console.log('paso por User is disabled');
        this.props.welcomeUserFirstTime(true);
        console.log('error signin:' + this.errorSignin);
        // this.props.navigation.navigate('Root');
        this.props.navigation.navigate('Login');
      }
    }
  };

  confirmSignup = async (confirmationCode) => {
    Keyboard.dismiss();

    if (await hasAPIConnection()) {
      this.setState({
        confirmationcodeError: 0,
        heightindicator: 35,
        indicator: 1,
        buttonsEnabled: true
      });

      //   Auth.confirmSignUp(this.state.qra.toUpperCase(),this.state.confirmationcode)
      Auth.confirmSignUp(this.state.email.toLowerCase(), confirmationCode)
        .then(() => {
          console.log('SignUp confirmed ok!: ');
          this.close_confirmSignup();
          this.signInAfterConfirmed();
          // this.setState({indicator:0});

          // this.props.navigation.navigate("AppNavigator2");
        })
        .catch((err) => {
          console.log('SignUp confirmed error: ', err);
          this.setState({
            errormessage2: I18n.t('signupValConfirmationFailed'),
            color: 'red',
            confirmationcodeError: 1,
            indicator: 0,
            buttonsEnabled: false
          });
          // kinesis_catch('#026',err,this.state.qra.toUpperCase());
          crashlytics().setUserId(this.qra);
          crashlytics().log('error: ' + JSON.stringify(err));
          if (__DEV__)
            crashlytics().recordError(new Error('Auth.confirmSignUp_DEV'));
          else crashlytics().recordError(new Error('Auth.confirmSignUp_PRD'));
        });
    } else {
      this.close_confirmSignup();
      this.setState({ indicator: 0, heightindicator: 0 });
      this.setState({ nointernet: true });
    }
  };

  closeVariosModales = () => {
    this.setState({ nointernet: false });
  };

  closeTerms = () => {
    this.setState({ terms: false, privacy: false });
  };

  // TermsAccepted = () => {
  //   this.setState({terms: false});
  //   this.SignUpAfterTerms();

  // }

  SignUpAfterTerms = () => {
    this.setState({ indicator: 1 });

    fechanac = this.birthday_convert();

    Auth.signUp({
      username: this.state.email.toLowerCase(),
      password: this.state.password,
      attributes: {
        email: this.state.email.toLowerCase(),
        birthdate: fechanac,
        'custom:firstName': this.state.firstname,
        'custom:lastName': this.state.lastname,
        'custom:country': this.state.cca2,
        'custom:callsign': this.state.qra.toUpperCase(),
        'custom:phone': this.state.phone
      }
    })
      .then(() => {
        console.log('SignUp ok!: ');
        this.qraAlreadySignUp = this.state.qra;
        this.setState({
          heightindicator: 0,
          indicator: 0,
          confirmSignup: true
        });
      })
      .catch((err) => {
        console.log('SignUp error: ', err.message);
        console.log(err);
        if (err.code === 'UsernameExistsException') {
          errmessage = 'email already exists. Please enter another email.';
          if (Platform.OS === 'ios') setheighterror = 60;
          else setheighterror = 42;
        } else if (err.code === 'UserLambdaValidationException') {
          errmessage = I18n.t('callsignTaken');
          if (Platform.OS === 'ios') setheighterror = 60;
          else setheighterror = 42;
        } else {
          errmessage = err.message;
          setheighterror = 25;
        }

        //      this.setState({errormessage: +' SignUp error: '+err.message,heightindicator: 0,  indicator: 0,heighterror: 25,  loginerror: 1 });
        this.setState({
          errormessage: errmessage,
          heightindicator: 0,
          indicator: 0,
          heighterror: setheighterror,
          loginerror: 1
        });
        Keyboard.dismiss();
        crashlytics().setUserId(this.state.qra.toUpperCase());
        crashlytics().log('error: ' + JSON.stringify(err));
        if (__DEV__) crashlytics().recordError(new Error('Auth.signUp_DEV'));
        else crashlytics().recordError(new Error('Auth.signUp_PRD'));
        //  kinesis_catch('#020',err,this.state.qra.toUpperCase());
      });
  };

  setPickerValue = (value) => {
    this.setState({ country: value, pickerCountry: false });
  };

  toggleCountryPicker = () => {
    this.setState({ pickerCountry: !this.state.pickerCountry });
  };

  chooseCountry = () => {
    this.setState({ showFlag: false });

    setTimeout(() => {
      this.setState({ showFlag: true });
    }, 100);
  };

  render() {
    console.log('LoginForm Screen');
    console.log(
      'qra: ' +
        this.state.qra +
        ' email:' +
        this.state.email +
        ' birthdate: ' +
        this.state.birthdate +
        ' password: ' +
        this.state.password +
        'passwordConfirm: ' +
        this.state.passwordConfirm
    );

    const fakedValues = [{ name: 'Afghanistan', code: 'AF' }];

    // const pickerValues = [
    //   {"name": "Afghanistan", "code": "AF"},
    //   {"name": "land Isl.", "code": "AX"},
    //   {"name": "Albania", "code": "AL"},
    //   {"name": "Algeria", "code": "DZ"},
    //   {"name": "American Samoa", "code": "AS"},
    //   {"name": "Andorra", "code": "AD"},
    //   {"name": "Angola", "code": "AO"},
    //   {"name": "Anguilla", "code": "AI"},
    //   {"name": "Antarctica", "code": "AQ"},
    //   {"name": "Antigua and Barbuda", "code": "AG"},
    //   {"name": "Argentina", "code": "AR"},
    //   {"name": "Armenia", "code": "AM"},
    //   {"name": "Aruba", "code": "AW"},
    //   {"name": "Australia", "code": "AU"},
    //   {"name": "Austria", "code": "AT"},
    //   {"name": "Azerbaijan", "code": "AZ"},
    //   {"name": "Bahamas", "code": "BS"},
    //   {"name": "Bahrain", "code": "BH"},
    //   {"name": "Bangladesh", "code": "BD"},
    //   {"name": "Barbados", "code": "BB"},
    //   {"name": "Belarus", "code": "BY"},
    //   {"name": "Belgium", "code": "BE"},
    //   {"name": "Belize", "code": "BZ"},
    //   {"name": "Benin", "code": "BJ"},
    //   {"name": "Bermuda", "code": "BM"},
    //   {"name": "Bhutan", "code": "BT"},
    //   {"name": "Bolivia", "code": "BO"},
    //   {"name": "Bosnia and Herzegovina", "code": "BA"},
    //   {"name": "Botswana", "code": "BW"},
    //   {"name": "Bouvet Isl.", "code": "BV"},
    //   {"name": "Brazil", "code": "BR"},
    //   {"name": "British Indian", "code": "IO"},
    //   {"name": "Brunei Darussalam", "code": "BN"},
    //   {"name": "Bulgaria", "code": "BG"},
    //   {"name": "Burkina Faso", "code": "BF"},
    //   {"name": "Burundi", "code": "BI"},
    //   {"name": "Cambodia", "code": "KH"},
    //   {"name": "Cameroon", "code": "CM"},
    //   {"name": "Canada", "code": "CA"},
    //   {"name": "Cape Verde", "code": "CV"},
    //   {"name": "Cayman Isl.", "code": "KY"},
    //   {"name": "Central African Republic", "code": "CF"},
    //   {"name": "Chad", "code": "TD"},
    //   {"name": "Chile", "code": "CL"},
    //   {"name": "China", "code": "CN"},
    //   {"name": "Christmas Isl.", "code": "CX"},
    //   {"name": "Cocos (Keeling) Isl.", "code": "CC"},
    //   {"name": "Colombia", "code": "CO"},
    //   {"name": "Comoros", "code": "KM"},
    //   {"name": "Congo", "code": "CG"},
    //   {"name": "Congo", "code": "CD"},
    //   {"name": "Cook Isl.", "code": "CK"},
    //   {"name": "Costa Rica", "code": "CR"},
    //   {"name": "Cote D Ivoire", "code": "CI"},
    //   {"name": "Croatia", "code": "HR"},
    //   {"name": "Cuba", "code": "CU"},
    //   {"name": "Cyprus", "code": "CY"},
    //   {"name": "Czech Republic", "code": "CZ"},
    //   {"name": "Denmark", "code": "DK"},
    //   {"name": "Djibouti", "code": "DJ"},
    //   {"name": "Dominica", "code": "DM"},
    //   {"name": "Dominican Republic", "code": "DO"},
    //   {"name": "Ecuador", "code": "EC"},
    //   {"name": "Egypt", "code": "EG"},
    //   {"name": "El Salvador", "code": "SV"},
    //   {"name": "Equatorial Guinea", "code": "GQ"},
    //   {"name": "Eritrea", "code": "ER"},
    //   {"name": "Estonia", "code": "EE"},
    //   {"name": "Ethiopia", "code": "ET"},
    //   {"name": "Falkland Isl.", "code": "FK"},
    //   {"name": "Faroe Isl.", "code": "FO"},
    //   {"name": "Fiji", "code": "FJ"},
    //   {"name": "Finland", "code": "FI"},
    //   {"name": "France", "code": "FR"},
    //   {"name": "French Guiana", "code": "GF"},
    //   {"name": "French Polynesia", "code": "PF"},
    //   {"name": "French Southern Territories", "code": "TF"},
    //   {"name": "Gabon", "code": "GA"},
    //   {"name": "Gambia", "code": "GM"},
    //   {"name": "Georgia", "code": "GE"},
    //   {"name": "Germany", "code": "DE"},
    //   {"name": "Ghana", "code": "GH"},
    //   {"name": "Gibraltar", "code": "GI"},
    //   {"name": "Greece", "code": "GR"},
    //   {"name": "Greenland", "code": "GL"},
    //   {"name": "Grenada", "code": "GD"},
    //   {"name": "Guadeloupe", "code": "GP"},
    //   {"name": "Guam", "code": "GU"},
    //   {"name": "Guatemala", "code": "GT"},
    //   {"name": "Guernsey", "code": "GG"},
    //   {"name": "Guinea", "code": "GN"},
    //   {"name": "Guinea-Bissau", "code": "GW"},
    //   {"name": "Guyana", "code": "GY"},
    //   {"name": "Haiti", "code": "HT"},
    //   {"name": "Heard Isl. and Mc. Isl.", "code": "HM"},
    //   {"name": "Holy See (Vatican City State)", "code": "VA"},
    //   {"name": "Honduras", "code": "HN"},
    //   {"name": "Hong Kong", "code": "HK"},
    //   {"name": "Hungary", "code": "HU"},
    //   {"name": "Iceland", "code": "IS"},
    //   {"name": "India", "code": "IN"},
    //   {"name": "Indonesia", "code": "ID"},
    //   {"name": "Iran", "code": "IR"},
    //   {"name": "Iraq", "code": "IQ"},
    //   {"name": "Ireland", "code": "IE"},
    //   {"name": "Isle of Man", "code": "IM"},
    //   {"name": "Israel", "code": "IL"},
    //   {"name": "Italy", "code": "IT"},
    //   {"name": "Jamaica", "code": "JM"},
    //   {"name": "Japan", "code": "JP"},
    //   {"name": "Jersey", "code": "JE"},
    //   {"name": "Jordan", "code": "JO"},
    //   {"name": "Kazakhstan", "code": "KZ"},
    //   {"name": "Kenya", "code": "KE"},
    //   {"name": "Kiribati", "code": "KI"},
    //   {"name": "Korea Democratic", "code": "KP"},
    //   {"name": "Korea Republic", "code": "KR"},
    //   {"name": "Kuwait", "code": "KW"},
    //   {"name": "Kyrgyzstan", "code": "KG"},
    //   {"name": "Lao Dem. Rep.", "code": "LA"},
    //   {"name": "Latvia", "code": "LV"},
    //   {"name": "Lebanon", "code": "LB"},
    //   {"name": "Lesotho", "code": "LS"},
    //   {"name": "Liberia", "code": "LR"},
    //   {"name": "Libyan Arab", "code": "LY"},
    //   {"name": "Liechtenstein", "code": "LI"},
    //   {"name": "Lithuania", "code": "LT"},
    //   {"name": "Luxembourg", "code": "LU"},
    //   {"name": "Macao", "code": "MO"},
    //   {"name": "Macedonia", "code": "MK"},
    //   {"name": "Madagascar", "code": "MG"},
    //   {"name": "Malawi", "code": "MW"},
    //   {"name": "Malaysia", "code": "MY"},
    //   {"name": "Maldives", "code": "MV"},
    //   {"name": "Mali", "code": "ML"},
    //   {"name": "Malta", "code": "MT"},
    //   {"name": "Marshall Isl.", "code": "MH"},
    //   {"name": "Martinique", "code": "MQ"},
    //   {"name": "Mauritania", "code": "MR"},
    //   {"name": "Mauritius", "code": "MU"},
    //   {"name": "Mayotte", "code": "YT"},
    //   {"name": "Mexico", "code": "MX"},
    //   {"name": "Micronesia", "code": "FM"},
    //   {"name": "Moldova", "code": "MD"},
    //   {"name": "Monaco", "code": "MC"},
    //   {"name": "Mongolia", "code": "MN"},
    //   {"name": "Montenegro", "code": "ME"},
    //   {"name": "Montserrat", "code": "MS"},
    //   {"name": "Morocco", "code": "MA"},
    //   {"name": "Mozambique", "code": "MZ"},
    //   {"name": "Myanmar", "code": "MM"},
    //   {"name": "Namibia", "code": "NA"},
    //   {"name": "Nauru", "code": "NR"},
    //   {"name": "Nepal", "code": "NP"},
    //   {"name": "Netherlands", "code": "NL"},
    //   {"name": "Netherlands Antilles", "code": "AN"},
    //   {"name": "New Caledonia", "code": "NC"},
    //   {"name": "New Zealand", "code": "NZ"},
    //   {"name": "Nicaragua", "code": "NI"},
    //   {"name": "Niger", "code": "NE"},
    //   {"name": "Nigeria", "code": "NG"},
    //   {"name": "Niue", "code": "NU"},
    //   {"name": "Norfolk Isl.", "code": "NF"},
    //   {"name": "Northern Mariana Isl.", "code": "MP"},
    //   {"name": "Norway", "code": "NO"},
    //   {"name": "Oman", "code": "OM"},
    //   {"name": "Pakistan", "code": "PK"},
    //   {"name": "Palau", "code": "PW"},
    //   {"name": "Palestinian", "code": "PS"},
    //   {"name": "Panama", "code": "PA"},
    //   {"name": "Papua New Guinea", "code": "PG"},
    //   {"name": "Paraguay", "code": "PY"},
    //   {"name": "Peru", "code": "PE"},
    //   {"name": "Philippines", "code": "PH"},
    //   {"name": "Pitcairn", "code": "PN"},
    //   {"name": "Poland", "code": "PL"},
    //   {"name": "Portugal", "code": "PT"},
    //   {"name": "Puerto Rico", "code": "PR"},
    //   {"name": "Qatar", "code": "QA"},
    //   {"name": "Reunion", "code": "RE"},
    //   {"name": "Romania", "code": "RO"},
    //   {"name": "Russian Federation", "code": "RU"},
    //   {"name": "Rwanda", "code": "RW"},
    //   {"name": "Saint Helena", "code": "SH"},
    //   {"name": "Saint Kitts and Nevis", "code": "KN"},
    //   {"name": "Saint Lucia", "code": "LC"},
    //   {"name": "Saint Pierre and Miquelon", "code": "PM"},
    //   {"name": "Saint Vincent", "code": "VC"},
    //   {"name": "Samoa", "code": "WS"},
    //   {"name": "San Marino", "code": "SM"},
    //   {"name": "Sao Tome and Principe", "code": "ST"},
    //   {"name": "Saudi Arabia", "code": "SA"},
    //   {"name": "Senegal", "code": "SN"},
    //   {"name": "Serbia", "code": "RS"},
    //   {"name": "Seychelles", "code": "SC"},
    //   {"name": "Sierra Leone", "code": "SL"},
    //   {"name": "Singapore", "code": "SG"},
    //   {"name": "Slovakia", "code": "SK"},
    //   {"name": "Slovenia", "code": "SI"},
    //   {"name": "Solomon Isl.", "code": "SB"},
    //   {"name": "Somalia", "code": "SO"},
    //   {"name": "South Africa", "code": "ZA"},
    //   {"name": "Georgia and Sandwich Isl.", "code": "GS"},
    //   {"name": "Spain", "code": "ES"},
    //   {"name": "Sri Lanka", "code": "LK"},
    //   {"name": "Sudan", "code": "SD"},
    //   {"name": "Suriname", "code": "SR"},
    //   {"name": "Svalbard and Jan Mayen", "code": "SJ"},
    //   {"name": "Swaziland", "code": "SZ"},
    //   {"name": "Sweden", "code": "SE"},
    //   {"name": "Switzerland", "code": "CH"},
    //   {"name": "Syrian Arab Republic", "code": "SY"},
    //   {"name": "Taiwan", "code": "TW"},
    //   {"name": "Tajikistan", "code": "TJ"},
    //   {"name": "Tanzania", "code": "TZ"},
    //   {"name": "Thailand", "code": "TH"},
    //   {"name": "Timor-Leste", "code": "TL"},
    //   {"name": "Togo", "code": "TG"},
    //   {"name": "Tokelau", "code": "TK"},
    //   {"name": "Tonga", "code": "TO"},
    //   {"name": "Trinidad and Tobago", "code": "TT"},
    //   {"name": "Tunisia", "code": "TN"},
    //   {"name": "Turkey", "code": "TR"},
    //   {"name": "Turkmenistan", "code": "TM"},
    //   {"name": "Turks and Caicos Is.", "code": "TC"},
    //   {"name": "Tuvalu", "code": "TV"},
    //   {"name": "Uganda", "code": "UG"},
    //   {"name": "Ukraine", "code": "UA"},
    //   {"name": "United Arab Emirates", "code": "AE"},
    //   {"name": "United Kingdom", "code": "GB"},
    //   {"name": "United States", "code": "US"},
    //   {"name": "Minor Outlying Isl.", "code": "UM"},
    //   {"name": "Uruguay", "code": "UY"},
    //   {"name": "Uzbekistan", "code": "UZ"},
    //   {"name": "Vanuatu", "code": "VU"},
    //   {"name": "Venezuela", "code": "VE"},
    //   {"name": "Viet Nam", "code": "VN"},
    //   {"name": "Virgin Isl., British", "code": "VG"},
    //   {"name": "Wallis and Futuna", "code": "WF"},
    //   {"name": "Western Sahara", "code": "EH"},
    //   {"name": "Yemen", "code": "YE"},
    //   {"name": "Zambia", "code": "ZM"},
    //   {"name": "Zimbabwe", "code": "ZW"}
    //   ]

    return (
      //   <KeyboardAvoidingView behavior="padding" style={{ justifyContent: 'space-around'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View
            style={{
              padding: 3,
              marginTop: 15,
              height: this.state.heightindicator,
              opacity: this.state.indicator
            }}>
            <ActivityIndicator animating={true} size="large" color="#8BD8BD" />
          </View>

          {/* height: 42 para android y 60 para ios cuando el usuario existe mensaje largo*/}
          <View
            style={{
              padding: 3,
              height: this.state.heighterror,
              width: 348,
              opacity: this.state.loginerror
            }}>
            <Text style={{ color: 'red', textAlign: 'center' }}>
              {' '}
              {this.state.errormessage}
            </Text>
          </View>

          {/* <ScrollView contentContainerStyle={styles.contentContainer}>    */}

          {/* <KeyboardAvoidingView behavior="padding"        > */}
          {/* <View style={styles.container}> */}

          {/* <View style={{flexDirection: 'row', justifyContent: 'space-around',   padding: 3, marginTop: 5, */}
          <View style={{ height: 598, marginTop: 15, width: 348 }}>
            <FlatList
              contentContainerStyle={styles.contentForm}
              ref={(ref) => (this.flatlist = ref)}
              //  keyExtractor={item => Date.now().toString()}
              showsVerticalScrollIndicator={false}
              data={fakedValues}
              renderItem={({ item }) => (
                <View>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 16,
                      marginLeft: 20,
                      marginBottom: 4
                    }}>
                    {I18n.t('signupForm')}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      ref={(qraRef) => (this.qraRef = qraRef)}
                      placeholder={I18n.t('signupCallsign')}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={() => this.firstname.focus()}
                      style={styles.input}
                      value={this.state.qra}
                      onChangeText={(text) => this.setState({ qra: text })}
                    />
                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      ref={(firstname) => (this.firstname = firstname)}
                      placeholder={I18n.t('signupFirstName')}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={() => this.lastname.focus()}
                      style={styles.input}
                      value={this.state.firstname}
                      onChangeText={(text) =>
                        this.setState({ firstname: text })
                      }
                    />
                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      ref={(lastname) => (this.lastname = lastname)}
                      placeholder={I18n.t('signupLastName')}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={() => this.emailRef.focus()}
                      style={styles.input}
                      value={this.state.lastname}
                      onChangeText={(text) => this.setState({ lastname: text })}
                    />
                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      ref={(emailRef) => (this.emailRef = emailRef)}
                      placeholder={I18n.t('signupEmail')}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={() => this.emailRefverification.focus()}
                      style={styles.input}
                      value={this.state.email}
                      onChangeText={(text) => this.setState({ email: text })}
                    />
                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      ref={(emailRefverification) =>
                        (this.emailRefverification = emailRefverification)
                      }
                      placeholder={I18n.t('signupEmailConfirm')}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      // onSubmitEditing={() => this.birthdatedRef.focus()}
                      style={styles.input}
                      value={this.state.emailVerification}
                      onChangeText={(text) =>
                        this.setState({ emailVerification: text })
                      }
                    />

                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={styles.birthdateContainer}
                      // onPress={() => this.date_picker()}>
                      onPress={() => this.showDatepicker()}>
                      <Text
                        style={styles.birthdateText}
                        ref={(birthdatedRef) =>
                          (this.birthdatedRef = birthdatedRef)
                        }>
                        {' '}
                        {/* {this.state.birthdate} */}
                        {this.state.showDate}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>

                  {/* this.toggleCountryPicker() */}
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={styles.birthdateContainer}
                      onPress={() => this.chooseCountry()}>
                      <Text
                        style={styles.birthdateText}
                        ref={(countryRef) => (this.countryRef = countryRef)}>
                        {' '}
                        {this.state.country}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      ref={(phoneRef) => (this.phoneRef = phoneRef)}
                      placeholder={I18n.t('signupPhone')}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={() => this.passwordRef.focus()}
                      style={styles.input}
                      value={this.state.phone}
                      onChangeText={(text) => this.setState({ phone: text })}
                    />
                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      ref={(passwordRef) => (this.passwordRef = passwordRef)}
                      placeholder={I18n.t('signupPassword')}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={() => this.passwordConfRef.focus()}
                      secureTextEntry
                      style={styles.input}
                      value={this.state.password}
                      onChangeText={(text) => this.setState({ password: text })}
                    />
                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      ref={(passwordConfRef) =>
                        (this.passwordConfRef = passwordConfRef)
                      }
                      placeholder={I18n.t('signupPasswordConfirm')}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                      style={styles.input2}
                      value={this.state.passwordConfirm}
                      onChangeText={(text) =>
                        this.setState({ passwordConfirm: text })
                      }
                    />
                    <TouchableOpacity style={{ height: 40, width: 60 }}>
                      <Text> </Text>
                    </TouchableOpacity>
                  </View>

                  {/* <View  style={{flex:1, flexDirection: "row"}}> */}
                  <Text
                    style={{ fontSize: 11, color: '#8BD8BD', marginLeft: 15 }}>
                    {I18n.t('signupAccept1')}
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: '#8BD8BD',
                        marginLeft: 15
                      }}>
                      {I18n.t('signupAccept12')}{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.setState({ privacy: true })}>
                      <Text style={{ fontSize: 11, color: 'white' }}>
                        {I18n.t('signupAccept2')}{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }}>
                    <Text style={{ fontSize: 11, color: '#8BD8BD' }}>
                      {I18n.t('signupAccept3')}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.setState({ terms: true })}>
                      <Text style={{ fontSize: 11, color: 'white' }}>
                        {' '}
                        {I18n.t('signupAccept4')}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* </View> */}
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.signUp()}>
                    <Text style={styles.buttonText}>
                      {I18n.t('signupAcceptButton')}{' '}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ marginTop: 5 }}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.buttonText2}>
                      {I18n.t('signupBackToLogin')}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>
                  <Text style={styles.buttonText2}> </Text>

                  {
                    this.state.showFlag && (
                      <CountryPicker
                        withEmoji={false}
                        withCloseButton={true}
                        withFlag={true}
                        //    countryCode={this.state.countryCode}
                        withFilter={true}
                        visible={true}
                        //  theme="black"
                        // withCallingCode
                        onSelect={(value) => {
                          // this.setState({
                          //   countryCode: country.cca2,
                          //   callingCode: `+ ${country.callingCode}`,
                          // });
                          this.setState({
                            cca2: value.cca2,
                            callingCode: value.callingCode,
                            country: value.name,
                            showFlag: false
                          });
                          console.log(value);
                        }}
                        // onClose = { this.setState({showFlag: false})}
                        // ref={ref => {this.countryPicker = ref}}
                      />
                    )

                    //     <CountryPicker
                    //   onChange={value => {
                    //     this.setState({ cca2: value.cca2, callingCode: value.callingCode, country: value.name })
                    //     console.log(value);

                    //   }}
                    //   cca2={this.state.cca2}
                    //   // translation="eng"
                    //   // closeable="true"
                    //   // filterable="true"
                    //   // hideAlphabetFilter="true"
                    //   translation={'eng'}
                    //   withFilter
                    //   visible = {true}
                    //   ref={ref => {this.countryPicker = ref}}

                    // />
                  }
                </View>
              )}
            />
          </View>
          {/* </FlatList>         */}

          {/* <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.signUp()} >
                    <Text style={styles.buttonText}> SignUp </Text>
                 </TouchableOpacity>

                 <TouchableOpacity  style={{marginTop: 10}} onPress={ () => this.props.navigation.navigate("Root")} >
                    <Text style={styles.buttonText2} >Login Screen</Text>
                 </TouchableOpacity> */}

          {/* </KeyboardAvoidingView>  */}

          {/* animationType={"slide"} */}

          {this.state.show && Platform.OS === 'android' && (
            <DateTimePicker
              testID="dateTimePicker"
              style={{ width: '100%' }}
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display="spinner"
              onChange={this.onChange}
            />
          )}


{(this.state.show && Platform.OS === 'ios' && Platform.Version < '14') && (
                <Modal
                visible={true}
                animationType={"slide"}
                transparent={true}
                onRequestClose={() => console.log("Close was requested")}
              >
                <View
                  style={{
                    margin: 10,    
                    padding: 10,
                    // backgroundColor: "rgba(255,255,255,0.98)",
                    backgroundColor: "grey",
                    marginTop: 120,
                    //  bottom: 150,
                    left: 10,
                    right: 10,
                    height: 320,
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: 'center',
                    borderRadius: 12
                  }}>
         <DateTimePicker
          testID="dateTimePicker"
           style={{width:'100%', marginLeft: 5,marginTop:20}}
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
        <View style={{flexDirection: "row", flex: 1, marginTop: 20}} >
        <View style={{flex: 0.5}} >
          <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'left' }} onPress={() => this.closeDatePicker()} >{I18n.t("QsoDateCancel")}</Text>
          </TouchableOpacity>
          </View>
          <View style={{flex: 0.5}} >
          <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'right' }} onPress={() => this.closeDatePicker()} >{I18n.t("QsoDateSelect")}</Text>
          </TouchableOpacity>
          </View>
        </View>

        </View>
        </Modal>
        
      )}
            
              {(this.state.show && Platform.OS === 'ios' && Platform.Version >= '14') && (
                  <Modal
                  visible={true}
                  animationType={"slide"}
                  transparent={true}
                  onRequestClose={() => console.log("Close was requested")}
                >
                  <View
                    style={{
                      margin: 10,    
                      padding: 10,
                      backgroundColor: "rgba(255,255,255,0.98)",
                      marginTop: 120,
                      //  bottom: 150,
                      left: 10,
                      right: 10,
                      height: 150,
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: 'center',
                      borderRadius: 12
                    }}>
           <DateTimePicker
            testID="dateTimePicker"
             style={{width:'100%', marginLeft: 170,marginTop:20}}
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
          <View style={{flexDirection: "row", flex: 1, marginTop: 50}} >
          <View style={{flex: 0.5}} >
            <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
                 <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'left' }} onPress={() => this.closeDatePicker()} >{I18n.t("QsoDateCancel")}</Text>
            </TouchableOpacity>
            </View>
            <View style={{flex: 0.5}} >
            <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
                 <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'right' }} onPress={() => this.closeDatePicker()} >{I18n.t("QsoDateSelect")}</Text>
            </TouchableOpacity>
            </View>
          </View>
  
          </View>
          </Modal>
          
        )}

          

          {this.state.confirmSignup && (
            <ConfirmSignUp
              //  show={this.state.confirmSignup}
              color={this.state.color}
              confirmationcodeError={this.state.confirmationcodeError}
              errormessage2={this.state.errormessage2}
              close_confirmSignup={this.close_confirmSignup.bind()}
              resendCode={this.resendCode.bind()}
              confirmSignup={this.confirmSignup.bind()}
            />
          )}

          {/* 
                <Modal visible ={this.state.pickerCountry} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{ margin:20,
                         padding:20, 
                         backgroundColor: '#efefef',
                         
                        //  '#efefef',
                         bottom: 20,
                         left: 20,
                         right: 20,
                         height: 450,
                         position: 'absolute',
                         alignItems: 'center' ,
                         borderBottomLeftRadius: 22,
                         borderBottomRightRadius: 22,
                         borderTopLeftRadius: 22,
                         borderTopRightRadius: 22,                     
                          }}>
                          
                    <Text style={{ fontWeight: 'bold', alignItems: 'center', marginBottom:10}}>Please pick a Country </Text>
                  
                    <FlatList contentContainerStyle={styles.contentCountry}
                        data={pickerValues}
           
                        renderItem={({item}) => <TouchableOpacity key={item.name} onPress={() => this.setPickerValue(item.name)} style={{ paddingTop: 3, paddingBottom: 3}}> 
                                              <Text style={{ fontSize: 18, padding:3}} >{item.name}</Text>
                                              </TouchableOpacity >}
                      />
      
  

                    <TouchableOpacity   onPress={() => this.toggleCountryPicker()} style={{ marginTop: 5, paddingTop: 4, paddingBottom: 4}}>
                      <Text style={{ color: '#999'}}>Cancel</Text>
                    </TouchableOpacity >
                    </View>

               
               </Modal> */}

          {/* </ScrollView>   */}
          {this.state.nointernet && (
            <VariosModales
              show={this.state.nointernet}
              modalType="nointernet"
              closeInternetModal={this.closeVariosModales.bind()}
            />
          )}
          {/* {(this.state.terms) && <VariosModales show={true} modalType="terms" closeterms={this.closeTerms.bind()} termsaccepted={this.TermsAccepted.bind()}  /> } */}
          {this.state.terms && (
            <VariosModales
              show={true}
              modalType="terms"
              closeterms={this.closeTerms.bind()}
            />
          )}
          {this.state.privacy && (
            <VariosModales
              show={true}
              modalType="privacy"
              closeterms={this.closeTerms.bind()}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,

    flex: 1,
    //  backgroundColor: '#3498db',
    // backgroundColor: '#808080',
    backgroundColor: '#243665',
    alignItems: 'center'
  },
  contentContainer: {
    width: 340,
    alignItems: 'center'
  },
  contentCountry: {
    // height: 330,
    width: 250,
    alignItems: 'center'
  },

  contentForm: {
    // height: 330,
    width: 340,
    alignItems: 'center'
  },
  input: {
    height: 38,
    width: 270,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 8,
    color: '#FFF',
    fontSize: 16,
    borderRadius: 22,
    marginLeft: 15,
    paddingHorizontal: 10
  },
  input2: {
    height: 38,
    width: 270,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 5,
    color: '#FFF',
    fontSize: 16,
    borderRadius: 22,
    paddingHorizontal: 10,
    marginLeft: 15
  },
  inputConfirmation: {
    height: 40,
    width: 250,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 5,
    color: '#FFF',
    fontSize: 16,
    borderRadius: 22,
    paddingHorizontal: 10
  },
  buttonContainer: {
    //   backgroundColor: '#2980b9',
    backgroundColor: '#8BD8BD',
    paddingVertical: 5,
    borderRadius: 22,
    width: 270,
    height: 36,
    marginLeft: 15,
    marginTop: 7
  },
  birthdateContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    height: 37,
    width: 270,
    marginBottom: 8,
    marginLeft: 15,
    paddingHorizontal: 8,
    borderRadius: 22
  },
  birthdateText: {
    color: '#FFF',
    fontSize: 16,
    opacity: 0.8,
    height: 37
  },
  buttonText: {
    textAlign: 'center',
    // color: '#FFFFFF',
    color: '#243665',
    fontSize: 16
    //  fontWeight: '700'
  },
  buttonText2: {
    //     textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    //   fontWeight: '700',
    marginLeft: 15
  },
  activityindicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

const mapStateToProps = (state) => {
  return { pushtoken: state.sqso.pushToken };
};

const mapDispatchToProps = {
  setQra,
  setUrlRdsS3,
  resetQso,
  followersAlreadyCalled,
  newqsoactiveFalse,
  setToken,
  postPushToken,
  getUserInfo,
  doFetchPublicFeed,
  doFetchFieldDaysFeed,
  doFollowFetch,
  doLatestUsersFetch,
  welcomeUserFirstTime
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
