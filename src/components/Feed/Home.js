import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {
  AppState,
  Image,
  Platform,
  Text,
  View,
  Alert,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import ShareMenu from 'react-native-share-menu';
import NewsFeed from './NewsFeedContainer';
import Toast from 'react-native-root-toast';
import { Auth } from 'aws-amplify';
import moment from 'moment';

class Home extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: ' ',
    // 50
    tabBarIcon: ({ tintColor }) => {
      // return (<View style={{width: 50, height: 20,marginTop: (Platform.OS==='ios') ? 6 : 7,backgroundColor:'yellow'}}>
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{
              width: 28,
              height: 28,
              marginLeft: 5,
              marginTop: Platform.OS === 'ios' ? 24 : 28
            }}
            //  style={{ width: 28, height: 28, marginLeft: 18 }}

            source={require('../../images/home4.png')}
            // />
          />
          {/* <Text style={{fontSize:9, marginTop: 3, marginLeft: 19}}>{I18n.t("HomeTitle")}12345678</Text> */}
          <Text style={{ fontSize: 9, marginTop: 3, marginLeft: 5 }}>
            {I18n.t('HomeTitle')}
          </Text>
        </View>
      );
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      adActive: true,
      active: true,
      modalOpen: null,
      qsos: [],
      error: null
      // videoAlreadyDisplayed: false
    };
    this.backHandler = null;
  }
  componentDidMount() {
    this.props.navigation.setParams({
      tabBarOnPress: () => {
        console.log('PRESS HOME!');
        // sumo contador de press home para resfrescar el feed solo cuando apreta la segunda vez

        if (this.props.presshome === 1) {
          console.log('press esta en 1 y refresca');

          // home = global_config.urlWeb + '?embedded=true&date=' + new Date();
          // cada vez que apreta el INICIO le bajo a 50 el timeout asi se loguea una vez y no dos veces como la primera vez
          // la primera vez tiene un tiemout de 3000 porque hay que darle mas tiempo para asegurar el LOGIN.
          // this.time = 50;
          // await this.props.setWebView(this.props.webviewsession, home);
          this.toast(I18n.t('Refreshing'), 2500);
          this.props.actions.doFetchPublicFeed(this.props.currentQRA);
          this.props.actions.doFetchFieldDaysFeed();
          this.props.actions.doLatestUsersFetch();
          //   this.props.setPressHome(0);
        } else {
          console.log('press NO esta en 1 y y lo pone en 1');
          this.props.actions.setPressHome(1);
        }

        // this.props.actions.doFetchPublicFeed(this.props.currentQRA)
      }
    });
    // this.props.navigation.setParams({
    //   tapOnTabNavigator: this.tapOnTabNavigator
    // });

    ShareMenu.getSharedText((text) => {
      console.log('el text del share 09:' + JSON.stringify(text));
      if (text !== null && typeof text !== 'undefined') {
        // if (typeof text !== 'undefined') {
        console.log('el text del share 09: ' + text);
        auxshare1 = JSON.stringify(text);
        auxshare2 = JSON.parse(auxshare1);
        console.log('auxshare: ' + auxshare2.data);
        AsyncStorage.setItem('shareExternalMedia', auxshare2.data);
        AsyncStorage.setItem('shareExternalMediaMimeType', auxshare2.mimeType);

        this.props.actions.setExternalShreUrl(true);
        this.props.navigation.navigate('QsoScreen');
      }
      // else
      // this.props.setExternalShreUrl(false);
    });
    // if (__DEV__)
    //   this.setState({ adActive: false });
    this.props.actions.doFollowFetch();
    if (this.props.qsos.length === 0) {
      // this.props.actions.doFetchUserFeed(
      //   this.props.token,
      //   this.props.currentQRA
      // );
      this.props.actions.doFetchPublicFeed(this.props.currentQRA);
      this.props.actions.doFetchFieldDaysFeed();
      this.props.actions.doLatestUsersFetch();
    }

    AppState.addEventListener('change', this._handleAppStateChange);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction
    );
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    if (this.backHandler) this.backHandler.remove();
  }

  tapOnTabNavigator = async () => {
    console.log('PRESS HOME!');
    // sumo contador de press home para resfrescar el feed solo cuando apreta la segunda vez

    if (this.props.presshome === 1) {
      // home = global_config.urlWeb + '?embedded=true&date=' + new Date();
      // cada vez que apreta el INICIO le bajo a 50 el timeout asi se loguea una vez y no dos veces como la primera vez
      // la primera vez tiene un tiemout de 3000 porque hay que darle mas tiempo para asegurar el LOGIN.
      // this.time = 50;
      // await this.props.setWebView(this.props.webviewsession, home);
      this.toast(I18n.t('Refreshing'), 2500);
      this.props.actions.doFetchPublicFeed(this.props.currentQRA);
      this.props.actions.doFetchFieldDaysFeed();
      this.props.actions.doLatestUsersFetch();

      //   this.props.setPressHome(0);
    } else this.props.actions.setPressHome(1);
  };

  _handleAppStateChange = async (nextAppState) => {
    console.log('nextState: ' + nextAppState)
    
    if (nextAppState === 'background') {
      this.timeGoesBackGround = new Date()
    }

    if (nextAppState === 'active') {
      ShareMenu.getSharedText((text) => {
        console.log('el text del share 05:' + JSON.stringify(text));
        // if (text!==null) {
        if (text !== null && typeof text !== 'undefined') {
          console.log('el text del share hay data 05: ' + text);
          auxshare1 = JSON.stringify(text);
          auxshare2 = JSON.parse(auxshare1);
          console.log('auxshare: ' + auxshare2.data);
          AsyncStorage.setItem('shareExternalMedia', auxshare2.data);
          AsyncStorage.setItem(
            'shareExternalMediaMimeType',
            auxshare2.mimeType
          );
          this.props.actions.setExternalShreUrl(true);

          this.props.actions.newqsoactiveFalse();
          this.props.actions.resetQso();

          this.props.navigation.navigate('QsoScreen');
        } else {
          // this.props.setExternalShreUrl(false);
        }
      });

      this.props.actions.apiCheckVersion();

      // actualizo token porque se pudo haber vencido mientras la APP estuvo mucho tiempo en BackGround
      var session = await Auth.currentSession();
      console.log('PASO POR SIGNIN token: ' + session.idToken.jwtToken);
      this.props.actions.setToken(session.idToken.jwtToken);
      // si viene de background debe traer las ultimas actualizaciones de notificaciones
      // puede venir de background porque el usuario volvio manualmente o porque apreto un PUSH
      this.props.actions.get_notifications(session.idToken.jwtToken);

      // llamo a getuserInfo solo si el usuario no esa validado
      console.log(
        'pendingValidation:' + this.props.userinfo.pendingVerification
      );
      if (this.props.userinfo.pendingVerification)
        this.props.actions.getUserInfo(session.idToken.jwtToken);


        
      // refresh feed ? it depends the seconds in background
      console.log('timeGoesBackGround: '+ this.timeGoesBackGround)
        
      console.log('dif: '+ moment().diff(this.timeGoesBackGround, 'seconds'));
      dif = moment().diff(this.timeGoesBackGround, 'seconds')
      if (dif>3600)
       { console.log('more than an hour it refreshs')
       this.props.actions.doFetchPublicFeed(this.props.currentQRA);
       this.props.actions.doFetchFieldDaysFeed();
      }
       else
       console.log('les than an hour')

     
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.qsos.length > 0) return { active: false, qsos: props.qsos };
    else if (props.qsos.length === 0) return { active: true };
  }

  backAction = () => {
    // I18n.t("BACKBUTTONANDROID")
    // I18n.t("BACKBUTTONANDROIDCANCEL") BACKBUTTONANDROIDEXIT

    console.log('press back android');
    // Se comento este codigo para que no salga mas el PopUp cuando hace en android flecha fisica BACK

    // Alert.alert(I18n.t('BACKBUTTONANDROIDTITLE'), I18n.t('BACKBUTTONANDROID'), [
    //   {
    //     text: I18n.t('BACKBUTTONANDROIDCANCEL'),
    //     onPress: () => null,
    //     style: I18n.t('BACKBUTTONANDROIDCANCEL')
    //   },
    //   {
    //     text: I18n.t('BACKBUTTONANDROIDEXIT'),
    //     onPress: () => BackHandler.exitApp()
    //   }
    // ]);
    // return true;
  };

  toast = async (message, timer) => {
    // Add a Toast on screen.
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      }
    });

    // Toast.hide(toast);
    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
      Toast.hide(toast);
    }, timer);
  };
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.qsos.length > 0)
  //     this.setState({ qsos: this.props.qsos, active: false });
  //   // else if (props.qsos.length === 0) return { active: true };
  // }
  render() {
    // if (this.props.qsos.length > 0) {
    return <NewsFeed />;
    // } else
    //   return (
    //     <View style={{ flex: 1 }}>
    //       <ActivityIndicator size="large" color="#00ff00" />
    //     </View>
    //   );
  }
}

const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingQSOS,
  qsosFetched: state.sqso.feed.qsosFetched,
  //   authenticating: state.sqso.feeduserData.authenticating,
  currentQRA: state.sqso.qra,
  userinfo: state.sqso.userInfo,

  token: state.sqso.jwtToken,
  qsos: state.sqso.feed.qsos,
  presshome: state.sqso.pressHome
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
