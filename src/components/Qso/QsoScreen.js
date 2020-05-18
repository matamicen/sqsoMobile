import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  Button,
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Alert,
  TextInput,
  Dimensions,
  AppState,
  Animated,
  Easing,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import {
  fetchPeople,
  cambioqsotype,
  closeModalConfirmPhoto,
  cameraPermissionTrue,
  cameraPermissionFalse,
  audiorecordingPermissionFalse,
  audiorecordingPermissionTrue,
  newqsoactiveTrue,
  newqsoactiveFalse,
  resetQso,
  openModalRecording,
  setLocation,
  setToken,
  get_notifications,
  manage_notifications,
  updateLocationBackend,
  manageLocationPermissions,
  qsoScreenDidMountFirsTime,
  onprogressTrue,
  onprogressFalse,
  actindicatorPostQsoNewTrue,
  postQsoNew,
  addMedia,
  uploadMediaToS3,
  welcomeUserFirstTime,
  confirmReceiptiOS, confirmReceiptAndroid
} from "../../actions";
import QsoHeader from "./QsoHeader";
import MediaFiles from "./MediaFiles";
import RecordAudio2 from "./RecordAudio2";
import Iap from "./Iap";
import ShareQso from "./ShareQso";
//import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-community/async-storage';

import Muestro from "./Muestro";
import { NavigationActions, addNavigationHelpers } from "react-navigation";
//import {  Permissions } from 'expo';
import {
  hasAPIConnection,
  showVideoReward,
  showIntersitial,
  updateOnProgress, check_firstTime_OnProgress, apiVersionCheck } from "../../helper";
import VariosModales from "./VariosModales";
import Permissions from "react-native-permissions";

import awsconfig from "../../aws-exports";
import { Auth } from "aws-amplify";
//import firebase from "react-native-firebase";
import RNLocation from "react-native-location";
import AdInter from "./AdInter";
import AdVideoReward from "./AdVideoReward";
import crashlytics from '@react-native-firebase/crashlytics';
import StopApp from './../Profile/StopApp';
import analytics from '@react-native-firebase/analytics';
import HandleBack from './HandleBack';



import RNIap, {
  Product,
  ProductPurchase,
  acknowledgePurchaseAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';

Auth.configure(awsconfig);

class QsoScreen extends Component {
  constructor(props) {
    super(props);
    TextInput.defaultProps = { allowFontScaling: false };
    Text.defaultProps = { allowFontScaling: false };
    this.width = Dimensions.get("window").width; //full width
    this.height = Dimensions.get("window").height; //full height
    // this.advertInter = null;
    // this.advertVideoReward = null;
    // this.intersitialLoaded = false;
    // this.videorewardLoaded = false;
    this.videorewardmustbeshown = false;
    this.intersitialmustbeshown = false;
    // this.usergotreward = false;
    //  this.currentLocationPermission = false;
    this.envio = {};
    this.fileauxProfileAvatar = null;
    this.closeAd = null;
    this.auxMedia = [];

 
   

    this.state = {
      people: [],
      errorMessage: "",
      isFetching: true,
      pickerSelection: "Default",
      pickerDisplayed: false,
      photoConfirm: false,
      endQsoModal: false,
      actindicatorpostQsoNew: false,
      modalRecording: false,
      nointernet: false,
    //  notvideorewarded: false,
    //  prevideorewarded: false,
      showIntersitial: false,
      showVideoReward: false,
      iap: false,
      fadeValue: new Animated.Value(0),
      xValue: new Animated.Value(0),
      springValue: new Animated.Value(0.3),
      rotateValue: new Animated.Value(0),
      stopApp: false,
      appNeedUpgrade: false,
      pushTokenNotFound: false,
      forceChangePassword: false,
      upgradeText: '',
      iconosWeb: false
     
    };
  }

  static navigationOptions = {
    tabBarLabel: " ",
  //  13

    tabBarIcon: ({ tintColor }) => {
      return (
        <View
          style={{
            width: 35,
            height: 20,
            marginTop: Platform.OS === "ios" ? 3 : 3
          }}
        >
          <Image
            style={{  width: 31, height: 31, marginLeft: 5}}
         //   source={require("../../images/qsoicon3.png")}
            source={require("../../images/MicrofonoGris.png")}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 9, marginTop: 2, marginLeft: 11 }}>POST</Text>
        </View>
      );
    }

    
  };

  static getDerivedStateFromProps(props, state) {
    console.log(
      "El valor de confirmPhotoModal: " + props.sqsomodalconfirmphoto
    );
    console.log(
      "El valor de sqsoactindicatorpostqsonew : " +
        props.sqsoactindicatorpostqsonew
    );
    console.log(
      "El valor de heightPhotoConfirm : " +
        props.sqsomodalconfirmphotoheight
    );
    // this.setState({
    return {
      photoConfirm: props.sqsomodalconfirmphoto,
      actindicatorpostQsoNew: props.sqsoactindicatorpostqsonew,
      heightPhotoConfirm: props.sqsomodalconfirmphotoheight,
      pickerDisplayed: props.sqsomodalrecording
    };

    return null;
  }

 
 

  async componentDidMount() {
    console.log("COMPONENT did mount QSO Screen!");

// agrego listener de Purchase IAP, se pone aca porque a esta altura el usuario ya esta logueado
// entonces si llegase a ejecutar este listener ya tiene disponible el QRA para ser enviado
// al backend.

    purchaseUpdateSubscription = purchaseUpdatedListener(async(purchase) => {

     
      console.log('purchaseUpdatedListener de QsoScreen');
      console.log(purchase);

      // aca tengo que llamar a la API backend para validar el receipt y una vez validado
      // debo llamar a 
      
      if (purchase.purchaseStateAndroid === 1 && !purchase.isAcknowledgedAndroid) {

        purchaseJson = JSON.parse(purchase.transactionReceipt);
        console.log('purchase json');
        console.log(purchaseJson);
    
        //  const ackResult = await acknowledgePurchaseAndroid(purchase.purchaseToken);
          console.log('entro listener de compra por ANDROID en QsoScreen');
          purchaseToken = purchaseJson.purchaseToken;
          qra = this.props.qra;
          packageName = purchaseJson.packageName;
          productId = purchaseJson.productId;
          environment = this.props.env;
          action = 'BUY';
          

          console.log('purchasetoken:'+purchaseToken);
          console.log('qra:'+qra);
          console.log('packageName:'+packageName);
          console.log('productId:'+productId);
          console.log('environment:'+environment);
          console.log('action:'+action);
          

         this.props.confirmReceiptAndroid(qra,packageName,purchaseToken,productId,environment,action,false)

          
      }
      if (Platform.OS==='ios')
      {

        console.log('IAP: llamo confirmReceipt de QsoScreen action: '+purchase.transactionId);
       // console.log('flag que recien compro: '+this.props.presspurchaseputton);
      // RNIap.finishTransactionIOS(purchase.transactionId);
        this.props.confirmReceiptiOS(this.props.qra,purchase.originalTransactionIdentifierIOS,purchase.transactionReceipt,purchase.transactionId,this.props.env,'BUY');
    
     //   this.props.confirmReceipt();
      //  RNIap.finishTransactionIOS(purchase.transactionId);

      }
   //   this.setState({ receipt: purchase.transactionReceipt }, () => this.goNext());
    });

    purchaseErrorSubscription = purchaseErrorListener((error) => {
      console.log('purchaseErrorListener QsoScreen', error);
     // this.props.manageLocationPermissions("iapshowed",0);
      // Alert.alert('purchase error', JSON.stringify(error));
    });




    AppState.addEventListener("change", this._handleAppStateChange);

    // location persmissions ask/check

    this._location_permissions("didmount");

    console.log("this.intesitial en didimount" + this.intersitialLoaded);
    console.log("this.videorewardLoaded en didimount" + this.videorewardLoaded);

    // if (this.props.qsoscreendidmountfirsttime) {
      // if (!this.intersitialLoaded) this.loadInter();
      // else console.log("ya esta cargado previamente intersitial");

      // if (!this.videorewardLoaded) this.loadVideoReward();
      // else console.log("ya esta cargado previamente videoreward");

      this.props.qsoScreenDidMountFirsTime(false);
     
      // Si no se llego hacer Acnoledge de una compra, android no dispara como ios
      // los listeners de los pendientes, hay que chequear en avaliable Purchase
      // si tiene el flag de NO CONFIRMADO, si lo tiene hay que confirmarlo para
      // que GOOGLE no de de baja la subscripcion.
      if (Platform.OS==='android') 
             this.getAvailablePurchase();
    // }

   
    setTimeout(() => {
      this.rotateAnimation();
        
       }
      , 1500);

  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);

    if (purchaseUpdateSubscription) {
      console.log('remuevo purchaseUpdateSubscription QsoScreen');
      
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
        if (purchaseErrorSubscription) {
          console.log('remuevo purchaseErrorSubscription QsoScreen');
          purchaseErrorSubscription.remove();
          purchaseErrorSubscription = null;
        }

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.fadeValue, {
        toValue: 1,
        duration: 600,

      }),
      Animated.spring(this.state.springValue, {
        toValue: 1,
        friction: 1.3
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 600,
        asing: Easing.linear,
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0,
      }),
     
          ]).start(() => { console.log('termino animacion')
             this.setState({iconosWeb: true})

          });
 

 }



  getAvailablePurchase = async() => {
    try {
       
      console.info('Get available purchases for android QsoScreen');
     //  const purchases = await RNIap.getPurchaseHistory();
       const purchases = await RNIap.getAvailablePurchases();
    

      const sortedAvailablePurchases = purchases.sort(
        (a, b) => b.transactionDate - a.transactionDate
      );
   //   const latestAvailableReceipt = sortedAvailablePurchases[0].transactionReceipt;
   //   console.info('Available purchases :: ', purchases);
    //  console.log('purchases:');

      console.log('SORTED AVAILABLE purchases QsoScreen:');
      sortedAvailablePurchases.map((purch2, j) => {
        console.log('productID:'+ purch2.productId);
        console.log('TransactionID:'+ purch2.transactionId);
        console.log('transactionDate:'+ purch2.transactionDate);
        console.log('originalTransactionDateIOS:'+ purch2.originalTransactionDateIOS);
        console.log('originalTransactionIdentifierIOS:'+ purch2.originalTransactionIdentifierIOS);
        });

    

      if (purchases && purchases.length > 0) {
        console.log('purchases completo AVAILABLE QsoScreen:');
          console.log(purchases);
          console.log('hya compras y la ultima compra fue:');
          console.log(purchases[0].originalTransactionIdentifierIOS);
          console.log(purchases[0].transactionId);
       //   console.log(purchases[0].transactionReceipt);
          // le tengo que pasar el id original, usuario logueado y receipt
          // para que la API valide con ese ID si existe y no esta vencida la subscrripcion
          // y si el usuario coincide devuele ok y queda todo igual, pero si no coincide debe
          // poner al nuevo QRA como PREMIUM para ese id original de transaccion y al otro dejarlo sin nada.
          // puede pasar que no encuentre el id original en el backend porque nunca lo dio de alta cuando 
          // se compro por error de backend o conexion al momento de enviar el receipt, en ese caso
          // debera llamar a la API validadno el RECIPT recibido y seguie el mismo precediemitno de validacion
          // si encuentra para ese receipt/original id un EXPIRE DATE que no haya vencido entonces darlos de alta
          // y cambiarlo como PREMIUM al usuario.

        
      
      //       this.props.confirmReceiptiOS(purchases[0].originalTransactionIdentifierIOS,purchases[0].transactionReceipt,purchases[0].transactionId,this.props.env,'restore');
         
      if (Platform.OS==='android') 
      {
             console.log('entro a restore de ANDROID');

              purchaseJson = JSON.parse(purchases[0].transactionReceipt);
              console.log('purchase json');
              console.log(purchaseJson);

              purchaseToken = purchaseJson.purchaseToken;
              qra = this.props.qra;
              packageName = purchaseJson.packageName;
              productId = purchaseJson.productId;
              environment = this.props.env;
              action = 'BUY';
              ack = purchases[0].isAcknowledgedAndroid;

              console.log('purchasetoken:'+purchaseToken);
              console.log('qra:'+qra);
              console.log('packageName:'+packageName);
              console.log('productId:'+productId);
              console.log('environment:'+environment);
              console.log('action:'+action);
              
      // si no se hizo el  AcknowledgedAndroid lo hace. 
      if (!purchases[0].isAcknowledgedAndroid)
              this.props.confirmReceiptAndroid(qra,packageName,purchaseToken,productId,environment,action,ack)

            }


        // this.setState({
        //   availableItemsMessage: `Got ${purchases.length} items.`,
        //   receipt: purchases[0].transactionReceipt,
        // });
      }
      else{
       console.log('viene vacio el purchaseAvailable');
      //  if (Platform.OS==='android') 
      //  {
      //       this.props.manageLocationPermissions("iapshowed",0); 
      //       this.props.restoreCall(true,'Sorry, we did not find any active subscription.')
 
      //    }
      }
       
    } catch (err) {
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + JSON.stringify(err)) ;
      if(__DEV__)
      crashlytics().recordError(new Error('QsoAvailablePurch_DEV'));
      else
      crashlytics().recordError(new Error('QsoAvailablePurch_PRD'));

      Alert.alert(err.message);
    }
  }

  _handleAppStateChange = async nextAppState => {
    // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    console.log("App State:" + nextAppState);

    if (nextAppState === "active") {
      // si vino de background por haber mostrado la publicidad, vuelvo a resetear
      // el adShowed a false
      if (this.props.adshowed || this.props.iapshowed===1)
      {
        this.props.manageLocationPermissions("adshowed", false);
      //  this.props.manageLocationPermissions("iapshowed", 0);
      }
      else {

         // chequeo version minima de APP  
            apiCall = await apiVersionCheck();
            console.log('despues de apiVersionCheck: '+apiCall)

            if (apiCall.stop)
              this.setState({stopApp: true, appNeedUpgrade: true, upgradeText: apiCall.message})
           // fin chequeo de version minima de la APP

        var session = await Auth.currentSession();
        console.log("PASO POR SIGNIN token: " + session.idToken.jwtToken);
        this.props.setToken(session.idToken.jwtToken);
        // si viene de background porque esta yendo a los QSO de las notificaciones
        // no chequeo de nuevo en backend las notificaciones
        // porque puede ver muchos QSOs en poco tiempo y es al pedo llamar al backend, solo va a tener
        // actualizadas si le llego algun PUSH mientras estaba en el browser de Interne
        if (this.props.notifbackground === false)
          this.props.get_notifications(session.idToken.jwtToken);
        else this.props.manage_notifications("NOTIF_BACKGROUND_FALSE", "");
        // le cambio el flag a FALSE si volvio de navegar por hacer click en una notificacion,
        //la idea es que si se va a background de manera natural que al regresar si vaya al
        // backend ya que esto sucede con menos frecuencia

        // envio location cada vez que viene de background, con esta info actializada
        // luego puedo tener mas precision para hacer futuros CQ
        // pero chequeo que no haya venido del background por haber mostrado
        // la publicidad

        if (this.props.currentlocationpermission && !this.props.adshowed)
          this._startUpdatingLocation();
      }
    }
    // }
    // this.setState({appState: nextAppState});
  };


  toggleRecordingModal = async () => {
    //       console.log("llamo togglepicker")

    //       const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    //       if (status === 'granted') this.props.audiorecordingPermissionTrue();
    //      else this.props.audiorecordingPermissionFalse();

    //   //  this.setState({pickerDisplayed: !this.state.pickerDisplayed})

    this.props.openModalRecording();
  };

  checkInternetOpenRecording = async () => {
    if (await hasAPIConnection()) {
      // analytics().logEvent("Recording", {"QSOTYPE": this.props.qsotype,
      //  "BAND": this.props.band, "MODE": this.props.mode, "RECTIME": "30"});

      // console.log("Recording analytics")
      
      Permissions.request("microphone").then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log("Microphone Permiso: " + response);
        if (response === "authorized") {
         
          this.toggleRecModal();
        }

        if (response === "denied" && Platform.OS !== "android") {
          Alert.alert(
            "You denied the access to the Microphone",
            "In order to Authorize choose Open Settings",
            [
              {
                text: "No, thanks",
                onPress: () => console.log("Permission denied"),
                style: "cancel"
              },
              { text: "Open Settings", onPress: Permissions.openSettings }
            ]
          );
        }

        if (response === "restricted" && Platform.OS === "android") {
          Alert.alert(
            "You denied the access to the Microphone",
            "In order to Authorize go to settings->Apps->superQso->Permissions",
            [
              {
                text: "Ok",
                onPress: () => console.log("ok"),
                style: "cancel"
              }
            ]
          );
        }

        if (response === "restricted" && Platform.OS !== "android") {
          Alert.alert(
            "You do not have access to the Microphone",
            "Cause: it is not supported by the device or because it has been blocked by parental controls",
            [
              {
                text: "Ok",
                onPress: () => console.log("ok"),
                style: "cancel"
              }
            ]
          );
        }
      });
    } else this.setState({ nointernet: true });
  };
  toggleRecModal = async () => {
    // if (await hasAPIConnection())
    // {

    

    if (!this.state.modalRecording) {
      console.log("abre RecordModal");
      this.setState({modalRecording: true  });

    }

  };

  closeRecModal = async () => {
    // if (await hasAPIConnection())
    // {

    console.log("close RecModal");
    this.setState({
      modalRecording: false
    });

  };

  closeModalPhotoConfirmation = () => {
    // console.log("closeModalPhotoConfirmation");
    this.props.closeModalConfirmPhoto();

    // this.navigateRoot();
    this.setState({
      photoConfirm: false
    });
  };

  CancelEndQsoModal = () => {
    this.setState({
      endQsoModal: false
    });

    // this.loadVideoReward();
  };

  OpenEndQsoModal = () => {
    this.setState({
      endQsoModal: true
    });
  };

  gotoCameraScreen = async () => {


    if (await hasAPIConnection()) {
      // this.requestCameraPermission().then((hasPermission) => {
      //   if (!hasPermission) return;

    

      Permissions.request("camera").then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log("Camera Permiso: " + response);
        if (response === "authorized") {
          this.props.closeModalConfirmPhoto("image");
          this.props.navigation.navigate("CameraScreen2");
        }

        if (response === "denied" && Platform.OS !== "android") {
          Alert.alert(
            "You denied the access to the Camera",
            "In order to Authorize choose Open Settings",
            [
              {
                text: "No, thanks",
                onPress: () => console.log("Permission denied"),
                style: "cancel"
              },
              { text: "Open Settings", onPress: Permissions.openSettings }
            ]
          );
        }

        if (response === "restricted" && Platform.OS === "android") {
          Alert.alert(
            "You denied the access to the Camera",
            "In order to Authorize go to settings->Apps->superQso->Permissions",
            [
              {
                text: "Ok",
                onPress: () => console.log("ok"),
                style: "cancel"
              }
            ]
          );
        }

        if (response === "restricted" && Platform.OS !== "android") {
          Alert.alert(
            "You do not have access to the Camera",
            "Cause: it is not supported by the device or because it has been blocked by parental controls",
            [
              {
                text: "Ok",
                onPress: () => console.log("ok"),
                style: "cancel"
              }
            ]
          );
        }
      });
    } else this.setState({ nointernet: true });
  };

  navigateRoot = () => {
    const navigateToScreen2 = NavigationActions.navigate({
      routeName: "Root"
    });

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Root", params: {} })]
    });

    // The navigateToScreen2 action is dispatched and new navigation state will be calculated in basicNavigationReducer here ---> https://gist.github.com/shubhnik/b55602633aaeb5919f6f3c15552d1802
    this.props.navigation.dispatch(resetAction);
  };
  navigateReset = () => {
    // const navigation = addNavigationHelpers({
    //   dispatch: this.navigationStore.dispatch,
    //   state: this.navigationStore.state,
    // });
    this.props.navigation.dispatch(NavigationActions.init());
  };

  newQso = async () => {
    if (await hasAPIConnection()) {
      this.videorewardmustbeshown = false;
      this.intersitialmustbeshown = false;

      if (showVideoReward(this.props.userinfo,'newqso','')) {
        this.videorewardmustbeshown = true;
        this.closeAd = 'newqso';
        console.log('pone en true el VIDEOREWARD NEWQSO')
        this.setState({showVideoReward: true})
        // if (this.videorewardLoaded) {
        //   this.closeAd = 'newqso';
        //   this.advertVideoReward.show();
        //   console.log("Es TRUE ShowVideo");
        // }
      }

      if (showIntersitial(this.props.userinfo,'newqso','')) {
        this.intersitialmustbeshown = true;
        this.closeAd = 'newqso';
        console.log('pone en true el INTERSITIAL NEWQSO')
        this.setState({showIntersitial: true})
        // if (this.intersitialLoaded) {
        //   this.closeAd = 'newqso';
        //   this.advertInter.show();
        //   console.log("Es TRUE intersitial");
        // }
      }

      if (!this.intersitialmustbeshown && !this.videorewardmustbeshown)
        this.newqso_after_ad();

    } else this.setState({ nointernet: true });
  };

  newqso_after_ad = async () => {
    RNLocation.getCurrentPermission().then(currentPermission => {
      console.log("el permiso es:" + currentPermission);
      if (
        currentPermission === "notDetermined" ||
        currentPermission === "denied"
      )
        // this.currentLocationPermission = false;
        this.props.manageLocationPermissions("locationpermission", false);
      else this.props.manageLocationPermissions("locationpermission", true);
      // this.currentLocationPermission = true;
    });

    if (this.props.currentlocationpermission) {
      console.log("newqsoafterad");
      this.setState({showIntersitial:false});
      this.setState({showVideoReward:false});
      this.props.newqsoactiveTrue();
      this.props.resetQso();
    } else {
      if (Platform.OS === "android") {
        Alert.alert(
          "You denied the access to the Location",
          "In order to Authorize please accept the Location dialog message or Authorize manually going to settings->Apps->superQso->Permission",

          [
            {
              text: "Ok",
              onPress: () => {
                this._location_permissions("qsonew");

                console.log("ok alert Location");
              },
              style: "cancel"
            }
          ]
        );
      } else {
        // ios
        Alert.alert(
          "You denied the access to the Location",
          "In order to Authorize choose Open Settings",
          [
            {
              text: "No, thanks",
              onPress: () => {
                this._location_permissions("qsonew");
                console.log("Permission denied");
              },
              style: "cancel"
            },
            { text: "Open Settings", onPress: Permissions.openSettings }
          ]
        );
      }
    }
  };

  _location_permissions = async from => {
    console.log("qsoscreendidmount: " + this.props.qsoscreendidmount);
    loc = await AsyncStorage.getItem("locationPermission");

    // solo chequeo permisos la primera vez que se loguea y entra en QsoScreen,
    // no lo quiero volver loco en todas laveces que aparece en QsoScreen
    // Si le va a preguntar siempre la primera vez luego del Login.
    // esto tambien hace que no llame a API de Loaction en el caso que tenga ok el permiso
    // y el usuario saque una foto, ya que cada vez que saca una foto se ejecuta DidMount de nuevo.
    // y el Location con que se mande la primera vez que se logueo y luego en cada vuelta al ForeGround
    // es suficiente
    if (this.props.qsoscreendidmount || from === "qsonew") {
      // quiere decir que va a entrar si es iOS y se carga QsoScreen y fue negado el acceso a location la primera vez.
      //&& Platform.OS==='ios'
      if (
        this.props.qsoscreendidmount &&
        from !== "qsonew" &&
        loc === "false"
      ) {
        console.log("IOS fue negado la primera vez");

        await RNLocation.getCurrentPermission().then(currentPermission => {
          console.log("el permiso es:" + currentPermission);
          if (
            currentPermission === "notDetermined" ||
            currentPermission === "denied"
          )
            // this.currentLocationPermission = false;
            this.props.manageLocationPermissions("locationpermission", false);
          else {
            this.props.manageLocationPermissions("locationpermission", true);
            AsyncStorage.setItem("locationPermission", "true");
          }
          // this.currentLocationPermission = true;
        });

        if (!this.props.currentlocationpermission) {
          if (Platform.OS === "ios")
            Alert.alert(
              "You denied the access to the Location",
              "In order to Authorize choose Open Settings",
              [
                {
                  text: "No, thanks",
                  onPress: () => {
                    this._location_permissions("qsonew");
                    console.log("Permission denied");
                  },
                  style: "cancel"
                },
                { text: "Open Settings", onPress: Permissions.openSettings }
              ]
            );
          else {
            Alert.alert(
              "You denied the access to the Location",
              "In order to Authorize go to settings->Apps->superQso->Permissions",
              [
                {
                  text: "Ok",
                  onPress: () => console.log("ok"),
                  style: "cancel"
                }
              ]
            );
          }
        }
      } else {
        if (this.props.qsoscreendidmount)
          AsyncStorage.setItem("locationPermission", "false");

        this.props.manageLocationPermissions("didmount", false);

        // react-native-location
        RNLocation.configure({
          distanceFilter: 0, // Meters
          desiredAccuracy: {
            ios: "best",
            android: "balancedPowerAccuracy"
          },
          // Android only
          androidProvider: "auto",
          interval: 5000, // Milliseconds
          fastestInterval: 10000, // Milliseconds
          maxWaitTime: 5000, // Milliseconds
          // iOS Only
          activityType: "other",
          allowsBackgroundLocationUpdates: false,
          headingFilter: 1, // Degrees
          headingOrientation: "portrait",
          pausesLocationUpdatesAutomatically: false,
          showsBackgroundLocationIndicator: false
        });

        RNLocation.requestPermission({
          ios: "whenInUse",
          android: {
            detail: "fine",
            rationale: {
              title: "Location permission",
              message:
                "We use your location to calculate the QSO distance and other coming features.",
              buttonPositive: "OK"
              // buttonNegative: "Cancel"
            }
          }
        }).then(
          granted => {
            if (granted) {
              console.log("paso por permisos y dio que tenia OK");
              // AsyncStorage.setItem('location', 'true');
              this._startUpdatingLocation();
              this.props.manageLocationPermissions("locationpermission", true);
              AsyncStorage.setItem("locationPermission", "true");
              //  this.currentLocationPermission = true;

              // this.props.newqsoactiveTrue();
              // this.props.resetQso();
            }
          },
          rejected => {
            console.log("permiso Location rejected");
            console.log(rejected);
          }
        );
      }
    }
  };

  _startUpdatingLocation = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        //  this.setState({ location: locations[0] });

        console.log(
          "ahi registro location bien! lat: " +
            locations[0].latitude +
            "  lat: " +
            locations[0].longitude
        );
        this.props.setLocation(locations[0].latitude, locations[0].longitude);
        this.props.updateLocationBackend(
          locations[0].latitude,
          locations[0].longitude,
          this.props.jwtToken
        );
        //     this.props.manageLocationPermissions(false);
        this._stopUpdatingLocation();
      }
    );
  };

  _stopUpdatingLocation = () => {
    this.locationSubscription && this.locationSubscription();
    //    this.setState({ location: null });
  };

  endQso = () => {
    this.props.newqsoactiveFalse();
    this.props.resetQso();
    this.CancelEndQsoModal();
    // if (!this.intersitialLoaded) this.loadInter();
    // else console.log("ya esta cargado previamente intersitial");
    // if (!this.videorewardLoaded) this.loadVideoReward();
    // else console.log("ya esta cargado previamente videoreward");
  };

  // openPremiumScreen = () => {
  //   this.props.navigation.navigate("BePremium", {
  //     freeparam: "qsoscreen"
  //   });
  // };

  closeVariosModales = (param) => {
  //  this.setState({ nointernet: false, prevideorewarded: false });
    this.setState({ nointernet: false});
    this.props.welcomeUserFirstTime(false);
    // if (param==='yes')
    // setTimeout(() => {
            
    //   console.log('FFF muestro video con delay de 50');
    //   this.advertVideoReward.show();
      
    //  }
    // , 50);
    
 
          console.log("cerro modal:" + param);
    
  };

  not_rewarded = () => {
    console.log('not_rewarded');
    this.setState({ nointernet: false, showVideoReward: false });
     
  }

  receive_data_from_modal = (envio, fileauxProfileAvatar) => {
     console.log("imprimo data que recibo de modal:" );
     console.log(envio);
     this.envio = envio;
     this.fileauxProfileAvatar = fileauxProfileAvatar;
   

   //  this.closeAd = 'sendmedia';
   //  this.advertInter.show();
  // this.subo_s3();

 
  this.videorewardmustbeshown = false;
  this.intersitialmustbeshown = false;

  if (showIntersitial(this.props.userinfo,envio.type,this.props.mediafiles)) {
    console.log('ess true showintersitial');
    
    this.intersitialmustbeshown = true;
    this.closeAd = 'sendmedia';
    this.setState({showIntersitial:true});
    

  }

  if (showVideoReward(this.props.userinfo,envio.type,this.props.mediafiles)) {
    console.log('ess true showvideoreward');
    this.videorewardmustbeshown = true;
    this.closeAd = 'sendmedia';
    this.setState({showVideoReward:true});
 
  }
  
  if (!this.intersitialmustbeshown && !this.videorewardmustbeshown)
       this.subo_s3();


  }

  subo_s3 = async () => {

    this.setState({showIntersitial:false});
    this.setState({showVideoReward:false});
    
    env = this.envio;
    fileauxProfileAvatar = this.fileauxProfileAvatar;
    // envio = {name: fileName2, url: fileaux, fileauxProfileAvatar: this.compressImageURLProfileAvatar, sqlrdsid: this.props.sqlrdsid , description: this.state.description , type: this.props.sqsomedia.type, sent: false ,
    //   status: this.stat, progress: 0.3, size: this.size, rdsUrlS3: rdsUrl, urlNSFW, urlAvatar, date: fecha, width: this.width, height: this.height  } 
    
    // para que le agregue el item a enviar al media que estaba en el store ya que este tiene uno vacio a proposito por el TouchWithoutFeedback
    // y para que luego updateOnProgress haga bien el caclulo.
    this.auxMedia = [...this.props.mediafiles];  
    this.auxMedia.push(env);  

    this.props.addMedia(env);
    // creo mediafilelocal porque trada en actualizar REDUX entonces si es el caso
    // donde debe crear el QSO le envio del mediafileLocal, ver mas abajo.
    mediafileLocal = [ env ];
    
    

        // Fin de agrego a array de media del store

        

//this.props.uploadMediaToS3(fileName2, fileaux, fileauxProfileAvatar, this.props.sqlrdsid, this.state.description,this.size, this.props.sqsomedia.type, rdsUrl,urlNSFW, urlAvatar, fecha, this.width, this.height,this.props.rdsurls3,this.props.jwtToken);

        if (env.status==='inprogress')    // los envia si ya tienen SqlRdsId sino los deja en waiting
        this.props.uploadMediaToS3(env.name, env.url, fileauxProfileAvatar, env.sqlrdsid, env.description,env.size, env.type, env.rdsUrlS3 ,env.urlNSFW, env.urlAvatar, env.date, env.width, env.height,this.props.rdsurls3,this.props.qra,env.rectime,this.props.jwtToken);
        else{
          // puede ser que ya este ingresado BAND, MODE y QRA y el ultimo paso que hizo fue agregar MEDIA
          // entonces hay que chequear si esta listo para crear el QSO y enviar todo junto
          console.log('mediafile Local:'+mediafileLocal);
          console.log(mediafileLocal);
          if (ONPROGRESS=updateOnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.qsoqras,this.auxMedia))
              await this.props.onprogressTrue();
            else
              this.props.onprogressFalse();

              console.log('onprogress '+ONPROGRESS)

              if (ONPROGRESS) {
                data = check_firstTime_OnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.rst,
                  this.props.db, this.props.qra,ONPROGRESS,this.props.sqsosqlrdsid, this.props.latitude,
                                            this.props.longitude);
                    console.log("Data to Send API: "+ JSON.stringify(data));  
                    this.props.actindicatorPostQsoNewTrue();
                    this.props.postQsoNew(data,this.props.qsoqras,mediafileLocal,this.props.jwtToken);
                    
              }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");

          }

  }



yourPosts = async (qra) => {
  console.log('yourlatest');
  urlnotif = 'https://www.superqso.com/'+qra;
  Linking.canOpenURL(urlnotif).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + urlnotif);
    } else {
      if(__DEV__)
        analytics().logEvent("OPENyourposts_DEV", {"QRA": this.props.qra});
      else
        analytics().logEvent("OPENyourposts_PRD", {"QRA": this.props.qra});
    
      return Linking.openURL(urlnotif);
    
    }
  }).catch(err => {
          console.error('An error occurred', err)
          crashlytics().setUserId(this.props.qra);
          crashlytics().log('error: ' + JSON.stringify(err)) ;
          if(__DEV__)
          crashlytics().recordError(new Error('Linking.yourposts_DEV'));
          else
          crashlytics().recordError(new Error('Linking.yourposts_PRD'));


        });
      }


latestPosts = async () => {
  console.log('latest');
  urlnotif = 'https://www.superqso.com/';
  Linking.canOpenURL(urlnotif).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + urlnotif);
    } else {
      if(__DEV__)
        analytics().logEvent("OPENlatestposts_DEV", {"QRA": this.props.qra});
      else
        analytics().logEvent("OPENlatestposts_PRD", {"QRA": this.props.qra});
    
      return Linking.openURL(urlnotif);
    
    }
  }).catch(err => {
          console.error('An error occurred', err)
          crashlytics().setUserId(this.props.qra);
          crashlytics().log('error: ' + JSON.stringify(err)) ;
          if(__DEV__)
          crashlytics().recordError(new Error('Linking.latestposts_DEV'));
          else
          crashlytics().recordError(new Error('Linking.latestposts_PRD'));


        });
      }

  render() {
    const interpolatedRotateAnimation = this.state.rotateValue.interpolate({
      inputRange: [0,  100],
      outputRange: ['0deg','360deg']
    });
    console.log("RENDER qso Screen");

    

    return (
    
      //  <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <HandleBack onBack={this.onBack}>
      <View style={{ flex: 1,  backgroundColor: '#fff'}}>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
        <View style={{ flex: 0.3 }}>
          <QsoHeader />
          
         

          {/* <ActivityIndicator  animating={this.state.actindicatorpostQsoNew} size="large" color='orange' /> */}

          <Modal
            visible={this.state.actindicatorpostQsoNew}
            position={"top"}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            {/* <KeyboardAvoidingView behavior="padding"  > */}
            <View
              style={{
                padding: 10,
                margin: 15,
                backgroundColor: "rgba(0,0,0,0.85)",
                marginTop: 210,
                left: 95,
                //  right: 15,
                // alignItems: 'center',
                // alignContent: 'center',
                width: 155,
                height: 45,
                paddingVertical: 5,
                //   position: 'absolute',

                //  alignItems: 'center',
                borderRadius: 12
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 5
                }}
              >
                Processing ...
              </Text>
            </View>
            {/* </KeyboardAvoidingView > */}
          </Modal>

      {(this.state.nointernet) && 
          <VariosModales
            show={this.state.nointernet}
            modalType="nointernet"
            closeInternetModal={this.closeVariosModales.bind()}
          />
      }

        {/* <VariosModales
            show={this.state.notvideorewarded}
            modalType="notvideorewarded"
            message="Free User: You need to watch the Ad video to create a new qso."
            closeInternetModal={this.closeVariosModales.bind()}
          />  

         <VariosModales
            show={this.state.prevideorewarded}
            modalType="prevideorewarded"
            message="Free User: You need to watch the Ad video to store your photos of this QSO on your feed in the cloud."
            closeInternetModal={this.closeVariosModales.bind()}
          />  */}

          <Modal
            visible={this.state.modalRecording}
            animationType={"slide"}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                margin: 10,
                padding: 10,
                backgroundColor: "rgba(0,0,0,0.85)",
                marginTop: 120,
                //  bottom: 150,
                left: 55,
                right: 55,
                height: 180,
                position: "absolute",
                alignItems: "center",
                borderRadius: 12
              }}
            >
              {/* <RecordAudio2 closeModal={this.toggleRecModal.bind(this)} /> */}
              <RecordAudio2 closeModal={this. closeRecModal.bind(this)} />
             
              {/* <Button onPress={() => this.toggleRecModal()} title="Cierro" /> */}
              {/* <TouchableHighlight  onPress={() => this.cancelRecording()} >
                             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>Cancel</Text>
                          </TouchableHighlight> */}
            </View>
          </Modal>

          <Modal
            visible={this.state.iap}
            animationType={"slide"}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                margin: 10,
                padding: 10,
                backgroundColor: "rgba(0,0,0,0.85)",
                marginTop: 120,
                //  bottom: 150,
                left: 55,
                right: 55,
                height: 400,
                position: "absolute",
                alignItems: "center",
                borderRadius: 12
              }}
            >
              {/* <RecordAudio2 closeModal={this.toggleRecModal.bind(this)} /> */}
               <Iap />
              <Button onPress={() => this.setState({iap:false})} title="Cierro" />
              {/* <TouchableHighlight  onPress={() => this.cancelRecording()} >
                             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>Cancel</Text>
                          </TouchableHighlight> */}
            </View>
          </Modal>

          {/* position= {'top'} animationType={"slide"} */}
          <Modal
            visible={this.state.photoConfirm}
            position={"top"}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            {/* <KeyboardAvoidingView behavior="padding"  > */}
            <View
              style={{
                padding: 10,
                backgroundColor: "rgba(0,0,0,0.85)",
                marginTop: 5,
                left: 15,
                right: 35,
                width: this.width - 35,

                height: this.state.heightPhotoConfirm,
           //  height: 320,
                paddingVertical: 5,
                //   position: 'absolute',

                //  alignItems: 'center',
                borderRadius: 12
              }}
            >
              {/* <Muestro openPremium={this.openPremiumScreen.bind()} send_data_to_qsoscreen={this.receive_data_from_modal.bind()} height={this.state.heightPhotoConfirm} /> */}
              <Muestro  send_data_to_qsoscreen={this.receive_data_from_modal.bind()} height={this.state.heightPhotoConfirm} close={this.closeModalPhotoConfirmation.bind()} />
            
              {/* style={{ paddingBottom: 4}} */}
             
              {/* <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ width: 65 }}
                  onPress={() => this.closeModalPhotoConfirmation()}
                >
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 5 }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
            {/* </KeyboardAvoidingView > */}
          </Modal>

          <Modal
            visible={this.state.endQsoModal}
            animationType={"slide"}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                margin: 20,
                padding: 20,
                backgroundColor: "rgba(0,0,0,0.85)",
                bottom: 230,
                left: 10,
                right: 10,
                position: "absolute",
                alignItems: "center",
                borderRadius: 12
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  alignItems: "center",
                  fontSize: 16,
                  color: "#999",
                  marginBottom: 10
                }}
              >
                Are you sure to END this {this.props.qsotype} post?{" "}
              </Text>

              <View style={{ flexDirection: "row", flex: 1 }}>

              <View style={{ flex: 0.35 }}>
                <TouchableOpacity
                  onPress={() => this.CancelEndQsoModal()}
                  style={{ flex: 0.3, paddingTop: 20, paddingBottom: 4, marginLeft: 17 }}
                >
                  <Text
                    style={{
                      color: "#999",
                      fontWeight: "bold",
                      fontSize: 14
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                </View>
                <View style={{ flex: 0.65, alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => this.endQso()}
                  style={{
                    flex: 0.7,
                    paddingTop: 20,
                    paddingBottom: 4,
                    paddingHorizontal: 4
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: 14, marginRight: 15
                    }}
                  >
                    End this Post
                  </Text>
                </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>
          {/* width:this.width-10 */}
        </View>
        </TouchableWithoutFeedback> 
       
        <View style={{ flex: 0.58 }}>
       
        { !this.props.sqsonewqsoactive && 
        <View  style={{ alignItems:"center", alignContent:"center"}}>
         
        
              <Animated.View style={[styles.animationView,
                    {opacity: this.state.fadeValue},
                    // {transform: [{scale: this.state.springValue}], alignSelf: 'center'}
                  // {left: this.state.xValue}
                    ]} >
                    <TouchableOpacity  onPress={() => this.newQso()}  >
                        <Animated.View style={[styles.button,{alignSelf: 'center' } ]} >
                            <Animated.Image 
                                    source={require('../../images/SuperQSOIcono01.png')}
                                    style={[styles.imageView,
                                    //  {opacity: this.state.fadeValue},
                                    {left: this.state.xValue },
                                    // {transform: [{scale: this.state.springValue}], alignSelf: 'center'}
                                    {transform: [{rotate: interpolatedRotateAnimation}], alignSelf: 'center'}
                                  ]}>
                                  
                                </Animated.Image>
                        </Animated.View>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={() => this.newQso()}  >
                      <Animated.View 
                      style={[{transform: [{scale: this.state.springValue}], alignSelf: 'center'}
                      
                          ]}>
                      <Text style={{fontSize: 16, color: '#243665'}}>Start a POST</Text>
                      </Animated.View>
                    </TouchableOpacity>
                  

             </Animated.View>

              {/* <TouchableOpacity style={{  width: 110,height:100 }} onPress={() => this.setState({iap: true}) }>
                <Image
                  source={require("../../images/iaddcircleTurquesa.png")}
                  style={{ width: 80, height: 80, alignItems:"center", alignContent:"center"}}
                  resizeMode="contain"
                />
                
                <Text style={{ fontSize: 16,  color: '#243665',  fontWeight: 'bold',alignItems:"center", alignContent:"center" }}>IAP</Text>
              </TouchableOpacity> */}
             {(this.state.iconosWeb) &&
              <View style={{ flexDirection: "row", marginTop: 90}}>
              
              <View style={{flex: 0.5,  alignItems:"center", alignContent:"center"}}>
              <TouchableOpacity  style={{alignItems:"center", alignContent:"center", height:100}}  onPress={() => this.latestPosts()}  >
             
              <Image
                  source={require("../../images/home.png")}
                  style={{ width: 36, height: 36, marginTop: 25  }}
                  resizeMode="contain"
                />
                     
                      <Text style={{fontSize: 16, color: '#243665'}}>Latest Posts</Text>
              
                    </TouchableOpacity>
                  
              </View>
              <View style={{flex: 0.5,  alignItems:"center", alignContent:"center"}}>
              <TouchableOpacity style={{  alignItems:"center", alignContent:"center", height:100}} onPress={() => this.yourPosts(this.props.qra)}  >
              <Image 
                  source={require("../../images/activity2.png")}
                  style={{ width: 36, height: 36, marginTop: 25 }}
                  resizeMode="contain"
                />
                      <Text style={{fontSize: 16, color: '#243665'}}>Your Posts</Text>
                  
                    </TouchableOpacity>
              </View>

              
               </View>
               }



            

              </View>
             } 
           
          <MediaFiles />
        
          
  
        </View>
       

        <View style={{ flexDirection: "row", flex: 0.12, marginTop: 6 }}>
          <View style={{ flex: 0.25, marginTop: 3, marginLeft: 5 }}>
            {this.props.sqsonewqsoactive && 
              <TouchableOpacity style={{ width: 70,height:63 }} onPress={() => this.OpenEndQsoModal()}>
                <Image
                  source={require("../../images/endQso2.png")}
                  style={{ width: 33, height: 33, marginLeft: 17, marginTop: 2 }}
                  resizeMode="contain"
                />
                {/* <Text style={{ fontSize: 12, color: '#999'}}>EndQso</Text>           */}
                <Text style={{ fontSize: 13, color: "black", marginLeft: 8 }}>End POST</Text>
              </TouchableOpacity>
              
            }
            {/* <ShareQso /> */}
        
          </View>

          {/* {this.props.sqsonewqsoactive ? ( */}
       {/* { (this.props.sqsosqlrdsid !== '') ? ( */}
            <View style={{ flex: 0.25, alignItems: "flex-end", marginTop: 9 }}>
                  { (this.props.sqsosqlrdsid !== '') &&
                      <ShareQso qra={this.props.qra} qsotype={this.props.qsotype} band={this.props.band} mode={this.props.mode} sqlrdsid={this.props.sqsosqlrdsid}/>
                  }
            </View>
          {/* ) : null} */}

          {/* { (this.props.sqsosqlrdsid !== '') ? */}
          {this.props.sqsonewqsoactive ? (
            <View style={{ flex: 0.25, alignItems: "flex-end", marginTop: 5 }}>
              <TouchableOpacity style={{width: 65,height:63 }}
                onPress={() => this.checkInternetOpenRecording()}
              >
                <Image
                  source={require("../../images/mic.png")}
                  style={{ width: 33, height: 33, marginLeft: 15, marginTop: 2 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 13, color: "black",  marginLeft: 10  }}>Record</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* <Button onPress={() => this.props.navigation.navigate("QslScanScreen")} title="QslScan" /> */}
          {/* <Button onPress={() => this.gotoCameraScreen()} title="Camera" /> */}

          {/* { (this.props.sqsosqlrdsid !== '') ? */}
          {this.props.sqsonewqsoactive ? (
            <View style={{ flex: 0.25, alignItems: "center", marginTop: 5 }}>
              <TouchableOpacity style={{ width: 65,height:63 }} onPress={() => this.gotoCameraScreen()}>
                <Image
                  source={require("../../images/camera.png")}
                  style={{ width: 33, height: 33, marginLeft: 15, marginTop: 2 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 13, color: "black",   marginLeft: 14 }}>Photo</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
          {(this.state.showIntersitial) && <AdInter newqso={this.newqso_after_ad.bind()} subos3={this.subo_s3.bind()} closead={this.closeAd}  /> }
          {(this.state.showVideoReward) && <AdVideoReward newqso={this.newqso_after_ad.bind()} subos3={this.subo_s3.bind()} closead={this.closeAd} notrewared={this.not_rewarded.bind()} /> }
          
          {(this.props.welcomeuserfirsttime) && 
            <VariosModales
            show={true}
            modalType="welcomefirsttime"
            closeInternetModal={this.closeVariosModales.bind()}
          /> }


      {(this.state.stopApp) &&
                              <StopApp appNeedUpgrade={this.state.appNeedUpgrade} pushTokenNotFound={this.state.pushTokenNotFound} 
                              forceChangePassword={this.state.forceChangePassword} upgradeText={this.state.upgradeText}/>
      }

      </View>
      </HandleBack>
      //  </TouchableWithoutFeedback>
  
    );
  }
}


const styles = StyleSheet.create({
 
  animationView: {
    // position: "absolute",  estaba en 85 el marginTop
       marginTop: 25,
    // right: 180
    // width: 100,
    // height: 100,
  //  backgroundColor: 'skyblue',
  },
  imageView: {
    width: 50,
    height: 50,
    resizeMode : 'contain'
    
    
  },
  button: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#333",
    shadowOpacity: .1,
    shadowOffset: {x:2, y:0},
    shadowRadius: 2,
    borderRadius: 35,
    backgroundColor: '#243665'


  }
  
});

const mapStateToProps = state => {
  // return {  isTransitioning: state.nav.isTransitioning,
  //     index: state.nav.routes[0].index,
  //     routes: state.nav.routes[0].params,
  //     sqso: state.sqso };
  return {
    sqsomodalconfirmphotoheight: state.sqso.currentQso.modalconfirmphotoHeight,
    sqsomodalconfirmphoto: state.sqso.currentQso.modalconfirmphoto,
    sqsomodalrecording: state.sqso.currentQso.modalrecording,
    sqsosqlrdsid: state.sqso.currentQso.sqlrdsId,
    sqsoactivityindicatorImage: state.sqso.currentQso.activityindicatorImage,
    sqsonewqsoactive: state.sqso.newqsoactive,
    qsotype: state.sqso.currentQso.qsotype,
    sqsoactindicatorpostqsonew: state.sqso.currentQso.activityindicatorPostQsoNew,
    notifbackground: state.sqso.currentQso.notifBackground,
    userinfo: state.sqso.userInfo,
    jwtToken: state.sqso.jwtToken,
    qsoscreendidmount: state.sqso.qsoScreenDidmount,
    currentlocationpermission: state.sqso.currentLocationPermission,
    adshowed: state.sqso.adShowed,
    iapshowed: state.sqso.iapShowed,
    qsoscreendidmountfirsttime: state.sqso.qsoScreenDidMountFirstTime,
    rdsurls3: state.sqso.urlRdsS3,
    band: state.sqso.currentQso.band,
    mode: state.sqso.currentQso.mode,
    rst: state.sqso.currentQso.rst,
    db: state.sqso.currentQso.db,
    //qsotype: state.sqso.currentQso.qsotype,
    qsoqras: state.sqso.currentQso.qsoqras,
   // sqlrdsid: state.sqso.currentQso.sqlrdsId,
    latitude: state.sqso.currentQso.latitude,
    longitude: state.sqso.currentQso.longitude,
    mediafiles: state.sqso.currentQso.mediafiles,
    welcomeuserfirsttime: state.sqso.welcomeUserFirstTime,
    env: state.sqso.env,
    qra: state.sqso.qra

  };
};

const mapDispatchToProps = {
  fetchPeople,
  cambioqsotype,
  closeModalConfirmPhoto,
  cameraPermissionTrue,
  cameraPermissionFalse,
  audiorecordingPermissionFalse,
  audiorecordingPermissionTrue,
  newqsoactiveTrue,
  newqsoactiveFalse,
  resetQso,
  openModalRecording,
  setLocation,
  setToken,
  get_notifications,
  manage_notifications,
  updateLocationBackend,
  manageLocationPermissions,
  qsoScreenDidMountFirsTime,
  onprogressTrue,
  onprogressFalse,
  actindicatorPostQsoNewTrue,
  postQsoNew,
  addMedia,
  uploadMediaToS3,
  welcomeUserFirstTime,
  confirmReceiptiOS,
  confirmReceiptAndroid
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QsoScreen);
