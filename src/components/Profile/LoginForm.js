/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';
// I18n.locale = 'en-US';
// nuevo push
//import Analytics from '@aws-amplify/analytics';
// import firebase from '@react-native-firebase/app';
// import * as config from '@react-native-firebase/remote-config';
//  import PushNotification from '@aws-amplify/pushnotification';
//import { PushNotification } from 'aws-amplify-react-native';
// import { PushNotificationIOS } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import crashlytics from '@react-native-firebase/crashlytics';
import Amplify, { Auth } from 'aws-amplify';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  View
} from 'react-native';
import RNIap from 'react-native-iap';
// import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  confirmReceiptiOS,
  fetchQraProfileUrl,
  followersAlreadyCalled,
  getUserInfo,
  get_notifications,
  manageLocationPermissions,
  managePushToken,
  manage_notifications,
  newqsoactiveFalse,
  postPushToken,
  resetQso,
  setQra,
  setSubscriptionInfo,
  setToken,
  setUrlRdsS3,
  // setWebView,
  welcomeUserFirstTime,
  apiCheckVersion,
  setPendingVerification
} from '../../actions';
import { APP_VERSION } from '../../appVersion';
import AmplifyAuthStorage from '../../AsyncStorage';
import awsconfig from '../../aws-exports';
import global_config from '../../global_config.json';
//import {  Permissions } from 'expo';
import { armoPushNotifyLocalNotif, hasAPIConnection } from '../../helper';
import I18n from '../../utils/i18n';
import VariosModales from '../Qso/VariosModales';
import ConfirmSignUp from './ConfirmSignUp';
import StopApp from './StopApp';

var PushNotification = require('react-native-push-notification');

// PushNotification need to work with Analytics
//Analytics.configure(awsconfig);
//Amplify.configure(awsconfig);
// PushNotification.configure(awsconfig);
//Auth.configure(awsconfig);
// Amplify.configure(awsconfig);
Amplify.configure(awsconfig);
Amplify.configure({ storage: AmplifyAuthStorage });

const itemSubs = Platform.select({
  ios: [
    'PremiumMonthly' // dooboolab
  ],
  android: [
    // 'test.sub1', // subscription
    '001'
  ]
});

// const actualAppVersion = '1.0.0';

// let purchaseUpdateSubscription;
// let purchaseErrorSubscription;

class LoginForm extends React.PureComponent {
  //   static navigationOptions = {
  //       tabBarLabel: 'Profile'

  //

  constructor(props) {
    super(props);
    TextInput.defaultProps = { allowFontScaling: false };
    Text.defaultProps = { allowFontScaling: false };

    this.usernotfound = false;
    this.internet = false;
    // this.pushToken = '';
    // this.pushTokenFound = false;
    this.jwtToken = '';
    this.qra = '';
    this.userYpassnull = false;
    // this.webviewurlfromKilledPush = '';

    this.width = Dimensions.get('window').width; //full width
    this.height = Dimensions.get('window').height; //full height
    this.debeHacerUpgrade = false;

    this.state = {
      username: '',
      password: '',
      indicator: 0,
      loginerror: 0,
      nointernet: false,
      showloginForm: false,
      mess: I18n.t('loading'),
      stopApp: false,
      pushTokenNotFound: false,
      confirmSignup: false,
      confirmationcodeError: 0,
      color: 'red',
      appNeedUpgrade: false,
      forceChangePassword: false,
      upgradeText: '',
      loginerrorMessage: ''
      // exit: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    // console.log('afuer de getDerivedStateFromProps: '  + props);
    // console.log(props);
    console.log('mustupgradeapp: ' + props.mustupgradeapp);

    if (props.mustupgradeapp) {
      return {
        stopApp: true,
        appNeedUpgrade: true,
        upgradeText: I18n.t('STOPAPP_UPGRADE')
      };
    }

    if (props.userInfoApiSuccesStatus) {
      console.log(
        'adentro de getDerivedStateFromProps: ' + props.userInfoApiSuccesStatus
      );
      props.followersAlreadyCalled(true);
      props.navigation.navigate('Home');
      //  this.setState({showloginForm: true});

      return { showloginForm: true };
    }
    // if (!props.qsosFetched) return { active: true };
    return null;
  }

  // onScreenFocus = async () => {
  //   console.log('LOGINFORM en FOCUS!');

  //   // para salga de la APP cuando en ANDROID vuelven con flecha y que no se quede en la pantala de LOGIN
  //   // porque confunde esa pantalla esperando LOGIN
  //   if (this.state.exit) BackHandler.exitApp();
  // };

  async componentDidMount() {
    // PushNotification.onNotification((notification) => {
    //   console.log('llego push che!');
    console.log('esta hermes?');
    console.log(!!global.HermesInternal);

    // this.props.navigation.addListener('didFocus', this.onScreenFocus);
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
    // });

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      // onRegister: function(token) {
      //   console.log('nuevo push token!!!')
      //   console.log(token)
      // },
      // (optional) Called when Token is generated (iOS and Android)

      //  PushNotification.onNotification((notification) => {
      //  onNotification: function(notification) {
      onNotification: (notification) => {
        // console.log('llego notificacion!');
        // console.log(notification);

        // if (notification.userInteraction)
        //  { console.log('pepe che! estaba killed y apreto!')
        //  this.webviewurlfromKilledPush = notification.userInfo.url;
        // }

        if (this.props.qra != '') {
          // esto es por si fallo el signout entonces, el qra de redux queda vacio el RDS no se entero
          // el usuario no est amas logueado y va a seguir recibienod PUSH con el usuario que quedo en RDS (el ultimo antes de hacer signout)
          // entonce si llega un PUSH y no tiene QRA en redux es porque justmanete fallo esa actualizacion en RDS
          // entonces llamo de nuevo al RDS y le asigno VACIO de QRA al token push,luego cuando el el usuario se loguee el RDS se va a actualizar
          // y pasar en nuevo QRA.
          let envioNotif = '';

          if (Platform.OS === 'android') {
            try {
              console.log('paso por ANDROID');
              if (notification.userInteraction === false) {
                let bodyJson = JSON.parse(notification.data.Data);

                if (bodyJson.AVATAR) var avatar = bodyJson.AVATAR;
                else avatar = null;

                console.log('title-loc-key-android');
                var parseo = JSON.parse(notification.data.message);
                console.log(parseo);
                console.log('uno solo');
                // parseo2 =  JSON.parse(notification.data.message);
                console.log(parseo['loc-key']);

                var mensajes = armoPushNotifyLocalNotif(
                  parseo['title-loc-key'],
                  parseo['loc-key'],
                  parseo['title-loc-args'],
                  parseo['loc-args']
                );
                // mensajes =  armoPushNotifyLocalNotif(notification.data.message['title-loc-key'],notification.data.message['loc-key'],notification.data.message['title-loc-args'],notification.data.message['loc-args']);

                var today = new Date();
                let timeStamp = Date.now();
                console.log('timseStamp:' + timeStamp);

                // si el push es de MARKETING viene sin QRA ni IDACTIVITY
                // if (parseo['title-loc-key']==='PUSH_MARKETING_TITLE')
                // {
                //   envioNotif = {"idqra_notifications":9999,"idqra":442,"idqra_activity":"bodyJson.IDACTIVITY","read":"unread","DATETIME":today.toString(),"message":mensajes.bandejaNotifLocal,
                //   "activity_type":108,"QRA":"","REF_QRA":"LU5FFF","QSO_GUID":"95464deb-5d65-4a80-b5bc-666a3be941b1",
                //   "qra_avatarpic":avatar, "url": bodyJson.URL,
                //   "qso_mode":null,"qso_band":null,"qso_type":null}

                // }else{
                envioNotif = {
                  idqra_notifications: 9999,
                  idqra: 442,
                  // idqra_activity: bodyJson.IDACTIVITY,
                  idqra_activity: timeStamp,
                  read: 'unread',
                  DATETIME: today.toString(),
                  message: mensajes.bandejaNotifLocal,
                  activity_type: mensajes.activityType,
                  QRA: bodyJson.QRA,
                  REF_QRA: 'LU5FFF',
                  QSO_GUID: mensajes.QsoGuid,
                  qra_avatarpic: avatar,
                  url: bodyJson.URL,
                  qso_mode: null,
                  qso_band: null,
                  qso_type: null
                };
                // }

                this.props.manage_notifications('ADDONE', envioNotif, '');

                // si el push es de Aprobacion de usuario actualizo GetUserInfo
                // asi ya lo deja publicar, dar like y comentar.
                if (parseo['title-loc-key'] === 'PUSH_APPROVE_USER_TITLE') {
                  console.log('actualizo getUserInfo Usuario Aprobado');
                  // actualizo en userInfo en redux que el usuario esta validado
                  this.props.setPendingVerification(0);
                }

                if (
                  notification.userInteraction === false &&
                  !notification.foreground
                ) {
                  // genero la notificaion local porque la libreria no lo hace para Android
                  PushNotification.localNotification({
                    //     id: notification.id,
                    userInfo: { id: notification.id, url: bodyJson.URL },
                    // title: notification.data['pinpoint.notification.title'],
                    // message: notification.data['pinpoint.notification.body'],
                    title: mensajes.pushTitle,
                    message: mensajes.pushMessage,
                    priority: 'max',
                    autoCancel: true

                    // playSound: true, // (optional) default: true
                    // soundName: "default",
                    // title: 'Notification with my name',
                    // message: notification['name'], // (required)
                    // date: new Date(Date.now()) // in 60 secs
                  });
                  // PushNotification.setApplicationIconBadgeNumber(25);
                }

                // solo avisa en foreground cuando alguien loguea al usuario en un QSO o LISTEN que son los mas
                // importante ya que puede saberlo en REAL TIME y agradecer por RADIO durante ese mismo QSO!
                // no mostramos las otras notificaciones porque puede joder la UX del usuario al usar la APP.
                // las demas notif las vera en su bandeja de notificaciones obvio si esta en background llegan el 100%
                // de las notificaciones push.

                if (
                  notification.foreground &&
                  (parseo['title-loc-key'] === 'PUSH_TAGYOUNEWPOSTANY_TITLE' ||
                    parseo['title-loc-key'] ===
                      'PUSH_INCLUDEDYOUWORKEDQSO_TITLE' ||
                    parseo['title-loc-key'] === 'PUSH_LISTENEDYOUQSO_TITLE')
                ) {
                  Alert.alert(
                    //title
                    I18n.t('SOMEONE_INCLUDED_YOU') + ' 🚀',
                    //body
                    // notification.data['pinpoint.notification.title'] +': '+notification.data['pinpoint.notification.body'] +' ➡ See more details on Notifications 🔔',
                    mensajes.bandejaNotifLocal +
                      ' ➡ ' +
                      I18n.t('SEEMOREDETAILSON_NOTIFICATIONS') +
                      ' 🔔',

                    [
                      { text: 'CLOSE', onPress: () => console.log('CLOSE') }
                      // {text: 'Watch this on the Notifications screen :)', onPress: () => console.log('CLOSE')}
                    ],
                    { cancelable: false }
                    //clicking out side of alert will not cancel
                  );
                }
              } // Fin Id de si no es userInteraction

              // es por hizo click en la notificacion
              if (notification.userInteraction) {
                console.log('user interaction es true!');
                //  this.props.manage_notifications('ADDONE',envioNotif);
                //  this.props.navigation.navigate("Notifications");
                console.log(notification.userInfo.url);
                // var urlAux =
                //   notification.userInfo.url +
                //   '?embedded=true&date=' +
                //   new Date();
                // this.props.setWebView(webViewUserSession, urlAux);
                // esto estaba
                this.props.navigation.navigate('Home', {});
              }
            } catch (error) {
              console.log('error #010');
              console.log(error);
              //  kinesis_catch('#010',error,this.props.qra);
              // Error retrieving data
            }
          }

          if (Platform.OS === 'ios') {
            try {
              console.log('paso por IOS');

              let bodyJson = notification.alert.Data;

              // console.log("antes de armar el json envioNotif")

              if (bodyJson.AVATAR) avatar = bodyJson.AVATAR;
              else avatar = null;
              console.log(
                'ios title-loc-key : ' + notification.alert['title-loc-key']
              );

              mensajes = armoPushNotifyLocalNotif(
                notification.alert['title-loc-key'],
                notification.alert['loc-key'],
                notification.alert['title-loc-args'],
                notification.alert['loc-args']
              );
              today = new Date();
              let timeStamp = Date.now();
              console.log('timseStamp:' + timeStamp);

              // si el push es de MARKETING viene sin QRA ni IDACTIVITY
              // if (notification.alert['title-loc-key']==='PUSH_MARKETING_TITLE')
              // {
              //   envioNotif = {"idqra_notifications":9999,"idqra":442,"idqra_activity":"bodyJson.IDACTIVITY","read":"unread","DATETIME":today.toString(),"message":mensajes.bandejaNotifLocal,
              //   "activity_type":108,"QRA":"","REF_QRA":"LU5FFF","QSO_GUID":"95464deb-5d65-4a80-b5bc-666a3be941b1",
              //   "qra_avatarpic":avatar, "url": notification.alert.Url,
              //   "qso_mode":null,"qso_band":null,"qso_type":null}

              // }else{

              envioNotif = {
                idqra_notifications: 9999,
                idqra: 442,
                // idqra_activity: bodyJson.IDACTIVITY,
                idqra_activity: timeStamp,
                read: 'unread',
                DATETIME: today.toString(),
                message: mensajes.bandejaNotifLocal,
                activity_type: mensajes.activityType,
                QRA: bodyJson.QRA,
                REF_QRA: 'LU5FFF',
                QSO_GUID: mensajes.QsoGuid,
                qra_avatarpic: avatar,
                url: notification.alert.Url,
                qso_mode: null,
                qso_band: null,
                qso_type: null
              };
              // };
              // }

              // si la notificaion llega y la APP esta en foreground, la libreria esta para iOS no
              // genera la notificacion Local de push entonces creo un Alert. (en Android llega el push pero igual
              // hago lo mismo para unificar la user Experience
              // solo avisa en foreground cuando alguien loguea al usuario en un QSO o LISTEN que son los mas
              // importante ya que puede saberlo en REAL TIME y agradecer por RADIO durante ese mismo QSO!
              // no mostramos las otras notificaciones porque puede joder la UX del usuario al usar la APP.
              // las demas notif las vera en su bandeja de notificaciones obvio si esta en background llegan el 100%
              // de las notificaciones push.
              //  if (notification.foreground &&
              //   ((notification.alert.title.indexOf("included you") !== -1)  || (notification.alert.title.indexOf("listened you") !== -1)) )
              if (
                notification.foreground &&
                (notification.alert['title-loc-key'] ===
                  'PUSH_TAGYOUNEWPOSTANY_TITLE' ||
                  notification.alert['title-loc-key'] ===
                    'PUSH_INCLUDEDYOUWORKEDQSO_TITLE' ||
                  notification.alert['title-loc-key'] ===
                    'PUSH_LISTENEDYOUQSO_TITLE')
              ) {
                Alert.alert(
                  //title
                  I18n.t('SOMEONE_INCLUDED_YOU') + ' 🚀',
                  //body
                  // notification.data['pinpoint.notification.title'] +': '+notification.data['pinpoint.notification.body'] +' ➡ See more details on Notifications 🔔',
                  mensajes.bandejaNotifLocal +
                    ' ➡ ' +
                    I18n.t('SEEMOREDETAILSON_NOTIFICATIONS') +
                    ' 🔔',

                  [
                    {
                      text: I18n.t('SOMEONE_CLOSE'),
                      onPress: () => console.log('CLOSE')
                    }
                    // {text: 'Watch this on the Notifications screen :)', onPress: () => console.log('CLOSE')}
                  ],
                  { cancelable: false }
                  //clicking out side of alert will not cancel
                );
              }

              this.props.manage_notifications('ADDONE', envioNotif, '');
              // si el push es de Aprobacion de usuario actualizo GetUserInfo
              // asi ya lo deja publicar, dar like y comentar.
              if (
                notification.alert['title-loc-key'] ===
                'PUSH_APPROVE_USER_TITLE'
              ) {
                console.log('actualizo getUserInfo Usuario Aprobado');
                // actualizo en userInfo en redux que el usuario esta validado
                this.props.setPendingVerification(0);
              }

              // si viene de background lo lleva directo al notification tray
              // pero si esta foreground no le cambia la screen para respetar lo que el usuario
              // este haciendo
              if (!notification.foreground)
                this.props.navigation.navigate('Notifications');
            } catch (error) {
              console.log('error #011');
              console.log(error);
              // kinesis_catch('#011',error,this.props.qra);
              // Error retrieving data
            }

            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }
        }
      }

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      // senderID: "750953848595",

      // permissions: {
      //   alert: true,
      //   badge: true,
      //   sound: true
      // },

      // popInitialNotification: true,
      // requestPermissions: true,
    });

    // console.log('COMPONENT did mount LOGINFORM');

    // if (await hasAPIConnection2()) {
    // console.log('SI hay internet: ');

    console.log('llama ApiCheckVersion');
    this.props.apiCheckVersion();

    // var userLogin0 = await AsyncStorage.getItem('userlogin');
    // if (userLogin0 === null) {
    //   this.debeHacerUpgrade = true; // lo hago salir del proceso de singIn para hacer un signout forzado y pedirle user y pass de nuevo
    //   this.userYpassnull = true;
    // }

    //    purchaseUpdateSubscription = purchaseUpdatedListener(async(purchase) => {

    //     console.log('purchaseUpdatedListener de LoginForm');
    //     console.log(purchase);

    //     // aca tengo que llamar a la API backend para validar el receipt y una vez validado
    //     // debo llamar a

    //     if (purchase.purchaseStateAndroid === 1 && !purchase.isAcknowledgedAndroid) {
    //       try {
    //      //   const ackResult = await acknowledgePurchaseAndroid(purchase.purchaseToken);
    //         console.log('entro listener de compra por ANDROID');

    //       //  console.log('ackResult', ackResult);
    //       } catch (ackErr) {
    //         console.warn('ackErr', ackErr);
    //       }
    //     }
    //     if (Platform.OS==='ios')
    //     {

    //       console.log('IAP: llamo confirmReceipt de LoginForm action: '+purchase.transactionId);
    //      // console.log('flag que recien compro: '+this.props.presspurchaseputton);

    //       this.props.confirmReceiptiOS(this.props.qra,purchase.originalTransactionIdentifierIOS,purchase.transactionReceipt,purchase.transactionId,this.props.env,'buy');
    //    //   this.props.confirmReceipt();
    //     //  RNIap.finishTransactionIOS(purchase.transactionId);

    //     }
    //  //   this.setState({ receipt: purchase.transactionReceipt }, () => this.goNext());
    //   });

    //   purchaseErrorSubscription = purchaseErrorListener((error) => {
    //     console.log('purchaseErrorListener LoginForm', error);
    //    // this.props.manageLocationPermissions("iapshowed",0);
    //     // Alert.alert('purchase error', JSON.stringify(error));
    //   });

    // para capturar eventos de Purchases no confirmadas de AppleStore
    try {
      const result = await RNIap.initConnection();
      // busco codigos de subscripcion para iOS para enviarlos a REDUX
      // yq ue ya esten disponibles

      const products = await RNIap.getSubscriptions(itemSubs);
      // console.log('loginform GetSubscriptions');
      // console.log(products);

      var localizedPrice = '';
      if (Platform.OS === 'android')
        localizedPrice =
          products[0].localizedPrice + ' ' + products[0].currency;
      else localizedPrice = products[0].localizedPrice;
      // console.log(
      //   'busco codigos de subscripciones loginform:' +
      //     products[0].localizedPrice
      // );
      this.props.setSubscriptionInfo(products[0].productId, localizedPrice);

      //  este debe estar ultimo porque si no hay compras sale por CATCH y necesito
      // que se ejecute lo de arriba antes
      // await RNIap.consumeAllItemsAndroid();
      // console.log('result', result);
    } catch (err) {
      console.log('salio catch initConnection loginform');
      console.warn(err.code, err.message);
      crashlytics().setUserId('unknown');
      crashlytics().log('error: ' + JSON.stringify(err));
      if (__DEV__) crashlytics().recordError(new Error('RNIap.initConn_DEV'));
      else crashlytics().recordError(new Error('RNIap.initConn_PRD'));
    }

    // si debe hacer upgrade no deja entrar aca
    if (this.debeHacerUpgrade === false) {
      // if (1===1) {
      // Compruebo si ya estaba logueado con sus credenciales
      try {
        // console.log('Antes de Auth.currentSession() ');
        this.setState({ mess: I18n.t('currentSession') });
        var session = await Auth.currentSession();

        //  session = await Auth.currentAuthenticatedUser();
        // console.log('Su token DID MOUNT es: ' + session.idToken.jwtToken);
        await this.props.setToken(session.idToken.jwtToken);
        //console.log("currentAuthenticatedUser:"+ JSON.stringify(session));
        // session2 = await Auth.currentUserCredentials();
        // console.log('currentUserCredentials:'+JSON.stringify(session2));
        // await this.props.setWebView(JSON.stringify(session),'http://192.168.0.9:3000')

        // var userLogin = await AsyncStorage.getItem('userlogin');
        // console.log('userlogin:' + userLogin);
        // var userPwd = await AsyncStorage.getItem('userpwd');
        // console.log('userpass:' + userPwd);

        // if (userLogin === null || userPwd === null) {
        //   // mando a crashlutics q hay un usuario que le dio null el user/pass
        //   const value = await AsyncStorage.getItem('username');
        //   crashlytics().setUserId(value);
        //   crashlytics().log('error: userlogin o userpwd da null');
        //   if (__DEV__)
        //     crashlytics().recordError(new Error('userlogin_null_DEV'));
        //   else crashlytics().recordError(new Error('userlogin_null_PRD'));
        // }

        // webViewUserSession = { userlogin: userLogin, userpwd: userPwd };
        // console.log('killedURL:'+ this.webviewurlfromKilledPush)
        // if (this.webviewurlfromKilledPush!==''){
        //    await this.props.setWebView(webViewUserSession,this.webviewurlfromKilledPush)
        //   //  this.webviewurlfromKilledPush = '';
        //    }   else

        // await this.props.setWebView(webViewUserSession,global_config.urlWeb)
        // await this.props.setWebView(
        //   webViewUserSession,
        //   global_config.urlWeb + '?embedded=true'
        // );

        // console.log('Antes d Auth.currentCredentials() ');
        // const { identityId } = await Auth.currentCredentials();
        // console.log('la credencial es:' + identityId);
        // var res = identityId.replace(":", "%3A");
        // console.log('la credencial RES:' + res);
        console.log('Antes d Auth.currentCredentials() getItem ');
        this.setState({ mess: I18n.t('loading') });
        const res = await AsyncStorage.getItem('identity');
        console.log('identityID: ' + res);

        // this.props.setUrlRdsS3('https://s3.amazonaws.com/sqso/protected/'+res+'/');
        //  this.props.setUrlRdsS3(res,'https://d3gbqmcrekpw4.cloudfront.net/protected/'+res+'/');
        //   this.props.setUrlRdsS3(res,'https://d1v72vqgluf2qt.cloudfront.net/protected/'+res+'/');

        // this.props.setUrlRdsS3(res,'https://d1dwfud4bi54v7.cloudfront.net/1/'+res+'/');
        this.props.setUrlRdsS3(res, global_config.s3Cloudfront + res + '/');

        // busco en sotrage local porque la session esta activa pero la sesion no me dice el username
        // entonces busco el username ultimo logueado del storage local y se lo seteo a QRA del store
        try {
          var pushtoken = await AsyncStorage.getItem('pushtoken');
          console.log('mat2 el pushtoken del asyncStorage es:' + pushtoken);
          console.log('mat2 el pushtoken del store es:' + this.props.pushtoken);

          //apologize
          // if (pushtoken===null) // Si no encuentra pushToken guardado debe reinstalar la APP
          if (1 === 2)
            this.setState({ stopApp: true, pushTokenNotFound: true });
          else {
            console.log('Antes de AsyncStorage.getItem');
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
              // We have data!!
              console.log(
                'PASO por AUTENTICACION y trajo del LOCAL STORAGE: ' + value
              );
              // seteo el usuario logueado en store
              this.props.setQra(value);
              //Si ya estaba logueado lo envio a la pantalla inicial
              console.log('Tiene credenciales LoginForm, ya estaba logueado!!');

              console.log(
                'si el resultado de getUserInfo da OK entonces por medio de getDerivedStateFromProps va havia pantalla principal'
              );
              console.log(
                'esto se maneja asi debido a que si el ancho de banda del usuario es bajo, no deja pasar a la pantalla principal a menos que este userInfo ejecutada'
              );

              this.props.getUserInfo(session.idToken.jwtToken);

              // this.props.followersAlreadyCalled(true);
              // this.props.navigation.navigate("AppNavigator2");
              // this.setState({showloginForm: true});
            }

            var qratoken = await AsyncStorage.getItem('qratoken');
            console.log('AsyncStorage qratoken: ' + qratoken);

            // chequeo si el username logueado que esta en value, esta en qratoken del async, si no
            if (qratoken !== value) {
              // console.log(
              //   'envio pushtoken a RDS porque por alguna razon no esta actualizado'
              // );
              this.props.postPushToken(
                pushtoken,
                value,
                Platform.OS,
                session.idToken.jwtToken
              );
            }
          } //apologize
        } catch (error) {
          // console.log('Error AsyncStorage.getItem(username)', error);
          this.setState({ showloginForm: true });

          crashlytics().setUserId('unknown');
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('AsyncStorage.get_DEV'));
          else crashlytics().recordError(new Error('AsyncStorage.get_PRD'));

          // kinesis_catch('#008',error,value);
          // Error retrieving data
        }
      } catch (e) {
        console.log('No tiene credenciales LoginForm', e);
        this.setState({ showloginForm: true });
        //   kinesis_catch('#009',e,value);
        var pushtoken = await AsyncStorage.getItem('pushtoken');
        // var qraTokenVerif = await AsyncStorage.getItem('qratoken');

        if (pushtoken === null) {
          // console.log('no tiene credenciales y nunca obtuvo pushtoken');
        } else {
          // encontro un token y como no hay usuario asignado a ese token, debe ser
          // blanqueado en RDS por las dudas que no haya sifo blanqueado en el signout
          // y no siga enviando PUSH a este equipo.
          // console.log('no tiene credenciales y tiene pushtoken');
          // console.log(pushtoken);
          // console.log('qratoken:' + qraTokenVerif);
          // if (qraTokenVerif !== '')
          // console.log(
          //   'el qratoken es distinot de vacio, deberia blanquear el pushtoken del RDS'
          // );
        }
        // Handle exceptions
      }
    } // if de debeHacerUpgrade o fuerzo signout porque necesito que haga login para tener user y pas para webview
    // else {
    //   // if (this.userYpassnull) {
    //   //   // console.log(
    //   //   //   'Fuerzo a q se loguee para que pueda pasar los datos a webview'
    //   //   // );
    //   //   this.userYpassnull = false;
    //   //   this.setState({ showloginForm: true });
    //   // }
    // }
    // } else {
    //   // console.log('lo siento no hay Internet');
    //   this.setState({ nointernet: true });
    // }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  closeVariosModales = () => {
    this.setState({ nointernet: false });
    this.componentDidMount();
  };
  backAction = () => {
    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    } else {
      Alert.alert(
        I18n.t('BACKBUTTONANDROIDTITLE'),
        I18n.t('BACKBUTTONANDROID'),
        [
          {
            text: I18n.t('BACKBUTTONANDROIDCANCEL'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: I18n.t('BACKBUTTONANDROIDEXIT'),
            onPress: () => BackHandler.exitApp()
          }
        ],
        {
          cancelable: false
        }
      );
      return true;
    }
  };
  closeWelcom = () => {
    this.props.welcomeUserFirstTime(false);
  };

  signIn = async () => {
    Keyboard.dismiss();
    this.setState({ indicator: 1, loginerror: 0 });

    //if(this.internet){
    if (await hasAPIConnection()) {
      //this.setState({indicator: 1, loginerror: 0});
      this.state.username = this.state.username.trim();
      console.log(
        'username: ' +
          this.state.username.toLowerCase() +
          'password: ' +
          this.state.password
      );

      // Validacion previa al llamado de LOGIN
      if (this.state.username.length === 0) {
        this.setState({
          loginerror: 1,
          indicator: 0,
          loginerrorMessage: I18n.t('loginerrorMessUserEmpty')
        });
        this.usernotfound = true;
      } else {
        console.log('signIn');
        await Auth.signIn(
          this.state.username.toLowerCase(),
          this.state.password
        )
          .then((result) => {
            console.log('entro!');
            console.log(result);
            console.log('challenge: ' + result.challengeName);

            // si viene con new password required freno la app porque no tengo desarrollado el cambio
            // de password en mobil, lo mando a la web a cambiar password porque sino cognito no genera token
            // para poder llamar a APIS y demas cosas.
            if (result.challengeName === 'NEW_PASSWORD_REQUIRED')
              this.setState({ forceChangePassword: true, stopApp: true });
            // si no se necesita que cambie la pass entonces guardo user y pass para que se pueda
            // enviar luego a la webview
            // else {
            // await AsyncStorage.setItem('userlogin', this.state.username.toLowerCase());
            // await AsyncStorage.setItem('userpwd', this.state.password);
            // // userLogin = await AsyncStorage.getItem('userlogin');
            // // userPwd = await AsyncStorage.getItem('userpwd');
            // webViewUserSession = {"userlogin": this.state.username.toLowerCase(), "userpwd": this.state.password}
            // await this.props.setWebView(webViewUserSession,'https://test.dd39wvlkuxk5j.amplifyapp.com/')
            // }
            console.log(
              result.signInUserSession.idToken.payload['custom:callsign']
            );
            console.log(result.signInUserSession.idToken.jwtToken);
            this.qra =
              result.signInUserSession.idToken.payload['custom:callsign'];
            this.jwtToken = result.signInUserSession.idToken.jwtToken;
            //    console.log(result);
            this.usernotfound = false;
          })
          .catch((err) => {
            console.log('error:', err.code);
            console.log(err);

            if (err.code === 'UserNotConfirmedException') {
              // this.setState({confirmSignup: true})
              Auth.resendSignUp(this.state.username.toLowerCase())
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
                .catch((err2) => {
                  console.log(
                    'Error sending the confirmation code, try again.',
                    err2
                  );
                  this.setState({
                    errormessage2:
                      'Error sending the confirmation code, try again.',
                    color: 'red',
                    heightindicator: 0,
                    indicator: 0,
                    confirmationcodeError: 1
                  });
                  // kinesis_catch('#021',err,this.state.username.toUpperCase());
                  crashlytics().setUserId(this.state.username.toLowerCase());
                  crashlytics().log('error: ' + JSON.stringify(err));
                  if (__DEV__)
                    crashlytics().recordError(
                      new Error('Auth.resendSignUp_DEV')
                    );
                  else
                    crashlytics().recordError(
                      new Error('Auth.resendSignUp_PRD')
                    );
                });
              this.setState({
                loginerror: 0,
                indicator: 0,
                confirmSignup: true
              });
              this.usernotfound = true;
            } else {
              if (err.message === 'User is disabled.')
                var errmess = I18n.t('loginerrorUserDisabled');
              else errmess = I18n.t('loginerrorMessUserNotFound');

              this.setState({
                loginerror: 1,
                indicator: 0,
                loginerrorMessage: errmess
              });
              this.usernotfound = true;

              crashlytics().setUserId(this.state.username.toUpperCase());
              crashlytics().log('error: ' + JSON.stringify(err));
              if (__DEV__)
                crashlytics().recordError(new Error('Auth.signIn_DEV'));
              else crashlytics().recordError(new Error('Auth.signIn_PRD'));
              //  kinesis_catch('#012',err,this.state.username.toUpperCase());
            }
          });
      }
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

          //   this.props.getUserInfo();
          console.log('la credencial RES:' + res);
        } catch (error) {
          console.log('caught error', error);
          crashlytics().setUserId(this.qra);
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('Auth.signIn.current_DEV'));
          else crashlytics().recordError(new Error('Auth.signIn.current_PRD'));

          // kinesis_catch('#013',e,this.state.username.toUpperCase());
          // Handle exceptions
        }
        //  var session = await Auth.currentSession();
        //  console.log("PASO POR SIGNIN token: " + session.idToken.jwtToken);
        await this.props.setToken(this.jwtToken);
        // session = await Auth.currentSession();
        //  session = await Auth.currentUserCredentials();
        //  console.log('currentUserCredentials:'+JSON.stringify(session));
        //  await this.props.setWebView(JSON.stringify(session),'https://test.dd39wvlkuxk5j.amplifyapp.com/')  http://192.168.0.9:3000

        // await AsyncStorage.setItem(
        //   'userlogin',
        //   this.state.username.toLowerCase()
        // );
        // await AsyncStorage.setItem('userpwd', this.state.password);

        // webViewUserSession = {
        //   userlogin: this.state.username.toLowerCase(),
        //   userpwd: this.state.password
        // };
        // // await this.props.setWebView(webViewUserSession,global_config.urlWeb)
        // await this.props.setWebView(
        //   webViewUserSession,
        //   global_config.urlWeb + '?embedded=true'
        // );

        // userLogin = await AsyncStorage.getItem('userlogin');
        // userPwd = await AsyncStorage.getItem('userpwd');
        // webViewUserSession = {"userlogin": userLogin, "userpwd": userPwd}
        // await this.props.setWebView(webViewUserSession,'http://192.168.0.9:3000')

        //  session = await Auth.currentAuthenticatedUser();
        // console.log("PASO POR SIGNIN token: " + session.signInUserSession.idToken.jwtToken);

        console.log('antes de getInfo');
        this.props.getUserInfo(this.jwtToken);
        //this.props.followersAlreadyCalled(true);

        // seteo el usuario logueado en store
        this.props.setQra(this.qra.toUpperCase());
        // guardo en local storage el username
        try {
          await AsyncStorage.setItem('username', this.qra.toUpperCase());
          await AsyncStorage.setItem('identity', res);
        } catch (error) {
          // Error saving data
          console.log('caught error AsyncStorage username & identity', error);
          crashlytics().setUserId(this.qra.toUpperCase());
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('AsyncStorage.user_DEV'));
          else crashlytics().recordError(new Error('AsyncStorage.user_PRD'));
          // kinesis_catch('#014',error,this.state.username.toUpperCase());
        }

        // try {

        //   var pushtoken = await AsyncStorage.getItem('pushtoken');
        //   this.pushTokenFound = true;
        // } catch (error) {
        //   // Error saving data
        //   console.log('caught error getItem pushtoken', error);
        //   kinesis_catch('#018',error,this.state.username.toUpperCase());
        //   // Como no encontro el pushtoken quiere decir que enunca fue guardado el pushToken en la APP
        //   // procedo a guardarlo y el Qra del Token lo grabo vacio para que llame a la API de PushToken
        //   // y registre en backend

        //       try {
        //         await AsyncStorage.setItem('pushtoken', this.props.pushtoken);
        //         await AsyncStorage.setItem('qratoken', 'empty');
        //         console.log("mat llama API pushToken por fallar var pushtoken = await AsyncStorage.getItem('pushtoken'); + token:"+this.props.pushtoken + "QRA:"+this.state.username.toUpperCase());
        //         this.props.postPushToken(this.props.pushtoken,this.state.username.toUpperCase(),Platform.OS,session.idToken.jwtToken);
        //         console.log('grabo pushtoken en AsyncStorage por primera vez '+Platform.OS);
        //         // llamo api de registracion de token en backend y si es exitosa me va a guardar el QRA en
        //         // asyncStorage "qratoken" con la actualizacion de qratoken luego puedo darme cuenta
        //         // si el token para ese QRA ya fue enviado y no enviarlo de mas.

        //       } catch (error) {
        //         console.log('caught error setItem pushToken & Qra', error);
        //         kinesis_catch('#015',error,this.state.username.toUpperCase());
        //       }

        // }

        // if (this.pushTokenFound)
        //      { // ahora chequea si el token guadado corresponde al mismo QRA que se acaba de loguear
        try {
          var pushtoken = await AsyncStorage.getItem('pushtoken');
          var qraToken = await AsyncStorage.getItem('qratoken');
          console.log('despue de getitem qratoken :' + qraToken);
          // this.pushTokenFound = false;
          // if (qraToken!==this.state.username.toUpperCase() || pushtoken!==this.props.pushtoken)
          if (qraToken !== this.qra.toUpperCase()) {
            // llamo api de registracion de backend con el correspondiente QRA, esto quiere decir que
            // el usuario anterior que genero el PushToken se deslogueo y entro con otro usuario
            // entonces el backend debe ser informado que el nuevo QRA de este token es otro o
            // puedo haber pasado que cambio el psuhToken por alguna Razon entonces tambien se debe informar lo mismo
            // al backend con los mismos datos
            try {
              // await AsyncStorage.setItem('pushtoken', this.props.pushtoken);
              //  await AsyncStorage.setItem('qratoken', 'empty');
              // await AsyncStorage.setItem('qratoken', this.state.username.toUpperCase());
              console.log(
                'mat llama a API pushToken si encuentra el Token, pushToken:' +
                  this.props.pushtoken +
                  'QRA:' +
                  this.qra.toUpperCase()
              );
              console.log('mat cambio');
              // this.props.postPushToken(this.props.pushtoken,this.state.username.toUpperCase(),Platform.OS,session.idToken.jwtToken);

              this.props.postPushToken(
                pushtoken,
                this.qra.toUpperCase(),
                Platform.OS,
                this.jwtToken
              );

              console.log(
                'grabo pushtoken en AsyncStorage porque cambio el token o el usuario logueado y llama API de backend ' +
                  Platform.OS
              );
            } catch (error) {
              console.log(
                'caught error setItem pushtoken y qratoken dentro de if (this.pushTokenFound)',
                error
              );
              // kinesis_catch('#016',error,this.state.username.toUpperCase());
              crashlytics().setUserId(this.qra.toUpperCase());
              crashlytics().log('error: ' + JSON.stringify(error));
              if (__DEV__)
                crashlytics().recordError(new Error('props.postPushTok_DEV'));
              else
                crashlytics().recordError(new Error('props.postPushTok_PRD'));
            }
          } else
            console.log('El PushToken ya fue enviado al backend para este QRA');
        } catch (error) {
          //   console.log('primera vez que se loguea por eso no encuentra el qratoken en asyncstorage', error);
          // aviso a rds para que asocie el pushToken con el QRA logueado

          //     this.props.postPushToken(pushtoken,this.state.username.toUpperCase(),Platform.OS,session.idToken.jwtToken);

          // try {
          //   await AsyncStorage.setItem('qratoken', this.state.username.toUpperCase());
          // }
          // catch (err){

          // }
          crashlytics().setUserId(this.qra.toUpperCase());
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) crashlytics().recordError(new Error('twoGetItems_DEV'));
          else crashlytics().recordError(new Error('twoGetItems_PRD'));
          // kinesis_catch('#017',error,this.state.username.toUpperCase());
        }

        //  }

        this.setState({ indicator: 0 });
        //this.props.navigation.navigate("AppNavigator2");

        // const resetAction = StackActions.reset({
        //   index: 0,
        //   actions: [
        //     NavigationActions.navigate({
        //       routeName: 'Home',
        //       params: { foo: 'bar' }
        //     })
        //   ]
        // });

        // The navigateToScreen2 action is dispatched and new navigation state will be calculated in basicNavigationReducer here ---> https://gist.github.com/shubhnik/b55602633aaeb5919f6f3c15552d1802
        this.props.navigation.push('Home');
      }
      // this.setState({indicator: 0});
      // Keyboard.dismiss();

      // }
    } else {
      this.setState({ indicator: 0 });
      this.setState({ nointernet: true });
    }
  };

  SignUpForm = async () => {
    if (await hasAPIConnection())
      this.props.navigation.navigate('SignUpScreen');
    else {
      this.setState({ indicator: 0 });
      this.setState({ nointernet: true });
    }
  };

  close_confirmSignup = () => {
    this.setState({ confirmSignup: false });
  };

  resendCode = async () => {
    Keyboard.dismiss();
    if (await hasAPIConnection()) {
      this.setState({ indicator: 1, confirmationcodeError: 0 });

      await Auth.resendSignUp(this.state.username.toLowerCase())
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
            errormessage2: 'Error sending the confirmation code, try again.',
            color: 'red',
            heightindicator: 0,
            indicator: 0,
            confirmationcodeError: 1
          });
          // kinesis_catch('#021',err,this.state.username.toUpperCase());
          crashlytics().setUserId(this.state.username.toLowerCase());
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

  confirmSignup = async () => {
    Keyboard.dismiss();

    if (await hasAPIConnection()) {
      this.setState({
        confirmationcodeError: 0,
        heightindicator: 35,
        indicator: 1,
        buttonsEnabled: true
      });
      Auth.signIn(this.state.username.toLowerCase(), this.state.password)
        //   Auth.confirmSignUp(this.state.qra.toUpperCase(),this.state.confirmationcode)
        // Auth.confirmSignUp(this.state.username.toLowerCase(), confirmationCode)
        .then(() => {
          console.log('SignUp confirmed ok!: ');
          this.close_confirmSignup();
          this.setState({
            confirmationcodeError: 0,
            indicator: 0,
            buttonsEnabled: false
          });

          // this.signInAfterConfirmed();
          this.props.welcomeUserFirstTime(true);
          this.signIn();
          // this.props.welcomeUserFirstTime(true);
          // this.props.navigation.navigate('Home');

          // setTimeout(() => {
          //   // se hace tiempo porque ios necesita bajar el modal anterior antes
          //   this.props.welcomeUserFirstTime(true);
          // }, 200);

          //  this.signIn(); no hago el SignIn porque el user esta deshabilitado hasta el envio de la licencia
          //    this.signInAfterConfirmed();
          // this.setState({indicator:0});

          // this.props.navigation.navigate("AppNavigator2");
        })
        .catch((err) => {
          console.log(err);
          console.log('SignUp confirmed error: ', err);
          this.setState({
            errormessage2: I18n.t('signupValConfirmationFailed'),
            color: 'red',
            confirmationcodeError: 1,
            indicator: 0,
            buttonsEnabled: false
          });
          //  kinesis_catch('#026',err,this.state.username.toUpperCase());
          crashlytics().setUserId(this.state.username.toLowerCase());
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

  ForgotPassword = async () => {
    if (await hasAPIConnection())
      this.props.navigation.navigate('ForgotScreen');
    else {
      this.setState({ indicator: 0 });
      this.setState({ nointernet: true });
    }
  };

  render() {
    console.log('LoginForm Screen');

    return (
      <View>
        {this.state.showloginForm ? (
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 5,
                marginTop: 15,
                opacity: this.state.indicator
              }}>
              <ActivityIndicator animating={true} size="large" color="white" />
            </View>
            <View
              style={{
                justifyContent: 'space-around',
                padding: 10,
                opacity: this.state.loginerror
              }}>
              <Text style={{ color: '#ff3333', textAlign: 'center' }}>
                {' '}
                {this.state.loginerrorMessage}
              </Text>
            </View>

            <ScrollView>
              {/* <ScrollView style={{width: this.width}}> */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <TextInput
                  placeholder={I18n.t('email')}
                  onFocus={() => this.setState({ loginerror: 0 })}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  keyboardType={
                    Platform.OS === 'android' ? 'visible-password' : 'default'
                  }
                  autoCorrect={false}
                  onSubmitEditing={() => this.passwordRef.focus()}
                  style={styles.input}
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })}
                />

                <TextInput
                  ref={(passwordRef) => (this.passwordRef = passwordRef)}
                  placeholder={I18n.t('password')}
                  onFocus={() => this.setState({ loginerror: 0 })}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="go"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  style={styles.input}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                />

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => this.signIn()}>
                  <Text style={styles.buttonText}>{I18n.t('login')}</Text>
                </TouchableOpacity>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.4, height: 45, alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => this.SignUpForm()}>
                      <Text style={styles.signup}>{I18n.t('signup')}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 0.6, height: 45, alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => this.ForgotPassword()}>
                      <Text style={styles.forgot}>{I18n.t('forgot')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

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
              </View>
            </ScrollView>
            {this.state.nointernet && (
              <VariosModales
                show={this.state.nointernet}
                modalType="nointernet"
                closeInternetModal={this.closeVariosModales.bind()}
              />
            )}
            {/* {this.props.welcomeuserfirsttime && (
              <VariosModales
                show={true}
                modalType="welcomefirsttime"
                closeInternetModal={this.closeWelcom.bind()}
              />
            )} */}
          </View>
        ) : (
          <View style={styles.container}>
            <Text
              style={{
                color: '#8BD8BD',
                textAlign: 'center',
                fontSize: 18,
                marginTop: 30
              }}>
              {' '}
              {this.state.mess}.
            </Text>

            {/* </View> */}

            {/* <Image source={require('../../images/loading.jpg')}  style={{width: 250, height: 160, marginTop: 100  } }  /> */}
            {this.state.nointernet && (
              <VariosModales
                show={this.state.nointernet}
                modalType="nointernet"
                closeInternetModal={this.closeVariosModales.bind()}
              />
            )}
          </View>
        )}

        {this.state.stopApp && (
          <StopApp
            appNeedUpgrade={this.state.appNeedUpgrade}
            pushTokenNotFound={this.state.pushTokenNotFound}
            forceChangePassword={this.state.forceChangePassword}
            upgradeText={this.state.upgradeText}
          />
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

        <Text
          style={{
            color: '#8BD8BD',
            textAlign: 'center',
            fontSize: 17,
            marginTop: 255
          }}>
          v{APP_VERSION}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    // borderWidth: 1,
    borderRadius: 22,
    marginBottom: 18,
    width: 280,
    color: '#FFF',
    fontSize: 18,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    //   backgroundColor: '#2980b9',
    // backgroundColor: '#696969',
    backgroundColor: '#8BD8BD',
    paddingVertical: 15,
    borderRadius: 22,
    width: 280
  },
  buttonText: {
    textAlign: 'center',
    // color: '#FFFFFF',
    color: '#243665',
    fontSize: 16,
    fontWeight: '700'
  },
  buttonText2: {
    //     textAlign: 'center',
    color: '#FFFFFF',

    fontSize: 16
    // fontWeight: '700'
  },
  signup: {
    //     textAlign: 'center',
    color: '#FFFFFF',

    fontSize: 16
    // fontWeight: '700'
  },
  forgot: {
    //     textAlign: 'center',
    color: '#FFFFFF',

    fontSize: 16

    // fontWeight: '700'
  },
  activityindicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  title2: {
    fontSize: 22,
    color: '#FFF',
    marginTop: 100,
    //  width: 100,
    textAlign: 'center',
    opacity: 0.7
  }
});

const mapStateToProps = (state) => {
  return {
    pushtoken: state.sqso.pushToken,
    qra: state.sqso.qra,
    userInfoApiSuccesStatus: state.sqso.userInfoApiSuccesStatus,
    env: state.sqso.env,
    welcomeuserfirsttime: state.sqso.welcomeUserFirstTime,
    mustupgradeapp: state.sqso.mustUpgradeApp
  };
};

const mapDispatchToProps = {
  setQra,
  setUrlRdsS3,
  resetQso,
  followersAlreadyCalled,
  newqsoactiveFalse,
  setToken,
  managePushToken,
  postPushToken,
  getUserInfo,
  get_notifications,
  fetchQraProfileUrl,
  manage_notifications,
  confirmReceiptiOS,
  setSubscriptionInfo,
  manageLocationPermissions,
  welcomeUserFirstTime,
  // setWebView,
  apiCheckVersion,
  setPendingVerification
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
