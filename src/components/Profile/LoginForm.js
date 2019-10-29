import React, { Component } from 'react';
import { Text, Image, View, Button, StyleSheet, TextInput, TouchableOpacity, Keyboard,
     ActivityIndicator, KeyboardAvoidingView , AsyncStorage, Modal, ScrollView, Dimensions, 
     Platform} from 'react-native';
import { connect } from 'react-redux';
//import Amplify, { Auth, API, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { setQra, setUrlRdsS3, resetQso, followersAlreadyCalled, newqsoactiveFalse, setToken, managePushToken,
  postPushToken, getUserInfo, get_notifications, fetchQraProfileUrl, manage_notifications,
  confirmReceiptiOS, setSubscriptionInfo, manageLocationPermissions} from '../../actions';
//import { NavigationActions, addNavigationHelpers } from 'react-navigation';
//import { NavigationActions } from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation';
//import {  Permissions } from 'expo';
import { hasAPIConnection, kinesis_catch } from '../../helper';
import VariosModales from '../Qso/VariosModales';
import ConfirmSignUp from './ConfirmSignUp';

// nuevo push
import Analytics from '@aws-amplify/analytics';




 import PushNotification from '@aws-amplify/pushnotification';
 //import { PushNotification } from 'aws-amplify-react-native';
 import { PushNotificationIOS } from 'react-native';

 import RNIap, {
  Product,
  ProductPurchase,
  acknowledgePurchaseAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';


// PushNotification need to work with Analytics
Analytics.configure(awsconfig);
//Amplify.configure(awsconfig);
PushNotification.configure(awsconfig);
Auth.configure(awsconfig);
// Amplify.configure(awsconfig);


const itemSubs = Platform.select({
  ios: [
    'PremiumMonthly', // dooboolab
  ],
  android: [
    // 'test.sub1', // subscription
    '001'
  ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

class LoginForm extends Component {
//   static navigationOptions = {
//       tabBarLabel: 'Profile'

// 


constructor(props) {
    super(props);

    this.usernotfound = false;
    this.internet = false;
    // this.pushToken = '';
    // this.pushTokenFound = false;


    this.width = Dimensions.get('window').width; //full width
    this.height = Dimensions.get('window').height; //full height
    
    this.state = {
   
     username: '',
     password: '',
     indicator: 0,
     loginerror: 0,
     nointernet: false,
     showloginForm: false,
     mess: 'Loading ...',
     nopushtoken: false,
     confirmSignup: false,
     confirmationcodeError: 0,
     color: 'red'
     
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




    PushNotification.onNotification((notification) => {
      console.log('antes imprimir')
      console.log('in app notification', notification);
      console.log('despues de  imprimir')
   //  this.setState({mensaje: JSON.stringify(notification)});
    let envioNotif = '';
      
      if (Platform.OS==='android')
      {   // console.log('AVATR: '+notification.data);
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
            kinesis_catch('#010',error,this.props.qra);
                // Error retrieving data
         }
    
    }else
     {
          // console.log('AVATR: '+notification.data);
      try {
          console.log('paso por IOS')
          let bodyJson = notification._data.data.jsonBody;
          
          // let body = notification._data['data.pinpoint.jsonBody'];

            // let bodyJson = JSON.parse(body)
          
            console.log(bodyJson.AVATAR);
            console.log(bodyJson.QRA);
            console.log(bodyJson.IDACTIVITY);
            console.log(notification._alert.title);
        //    console.log(notification._alert.body);

            // console.log(notification._data.body);

          
            

            envioNotif = {"idqra_notifications":9999,"idqra":442,"idqra_activity":bodyJson.IDACTIVITY,"read":null,"DATETIME":"2018-12-08T15:20:14.000Z","message":notification._alert.title,
            "activity_type":18,"QRA":bodyJson.QRA,"REF_QRA":"LU5FFF","QSO_GUID":"95464deb-5d65-4a80-b5bc-666a3be941b1",
            "qra_avatarpic":bodyJson.AVATAR, "url": notification._data.data.pinpoint.deeplink,
            "qso_mode":null,"qso_band":null,"qso_type":null}

            this.props.manage_notifications('ADDONE',envioNotif);
          } 
          catch (error) {
            console.log('error #011');
            kinesis_catch('#011',error,this.props.qra);
                // Error retrieving data
         }

      }



         
      console.log('MATITO')
        
        
     if (!notification.foreground)
          this.props.navigation.navigate("Notifications");
       
    
    

      if(Platform.OS !== 'android')
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    });
    
    // PushNotification.onRegister((token) => {
    //   console.log('in app registration', token);
    //  // this.setState({token: token});
    //   //  this.props.managePushToken(token,'','');
    //   //  this.pushToken = token;
    //    try {
    //   //  await AsyncStorage.setItem('pushtoken', token);
    //   AsyncStorage.setItem('pushtoken', token);
    //    } 
    //    catch (error) {
    //      console.log('Error al grabar pushtoken en asynstorage', error);
         
    //      kinesis_catch('#015',error,'');
    //      // Error retrieving data
    //     }
     

    // });


    console.log("COMPONENT did mount LOGINFORM");


  if (await hasAPIConnection())
  {
    console.log('SI hay internet: ');
         // IAP Listener GLOBAL



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
    }




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
      this.props.setUrlRdsS3(res,'https://d3gbqmcrekpw4.cloudfront.net/protected/'+res+'/');

      // busco en sotrage local porque la session esta activa pero la sesion no me dice el username
      // entonces busco el username ultimo logueado del storage local y se lo seteo a QRA del store
      try {

        var pushtoken = await AsyncStorage.getItem('pushtoken');
        console.log('mat2 el pushtoken del asyncStorage es:'+pushtoken);
        console.log('mat2 el pushtoken del store es:'+this.props.pushtoken);

        //apologize
      //   if (pushtoken===null) // Si no encuentra pushToken guardado debe reinstalar la APP
      if (1===2)
      this.setState({nopushtoken: true})
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
            kinesis_catch('#008',error,value);
            // Error retrieving data
          }



    }
    catch (e) {
      console.log('No tiene credenciales LoginForm', e);
      this.setState({showloginForm: true});
      kinesis_catch('#009',e,value);
      // Handle exceptions
    }

  }else {
          console.log('lo siento no hay Internet');
          this.setState({nointernet: true});
         }
     
 
       }


       componentWillUnmount() {
        // Dejo el evento de Listener de subcription montado siempre
        // por si en el agun momento se muere este componente que quede
        // habilitado el sistema para que el usuario pueda comprar
        // hay que ver si es una buena practica o no. Veremos.

        // if (purchaseUpdateSubscription) {
        //   purchaseUpdateSubscription.remove();
        //   purchaseUpdateSubscription = null;
        // }
        // if (purchaseErrorSubscription) {
        //   purchaseErrorSubscription.remove();
        //   purchaseErrorSubscription = null;
        // }
      }
      
    

       closeVariosModales = () => {
        this.setState({nointernet: false}); 
        this.componentDidMount();
      }

  

signIn = async () => {

 

    // await this.props.checkInternet().then((data) => {
    //         console.log('devuelve checkInternet: '+data); 
    //         this.internet = data; 
    //         if (data)
    //           console.log('hay internet');
    //          else this.setState({username: 'NO hay internet'});
    // });

   Keyboard.dismiss();
   this.setState({indicator: 1, loginerror: 0});

//if(this.internet){
  if (await hasAPIConnection())
  {

 //this.setState({indicator: 1, loginerror: 0});
  console.log("username: "+this.state.username.toUpperCase() + "password: "+ this.state.password);
    await Auth.signIn(this.state.username.toUpperCase(), this.state.password)
      .then(() => { console.log('entro!');
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

             kinesis_catch('#012',err,this.state.username.toUpperCase());

            }
            
            
            })

if (!this.usernotfound)
  {  try {
      const { identityId } = await Auth.currentCredentials();
      console.log('PASO POR SIGNIN la credencial es:' + identityId);
      var res = identityId.replace(":", "%3A");
      // this.props.setUrlRdsS3('https://s3.amazonaws.com/sqso/protected/'+res+'/');
      this.props.setUrlRdsS3(res,'https://d3gbqmcrekpw4.cloudfront.net/protected/'+res+'/');
      this.props.resetQso();
      this.props.newqsoactiveFalse();
      
      // this.props.followersAlreadyCalled(false);
 
   //   this.props.getUserInfo();
      console.log('la credencial RES:' + res);
    }
    catch (e) {
      console.log('caught error', e);
      kinesis_catch('#013',e,this.state.username.toUpperCase());
      // Handle exceptions
    }
     var session = await Auth.currentSession();
     console.log("PASO POR SIGNIN token: " + session.idToken.jwtToken);
     await this.props.setToken(session.idToken.jwtToken);

  //  session = await Auth.currentAuthenticatedUser();
   // console.log("PASO POR SIGNIN token: " + session.signInUserSession.idToken.jwtToken);
    
   console.log("antes de getInfo")
   this.props.getUserInfo(session.idToken.jwtToken);
   //this.props.followersAlreadyCalled(true);


    // seteo el usuario logueado en store 
    this.props.setQra(this.state.username.toUpperCase());
    // guardo en local storage el username
    try {
      await AsyncStorage.setItem('username', this.state.username.toUpperCase());
      await AsyncStorage.setItem('identity', res);

    } catch (error) {
      // Error saving data
      console.log('caught error AsyncStorage username & identity', error);
      kinesis_catch('#014',error,this.state.username.toUpperCase());
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
              if (qraToken!==this.state.username.toUpperCase())
                  { // llamo api de registracion de backend con el correspondiente QRA, esto quiere decir que 
                    // el usuario anterior que genero el PushToken se deslogueo y entro con otro usuario
                    // entonces el backend debe ser informado que el nuevo QRA de este token es otro o
                    // puedo haber pasado que cambio el psuhToken por alguna Razon entonces tambien se debe informar lo mismo
                    // al backend con los mismos datos
                      try {
                          // await AsyncStorage.setItem('pushtoken', this.props.pushtoken);
                        //  await AsyncStorage.setItem('qratoken', 'empty');
                          // await AsyncStorage.setItem('qratoken', this.state.username.toUpperCase());
                          console.log("mat llama a API pushToken si encuentra el Token, pushToken:"+this.props.pushtoken+ "QRA:"+this.state.username.toUpperCase());
                          console.log("mat cambio");
                          // this.props.postPushToken(this.props.pushtoken,this.state.username.toUpperCase(),Platform.OS,session.idToken.jwtToken);
                        
                          this.props.postPushToken(pushtoken,this.state.username.toUpperCase(),Platform.OS,session.idToken.jwtToken);
                         
                          console.log('grabo pushtoken en AsyncStorage porque cambio el token o el usuario logueado y llama API de backend '+Platform.OS);
                        } catch (error) {
                          console.log('caught error setItem pushtoken y qratoken dentro de if (this.pushTokenFound)', error);
                          kinesis_catch('#016',error,this.state.username.toUpperCase());
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
  
              kinesis_catch('#017',error,this.state.username.toUpperCase());
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

   await Auth.resendSignUp(this.state.username.toUpperCase())
                  .then(() => { console.log('Resend Ok!')
                  this.setState({ errormessage2:'Your confirmation code has been sent!',color: 'blue',heightindicator: 0,  indicator: 0, confirmationcodeError:1 });
                })
                  .catch(err => {console.log('Error sending the confirmation code, try again.', err)
                  this.setState({errormessage2: 'Error sending the confirmation code, try again.',color: 'red',heightindicator: 0,  indicator: 0, confirmationcodeError:1 });
                  kinesis_catch('#021',err,this.state.username.toUpperCase());
                
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
    Auth.confirmSignUp(this.state.username.toUpperCase(),confirmationCode)
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
     kinesis_catch('#026',err,this.state.username.toUpperCase());
                  
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
   
       
               <View style={{flexDirection: 'row',  justifyContent: 'space-around',   padding:5,
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
                  placeholder="callsign"
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


<Modal visible ={this.state.nopushtoken}  transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{
                      //  margin:20,
                          padding:20, 
                      //    backgroundColor:  '#475788',
                          backgroundColor:"rgba(0,0,0,0.85)",
                          top: 90,
                          left: 30,
                          right: 30,
                          position: 'absolute',
                          borderBottomLeftRadius: 22,
                          borderBottomRightRadius: 22,
                          borderTopLeftRadius: 22,
                          borderTopRightRadius: 22,
                                                    
                        //  alignItems: 'center'                      
                          }}>
          

                    <View style={{flex: 1, alignItems: 'center'}}>

                    {/* <Image source={require('../../images/noInternet.png')}  style={{width: 60, height: 60 } } 
                      resizeMode="contain" />  */}

                     <Text style={{ color: '#FFFFFF', fontSize: 20, padding: 10 }}>There was a problem during the APP installation, please delete the APP and reinstall it from the Store again. Apologize. SuperQSO.</Text>

                    {/* <TouchableOpacity  onPress={() =>  this.props.closeInternetModal() } style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5}}>
                      <Text style={{ color: '#999', fontSize: 22}}>OK</Text>
                    </TouchableOpacity> */}
                    
                    </View>
                    
                    </View>

               
               </Modal>

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
    fontSize: 16,
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
             version: state.sqso.version,
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
