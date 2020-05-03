import React, { Component } from 'react';
import { Text, Image, View, Button, StyleSheet, TextInput, TouchableOpacity, Keyboard,
     ActivityIndicator, KeyboardAvoidingView , Modal, ScrollView, Dimensions, 
     Platform, Alert} from 'react-native';
import { connect } from 'react-redux';
//import Amplify, { Auth, API, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import Amplify from 'aws-amplify';
import AmplifyAuthStorage from '../../AsyncStorage';
import { setQra, setUrlRdsS3, resetQso, followersAlreadyCalled, newqsoactiveFalse, setToken, managePushToken,
  postPushToken, getUserInfo, get_notifications, fetchQraProfileUrl, manage_notifications,
  confirmReceiptiOS, setSubscriptionInfo, manageLocationPermissions} from '../../actions';
//import { NavigationActions, addNavigationHelpers } from 'react-navigation';
//import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
//import {  Permissions } from 'expo';
import { hasAPIConnection, apiVersionCheck } from '../../helper';
import VariosModales from '../Qso/VariosModales';
import ConfirmSignUp from './ConfirmSignUp';
import crashlytics from '@react-native-firebase/crashlytics';
import StopApp from './StopApp';

// nuevo push
//import Analytics from '@aws-amplify/analytics';

// import firebase from '@react-native-firebase/app';
// import * as config from '@react-native-firebase/remote-config';




//  import PushNotification from '@aws-amplify/pushnotification';
 //import { PushNotification } from 'aws-amplify-react-native';
 // import { PushNotificationIOS } from 'react-native';
  import PushNotificationIOS from "@react-native-community/push-notification-ios";

 import RNIap from 'react-native-iap';



 var PushNotification = require('react-native-push-notification');



// PushNotification need to work with Analytics
//Analytics.configure(awsconfig);
//Amplify.configure(awsconfig);
// PushNotification.configure(awsconfig);
//Auth.configure(awsconfig);
// Amplify.configure(awsconfig);
Amplify.configure(awsconfig);
Amplify.configure({storage: AmplifyAuthStorage});

const itemSubs = Platform.select({
  ios: [
    'PremiumMonthly', // dooboolab
  ],
  android: [
    // 'test.sub1', // subscription
    '001'
  ],
});

const actualAppVersion = '1.0.0';

// let purchaseUpdateSubscription;
// let purchaseErrorSubscription;

class LoginForm extends Component {
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
     mess: 'Loading ...',
     stopApp: false,
     pushTokenNotFound: false,
     confirmSignup: false,
     confirmationcodeError: 0,
     color: 'red',
     appNeedUpgrade: false,
     forceChangePassword: false,
     upgradeText: ''
     
    }
  }


  static getDerivedStateFromProps(props, state) {
    // console.log('afuer de getDerivedStateFromProps: '  + props);
    // console.log(props);
    if (props.userInfoApiSuccesStatus) 
        {
           console.log('adentro de getDerivedStateFromProps: '  + props.userInfoApiSuccesStatus);
          props.followersAlreadyCalled(true);
          props.navigation.navigate("AppNavigator2");
        //  this.setState({showloginForm: true});

          return { showloginForm: true };
        }
   // if (!props.qsosFetched) return { active: true };
    return null;
  }



  async componentDidMount() {
   
    // PushNotification.onNotification((notification) => { 
    //   console.log('llego push che!');
    

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
  
        console.log('llego notificacion!');
        console.log(notification);

  
  if (this.props.qra!='') {
    // esto es por si fallo el signout entonces, el qra de redux queda vacio el RDS no se entero 
     // el usuario no est amas logueado y va a seguir recibienod PUSH con el usuario que quedo en RDS (el ultimo antes de hacer signout)
     // entonce si llega un PUSH y no tiene QRA en redux es porque justmanete fallo esa actualizacion en RDS
     // entonces llamo de nuevo al RDS y le asigno VACIO de QRA al token push,luego cuando el el usuario se loguee el RDS se va a actualizar
     // y pasar en nuevo QRA.
     let envioNotif = '';

    
      if (Platform.OS==='android')
      {

        try {
          console.log('paso por ANDROID')
              let body = notification.data['pinpoint.jsonBody'];
            // let body = notification._data['data.pinpoint.jsonBody'];
            
              let bodyJson = JSON.parse(body)
            
              console.log(bodyJson.AVATAR);
              console.log(bodyJson.QRA);
              console.log(bodyJson.IDACTIVITY);
      //        console.log(notification.data['pinpoint.notification.body']);

            // console.log(notification._data['data.pinpoint.notification.body']);
              
        
              envioNotif = {"idqra_notifications":9999,"idqra":442,"idqra_activity":bodyJson.IDACTIVITY,"read":null,"DATETIME":"2018-12-08T15:20:14.000Z","message":notification.data['pinpoint.notification.title'],
              "activity_type":18,"QRA":bodyJson.QRA,"REF_QRA":"LU5FFF","QSO_GUID":"95464deb-5d65-4a80-b5bc-666a3be941b1",
              "qra_avatarpic":bodyJson.AVATAR, "url": bodyJson.URL,
              "qso_mode":null,"qso_band":null,"qso_type":null}

                this.props.manage_notifications('ADDONE',envioNotif);
       } 
        catch (error) {
          console.log('error #010');
          console.log(error);
        //  kinesis_catch('#010',error,this.props.qra);
              // Error retrieving data
       }
  

        if (notification.userInteraction===false && !notification.foreground)
        {
            // genero la notificaion local porque la libreria no lo hace para Android
            PushNotification.localNotification({
              //     id: notification.id,
              userInfo: { id: notification.id },
              title: notification.data['pinpoint.notification.title'],
              message: notification.data['pinpoint.notification.body'],
              priority: "max",
              autoCancel: true,
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
     if(notification.foreground &&
       ((notification.data['pinpoint.notification.title'].indexOf("included you") !== -1) || (notification.data['pinpoint.notification.title'].indexOf("listened you") !== -1)) )
       {

          Alert.alert(
            //title
            'Someone mention you in a Post! 🚀' ,
            //body
            notification.data['pinpoint.notification.title'] +': '+notification.data['pinpoint.notification.body'] +' ➡ See more details on Notifications 🔔',
            
            [
              {text: 'CLOSE', onPress: () => console.log('CLOSE')
            },
              // {text: 'Watch this on the Notifications screen :)', onPress: () => console.log('CLOSE')}
            ],
            { cancelable: false}
            //clicking out side of alert will not cancel
          );
        }

       // es por hizo click en la notificacion
       if (notification.userInteraction)
       {
            //  this.props.manage_notifications('ADDONE',envioNotif);
             this.props.navigation.navigate("Notifications");
             console.log('user interaction es true!')

            }


       
         }


          
     if (Platform.OS==='ios')
     {
  
             try {
            console.log('paso por IOS')
            let bodyJson = notification.data.data.jsonBody;
            
            // let body = notification._data['data.pinpoint.jsonBody'];
  
              // let bodyJson = JSON.parse(body)
            
              console.log(bodyJson.AVATAR);
              console.log(bodyJson.QRA);
              console.log(bodyJson.IDACTIVITY);
              console.log(notification.alert.title);
             console.log( notification.data.data.pinpoint.deeplink);

  
          console.log("antes de armar el json envioNotif")
              // console.log(notification._data.body);
  
            
              // notification.data.data.jsonBody.pinpoint.deeplink
  
              envioNotif = {"idqra_notifications":9999,"idqra":442,"idqra_activity":bodyJson.IDACTIVITY,"read":null,"DATETIME":"2018-12-08T15:20:14.000Z","message":notification.alert.title,
              "activity_type":18,"QRA":bodyJson.QRA,"REF_QRA":"LU5FFF","QSO_GUID":"95464deb-5d65-4a80-b5bc-666a3be941b1",
              "qra_avatarpic":bodyJson.AVATAR, "url": notification.data.data.pinpoint.deeplink,
              "qso_mode":null,"qso_band":null,"qso_type":null}
       
              

       // si la notificaion llega y la APP esta en foreground, la libreria esta para iOS no 
       // genera la notificacion Local de push entonces creo un Alert. (en Android llega el push pero igual 
       // hago lo mismo para unificar la user Experience
      // solo avisa en foreground cuando alguien loguea al usuario en un QSO o LISTEN que son los mas 
      // importante ya que puede saberlo en REAL TIME y agradecer por RADIO durante ese mismo QSO!
      // no mostramos las otras notificaciones porque puede joder la UX del usuario al usar la APP.
      // las demas notif las vera en su bandeja de notificaciones obvio si esta en background llegan el 100% 
      // de las notificaciones push.
           if (notification.foreground && 
            ((notification.alert.title.indexOf("included you") !== -1)  || (notification.alert.title.indexOf("listened you") !== -1)) )  
              Alert.alert(
                //title
                'Someone mention you in a Post! 🚀' ,
                //body
                notification.alert.title +': '+notification.alert.body+' ➡ See more details on Notifications 🔔',
                
                [
                  {text: 'CLOSE', onPress: () => console.log('CLOSE')
                },
                  // {text: 'Watch this on the Notifications screen :)', onPress: () => console.log('CLOSE')}
                ],
                { cancelable: false}
                //clicking out side of alert will not cancel
              );


  
          //    this.llamo_manage_notif();
             this.props.manage_notifications('ADDONE',envioNotif);
             
            // si viene de background lo lleva directo al notification tray
            // pero si esta foreground no le cambia la screen para respetar lo que el usuario
            // este haciendo
            if (!notification.foreground)
                  this.props.navigation.navigate("Notifications");
               
            } 
            catch (error) {
              console.log('error #011');
              console.log(error);
              // kinesis_catch('#011',error,this.props.qra);
                  // Error retrieving data
           }
  
    
         notification.finish(PushNotificationIOS.FetchResult.NoData);
     }

    } 
  
      },
  
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

  
    console.log("COMPONENT did mount LOGINFORM");


  if (await hasAPIConnection())
  {
    console.log('SI hay internet: ');

 

  // chequeo version minima de APP  
  apiCall = await apiVersionCheck();
  console.log('despues de apiVersionCheck: '+apiCall)

  if (apiCall.stop)
   {
    // this.setState({stopApp: true, appNeedUpgrade: true, upgradeText: respuesta.body.message[1].value});
    this.setState({stopApp: true, appNeedUpgrade: true, upgradeText: apiCall.message})
    this.debeHacerUpgrade = true;
            
   }
 
    // fin chequeo de version minima de la APP





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
      console.log('loginform GetSubscriptions');
      console.log(products);
      
      localizedPrice = '' ;
      if (Platform.OS==='android')
        localizedPrice = products[0].localizedPrice + ' '+products[0].currency;
      else
        localizedPrice = products[0].localizedPrice;
      console.log('busco codigos de subscripciones loginform:' + products[0].localizedPrice);
      this.props.setSubscriptionInfo(products[0].productId,localizedPrice)

      //  este debe estar ultimo porque si no hay compras sale por CATCH y necesito
      // que se ejecute lo de arriba antes
      // await RNIap.consumeAllItemsAndroid();
      // console.log('result', result);
      
  

    } catch (err) {
      console.log('salio catch initConnection loginform');
      console.warn(err.code, err.message);
      crashlytics().setUserId('unknown');
      crashlytics().log('error: ' + err) ;
      if(__DEV__)
      crashlytics().recordError(new Error('RNIap.initConn_DEV'));
      else
      crashlytics().recordError(new Error('RNIap.initConn_PRD'));

    }


// si debe hacer upgrade no deja entrar aca 
if (this.debeHacerUpgrade===false)
{
  // Compruebo si ya estaba logueado con sus credenciales
    try {
      console.log('Antes de Auth.currentSession() ');
      this.setState({mess: 'Current Session ...'})
      session = await Auth.currentSession();
      
    
    //  session = await Auth.currentAuthenticatedUser();
      console.log("Su token DID MOUNT es: " + session.idToken.jwtToken);
      await this.props.setToken(session.idToken.jwtToken);
    //console.log("currentAuthenticatedUser:"+ JSON.stringify(session));

     // console.log('Antes d Auth.currentCredentials() ');
      // const { identityId } = await Auth.currentCredentials();
      // console.log('la credencial es:' + identityId);
      // var res = identityId.replace(":", "%3A");
      // console.log('la credencial RES:' + res);
      console.log('Antes d Auth.currentCredentials() getItem ');
      this.setState({mess: 'Loading ...'})
      const res = await AsyncStorage.getItem('identity');
      console.log('identityID: '+res);

      // this.props.setUrlRdsS3('https://s3.amazonaws.com/sqso/protected/'+res+'/');
    //  this.props.setUrlRdsS3(res,'https://d3gbqmcrekpw4.cloudfront.net/protected/'+res+'/');
   //   this.props.setUrlRdsS3(res,'https://d1v72vqgluf2qt.cloudfront.net/protected/'+res+'/');
      this.props.setUrlRdsS3(res,'https://d30o7j00smmz5f.cloudfront.net/1/'+res+'/');

      // busco en sotrage local porque la session esta activa pero la sesion no me dice el username
      // entonces busco el username ultimo logueado del storage local y se lo seteo a QRA del store
      try {

        var pushtoken = await AsyncStorage.getItem('pushtoken');
        console.log('mat2 el pushtoken del asyncStorage es:'+pushtoken);
        console.log('mat2 el pushtoken del store es:'+this.props.pushtoken);

        //apologize
        if (pushtoken===null) // Si no encuentra pushToken guardado debe reinstalar la APP
      // if (1===1)
      this.setState({stopApp: true, pushTokenNotFound: true})
        else
        {
        console.log("Antes de AsyncStorage.getItem");
        const value = await AsyncStorage.getItem('username');
        if (value !== null){
          // We have data!!
          console.log("PASO por AUTENTICACION y trajo del LOCAL STORAGE: " + value);
          // seteo el usuario logueado en store 
         this.props.setQra(value);
          //Si ya estaba logueado lo envio a la pantalla inicial
          console.log("Tiene credenciales LoginForm, ya estaba logueado!!");
    
          console.log("si el resultado de getUserInfo da OK entonces por medio de getDerivedStateFromProps va havia pantalla principal")
          console.log("esto se maneja asi debido a que si el ancho de banda del usuario es bajo, no deja pasar a la pantalla principal a menos que este userInfo ejecutada");

          this.props.getUserInfo(session.idToken.jwtToken);
        
     
          // this.props.followersAlreadyCalled(true);
          // this.props.navigation.navigate("AppNavigator2");
          // this.setState({showloginForm: true});
        }

        var qratoken = await AsyncStorage.getItem('qratoken');
        console.log('AsyncStorage qratoken: '+qratoken);

        


        

        // chequeo si el username logueado que esta en value, esta en qratoken del async, si no 
        if (qratoken!==value)
        {
          console.log('envio pushtoken a RDS porque por alguna razon no esta actualizado');
          this.props.postPushToken(pushtoken,value,Platform.OS,session.idToken.jwtToken);
        }

      } //apologize

      
        
          } 
          catch (error) {
            console.log('Error AsyncStorage.getItem(username)', error);
            this.setState({showloginForm: true});

            crashlytics().setUserId('unknown');
            crashlytics().log('error: ' + error) ;
            if(__DEV__)
            crashlytics().recordError(new Error('AsyncStorage.get_DEV'));
            else
            crashlytics().recordError(new Error('AsyncStorage.get_PRD'));


            // kinesis_catch('#008',error,value);
            // Error retrieving data
          }



    }
    catch (e) {
      console.log('No tiene credenciales LoginForm', e);
      this.setState({showloginForm: true});
   //   kinesis_catch('#009',e,value);
      var pushtoken = await AsyncStorage.getItem('pushtoken');
      var qraTokenVerif = await AsyncStorage.getItem('qratoken');

      if (pushtoken===null)
      {
        console.log('no tiene credenciales y nunca obtuvo pushtoken');
      }else
      {
        // encontro un token y como no hay usuario asignado a ese token, debe ser
        // blanqueado en RDS por las dudas que no haya sifo blanqueado en el signout
        // y no siga enviando PUSH a este equipo.
        console.log('no tiene credenciales y tiene pushtoken');
        console.log(pushtoken);
        console.log('qratoken:'+qraTokenVerif);
        if (qraTokenVerif!=='')
            console.log('el qratoken es distinot de vacio, deberia blanquear el pushtoken del RDS')
      }
      // Handle exceptions
    }

  } // if de debeHacerUpgrade

  }else {
          console.log('lo siento no hay Internet');
          this.setState({nointernet: true});
         }
     
 
       }


       componentWillUnmount() {
 
      }
      
    

       closeVariosModales = () => {
        this.setState({nointernet: false}); 
        this.componentDidMount();
      }

  
signIn = async () => {



   Keyboard.dismiss();
   this.setState({indicator: 1, loginerror: 0});

//if(this.internet){
  if (await hasAPIConnection())
  {

 //this.setState({indicator: 1, loginerror: 0});
  console.log("username: "+this.state.username.toLowerCase() + "password: "+ this.state.password);
    await Auth.signIn(this.state.username.toLowerCase(), this.state.password)
      .then((result) => { console.log('entro!');
      console.log(result);
      console.log('challenge: ' + result.challengeName);
      
      // si viene con new password required freno la app porque no tengo desarrollado el cambio 
      // de password en mobil, lo mando a la web a cambiar password porque sino cognito no genera token
      // para poder llamar a APIS y demas cosas.
      if (result.challengeName==='NEW_PASSWORD_REQUIRED')
         this.setState({forceChangePassword: true, stopApp: true });
         
      console.log(result.signInUserSession.idToken.payload['custom:callsign']);
      console.log(result.signInUserSession.idToken.jwtToken);
      this.qra = result.signInUserSession.idToken.payload['custom:callsign'];
      this.jwtToken = result.signInUserSession.idToken.jwtToken;
  //    console.log(result);
      this.usernotfound = false;
    })
      .catch(err => {console.log('error:', err.code);
                console.log(err);
      

             if  (err.code==='UserNotConfirmedException')  
             {
              this.setState({confirmSignup: true})

             } 
             else
             {
             this.setState({ loginerror: 1, indicator: 0});
             this.usernotfound = true;


             crashlytics().setUserId(this.state.username.toUpperCase());
             crashlytics().log('error: ' + err) ;
             if(__DEV__)
             crashlytics().recordError(new Error('Auth.signIn_DEV'));
             else
             crashlytics().recordError(new Error('Auth.signIn_PRD'));
            //  kinesis_catch('#012',err,this.state.username.toUpperCase());

            }
            
            
            })

if (!this.usernotfound)
  {  try {
      const { identityId } = await Auth.currentCredentials();
      console.log('PASO POR SIGNIN la credencial es:' + identityId);
      var res = identityId.replace(":", "%3A");
      // this.props.setUrlRdsS3('https://s3.amazonaws.com/sqso/protected/'+res+'/');
      this.props.setUrlRdsS3(res,'https://d30o7j00smmz5f.cloudfront.net/1/'+res+'/');
      this.props.resetQso();
      this.props.newqsoactiveFalse();
      
      // this.props.followersAlreadyCalled(false);
 
   //   this.props.getUserInfo();
      console.log('la credencial RES:' + res);
    }
    catch (e) {
      console.log('caught error', e);
             crashlytics().setUserId(this.qra);
             crashlytics().log('error: ' + e) ;
             if(__DEV__)
             crashlytics().recordError(new Error('Auth.signIn.current_DEV'));
             else
             crashlytics().recordError(new Error('Auth.signIn.current_PRD'));

      // kinesis_catch('#013',e,this.state.username.toUpperCase());
      // Handle exceptions
    }
   //  var session = await Auth.currentSession();
   //  console.log("PASO POR SIGNIN token: " + session.idToken.jwtToken);
     await this.props.setToken(this.jwtToken);

  //  session = await Auth.currentAuthenticatedUser();
   // console.log("PASO POR SIGNIN token: " + session.signInUserSession.idToken.jwtToken);
    
   console.log("antes de getInfo")
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
      crashlytics().log('error: ' + error) ;
      if(__DEV__)
      crashlytics().recordError(new Error('AsyncStorage.user_DEV'));
      else
      crashlytics().recordError(new Error('AsyncStorage.user_PRD'));
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
              console.log("despue de getitem qratoken :"+qraToken);
              // this.pushTokenFound = false;
              // if (qraToken!==this.state.username.toUpperCase() || pushtoken!==this.props.pushtoken)
              if (qraToken!==this.qra.toUpperCase())
                  { // llamo api de registracion de backend con el correspondiente QRA, esto quiere decir que 
                    // el usuario anterior que genero el PushToken se deslogueo y entro con otro usuario
                    // entonces el backend debe ser informado que el nuevo QRA de este token es otro o
                    // puedo haber pasado que cambio el psuhToken por alguna Razon entonces tambien se debe informar lo mismo
                    // al backend con los mismos datos
                      try {
                          // await AsyncStorage.setItem('pushtoken', this.props.pushtoken);
                        //  await AsyncStorage.setItem('qratoken', 'empty');
                          // await AsyncStorage.setItem('qratoken', this.state.username.toUpperCase());
                          console.log("mat llama a API pushToken si encuentra el Token, pushToken:"+this.props.pushtoken+ "QRA:"+this.qra.toUpperCase());
                          console.log("mat cambio");
                          // this.props.postPushToken(this.props.pushtoken,this.state.username.toUpperCase(),Platform.OS,session.idToken.jwtToken);
                        
                          this.props.postPushToken(pushtoken,this.qra.toUpperCase(),Platform.OS,this.jwtToken);
                         
                          console.log('grabo pushtoken en AsyncStorage porque cambio el token o el usuario logueado y llama API de backend '+Platform.OS);
                        } catch (error) {
                          console.log('caught error setItem pushtoken y qratoken dentro de if (this.pushTokenFound)', error);
                          // kinesis_catch('#016',error,this.state.username.toUpperCase());
                          crashlytics().setUserId(this.qra.toUpperCase());
                          crashlytics().log('error: ' + error) ;
                          if(__DEV__)
                          crashlytics().recordError(new Error('props.postPushTok_DEV'));
                          else
                          crashlytics().recordError(new Error('props.postPushTok_PRD'));
                        }


                  }else
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
                      crashlytics().log('error: ' + error) ;
                      if(__DEV__)
                      crashlytics().recordError(new Error('twoGetItems_DEV'));
                      else
                      crashlytics().recordError(new Error('twoGetItems_PRD'));
              // kinesis_catch('#017',error,this.state.username.toUpperCase());
            }

        //  }
    
   

    this.setState({indicator: 0});
     //this.props.navigation.navigate("AppNavigator2");


      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AppNavigator2', params: { foo: 'bar' } })],
      });

        // The navigateToScreen2 action is dispatched and new navigation state will be calculated in basicNavigationReducer here ---> https://gist.github.com/shubhnik/b55602633aaeb5919f6f3c15552d1802
      this.props.navigation.dispatch(resetAction)

     }
    // this.setState({indicator: 0});
    // Keyboard.dismiss();

   // }
    
    }
    else 
      { this.setState({indicator: 0}); 
        this.setState({nointernet: true});
        
      }
   
  }

  SignUpForm = async () => {

    if (await hasAPIConnection())
       this.props.navigation.navigate("SignUpScreen");

    else 
      { this.setState({indicator: 0}); 
        this.setState({nointernet: true});
        
      }

  }

  close_confirmSignup = () => {
    this.setState({confirmSignup: false})
  }

  resendCode = async () => {
    Keyboard.dismiss();
    if (await hasAPIConnection())
    {  
  

    this.setState({ indicator:1,confirmationcodeError:0 });

   await Auth.resendSignUp(this.state.username.toLowerCase())
                  .then(() => { console.log('Resend Ok!')
                  this.setState({ errormessage2:'Your confirmation code has been sent!',color: 'blue',heightindicator: 0,  indicator: 0, confirmationcodeError:1 });
                })
                  .catch(err => {console.log('Error sending the confirmation code, try again.', err)
                  this.setState({errormessage2: 'Error sending the confirmation code, try again.',color: 'red',heightindicator: 0,  indicator: 0, confirmationcodeError:1 });
                  // kinesis_catch('#021',err,this.state.username.toUpperCase());
                  crashlytics().setUserId(this.state.username.toLowerCase());
                  crashlytics().log('error: ' + err) ;
                  if(__DEV__)
                  crashlytics().recordError(new Error('Auth.resendSignUp_DEV'));
                  else
                  crashlytics().recordError(new Error('Auth.resendSignUp_PRD'));
                
                });

    this.setState({ heightindicator: 0,indicator:0 });
  }else 
  { this.close_confirmSignup();
    this.setState({indicator: 0}); 
    this.setState({nointernet: true});
  }

  }


  confirmSignup = async (confirmationCode) => {
    Keyboard.dismiss();

 if (await hasAPIConnection())
  {  
    this.setState({confirmationcodeError: 0,heightindicator: 35,  indicator:1, buttonsEnabled: true});
    
    
    
 //   Auth.confirmSignUp(this.state.qra.toUpperCase(),this.state.confirmationcode)
    Auth.confirmSignUp(this.state.username.toLowerCase(),confirmationCode)
   .then(() => { console.log('SignUp confirmed ok!: ') 
                 this.close_confirmSignup();
                 this.signIn();
             //    this.signInAfterConfirmed();
                 // this.setState({indicator:0});
    

                 // this.props.navigation.navigate("AppNavigator2");
                                  })
   .catch (err => {console.log('SignUp confirmed error: ', err);
   this.setState({errormessage2: 'Confirmation failed! Please enter the code again',color: 'red',
     confirmationcodeError: 1, indicator:0, buttonsEnabled: false });
    //  kinesis_catch('#026',err,this.state.username.toUpperCase());
    crashlytics().setUserId(this.state.username.toLowerCase());
    crashlytics().log('error: ' + err) ;
    if(__DEV__)
    crashlytics().recordError(new Error('Auth.confirmSignUp_DEV'));
    else
    crashlytics().recordError(new Error('Auth.confirmSignUp_PRD'));

                  
 })
}else 
{ this.close_confirmSignup();
 this.setState({indicator: 0, heightindicator: 0}); 
 this.setState({nointernet: true});
}


 }


  ForgotPassword = async () => {

    if (await hasAPIConnection())
       this.props.navigation.navigate("ForgotScreen")

    else 
      { this.setState({indicator: 0}); 
        this.setState({nointernet: true});
        
      }

  }
   
    render() { console.log("LoginForm Screen");
   
        return (
          <View>
            {(this.state.showloginForm) ?
            
               <View style={styles.container}>
   
       
               <View style={{flexDirection: 'row',  justifyContent: 'space-around',   padding:5, marginTop: 15,
                        opacity: this.state.indicator }} >
                  
                    <ActivityIndicator   animating={true} size="large" color='white' />
                    
                 </View>
                 <View style={{ justifyContent: 'space-around',   padding: 10,
                        opacity: this.state.loginerror }}>
                        <Text style={{ color: '#ff3333', textAlign: 'center', }}> Login error, try again
                        </Text>
                   </View>

                   <ScrollView >
                   {/* <ScrollView style={{width: this.width}}> */}
                   <View style={{flex:1, alignItems: 'center'}} >
               
               <TextInput 
                  placeholder="email"
                  onFocus={() => this.setState({ loginerror: 0})}
                  underlineColorAndroid='transparent'
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  keyboardType={Platform.OS==='android' ? 'visible-password' : 'default'}
                  autoCorrect={false}
                  onSubmitEditing={() => this.passwordRef.focus()} 
                  style={styles.input}
                  value={this.state.username}
                    onChangeText={(text) => this.setState({username: text})} />
               
               <TextInput
                 ref={passwordRef => this.passwordRef = passwordRef}
                 placeholder="password"
                 onFocus={() => this.setState({ loginerror: 0})}
                 underlineColorAndroid='transparent'
                 placeholderTextColor="rgba(255,255,255,0.7)"
                 returnKeyType="go"
                 autoCapitalize="none"
                 autoCorrect={false}
                 secureTextEntry
                 style={styles.input} 
                 value={this.state.password}
                 onChangeText={(text) => this.setState({password: text})}
                
                 />

         
                
                 <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.signIn()} >
                    <Text style={styles.buttonText} >LOGIN</Text>
                 </TouchableOpacity>

                 <View style={{flex:1, flexDirection: 'row'}}>
                 <View style={{flex:0.4,  height: 45, alignItems: 'center'}}>
                 <TouchableOpacity style={{marginTop: 10}} onPress={ () => this.SignUpForm()} >
                    <Text style={styles.buttonText2} >Sign Up</Text>
                 </TouchableOpacity>
                 </View>
                 <View style={{flex:0.6, height: 45, alignItems: 'center'}}>
                 <TouchableOpacity  style={{marginTop: 10}} onPress={ () => this.ForgotPassword()} >
                    <Text style={styles.buttonText2} >Forgot Password</Text>
                 </TouchableOpacity>
                 </View>

                 
               </View>

 <Text style={styles.buttonText2} >  </Text>
 <Text style={styles.buttonText2} >  </Text>
 <Text style={styles.buttonText2} >  </Text>
 <Text style={styles.buttonText2} >  </Text>
 <Text style={styles.buttonText2} >  </Text>
 <Text style={styles.buttonText2} >  </Text>
 <Text style={styles.buttonText2} >  </Text>
 <Text style={styles.buttonText2} >  </Text>
 <Text style={styles.buttonText2} >  </Text>
 <Text style={styles.buttonText2} >  </Text>
   </View>
               </ScrollView>
{(this.state.nointernet) && 
               <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
}

             </View> 
             :
             <View style={styles.container}>
                  <Text style={{ color: '#8BD8BD', textAlign: 'center', fontSize: 18, marginTop: 30 }}> {this.state.mess}.
                        </Text>
                        {/* <Image source={require('../../images/loading.jpg')}  style={{width: 250, height: 160, marginTop: 100  } }  /> */}
                        {(this.state.nointernet) && 
                        <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
                        }
                        </View>


            }


      {(this.state.stopApp) &&
                              <StopApp appNeedUpgrade={this.state.appNeedUpgrade} pushTokenNotFound={this.state.pushTokenNotFound} 
                              forceChangePassword={this.state.forceChangePassword} upgradeText={this.state.upgradeText}/>
      }


               {(this.state.confirmSignup)    && 
          <ConfirmSignUp
          //  show={this.state.confirmSignup}
          color={this.state.color}
          confirmationcodeError={this.state.confirmationcodeError}
           errormessage2={this.state.errormessage2}
            close_confirmSignup={this.close_confirmSignup.bind()}
            resendCode={this.resendCode.bind()}
            confirmSignup={this.confirmSignup.bind()}
          />
        }
   
           </View>
           
        );
       
     } 

 }

 const styles = StyleSheet.create({
  container: {
    padding: 20,
    
    
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
  buttonContainer:{
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
          
            fontSize: 16,
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
    
          },

        });


 const mapStateToProps = state => {
 
  return { pushtoken: state.sqso.pushToken,
             qra: state.sqso.qra, 
             userInfoApiSuccesStatus: state.sqso.userInfoApiSuccesStatus,
             env: state.sqso.env
          
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
    manageLocationPermissions
    
   }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
