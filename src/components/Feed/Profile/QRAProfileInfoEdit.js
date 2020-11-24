import { Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Button, Input } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import * as Actions from '../../../actions';
import I18n from '../../../utils/i18n';

class QraProfileInfoEdit extends React.Component {
  state = {
    firstname: '',
    lastname: this.props.qra.lastname,

    mobile: this.props.qra.mobile,
    birthday: this.props.qra.birthday,
    address: this.props.qra.address,
    address2: this.props.qra.address2,
    city: this.props.qra.city,
    state: this.props.qra.state,
    zipcode: this.props.qra.zipcode,
    country: this.props.qra.country
      ? this.props.qra.country
      : I18n.t('signupCountry'),

    cqzone: this.props.qra.cqzone,
    ituzone: this.props.qra.ituzone,
    gridlocator: this.props.qra.gridlocator,
    iotadesignator: this.props.qra.iotadesignator,
    licenseclass: this.props.qra.licenseclass,
    qslinfo: this.props.qra.qslinfo,
    eqsl: this.props.qra.eqsl,
    lotw: this.props.qra.lotw,
    mailqsl: this.props.qra.mailqsl,
    pickerCountry: false,
    buttonsEnabled: false,
    terms: false,
    cca2: 'US',
    callingCode: '',
    namec: '',
    showFlag: false,

    privacy: false
  };
  // useEffect(() => {
  //   setQRA(props.qraInfo);
  // }, [props.qraInfo]);

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
    const validationSchema = Yup.object({
      birthday: Yup.date()
        .required(I18n.t('auth.birthDateRequired'))
        .min(new Date(1900, 0, 1))
        .max(new Date())
        .test('birthDate', I18n.t('auth.years13Restriction'), (value) => {
          return moment().diff(moment(value), 'years') >= 13;
        }),
      country: Yup.string().required(),
      firstname: Yup.string().required(I18n.t('auth.firstNameRequired')),
      lastname: Yup.string().required(I18n.t('auth.lastNameRequired'))
    });
    return (
      <ScrollView style={{ flex: 1 }}>
        <Formik
          initialValues={{
            firstname: this.props.qra.firstname,
            lastname: this.props.qra.lastname,
            mobile: this.props.qra.mobile,
            birthday: this.props.qra.birthday,
            address: this.props.qra.address,
            address2: this.props.qra.address2,
            city: this.props.qra.city,
            state: this.props.qra.state,
            zipcode: this.props.qra.zipcode,
            country: this.props.qra.country,
            cqzone: this.props.qra.cqzone,
            ituzone: this.props.qra.ituzone,
            gridlocator: this.props.qra.gridlocator,
            iotadesignator: this.props.qra.iotadesignator,
            licenseclass: this.props.qra.licenseclass,
            qslinfo: this.props.qra.qslinfo,
            eqsl: this.props.qra.eqsl,
            lotw: this.props.qra.lotw,
            mailqsl: this.props.qra.mailqsl
          }}
          validationSchema={validationSchema}
          onSubmit={(val) => {
            this.setState({
              qra: {
                ...this.state.qra,
                firstname: val.firstname,
                lastname: val.lastname,
                mobile: val.mobile,
                birthday: val.birthday,
                address: val.address,
                address2: val.address2,
                city: val.city,
                state: val.state,
                zipcode: val.zipcode,
                country: val.country,
                cqzone: val.cqzone,
                ituzone: val.ituzone,
                gridlocator: val.gridlocator,
                iotadesignator: val.iotadesignator,
                licenseclass: val.licenseclass,
                qslinfo: val.qslinfo,
                eqsl: val.eqsl,
                lotw: val.lotw,
                mailqsl: val.mailqsl
              }
            });

            this.props.actions.doSaveUserInfo(this.props.token, val);
            if (this.props.navigation.dangerouslyGetParent().state.index > 0) {
              // const popAction = StackActions.pop({
              //   n: 1
              // });
              // // const resetAction = StackActions.reset({
              // //   index: 0,
              // //   actions: [NavigationActions.navigate({ routeName: 'QRAProfile' })]
              // // });
              // this.props.navigation.dispatch(popAction);
              // this.props.navigation.navigate('Home');
              this.props.navigation.goBack();
            } else this.props.navigation.navigate('Home');
            // this.props.navigation.navigate('Home');
          }}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit
          }) => (
            <View style={styles.form}>
              {/* <Header content={I18n.t('qra.editInfo')} /> */}
              <View>
                <Button
                  fluid
                  title={I18n.t('qra.saveInfo')}
                  onPress={handleSubmit}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Input
                  value={values.firstname}
                  onChangeText={handleChange('firstname')}
                  onBlur={() => setFieldTouched('firstname')}
                  label={I18n.t('qra.firstName')}
                />

                {touched.firstname && errors.firstname && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.firstname}
                  </Text>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  value={values.lastname}
                  onChangeText={handleChange('lastname')}
                  onBlur={() => setFieldTouched('lastname')}
                  label={I18n.t('qra.lastName')}
                />
                {touched.lastname && errors.lastname && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.lastname}
                  </Text>
                )}
              </View>
              <Input
                value={values.birthday}
                onChangeText={handleChange('birthday')}
                onBlur={() => setFieldTouched('birthday')}
                label={I18n.t('qra.birthday')}
              />
              {touched.birthday && errors.birthday && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.birthday}
                </Text>
              )}
              <Input
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={() => setFieldTouched('address')}
                label={I18n.t('qra.addressLine1')}
              />
              {touched.address && errors.address && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.address}
                </Text>
              )}
              <Input
                value={values.address2}
                onChangeText={handleChange('address2')}
                onBlur={() => setFieldTouched('address2')}
                label={I18n.t('qra.addressLine2')}
              />
              {touched.address2 && errors.address2 && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.address2}
                </Text>
              )}
              <Input
                value={values.city}
                onChangeText={handleChange('city')}
                onBlur={() => setFieldTouched('city')}
                label={I18n.t('qra.city')}
              />
              {touched.city && errors.city && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.city}
                </Text>
              )}
              <Input
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={() => setFieldTouched('state')}
                label={I18n.t('qra.state')}
              />
              {touched.state && errors.state && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.state}
                </Text>
              )}
              <Input
                value={values.zipcode}
                onChangeText={handleChange('zipcode')}
                onBlur={() => setFieldTouched('zipcode')}
                label={I18n.t('qra.zipCode')}
              />
              {touched.zipcode && errors.zipcode && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.zipcode}
                </Text>
              )}
              <TouchableOpacity
                // style={styles.birthdateContainer}
                onPress={() => this.chooseCountry()}>
                <Text
                  // style={styles.birthdateText}
                  ref={(countryRef) => (this.countryRef = countryRef)}>
                  {' '}
                  {this.state.country}
                </Text>
              </TouchableOpacity>

              {this.state.showFlag && (
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
              )}
              <Input
                value={values.cqzone}
                onChangeText={handleChange('cqzone')}
                onBlur={() => setFieldTouched('cqzone')}
                label={I18n.t('qra.cqZone')}
              />
              {touched.cqzone && errors.cqzone && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.cqzone}
                </Text>
              )}
              <Input
                value={values.ituzone}
                onChangeText={handleChange('ituzone')}
                onBlur={() => setFieldTouched('ituzone')}
                label={I18n.t('qra.ituZone')}
              />
              {touched.ituzone && errors.ituzone && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.ituzone}
                </Text>
              )}

              <Input
                value={values.gridlocator}
                onChangeText={handleChange('gridlocator')}
                onBlur={() => setFieldTouched('gridlocator')}
                label={I18n.t('qra.gridLocator')}
              />
              {touched.gridlocator && errors.gridlocator && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.gridlocator}
                </Text>
              )}
              <Input
                value={values.licenseclass}
                onChangeText={handleChange('licenseclass')}
                onBlur={() => setFieldTouched('licenseclass')}
                label={I18n.t('qra.licenseClass')}
              />
              {touched.licenseclass && errors.licenseclass && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.licenseclass}
                </Text>
              )}
              <Input
                value={values.iotadesignator}
                onChangeText={handleChange('iotadesignator')}
                onBlur={() => setFieldTouched('iotadesignator')}
                label={I18n.t('qra.iotaDesignator')}
              />
              {touched.iotadesignator && errors.iotadesignator && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.iotadesignator}
                </Text>
              )}
              <Input
                value={values.qslinfo}
                onChangeText={handleChange('qslinfo')}
                onBlur={() => setFieldTouched('qslinfo')}
                label={I18n.t('qra.qsoInfo')}
              />
              {touched.qslinfo && errors.qslinfo && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.qslinfo}
                </Text>
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  form: { flex: 1, flexDirection: 'column' },
  comment: {
    width: '70%',
    maxHeight: 80,
    borderWidth: 1,
    fontSize: 20,
    minHeight: 5,
    backgroundColor: 'white'
  },
  itemsView: {
    flex: 1
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },

  iconView: {
    alignSelf: 'flex-end'
  },

  text: {
    fontSize: 20
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  container: {
    paddingHorizontal: 5
  }
});
const mapStateToProps = (state, ownProps) => ({
  qra: state.sqso.userInfo,
  currentQRA: state.sqso.qra,
  // qso: selectorFeedType(state, ownProps),

  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(QraProfileInfoEdit)
);
