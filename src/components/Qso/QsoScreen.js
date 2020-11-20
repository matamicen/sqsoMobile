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
  confirmReceiptiOS, confirmReceiptAndroid, sendActualMedia, setProfileModalStat, setConfirmProfilePhotoModal, openModalConfirmPhoto, setPressHome,
  postQsoEdit, postQsoQras, setWebView, setJustPublished, actindicatorPostQsoNewFalse, qsoPublish, updateCommentInMemory, uploadVideoToS3, setVideoUploadProgress,
  setExternalShreUrl} from "../../actions";
import QsoHeader from "./QsoHeader";
import MediaFiles from "./MediaFiles";
import RecordAudio2 from "./RecordAudio2";
import Iap from "./Iap";
import ShareQso from "./ShareQso";
//import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker2 from 'react-native-image-picker';
import Upload from 'react-native-background-upload';
import ShareMenu from 'react-native-share-menu';

import Muestro from "./Muestro";
import { NavigationActions, addNavigationHelpers } from "react-navigation";
//import {  Permissions } from 'expo';
import {
  hasAPIConnection,
  showVideoReward,
  showIntersitial,
  updateOnProgress, check_firstTime_OnProgress, apiVersionCheck, getDate, missingFieldsToPublish,
   todaMediaEnviadaAS3, percentageCalculator, addMediaCheck, createSQSOfolder } from "../../helper";
import VariosModales from "./VariosModales";
import {request, PERMISSIONS, RESULTS, check} from "react-native-permissions";
import { LogLevel, RNFFmpeg,  RNFFprobe, RNFFmpegConfig } from 'react-native-ffmpeg';


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
import CamaraSelect from './CamaraSelect';
import I18n from '../../utils/i18n';
import DeletePost from './DeletePost';
import Publicar from './Publicar';
// import global_config from '../../global_config.json';
// import StartNewPost from './StartNewPost';
import MissingFieldsToPublish from './MissingFieldsToPublish';
import global_config from '../../global_config.json';
// import { ProcessingManager } from 'react-native-video-processing';
import RNFetchBlob from 'rn-fetch-blob';
import ImageResizer from 'react-native-image-resizer';




import RNIap, {
  Product,
  ProductPurchase,
  acknowledgePurchaseAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';

Auth.configure(awsconfig);


class QsoScreen extends React.PureComponent {
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
    this.missingMessage = '';
    this.intervalID = 0;
    this.base64preview = '';
    this.videoPathBeforeCompress = '';
    this.dataHeader = {};
    this.pressPublish = false;
    this.pressVideo = false;
    this.imagePreviewPath = '';
    this.videoSize = 0;
    this.file10_delete = {}
    this.videoaux_delete = {}
   


    
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
      novideomp4: false,
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
      iconosWeb: false,
      camaraSelect: false,
      deletePost: false,
      // startNewPost: false,
      missingFields: false,
      videoCompression: 'null',
      videoPercentage: 0,
      videoCompressPercentage: 0,
      videoFromShare: null,
      readingVideo: false,
      percentageCompressionInitialTime: '',
      videoSizeBeforeCompress: 0,
      externalShareurl: false
  

     
    };
  }


  

  static navigationOptions = {
    tabBarLabel: " ",
  //  13

    tabBarIcon: ({ tintColor }) => {
      return (
        // <View
        //   style={{
        //     width: 44,
        //     height: 20,
        //     marginTop: Platform.OS === "ios" ? 3 : 3, backgroundColor:'green'
        //   }}
        // >   marginTop: Platform.OS === "ios" ? 9 : 26
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
          <Image
           style={{  width: 31, height: 31, marginLeft: I18n.locale.substring(0, 2)==='es' ? 0:0, marginTop: Platform.OS === "ios" ? 22 : 26}}
          // style={{  width: 31, height: 31, marginLeft: I18n.locale.substring(0, 2)==='es' ? 8:0}}
         //   source={require("../../images/qsoicon3.png")}
            source={require("../../images/MicrofonoGris.png")}
            resizeMode="contain"
          />
           <Text style={{ fontSize: 9, marginTop: 2, marginLeft: 0 }}>{I18n.t("QsoScrTitle")}</Text>
          {/* <Text style={{ fontSize: 9, marginTop: 2, marginLeft: 4 }}>{I18n.t("QsoScrTitle")}</Text> */}
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
      pickerDisplayed: props.sqsomodalrecording,
      videoPercentage: props.videopercentage,
      
    };

    return null;
  }


 

  async componentDidMount() {
    console.log("COMPONENT did mount QSO Screen!");


  

    // esto detecta cuando se apreta el TAB  de QSOSCREEN
    this.props.navigation.setParams({
      tapOnTabNavigator: this.tapOnTabNavigator
    })

    

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

          ShareMenu.getSharedText((text) => {
      console.log('el text del share 05:'+JSON.stringify(text) )
      
      // if (text!==null) {
        if (text!==null && (typeof text !== 'undefined')) {
       
        console.log('el text del share hay data 05: '+ text)
        auxshare1 = JSON.stringify(text);
        auxshare2 = JSON.parse(auxshare1);
        console.log('auxshare: ' + auxshare2.data)
        AsyncStorage.setItem('shareExternalMedia', auxshare2.data);
        AsyncStorage.setItem('shareExternalMediaMimeType', auxshare2.mimeType);
        this.props.setExternalShreUrl(true);
     
              this.props.newqsoactiveFalse();
              this.props.resetQso();
             

             this.props.navigation.navigate("QsoScreen");
       

      
      }else
      {
     
      // this.props.setExternalShreUrl(false);
    
      }

    })
  
      // si vino de background por haber mostrado la publicidad, vuelvo a resetear
      // el adShowed a false
      if (this.props.adshowed || this.props.iapshowed===1)
      {
        this.props.manageLocationPermissions("adshowed", false);
      //  this.props.manageLocationPermissions("iapshowed", 0);
      }
      else {
       // si la app viene de background por usar photoGallery entonces no hago nada 
       console.log('photofromgallery valor: '+this.props.photofromgallery)
      if (this.props.photofromgallery===0)
        // Todos estos llamados requieren INTERNET, entonces chequeo internet para que despues no intenten llamar y salgan todos por su respectivo CATCH
        if (await hasAPIConnection())
        {

         // chequeo version minima de APP  
            apiCall = await apiVersionCheck();
            console.log('despues de apiVersionCheck: '+apiCall)

            if (apiCall.stop)
              // this.setState({stopApp: true, appNeedUpgrade: true, upgradeText: apiCall.message})
              this.setState({stopApp: true, appNeedUpgrade: true, upgradeText: I18n.t("STOPAPP_UPGRADE")}) 
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
        else this.props.manage_notifications("NOTIF_BACKGROUND_FALSE", "",'');
        // le cambio el flag a FALSE si volvio de navegar por hacer click en una notificacion,
        //la idea es que si se va a background de manera natural que al regresar si vaya al
        // backend ya que esto sucede con menos frecuencia

        // envio location cada vez que viene de background, con esta info actializada
        // luego puedo tener mas precision para hacer futuros CQ
        // pero chequeo que no haya venido del background por haber mostrado
        // la publicidad

        // saco location
        if (this.props.currentlocationpermission && !this.props.adshowed)
          this._startUpdatingLocation();

        }
        else
            console.log('no hay internet'); 
      
            else{
              // estos estados se hacen porque el ImagePicker se va a background y no quiero
              // que llame a todas las APIs de arriba, no tiene sentido y ademas el ek ImagePicker de Gallery
              // es pesado en recursos mejor dejalo solito que trabaje sin APIs en background
              // esto evita esos llamados pero iOS funciona distinto q android entonces si ImagePicker se cancela, 
              // en android si el user se a a background y vuelve la primera vez no llama a las APIs, la segunda vez si, en IOS recien la tercera vez
              // Pero solo en el caso que cancel, si ambos llegan a subir la foto del picker (ya sea en un POST o PROFILE, la proxima vez el background funciona)
              if (this.props.photofromgallery===1)
               {console.log('photoFromGallery envio background primer vez');
               setTimeout(() => {
                
             
                  this.props.manageLocationPermissions("photofromgallery", 2);
          
                
              }, 500);
              
               }
               if (this.props.photofromgallery===2)
               {console.log('photoFromGallery envio background segunda vez');
               // es 2 entonces ya termino el picker y lo vuelve a 0
               
               setTimeout(() => {
                
             
                this.props.manageLocationPermissions("photofromgallery", 0);
          
                
              }, 500);
               } 

              //  if (this.props.photofromgallery===3)
              //  {console.log('photoFromGallery envio background tercera vez');
              //  // es 2 entonces ya termino el picker y lo vuelve a 0
              //  this.props.manageLocationPermissions("photofromgallery", 0);
              //  } 

            }

      
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
   if (addMediaCheck('image',this.props.mediafiles))
    
    if (await hasAPIConnection()) {
      // analytics().logEvent("Recording", {"QSOTYPE": this.props.qsotype,
      //  "BAND": this.props.band, "MODE": this.props.mode, "RECTIME": "30"});

      // console.log("Recording analytics")
      if (Platform.OS==='android')
        REC_PERMISSION = PERMISSIONS.ANDROID.RECORD_AUDIO;
      else
        REC_PERMISSION = PERMISSIONS.IOS.MICROPHONE;
      // Permissions.request("microphone").then(response => {
        request(REC_PERMISSION).then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log("Microphone Permiso: " + response);
        // if (response === "authorized") {
          if (response === RESULTS.GRANTED){
         
          this.toggleRecModal();
        }

        // if (response === "denied" && Platform.OS !== "android") {
          if (response === RESULTS.DENIED && Platform.OS !== "android") {
          Alert.alert(
            I18n.t("DENIED_ACCESS_2"),
            I18n.t("TO_AUTHORIZE_2_IOS"),
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

        // if (response === "restricted" && Platform.OS === "android") {
          if (response === RESULTS.BLOCKED && Platform.OS === "android") {
          Alert.alert(
            I18n.t("DENIED_ACCESS_2"),
            I18n.t("TO_AUTHORIZE_2_ANDROID"),
            [
              {
                text: "Ok",
                onPress: () => console.log("ok"),
                style: "cancel"
              }
            ]
          );
        }

        // if (response === "restricted" && Platform.OS !== "android") {
       if (response === RESULTS.BLOCKED && Platform.OS !== "android") {
          Alert.alert(
            I18n.t("ACCESS_TO_MICROPHONE"),
            I18n.t("PARENTAL_CONTROLS"),
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
    else
    {
    this.missingMessage =  I18n.t("QsoScrMixMedia");
    this.setState({ missingFields: true})
    }
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
    // this.props.manageLocationPermissions("photofromgallery", 0);
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


  CloseCamaraSelect = () => {
    this.setState({
      camaraSelect: false
    });

  }

  CloseDeletePost = () => {
    this.setState({deletePost: false})
  }

  closeStartNewPost = () => {
    this.setState({startNewPost: false})
  }

  closeMissingFields = () => {
    this.setState({missingFields: false})
  }


  
  OpenEndQsoModal = () => {
    this.setState({
      endQsoModal: true
    });
  };


  tapOnTabNavigator = async () => {
    console.log('PRESS QSOSCREEN!');
    this.props.setPressHome(0);
  }

  videoFromGallery = async (fromShare) => {

if (this.pressVideo===false)
{// evitar que presione mas una vez Video (porque dumpea)
  this.pressVideo = true;


  if(addMediaCheck('video',this.props.mediafiles))
  {

    if (await hasAPIConnection()) {

      

       
      // envio a reducer que se fue a background por usar la GELRIA de FOTOS
      // luego este dato lo uso para cuando venga de background no actualizar notificaciones, etc si
      // se fue a background por la galeria y mejorar performance y llamados a APIs  
  
      //el picker manda dos veces a Background la APP, entonces necesito tener tres estados y no dos,
      // 0: el picker no fue usado
      // 1: el picker envio a background la primera vez
      // 2: el picker envio a background la segunda vez
      // Permissions.request('storage').then(res => {
        // STORAGE_PERMISSION = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
        // request(STORAGE_PERMISSION).then(response => {
        
        //  console.log('paso permiso: '+JSON.stringify(response));
   if (fromShare===false)       
   {  
      console.log('tomo video de galeria');
      this.props.manageLocationPermissions("photofromgallery", 1);

      let storagePermission = true;

           if (Platform.OS==='android') // android debe preguntar permiso de storage por el Write del video al disco
          {
            
                STORAGE_PERMISSION = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

                  response = await request(STORAGE_PERMISSION)
                    //si entro por primera vez aca, luego de aceptar vuelve de background de nuevo y pierde el SHARE del usuario
                  //entonces recupero el share del asyncstorage
                
                  if (response !== RESULTS.GRANTED)
                      storagePermission = false;
          
          }
   
      if (storagePermission) 
     {   


      // ImagePicker.openPicker({
     
      //      mediaType: "video",
      //    }).then(image => {
      //      console.log(image);
      //      console.log('nombre del archivo: '+image)
      //      console.log(JSON.stringify(image));
      //      res = JSON.stringify(image);
      //      console.log(res);
      //       this.pathglobal = res.path;
      const options = {
        title: 'Video Picker',
        takePhotoButtonTitle: 'Take Video...',
        mediaType: 'video',
       
        //  videoQuality: 'medium',
      };
      
      
       
      // ImagePicker2.showImagePicker(options, response => {
        ImagePicker2.launchImageLibrary(options, response => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled video picker');
          this.pressVideo = false;
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          this.pressVideo = false;
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          //  this.takeFrame3(response)
  
          
        // }

          console.log('comprime Video22:');
     
     
          // let bodyJson = JSON.parse(res);
          // console.log('path del picker1')
          //  console.log(bodyJson.path);
          // console.log(this.pathglobal);
     
      // console.log('comprime ahora1')
      // tiempo1 = Date.now();
     //  ProcessingManager.compress(bodyJson.path, {width:360, height:640, bitrateMultiplier: 9,minimumBitrate: 300000}).then((data) => {
       // ProcessingManager.compress(bodyJson.path, {bitrateMultiplier: 17,minimumBitrate: 300000}).then((data) => { para 1080 pero mas de 1 minuto en mi android se muere
       

     
       this.pressVideo = false;



       
        this.takeFramePreview(response.path);
     
     
     
         
          
          }
     
        });

      }
      //    }).catch((err) => {
      //      console.log("cropImage Error", err.message);
      //      this.pressVideo = false;
 
           
      //      crashlytics().setUserId(this.props.qra);
      //      crashlytics().log('error: ' + JSON.stringify(err)) ;
      //      if(__DEV__)
      //      crashlytics().recordError(new Error('openVideoGallery_DEV'));
      //      else
      //      crashlytics().recordError(new Error('openVideoGallery_PRD'));
      //  });
     
    // });
   }
   else
   {
     // el video viene de share
     this.pressVideo = false;
     let pathoculto = false;
     let auxuri = '';
     let path = '';

     console.log('antes de llamar a takeFrame: ' +this.state.videoFromShare);
     let storagePermission = true;

           if (Platform.OS==='android') // android debe preguntar permiso de storage por el Write del video al disco
          {
            
                STORAGE_PERMISSION = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

                  response = await request(STORAGE_PERMISSION)
                    //si entro por primera vez aca, luego de aceptar vuelve de background de nuevo y pierde el SHARE del usuario
                  //entonces recupero el share del asyncstorage
                
                  if (response !== RESULTS.GRANTED)
                      storagePermission = false;
          
          }
   
      if (storagePermission) 
     {   

             // open the reading video modal
             this.setState({readingVideo: true})
             console.log('this.state.videoFromShare')
             console.log(this.state.videoFromShare)
             realUrl = await this.getVideoPath(this.state.videoFromShare);
            // console.log(realUrl.data.path)

    
                await createSQSOfolder();


                if (Platform.OS==='ios'){
                path = RNFetchBlob.fs.dirs.DocumentDir+'/sqso/checkpath.jpg';
                auxuri = this.state.videoFromShare.replace("file:///", 'file://');
                pathoculto = false;
                }
            else
             
                path = RNFetchBlob.fs.dirs.DCIMDir+'/sqso/checkpath.jpg';
                
            

                // console.log('path extraido es true?:'+ realUrl.data.path + ' status: '+realUrl.status)
     
                //  console.log(' status: '+realUrl.status);
       
      // uso esta funcion para chequear si el path lo puede abrir FFmpeg tanto para FramPreview y es lo mimso para comprimir
      // si lo puede abrir quiere no lo mando a leer el BASE64 porque tarda y ademas si el archivo es grande CRASHEA
      // y como lo puedo abrir directamente lo extraigo el preview (no hace falta leerlo en memoria) y tambien se que lo va a poder comprimir
      // AHORA si no lo puede abrir es porque el path esta oculot(generalmente es un SHARE de WSAPP o un archivo de galeria que se hizo Download de WSAPP)
     // en este caso hay que leerlo BASE64 en memoria pero como son archivos de WSAPP no ocupan mas de 20mb y la lectura se banca bien
  if (Platform.OS==='android')
    if (realUrl.status)// si bien encontro un path, hay que descartar que sea NO LEIBLE (caso cuando se baja media de WSAPP en la galeria)
    {
      console.log('path:')
      console.log(path)
    //  await RNFFmpeg.execute("-y -ss 00:00:01 -i "+ realUrl.data.path +" -vframes 1 -q:v 4 "+path).then(result => {
      await RNFFmpeg.execute("-y -ss 00:00:01 -i "+ realUrl.data.path +" -vframes 1 -q:v 4 "+path).then(result => {   
    console.log(`FFmpeg take frame1 process exited with rc=${result}.`)
          if (result===0)
          {    
            
            // auxurl = "file://"+ realUrl.data.path;
            //   this.takeFramePreview(auxurl);

              pathoculto = false;
              console.log('path no oculto');
           }
          else
          {

            pathoculto = true;


            console.log('path oculto');
         
       

           }

              });
    
 

            }
               else
                pathoculto = true; 
                // todo este IF es solo si es Anroid

       


          if (pathoculto) // unicamente android puede tener un path oculto o que no se pueda acceder(share de whatsapp o galeria de media bajada de whatsapp)
          { 
            console.log('path oculto');
         
      
             auxuri = this.state.videoFromShare;
       
           RNFetchBlob.fs.readFile(auxuri,'base64')
           // files will an array contains filenames
           .then((files) => {
          
           console.log('finalizo lectura base64')
          //  console.log(files);
         
            this.saveVideoToDisk(files,'video/mp4');
          
        
           })


          }else
          {
            
           
           if (Platform.OS==='android'){

            auxurl = "file://"+ realUrl.data.path;
            this.takeFramePreview(auxurl);
           }
            else // ios
            this.takeFramePreview(auxuri);


          }
  

          


        } // storagePermission

          
        
     
   }




   }
        else {
          this.setState({ nointernet: true });
          this.pressVideo = false;
        }
    }else
    { // no se puede mezcalr VIDEO con audio o fotos, el VIDEO va solo
      this.missingMessage =  I18n.t("QsoScrMixMedia")
      this.pressVideo = false;
      this.setState({ missingFields: true})
      
    }

  }

  }

  saveVideoToDisk = async (file64,mimeType) => {
    console.log('savetodisk: '+ mimeType)

    await createSQSOfolder();

    
    if (mimeType==='video/mp4')
 { 
  let path = '';
  if (Platform.OS==='android')
     path = `${RNFetchBlob.fs.dirs.DCIMDir}/sqso/videoaux.mp4`;
   else 
     path = `${RNFetchBlob.fs.dirs.DocumentDir}/sqso/videoaux.mp4`;
  
  const data =  await RNFetchBlob.fs.writeFile(path, file64, 'base64');
    console.log(data, 'grabo video aux en disco');
    this.takeFramePreview(path);
  } 
  if (mimeType==='image/jpg')
  { 
   

    let path = '';
    if (Platform.OS==='android')
    path = RNFetchBlob.fs.dirs.DCIMDir+'/sqso/'+  new Date().getTime()+'.jpg';
    // path = RNFetchBlob.fs.dirs.DCIMDir+'/sqso/'+ new Date().getTime()+'.jpg';
   else 
     path = RNFetchBlob.fs.dirs.DocumentDir+'/sqso/'+ new Date().getTime()+'.jpg';
  

   const data =  await RNFetchBlob.fs.writeFile(path, file64, 'base64');
     console.log(data, 'grabo imagen aux en disco');
    //  this.takeFramePreview(path);
    // if (Platform.OS==='ios')
    //     auxpath = path.replace("file:///", 'file://');
    //     else
    //     auxpath = path;

    this.send_image_info_to_muestro(path);
   } 

  }


  takeFramePreview = async (videoPath) => {
    let image = {
      width: 0,
      height: 0,
      duration: 0,
      size: 0
    }

    await createSQSOfolder();

    let path = '';
    // lo vuelvo a null por si sube un proximo video en otra publicacion
           this.setState({videoFromGallery: null})
            console.log ('desde takFramePreview')
            console.log('desde share: '+ videoPath);
            // console.log('width: '+image.width)
           // obtengo 1 frame como foto del video

           const maximumSize = { width: 100, height: 200 };
           // const maximumSize = { width: 400, height: 200 };
           fileaux =  this.props.qra + '_' + new Date().getTime()+'.mp4'; // le asigno un nombre univoco al video

           if (Platform.OS==='ios')
                    path = RNFetchBlob.fs.dirs.DocumentDir+'/sqso/'+ new Date().getTime()+'.jpg';
                else
                    path = RNFetchBlob.fs.dirs.DCIMDir+'/sqso/'+ new Date().getTime()+'.jpg';
                   
           inicioCom = new Date();
          //  -ss 01:23:45 -i input -vframes 1 -q:v 2 output.jpg
           await RNFFmpeg.execute("-y -ss 00:00:01 -i "+ videoPath +" -vframes 1 -q:v 4 "+path).then(result => {
             console.log(`FFmpeg take frame process exited with rc=${result}.`)
              //  console.log(result)
              finCom = new Date();
              timepoCom = finCom-inicioCom;
              console.log('tiempo de takeFrame: '+ timepoCom);


                            RNFFprobe.getMediaInformation(videoPath).then(information => {
                              if (information.getMediaProperties() !== undefined) {
        
                                  let streams = information.getStreams();
                                // console.log(`size video a comprimir: ${information.getAllProperties().format.size}`);
                                
                                // console.log(`duration video a comprimir: ${Math.floor(information.getAllProperties().format.duration/1)}`);
                                // console.log(`Width video a comprimir: ${streams[0].getAllProperties().width}`);
                                // console.log(`Height video a comprimir: ${streams[0].getAllProperties().height}`);

                                // obtengo la duracion para luego sacar el progress verdadero de compresion y mostrar al usuario
                                this.videoDurationSeconds = Math.floor(information.getAllProperties().format.duration/1);
                                this.videoSize = information.getAllProperties().format.size;
                              }
                      
                          });

              });


           

        
              

     
              this.videoPathBeforeCompress = videoPath;

            

              inicioCom = new Date();
        
              
              image.width = 352; //res2.size.width;
              image.height =  640;//res2.size.height;
              image.duration = 0; //res2.duration;
              image.size = 0; // no trae el size esta api 
     

                try { 


                  console.log('takePreview path: ' +path)
                  this.imagePreviewPath = 'file:///'+path;
                  // this.imagePreviewPath = this.compressImagePreview

                  // close the reading video modal
                  this.closeVariosModales();


                } catch (error) {
                  console.log(error.message);
                }

         

           

         uri = '';
          // uri = data;  TRIM
          
             //  fileName2 = uri.replace(/^.*[\\\/]/, '');
             fileName2 = ''; 
     
          // envio base64preview y videoLocation para que que Muestro muestre imagen preview del video a enviar y la locacion real del video tomada por el picker
              console.log('filename2 es: ' + fileName2 + ' this.imagePreviewPath: '+ this.imagePreviewPath);
              envio = {name: fileName2, url: uri, type: 'video', sent: 'false', size: image.size, width: image.width, height: image.height, qra: this.props.qra,  rectime: 0, gallery: true, previewCompressed:this.imagePreviewPath, duration: image.duration  } 
              
              // console.log('phototype :'+this.props.phototype)
              
            //  vari2 = await 
              // videocompress
             vari2 = this.props.sendActualMedia(envio);
              console.log("Fin de espera larga ANDROID")
              // this.props.navigation.navigate("ProfileScreen");
              // this.goBack();
              
              if ( Platform.OS === 'ios')
              timer = 1000;
                else timer = 500;
          
              // reseteo el modal porque pudo haber quedado en TimeOut si este es el segundo intento
              // de sacar la foto de profile.
             
              this.props.setProfileModalStat('ambos',0);
          
              setTimeout(() => {
                console.log("hago esperar 1200ms para q siempre se abra el modal en qsoScreen");
                //  this.props.actindicatorImageDisabled();
                  // this.props.openModalConfirmPhoto(320);
                 
                //  este metodo es para cuando es foto profile
               
                // videocompress
                this.props.openModalConfirmPhoto(490);
                 
                 
                
              }, timer);
          
          
                // ya tomo la foto del picker entonces el flag vuelve a 0.
                // this.props.manageLocationPermissions("photofromgallery", 0);
            
              console.log('este debe aparecer primero');

            // }
            


  }

 getVideoPath = (uri) => {
    return new Promise((resolve) => {
      RNFetchBlob.fs.stat(uri)
      .then((stats) => { 
        resolve({
          status: true,
          data: stats
        })
      })
      .catch((err) => {
      resolve({
        status: false
      })
    })
  })
  }


  photoFromShare = async (shareExternalMedia) => {
    console.log('getMediaInformation1 ');



    let storagePermission = true;

    if (Platform.OS==='android') // android debe preguntar permiso de storage por el Write del video al disco
   {
     
         STORAGE_PERMISSION = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

           response = await request(STORAGE_PERMISSION)
             //si entro por primera vez aca, luego de aceptar vuelve de background de nuevo y pierde el SHARE del usuario
           //entonces recupero el share del asyncstorage
         
           if (response !== RESULTS.GRANTED)
               storagePermission = false;
   
   }

if (storagePermission) 
{   

    if (Platform.OS==='ios')
    auxpath = shareExternalMedia.replace("file:///", '/');
    else
    auxpath = shareExternalMedia;

   
    RNFetchBlob.fs.readFile(auxpath,'base64')
    // files will an array contains filenames
    .then((files) => {
   
    console.log('finalizo lectura base64')
   //  console.log(files);
  
     this.saveVideoToDisk(files,'image/jpg');
   
 
    })

  }
  
  }

  photoFromShare_0 = async (shareExternalMedia) => {

  let fileName2 = '';
  let uri = '';

    // if (Platform.OS==='android'){
            
    //   STORAGE_PERMISSION = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

    //     response = await request(STORAGE_PERMISSION)
      
    //     if (response === RESULTS.GRANTED){
    //    // si entro por primera vez aca, luego de aceptar vuelve de background de nuevo y pierde el SHARE del usuario
    //   // entonces recupero el share del asyncstorage
    //     console.log('STORAGE_PERMISSION');


        // open the reading video modal
      // this.setState({readingVideo: true})

      //   realUrl = await this.getVideoPath(shareExternalMedia);
      //   if (!realUrl)
      //   { console.log('real url: '+ JSON.stringify(realUrl))
      //   console.log('real url2: '+ realUrl.data.path)

      //   uri = 'file://'+realUrl.data.path;

      //  fileName2 = realUrl.data.filename;
   
      //   // this.takeFramePreview(realUrl.data.path);
      // }else
      // {

        console.log('getMediaInformation1 ');


        //  realUrl = await this.getVideoPath(shareExternalMedia);
        //  console.log('path imagen: '+realUrl);
        //  console.log(realUrl);

        RNFetchBlob.fs.readFile(shareExternalMedia,'base64')
        // files will an array contains filenames
        .then((files) => {
       
        console.log('finalizo lectura base64')
       //  console.log(files);
      
         this.saveVideoToDisk(files,'image/jpg');
       
     
        })

        // RNFFprobe.getMediaInformation(shareExternalMedia).then(information => {
          // RNFFprobe.getMediaInformation(shareExternalMedia).then(information => {
          // if (information.getMediaProperties() !== undefined) {
       
           

          //     let streams = information.getStreams();
          //   console.log(`size papa1: ${information.getAllProperties().format.size}`);
          //   console.log(`duration papa1: ${Math.floor(information.getAllProperties().format.duration/1)}`);
          //   console.log(`Width papa1: ${streams[0].getAllProperties().width}`);
          //   console.log(`Height papa1: ${streams[0].getAllProperties().height}`);


          // }});

      // el URI del External Share de una imagen viene en formato CONTENT:// pero el ImagePicker lo puede leer y no tarda en leerlo porque es una imagen, y de paso me formatea la imagen,
      // la logica dentro del ImagePicker Corpper es la misma que cuando se toma una foto de la galeria photoFromGallery
        console.log('path oculto');
    
           ImagePicker.openCropper({
          //   ImagePicker.openCamera({
          //  ImagePicker.openPicker({
              path: shareExternalMedia,
              //  width: (Platform.OS==='ios') ? 7100 : 1200,
              //  height: (Platform.OS==='ios') ? 10500 : 1200,
              // compressImageMaxWidth: true
              // avoidEmptySpaceAroundImage: false

           }).then(image => {
             console.log(image);
             console.log('nombre del archivo: '+image)
             console.log(JSON.stringify(image));
       
             // image/jpeg video/mp4
             if (image.mime !== 'video/mp4') 
           {
      
             uri = image.path;
       
           fileName2 = uri.replace(/^.*[\\\/]/, '');
           
       
           console.log('filename2 es: ' + fileName2);
           envio = {name: fileName2, url: uri, type: 'image', sent: 'false', size: image.size, width: image.width, height: image.height, qra: this.props.qra,  rectime: 0, gallery: true } 
           
           // console.log('phototype :'+this.props.phototype)
           
         //  vari2 = await 
         vari2 = this.props.sendActualMedia(envio);
           console.log("Fin de espera larga ANDROID")
           // this.props.navigation.navigate("ProfileScreen");
           // this.goBack();
           
           if ( Platform.OS === 'ios')
           timer = 1000;
             else timer = 500;
       
           // reseteo el modal porque pudo haber quedado en TimeOut si este es el segundo intento
           // de sacar la foto de profile.
          
           this.props.setProfileModalStat('ambos',0);
       
           setTimeout(() => {
             console.log("hago esperar 1200ms para q siempre se abra el modal en qsoScreen");
             //  this.props.actindicatorImageDisabled();
               // this.props.openModalConfirmPhoto(320);
              
             //  este metodo es para cuando es foto profile
               // this.props.setConfirmProfilePhotoModal(true);
               this.props.openModalConfirmPhoto(490);
              
              
             
           }, timer);
       
       
             // ya tomo la foto del picker entonces el flag vuelve a 0.
             // this.props.manageLocationPermissions("photofromgallery", 0);
         
           console.log('este debe aparecer primero');
          
         }
         else{
           console.log('Por ahora videos no se puede');
           this.setState({novideomp4: true})
         }
       
       
       
       
       
           }).catch((err) => {
             console.log("cropImage Error", err.message);
       
            // el usuario cancelo por alguna razon y debe pasar a 2 el flag de photoFromGallery
             // para que siga funcionando las rutinas de ejecucion cuando vuelvan de background
             // this.props.manageLocationPermissions("photofromgallery", 2);
             //  setTimeout(() => {
             //   this.props.manageLocationPermissions("photofromgallery", 0);
                
         
               
             // }, 500);
             
             crashlytics().setUserId(this.props.qra);
             crashlytics().log('error: ' + JSON.stringify(err)) ;
             if(__DEV__)
             crashlytics().recordError(new Error('openCropShareExt_DEV'));
             else
             crashlytics().recordError(new Error('openCropShareExt_PRD'));
         });
       



   
      
    //     }
    // }



  }

  send_image_info_to_muestro = async (path) => {

    fileName2 = path.replace(/^.*[\\\/]/, '');
    fileInfo = await Upload.getFileInfo(path);
    uri = 'file://'+path;
    // uri = path;
    console.log('fileInfo imagen share');
    console.log(fileInfo);
    console.log('filename2 es: ' + fileName2);
    // console.log('uri es: ' + uri);
    // envio = {name: fileName2, url: uri, type: 'image', sent: 'false', size: image.size, width: image.width, height: image.height, qra: this.props.qra,  rectime: 0, gallery: true } 
    envio = {name: fileName2, url: uri, type: 'image', sent: 'false', size: 0, width: 0, height: 0, qra: this.props.qra,  rectime: 0, gallery: false } 

   vari2 = this.props.sendActualMedia(envio);
  //   console.log("Fin de espera larga ANDROID")
 
    
    if ( Platform.OS === 'ios')
    timer = 1000;
      else timer = 500;

    // reseteo el modal porque pudo haber quedado en TimeOut si este es el segundo intento
    // de sacar la foto de profile.
   
    this.props.setProfileModalStat('ambos',0);

    setTimeout(() => {
      console.log("hago esperar 1200ms para q siempre se abra el modal en qsoScreen");
  
        this.props.openModalConfirmPhoto(490);
       
       
      
    }, timer);

  }

  photoFromGallery = async () => {


    if (await hasAPIConnection()) {
    // envio a reducer que se fue a background por usar la GELRIA de FOTOS
    // luego este dato lo uso para cuando venga de background no actualizar notificaciones, etc si
    // se fue a background por la galeria y mejorar performance y llamados a APIs  

    //el picker manda dos veces a Background la APP, entonces necesito tener tres estados y no dos,
    // 0: el picker no fue usado
    // 1: el picker envio a background la primera vez
    // 2: el picker envio a background la segunda vez

    console.log('tomo imagen de galeria');
    this.props.manageLocationPermissions("photofromgallery", 1);



// openCamera
     ImagePicker.openPicker({
   //   ImagePicker.openCamera({
      // path: data.uri,
     // cropping: true,
      // compressImageQuality: (Platform.OS === 'ios') ? 0.8 : 1,
      // width: (Platform.OS==='ios') ? 1100 : 1800, // anda bien 2800 x 2000    // 3080x 2200 // 4312 : 3080 - // 3080x 2200
      // height: (Platform.OS==='ios') ? 1100 : 1200,
      // compressImageMaxWidth: 700,
      // compressImageMaxHeight: 700,
      //width: 1200, height: 960,
      //    width: (Platform.OS==='ios') ? 3080 : 3080,
      // height: (Platform.OS==='ios') ? 2200: 2200,
    }).then(image => {
      console.log(image);
      console.log('nombre del archivo: '+image)
      console.log(JSON.stringify(image));

      // image/jpeg video/mp4
      if (image.mime !== 'video/mp4') 
    {
      // data.uri = image.path;
      // console.log('uri de foto: '+ data.uri);


      // this.setState({
      //   url: data.uri
      // });
    
      // uri = data.uri;
      uri = image.path;

    fileName2 = uri.replace(/^.*[\\\/]/, '');
    

    console.log('filename2 es: ' + fileName2);
    envio = {name: fileName2, url: uri, type: 'image', sent: 'false', size: image.size, width: image.width, height: image.height, qra: this.props.qra,  rectime: 0, gallery: true } 
    
    // console.log('phototype :'+this.props.phototype)
    
  //  vari2 = await 
  vari2 = this.props.sendActualMedia(envio);
    console.log("Fin de espera larga ANDROID")
    // this.props.navigation.navigate("ProfileScreen");
    // this.goBack();
    
    if ( Platform.OS === 'ios')
    timer = 1000;
      else timer = 500;

    // reseteo el modal porque pudo haber quedado en TimeOut si este es el segundo intento
    // de sacar la foto de profile.
   
    this.props.setProfileModalStat('ambos',0);

    setTimeout(() => {
      console.log("hago esperar 1200ms para q siempre se abra el modal en qsoScreen");
      //  this.props.actindicatorImageDisabled();
        // this.props.openModalConfirmPhoto(320);
       
      //  este metodo es para cuando es foto profile
        // this.props.setConfirmProfilePhotoModal(true);
        this.props.openModalConfirmPhoto(490);
       
       
      
    }, timer);


      // ya tomo la foto del picker entonces el flag vuelve a 0.
      // this.props.manageLocationPermissions("photofromgallery", 0);
  
    console.log('este debe aparecer primero');
   
  }
  else{
    console.log('Por ahora videos no se puede');
    this.setState({novideomp4: true})
  }





    }).catch((err) => {
      console.log("cropImage Error", err.message);

     // el usuario cancelo por alguna razon y debe pasar a 2 el flag de photoFromGallery
      // para que siga funcionando las rutinas de ejecucion cuando vuelvan de background
      // this.props.manageLocationPermissions("photofromgallery", 2);
      //  setTimeout(() => {
      //   this.props.manageLocationPermissions("photofromgallery", 0);
         
  
        
      // }, 500);
      
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + JSON.stringify(err)) ;
      if(__DEV__)
      crashlytics().recordError(new Error('openCropperPOST_DEV'));
      else
      crashlytics().recordError(new Error('openCropperPOST_PRD'));
  });

   }
   else this.setState({ nointernet: true });
     

  }

  gotoCameraScreen = async () => {


    if (await hasAPIConnection()) {
      // this.requestCameraPermission().then((hasPermission) => {
      //   if (!hasPermission) return;

    
      if (Platform.OS==='android')
        CAMERA_PERMISSION = PERMISSIONS.ANDROID.CAMERA;
      else
        CAMERA_PERMISSION = PERMISSIONS.IOS.CAMERA;

      // Permissions.request("camera").then(response => {
        request(CAMERA_PERMISSION).then(response => {

        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log("Camera Permiso: " + response);
        // if (response === "authorized") {
          if (response === RESULTS.GRANTED) {
          this.props.closeModalConfirmPhoto("image");
          this.props.navigation.navigate("CameraScreen2");
        }

        // if (response === "denied" && Platform.OS !== "android") {
          if (response === RESULTS.DENIED && Platform.OS !== "android") {
          Alert.alert(
            I18n.t("DENIED_ACCESS_1"),
            I18n.t("TO_AUTHORIZE_2_IOS"),
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

        if (response === RESULTS.BLOCKED && Platform.OS === "android") {
          Alert.alert(
            I18n.t("DENIED_ACCESS_1"),
            I18n.t("TO_AUTHORIZE_2_ANDROID"),
            [
              {
                text: "Ok",
                onPress: () => console.log("ok"),
                style: "cancel"
              }
            ]
          );
        }

        if (response === RESULTS.BLOCKED && Platform.OS !== "android") {
          Alert.alert(
            I18n.t("ACCESS_TO_CAMERA"),
            I18n.t("PARENTAL_CONTROLS"),
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

  newQso = async (qsotype) => {
    if (await hasAPIConnection()) {
      this.videorewardmustbeshown = false;
      this.intersitialmustbeshown = false;
      this.pressPublish = false;
      this.pressVideo = false;
      this.props.setVideoUploadProgress(0);
      this.setState({videoPercentage: 0,videoCompressPercentage: 0,  videoCompression: 'null'})

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
        this.newqso_after_ad(qsotype);

    } else this.setState({ nointernet: true });
  };

  newqso_after_ad = async (qsotype) => {
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

    // saco el chequeo de poder publicar unicamente si habilito LOCATION
    // if (this.props.currentlocationpermission) {
      // lo dejo siempre publicar haya o no hay autorizado LOCATION
      if (1===1){
      console.log("newqsoafterad");
      this.setState({showIntersitial:false});
      this.setState({showVideoReward:false});
      this.props.newqsoactiveTrue();
      this.props.resetQso(qsotype);
      // if (this.state.videoFromShare!==null)
      //  { // la app fue llamada desde un share externo
      //    this.videoFromGallery(true);
      //  }
      if (this.state.externalShareurl)//(this.props.externalshareurl)
       { // la app fue llamada desde un share externo
        shareExternalMedia = await AsyncStorage.getItem('shareExternalMedia');
        mimeType = await AsyncStorage.getItem('shareExternalMediaMimeType');     
              this.setState({videoFromShare: shareExternalMedia});

  

        if(mimeType.indexOf("image") !== -1)
          this.photoFromShare(shareExternalMedia);
        
        if(mimeType.indexOf("video") !== -1)
        // (notification.data['pinpoint.notification.title'].indexOf("included you") !== -1) 
        this.videoFromGallery(true)
      
         

        this.props.setExternalShreUrl(false);
        this.setState({externalShareurl: false})
       }
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
          I18n.t("TO_AUTHORIZE_2_IOS"),
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

        // se coemnto todo esto para que no le salga el mensaje al usuario que Por favor habilite el LOCATION (quiere decir que nego location) 

        // console.log("IOS fue negado la primera vez");

        // await RNLocation.getCurrentPermission().then(currentPermission => {
        //   console.log("el permiso es:" + currentPermission);
        //   if (
        //     currentPermission === "notDetermined" ||
        //     currentPermission === "denied"
        //   )
        //     // this.currentLocationPermission = false;
        //     this.props.manageLocationPermissions("locationpermission", false);
        //   else {
        //     this.props.manageLocationPermissions("locationpermission", true);
        //     AsyncStorage.setItem("locationPermission", "true");
        //   }
        //   // this.currentLocationPermission = true;
        // });

        // if (!this.props.currentlocationpermission) {
        //   if (Platform.OS === "ios")
        //     Alert.alert(
        //       "You denied the access to the Location",
        //       "In order to Authorize choose Open Settings",
        //       [
        //         {
        //           text: "No, thanks",
        //           onPress: () => {
        //             this._location_permissions("qsonew");
        //             console.log("Permission denied");
        //           },
        //           style: "cancel"
        //         },
        //         { text: "Open Settings", onPress: Permissions.openSettings }
        //       ]
        //     );
        //   else {
        //     Alert.alert(
        //       "You denied the access to the Location",
        //       "In order to Authorize go to settings->Apps->superQso->Permissions",
        //       [
        //         {
        //           text: "Ok",
        //           onPress: () => console.log("ok"),
        //           style: "cancel"
        //         }
        //       ]
        //     );
        //   }
        // }
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
    this.props.resetQso('QSO');   // seteo uno por defecto pero lo uso para que me resetee varias cosas que importan

    // this.CancelEndQsoModal(); // esta no iria mas la reemplaza startNewPost
    this.closeStartNewPost();
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
    this.setState({ nointernet: false, novideomp4: false, readingVideo: false});
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

    let datasource = '';

    this.setState({showIntersitial:false});
    this.setState({showVideoReward:false});
    
    env = this.envio;
    fileauxProfileAvatar = this.fileauxProfileAvatar;
    // envio = {name: fileName2, url: fileaux, fileauxProfileAvatar: this.compressImageURLProfileAvatar, sqlrdsid: this.props.sqlrdsid , description: this.state.description , type: this.props.sqsomedia.type, sent: false ,
    //   status: this.stat, progress: 0.3, size: this.size, rdsUrlS3: rdsUrl, urlNSFW, urlAvatar, date: fecha, width: this.width, height: this.height  } 
    
    // para que le agregue el item a enviar al media que estaba en el store ya que este tiene uno vacio a proposito por el TouchWithoutFeedback
    // y para que luego updateOnProgress haga bien el caclulo.
    this.auxMedia = [...this.props.mediafiles];  
    this.auxMedia.push(this.envio);  

    this.props.addMedia(this.envio);
    // creo mediafilelocal porque trada en actualizar REDUX entonces si es el caso
    // donde debe crear el QSO le envio del mediafileLocal, ver mas abajo.
    mediafileLocal = [ this.envio ];
    
    

        // Fin de agrego a array de media del store

        

//this.props.uploadMediaToS3(fileName2, fileaux, fileauxProfileAvatar, this.props.sqlrdsid, this.state.description,this.size, this.props.sqsomedia.type, rdsUrl,urlNSFW, urlAvatar, fecha, this.width, this.height,this.props.rdsurls3,this.props.jwtToken);

        if (env.status==='inprogress' & this.envio.type!=='video')    // los envia si ya tienen SqlRdsId sino los deja en waiting, cheque !== de video porque puede ser que haya subido primero una foto y luego la haya borrado, entonces quedo el SQLRDSID creado pero el video debe ser comprimido antes de ser enviado
        this.props.uploadMediaToS3(this.envio.name, this.envio.url, fileauxProfileAvatar, this.envio.sqlrdsid, this.envio.description,this.envio.size, this.envio.type, this.envio.rdsUrlS3 ,this.envio.urlNSFW, this.envio.urlAvatar, this.envio.date, this.envio.width, this.envio.height,this.props.rdsurls3,this.props.qra,this.envio.rectime,this.props.jwtToken);
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

              // #PUBLISH
              // if (ONPROGRESS) {
              //   data = check_firstTime_OnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.rst,
              //     this.props.db, this.props.qra,ONPROGRESS,this.props.sqsosqlrdsid, this.props.latitude,
              //                               this.props.longitude);
              //       console.log("Data to Send API: "+ JSON.stringify(data));  
              //       this.props.actindicatorPostQsoNewTrue();
              //       this.props.postQsoNew(data,this.props.qsoqras,mediafileLocal,this.props.jwtToken);
                    
              // }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");
   


    // se chequea esto porque puede ser que el usuario haya subido una foto/audio y luego borrado, etnocnes ya queda el SQLRDSID de la publicacion creada
    // entonces no hace falta crerla de nuevo
    if(this.props.sqsosqlrdsid==='')
    {

      fechaqso = getDate();
     this.dataHeader = {
        "band" : '',
        "mode" : '',
        "rst" : '',
        "db": '',
        "type" : this.props.qsotype,
        "longitude" : this.props.longitude,
        "latitude": this.props.latitude,
        "datetime": fechaqso,
        "qra_owner": this.props.qra,
        "draft" : 1
      };
              videoCompress = false;
  
               this.props.postQsoNew(this.dataHeader,this.props.qsoqras,mediafileLocal,videoCompress,this.props.jwtToken);
              // #PUBLISH
       } 

              if (this.envio.type==='video')

             
                {
                 
              
                  totalDimension = this.envio.width + this.envio.height;
                  needTrim = false;
                 
                  let destination_path = '';

                    this.setState({videoCompression: 'inprogress', percentageCompressionInitialTime: new Date(), videoSizeBeforeCompress: this.envio.size})


                  console.log('this.videoPathBeforeCompress: '+this.videoPathBeforeCompress)
                  // mpeg4
                  inicioCom = new Date();
                
                  await createSQSOfolder();

                    if (Platform.OS==='ios')
                      destination_path = `${RNFetchBlob.fs.dirs.DocumentDir}/sqso/file10.mp4`;
                    else
                      destination_path = `${RNFetchBlob.fs.dirs.DCIMDir}/sqso/file10.mp4`;

                      console.log('videoDurationSeconds:'+this.videoDurationSeconds + ' videoSize: '+this.videoSize)

                      // hago tiempo por si apreto my rapido CONTINUAR y luego PUBLICAR y aun GetVideoInfo no trajo la informacion, 
                      //por ahi en Videos largos puede pasar que esto sirva.
                      while(this.videoSize===0)
                      {

                      }

                      // el algortimo de trim hay qu emejorarlo, por ahora esta muy light
                      if (this.videoSize > 270000000 && this.videoDurationSeconds>120)
                        {
                          needTrim = true;
                          this.videoDurationSeconds = 120; // se lo seteo para que el progress del compress lo haga contra el tiempo correcto del video en 120 segundos.
                        }
                      else
                        needTrim = false;

             if (needTrim)
                    setTimeout(() => {
                      // RNFFmpeg.executeAsync("-y -i "+ this.videoPathBeforeCompress +" -crf 23 /storage/emulated/0/DCIM/file10.mp4", completedExecution => {
                          // RNFFmpeg.executeAsync("-y -i "+ this.videoPathBeforeCompress +" -vf scale=-2:320 /storage/emulated/0/DCIM/file10.mp4", completedExecution => {
                       
                          // este de abajo es el que anda nomral
                          // RNFFmpeg.executeAsync("-y -i "+ this.videoPathBeforeCompress +" -vf scale=-2:320 "+destination_path, completedExecution => {   
              
                             RNFFmpeg.executeAsync("-y -ss 00:00:00 -i "+ this.videoPathBeforeCompress +" -to 00:02:00 -vf scale=-2:320 "+destination_path, completedExecution => {    
                              // -ss 00:01:00 -i input.mp4 -to 00:02:00 -c copy output.mp4
                            // RNFFmpeg.executeAsync("-y -i "+ this.videoPathBeforeCompress +" /storage/emulated/0/DCIM/file10.mp4", completedExecution => {
                          if (completedExecution.returnCode === 0) {
                              console.log("FFmpeg process completed successfully");
                              console.log(completedExecution)
                          // console.log(result)
                          finCom = new Date();
                          timepoCom = finCom-inicioCom;
                          console.log('tiempo de compresion: '+ timepoCom);
                          // datasource = '/storage/emulated/0/DCIM/file10.mp4';
                          // datasource = destination_path;
                         
                  
                      console.log('getMediaInformation ');
                      RNFFprobe.getMediaInformation(destination_path).then(information => {
                        if (information.getMediaProperties() !== undefined) {
                     
                         

                            let streams = information.getStreams();
                          console.log(`size papa: ${information.getAllProperties().format.size}`);
                          console.log(`duration papa: ${Math.floor(information.getAllProperties().format.duration/1)}`);
                          console.log(`Width papa: ${streams[0].getAllProperties().width}`);
                          console.log(`Height papa: ${streams[0].getAllProperties().height}`);


                          this.envio.rectime = Math.floor(information.getAllProperties().format.duration/1); // duration;
                          this.envio.size = information.getAllProperties().format.size; //Math.floor(env.size/bitMultiplier);
                          this.envio.url = destination_path; 
                          update = { rectime: this.envio.rectime ,size: this.envio.size, url: this.envio.url, width: streams[0].getAllProperties().width, height: streams[0].getAllProperties().height}
                          this.props.updateCommentInMemory(this.envio.name,update);
                          this.setState({videoCompression: 'finished'});

                    
                        }
                       
                    });


                            } else {
                              console.log(`FFmpeg process failed with rc=${completedExecution.returnCode}.`);
                            }
                          }).then(executionId => console.log(`Async FFmpeg process started with executionId ${executionId}.`));
                      
                        
                       }
                      , 2000);
                    
                
                else
                setTimeout(() => {
                  // RNFFmpeg.executeAsync("-y -i "+ this.videoPathBeforeCompress +" -crf 23 /storage/emulated/0/DCIM/file10.mp4", completedExecution => {
                      // RNFFmpeg.executeAsync("-y -i "+ this.videoPathBeforeCompress +" -vf scale=-2:320 /storage/emulated/0/DCIM/file10.mp4", completedExecution => {
                   
                      // este de abajo es el que anda nomral
                      RNFFmpeg.executeAsync("-y -i "+ this.videoPathBeforeCompress +" -vf scale=-2:320 "+destination_path, completedExecution => {   
          
                        //  RNFFmpeg.executeAsync("-y -ss 00:00:00 -i "+ this.videoPathBeforeCompress +" -to 00:02:00 -vf scale=-2:320 "+destination_path, completedExecution => {    
                          // -ss 00:01:00 -i input.mp4 -to 00:02:00 -c copy output.mp4
                        // RNFFmpeg.executeAsync("-y -i "+ this.videoPathBeforeCompress +" /storage/emulated/0/DCIM/file10.mp4", completedExecution => {
                      if (completedExecution.returnCode === 0) {
                          console.log("FFmpeg process completed successfully");
                          console.log(completedExecution)
                      // console.log(result)
                      finCom = new Date();
                      timepoCom = finCom-inicioCom;
                      console.log('tiempo de compresion: '+ timepoCom);
                      // datasource = '/storage/emulated/0/DCIM/file10.mp4';
                      // datasource = destination_path;
                     
              
                  console.log('getMediaInformation ');
                  RNFFprobe.getMediaInformation(destination_path).then(information => {
                    if (information.getMediaProperties() !== undefined) {
                 
                     

                        let streams = information.getStreams();
                      console.log(`size papa: ${information.getAllProperties().format.size}`);
                      console.log(`duration papa: ${Math.floor(information.getAllProperties().format.duration/1)}`);
                      console.log(`Width papa: ${streams[0].getAllProperties().width}`);
                      console.log(`Height papa: ${streams[0].getAllProperties().height}`);


                      this.envio.rectime = Math.floor(information.getAllProperties().format.duration/1); // duration;
                      this.envio.size = information.getAllProperties().format.size; //Math.floor(env.size/bitMultiplier);
                      this.envio.url = destination_path; 
                      update = { rectime: this.envio.rectime ,size: this.envio.size, url: this.envio.url, width: streams[0].getAllProperties().width, height: streams[0].getAllProperties().height}
                      this.props.updateCommentInMemory(this.envio.name,update);
                      this.setState({videoCompression: 'finished'});

                
                    }
                   
                });


                        } else {
                          console.log(`FFmpeg process failed with rc=${completedExecution.returnCode}.`);
                        }
                      }).then(executionId => console.log(`Async FFmpeg process started with executionId ${executionId}.`));
                  
                    
                   }
                  , 2000);



                } // if (video)
                
          }

  }

  publicar_chequeos = async () => {

if (this.pressPublish===false)
{// para evitar presionar mas de una vez Publish
  this.pressPublish = true;

  // comento para poder pribar el upload mas rapido
    if (ONPROGRESS=updateOnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.qsoqras,this.props.mediafiles))
   await this.props.onprogressTrue();
  else this.props.onprogressFalse();

   console.log('onprogress '+ONPROGRESS) // #PUBLISH 
   if (ONPROGRESS) { 

        if (await hasAPIConnection())
          { 

                // por si fallo la vez anterior por el Token Expired, renuevo token y llamo a la API de nuevo
                session = await Auth.currentSession();
                this.props.setToken(session.idToken.jwtToken);
            
            console.log('sqsosqlrdsid: '+ this.props.sqsosqlrdsid)
          // if (this.props.sqsosqlrdsid!=='')
          // { 
          // }
          this.props.actindicatorPostQsoNewTrue();
         


          if (this.envio.type==='video')
          { // Esta es la logica solo para VIDEO
            // Solo se puede envia run video con lo cual si el type es VIDEO es porque es video, ya que no se puede 
            //enviar VIDEO si se envio una foto o un AUDIO
            // if (this.state.videoCompression==='inprogress')

            contsqlrdsid = 0;
            while (this.props.sqsosqlrdsid==='' && contsqlrdsid < 25) {
            // hago tiempo por si el usuario clickeo PUBLICAR inmediatamente luego de darle CONTINUAR al VIDEO
            // y se este llamando a postQsoNew y aun no tenga el sqlrdsid, si luego de este tiempo no tiene sqlrdsid es 
            // porque fallo y se debe llamar a postqsonew nuevamente

              contsqlrdsid++;  
              console.log('entro delay sqlrdsid: '+contsqlrdsid)  
          
              await this.delay2(300);
  
            }

            if (this.props.sqsosqlrdsid==='')
            {
           
              mediafileLocal = [ this.envio ];
              videoCompress = false;
              console.log('no se habia generado sqlrdsid para video')
              await this.props.postQsoNew(this.dataHeader,this.props.qsoqras,mediafileLocal,videoCompress,session.idToken.jwtToken);
              console.log('despues de await postQsoNew, el awaiy de postQsoNew es clave para que no se tave con el delay de 1 segundo de abajo')
              await this.delay2(1000); // hago tiempo para asegurar que la API traiga el sqlrdsid y actualice en redux 
              console.log('despues de await delay2')
              // y que este presente al momento de subir a S3, ya que si el video es cortito el progress ya lo pudo haber terminado la compresion 
              // y lo enviaria rapidamente a S3 y este necesita el SQLRDSID
            }
              



            contcompress=0;
            // t1 = new Date();
            // factor = 12 / 15000000; // tarda aprox 20 seg. los 15mb
            // totCompressSecThisVideo = factor * this.state.videoSizeBeforeCompress;
            // console.log('video sin comprimir pesa: '+ this.state.videoSizeBeforeCompress)
          while (this.state.videoCompression==='inprogress')
          {
            contcompress++; 

              // aux = percentageCalculator(this.state.percentageCompressionInitialTime,totCompressSecThisVideo);

              //  if ((aux > 2) && (aux < 97))
              //      this.setState({videoCompressPercentage: aux})
              //  if (aux > 96 )
              //      this.setState({videoCompressPercentage: 96})
              //  if (aux < 3 )
              //      this.setState({videoCompressPercentage: 2})

            await this.delay2(1000);
            console.log('delay compress '+ contcompress);
            RNFFmpegConfig.getLastReceivedStatistics().then(statistics => {
              timeCodeProcesado = Math.floor(statistics.time/1000); // convierto de milisegundos a segundos sin coma.
              percentage = Math.floor(((timeCodeProcesado/this.videoDurationSeconds)*100)/1);
              this.setState({videoCompressPercentage: percentage})
            });
            
          }

            console.log('upload video')
            console.log('sqlrdsid: '+this.props.sqsosqlrdsid)
            media = this.props.mediafiles[0];
     //         this.props.uploadMediaToS3(media.name, media.url, this.imagePreviewPath,this.props.sqsosqlrdsid, media.description,media.size, media.type, media.rdsUrlS3 ,media.urlNSFW, media.urlAvatar, media.date, media.width, media.height,this.props.rdsurls3,this.props.qra,media.rectime,this.props.jwtToken);
              this.props.uploadVideoToS3(media.name, media.url, this.imagePreviewPath,this.props.sqsosqlrdsid, media.description,media.size, media.type, media.rdsUrlS3 ,media.urlNSFW, media.urlAvatar, media.date, media.width, media.height,this.props.rdsurls3,this.props.qra,media.rectime,session.idToken.jwtToken);
            //  contEnvio = 0;
            //  t1 = new Date();
            //  factor = 110 / 9000000; // tarda aprox 100 segundo 9mb (
            //  totUploadSecThisVideo = factor * this.envio.size;
            //  console.log('video comprimido pesa: '+ this.envio.size)

             while (todaMediaEnviadaAS3(this.props.mediafiles)===false) {
               /* code to wait on goes here (sync or async) */
              //  contEnvio++;  
              // //  console.log('entro delay envio video'+contEnvio)  
               console.log('entro delay envio video post uploads3') 

              // aux = percentageCalculator(t1,totUploadSecThisVideo);
              //  if ((aux > 2) && (aux < 97))
              //      this.setState({videoPercentage: aux})
              //  if (aux > 96 )
              //      this.setState({videoPercentage: 96})
              //  if (aux < 3 )
              //      this.setState({videoPercentage: 2})

                await this.delay2(100);
 
               
             }

             this.publicar(session.idToken.jwtToken);

          }
            else
          { 

          // este bloque del ELSE es para AUDIO y FOTOS

          // este proceso es por si no se genero sqlrdsid por alguna razon (usuario subio foto y publico rapido, o en la publicacion fallo el la llamada a la API de postqsonew,
          // entonces espera por si la API se demoro y si sale por tiempo es porque hay que llamar a postqsonew de nuevo para generar el sqlrdsid para luego subir media y publicar)
          // rara vez deberia entrar en este loop pero es por las dudas
          contsqlrdsid = 0;
          while (this.props.sqsosqlrdsid==='' && contsqlrdsid < 25) {

            contsqlrdsid++;  
            console.log('entro delay sqlrdsid: '+contsqlrdsid)  
        
            await this.delay2(300);

          }

          // chequeo si salio del loop por timeout, es decir  si sigue sin sqlrsid, se es asi llamo a postqsonewy sigo el proceso normal de loops siguintes
          // esperando que se envie toda la media para ser publicado el post
          // tampoco deberia entrar aca casi nunca
          if (this.props.sqsosqlrdsid==='')
          {

            console.log('Publicar no tenia generado sqlrdsid')

                  // por si fallo la vez anterior por el Token Expired, renuevo token y llamo a la API de nuevo
                  // session = await Auth.currentSession();
                  // this.props.setToken(session.idToken.jwtToken);

          //   fechaqso = getDate();
          //   data = {
          //    "band" : '',
          //    "mode" : '',
          //    "rst" : '',
          //    "db": '',
          //    "type" : this.props.qsotype,
          //    "longitude" : this.props.longitude,
          //    "latitude": this.props.latitude,
          //    "datetime": fechaqso,
          //    "qra_owner": this.props.qra,
          //    "draft" : 1
          //  };
                   videoCompress = false;
                   this.props.postQsoNew(this.dataHeader,this.props.qsoqras,this.props.mediafiles,videoCompress,session.idToken.jwtToken);

          }



// arranca proceso normal de doble intento por la primera vez se trabo algun archvio de media

         
            contEnvio = 0;
            while (todaMediaEnviadaAS3(this.props.mediafiles)===false && contEnvio < 30) {
              /* code to wait on goes here (sync or async) */
              contEnvio++;  
              console.log('entro delay '+contEnvio)  
          
              await this.delay2(1500);

              
            }

            // si aun no se enviaron todas las medias se intenta reenviar nuevamente las q fallaron o estan inprogress
            if (!todaMediaEnviadaAS3(this.props.mediafiles))
          {
                this.props.mediafiles.map(item => { 
                  const { name, url,fileauxProfileAvatar, sqlrdsid, description , type, size, status, progress, sent, rdsUrlS3, urlNSFW, urlAvatar, date, width, height, qra, rectime, idmedia } = item;
              console.log('mapeo');
              if (status==='failed' || status==='inprogress')
                this.props.uploadMediaToS3(name, url,fileauxProfileAvatar, sqlrdsid, description, size, type, rdsUrlS3, urlNSFW, urlAvatar, date, width, height,this.props.rdsurls3, qra, rectime, session.idToken.jwtToken);
              
                })
              
              // comienza el segundo chequeo de envio idem al anterior
              contEnvio = 0;
              while (todaMediaEnviadaAS3(this.props.mediafiles)===false && contEnvio < 40) {
                /* code to wait on goes here (sync or async) */
                contEnvio++;  
                console.log('entro delay2 '+contEnvio)  

                await this.delay2(1500);

                
              }
              
              // si aun en el segundo intento no se pueden enviar hay que avisar con un modal
              if (!todaMediaEnviadaAS3(this.props.mediafiles))
              { // bajo el modal de publicando y aviso al usuario
                console.log('fallo el segundo intento de publicar')
                this.props.actindicatorPostQsoNewFalse();
                // uso componente missingFields para informar que no hemos podido publicar
                this.pressPublish = false;
                this.missingMessage =  I18n.t("QsoScrCantPublish")
                this.setState({ missingFields: true})
              



              }else
              { // en el segundo intento se logro enviar toda la media entonces publico
                console.log('salio del loop2');
                 this.publicar(session.idToken.jwtToken);

              }
              



          }
          else
          {
            // si viene por aca es porque salio del bucle porque ya se enviaron todas las medias entonces se puede publicar.

            console.log('salio del loop1');
             this.publicar(session.idToken.jwtToken);
          }


        } // Fin de Video o AUDIO/FOTO

      
        } else {
          this.setState({ nointernet: true });
          this.pressPublish = false;
        }


        }
        else
{
  console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");
  this.pressPublish = false;
  console.log(missingFieldsToPublish(this.props.qsotype,this.props.band,this.props.mode,this.props.qsoqras,this.props.mediafiles));
  missMessage = missingFieldsToPublish(this.props.qsotype,this.props.band,this.props.mode,this.props.qsoqras,this.props.mediafiles);
  this.missingMessage =  missMessage.message;
  this.setState({ missingFields: true})
} 


} // pressPublish
    

  }

 // #PUBLISH
  publicar = async (jwtToken) => {

              if (this.props.qsotype==='POST' || this.props.qsotype==='QAP' || this.props.qsotype==='FLDDAY')
          {
            bandAux = '';
            modeAux = '';
            rstAux = '';
            dbAux = '';
          }
          else
          {
            bandAux = this.props.band;
            modeAux = this.props.mode;
            rstAux = this.props.rst;
            dbAux = this.props.db;

          }
  
        qsoHeader = { "mode" : modeAux,
                              "band" : bandAux,
                              "type" : this.props.qsotype,
                              "sqlrdsid" : this.props.sqsosqlrdsid,
                              "qra": this.props.qra,
                              "rst" : rstAux,
                              "db" : dbAux,
                              "draft": 0
                           }
              console.log("antes de enviar a API qdoHeader:"+ JSON.stringify(qsoHeader))


                this.deleteQSOfolder();


              // envio nueva URL del Home para que refresque la webview y el usuario pueda ver su publicacion nueva recien publicada
              home = global_config.urlWeb + '?' + new Date();
              await this.props.setWebView(this.props.webviewsession,home);
          
              conta = 0;

         

              // if (this.props.qsoqras.length > 0) // si es > 0 es porque tiene QsoQras asociados a la publicacion luego llama a postQsoEdit desde Actions
              //         this.props.postQsoQras("ALLQSONEW",qsoHeader,this.props.sqsosqlrdsid, this.props.qsoqras,this.props.jwtToken)
              //       else
                      // this.props.postQsoEdit(qsoHeader,'',this.props.jwtToken); // si no tiene QsoQras asociados llama directo a postQsoEdit
                    
                      // Se unifico el publicar, se envia Header y qsoqras para todo tipo de Publicacion
                      this.props.qsoPublish(qsoHeader,this.props.qsoqras,jwtToken);
                      this.pressPublish = false;
                     
                        
            
   
   }

 

   delay2(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

   goToHomeAfterPublish = async () => {
    this.props.navigation.navigate('Home')
    this.props.setJustPublished(false);
    this.props.setPressHome(1);


   }

   descartar_publicacion = () => {
    this.setState({deletePost: true})
 
   }

   deleteQSOfolder = () => {

    RNFFmpeg.cancel();
 

   // el borrado es con timeout para que termine bien el cancel de ffmpeg
    setTimeout(() => {
    
// proceso de borrar carpeta sqso
console.log('delete folder: ');
if (Platform.OS==='android') 
  theqsopath = 'file://'+RNFetchBlob.fs.dirs.DCIMDir+'/sqso'
  else
  theqsopath = RNFetchBlob.fs.dirs.DocumentDir+'/sqso' 

RNFetchBlob.fs.unlink(theqsopath).then(() => 
{ console.log("Succeeded") 

if (Platform.OS==='android') // el scanFile funciona solo en android
{
  RNFetchBlob.fs.scanFile([ this.file10_delete, this.videoaux_delete ])

.then(() => {
        console.log("scan file success")
      })
      .catch((err) => {
        console.log("scan file error")
      })
   }



}).catch((err) =>
 { console.log("err unlink",err) })
//fin proceso de borrar carpeta sqso


        
}
, 3000);

      }
    

  
    

   componentDidUpdate(prevProps, prevState) {
    // if (prevState.justpublished) {
    //  console.log('didUpdate:')
    //  console.log('prevProps.justpublished.: '+prevProps.justpublished)
    //   console.log('prevState.justpublished.: '+prevState.justpublished)
      console.log('prevProps.videopercentage: '+prevProps.externalshareurl)
      console.log('prevState.videopercentage: '+prevState.externalshareurl)
      // if (prevProps.justpublished && !this.justpublished)
      if (prevProps.videopercentage===-1)
         {
           this.pressPublish=false
          
         }
        
      if (prevProps.justpublished)  
      {
       
          console.log('llamo afterPublish')
          this.goToHomeAfterPublish();
        }
        if (prevProps.externalshareurl && !this.state.externalShareurl)  
        {
          console.log('DidUpdate Share')
          this.setState({externalShareurl: true})
        }
        
    // }
  }

  cameraPress = () => {
    if (addMediaCheck('image',this.props.mediafiles))
            this.setState({camaraSelect: true})
        else{
          this.missingMessage =  I18n.t("QsoScrMixMedia")
          this.setState({ missingFields: true})
        }
  }

close_upload_failed = () => {
   this.props.setVideoUploadProgress(0);
   this.props.actindicatorPostQsoNewFalse();

  }
      

  render() {
    const interpolatedRotateAnimation = this.state.rotateValue.interpolate({
      inputRange: [0,  100],
      outputRange: ['0deg','360deg']
    });
    console.log("RENDER qso Screen");

//  (this.props.justpublished) && 
//   // this.props.navigation.navigate('Home')
//   this.goToHomeAfterPublish();
 

    
    return (

     
   
    
      (this.props.sqsonewqsoactive) ? 
     <HandleBack onBack={this.onBack}>
      <View style={{ flex: 1,  backgroundColor: '#fff'}}>
    
      <View style={{ flex: 0.06 }}>
          <Publicar publicar={this.publicar_chequeos.bind()} descartar={this.descartar_publicacion.bind()}/>
          
      </View>
       {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
         Esto estaba porque el teclado aparecia cuando se ingresaban los callsign sin el modal, ahora no tiene sentido porque no hay mas teclado en qsoScreen directo, los teclados estan en los modales. */}
   
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
                backgroundColor: 'rgba(36,54,101,0.93)',
                marginTop: 210,
                left: this.state.videoCompression==='null' ? 75:50,
                //  right: 15,
                // alignItems: 'center',
                // alignContent: 'center',
                width: this.state.videoCompression==='null' ? 200:225,
                height: this.state.videoCompression==='null' ? 45:130,
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
                  fontSize: 16,
                  marginLeft: 20,
                  marginTop: 5
                }}
              >
                {I18n.t("QsoScrPublishingPost")}
              </Text>
              {(this.state.videoCompression==='inprogress'  && this.props.mediafiles[0].type==='video') &&
              <Text
                style={{
                  color: "yellow",
                  // fontWeight: "bold",
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 5
                }}
              >
                {I18n.t("QsoScrCompressingVideo")} {this.state.videoCompressPercentage}%
              </Text>
             }
             {(this.state.videoCompression==='finished' && this.props.mediafiles[0].type==='video' && this.state.videoPercentage!==-1) &&
              <Text
                style={{
                  color: "yellow",
                  // fontWeight: "bold",
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 5
                }}
              >
                {I18n.t("QsoScrUploadingVideo")} {this.state.videoPercentage}%
              </Text>
             }
             {/* <TouchableOpacity style={{width: 130,height:30 }} */}
{(this.state.videoPercentage===-1) &&
<View>
<Text style={{ fontSize: 14, color: "yellow" }}>{"\n"} {this.props.videouploaderror}</Text>
<TouchableOpacity 
                onPress={() =>  this.close_upload_failed()} >
        
                <Text style={{ fontSize: 15, color: "white" }}>{"\n"}              Cerrar</Text>
              </TouchableOpacity>
  
  </View>
  }

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
                //  backgroundColor: "rgba(0,0,0,0.85)",
                backgroundColor:'rgba(36,54,101,0.97)',
                marginTop: Platform.OS === "ios" ? 20 : 5,
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
            
         
            </View>
            {/* </KeyboardAvoidingView > */}
          </Modal>

        </View>
        {/* </TouchableWithoutFeedback>  */}
       
        <View style={{ flex: 0.52 }}>
       
           
          <MediaFiles />
        
          
  
        </View>
       

        <View style={{ flexDirection: "row", flex: 0.12, marginTop: 6 }}>
          <View style={{ flex: 0.23, marginTop: 15, marginLeft: 5 }}>
            {/* {this.props.sqsonewqsoactive && 
              // <TouchableOpacity style={{ width: 70,height:63 }} onPress={() => this.OpenEndQsoModal()}>
                  <TouchableOpacity style={styles.buttonDeletePostContainer} onPress={() => this.setState({deletePost: true})}>
    
                     <Text style={{ fontSize: 12, color: '#243665',  textAlign: 'center', fontWeight: 'bold'  }}>{I18n.t("QsoScrDeletePost")}</Text>
              </TouchableOpacity>
              
            } */}

              <TouchableOpacity style={{width: 65,height:63 }}
                onPress={() => this.videoFromGallery(false)}
              >
                <Image
                  source={require("../../images/mic.png")}
                  style={{ width: 26, height: 26, marginLeft: 22, marginTop: 2 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 13, color: "black",  marginLeft: I18n.locale.substring(0, 2)==='es' ? 18:16 }}>Video</Text>
              </TouchableOpacity>
          
        
          </View>

          <View style={{ flex: 0.26, marginTop: 15, marginLeft: 9 }}>
            {/* {this.props.sqsonewqsoactive && 
            
                  <TouchableOpacity style={styles.buttonStartNewPostContainer} onPress={() => this.publicar_chequeos()}>
                 
                <Text style={{ fontSize: 12 ,color: '#243665',  textAlign: 'center', fontWeight: 'bold' }}>{I18n.t("QsoScrStartNewPost")}</Text>
              </TouchableOpacity>
              
            } */}
          
        
          </View>

          {/* {this.props.sqsonewqsoactive ? ( */}
       {/* { (this.props.sqsosqlrdsid !== '') ? ( */}
            <View style={{ flex: 0.19, alignItems: "flex-end", marginTop: 15 }}>
                  {/* { (this.props.sqsosqlrdsid !== '') &&
                      <ShareQso qra={this.props.qra} qsotype={this.props.qsotype} band={this.props.band} mode={this.props.mode} sqlrdsid={this.props.sqsosqlrdsid}/>
                  } */}
            </View>
          {/* ) : null} */}

          {/* { (this.props.sqsosqlrdsid !== '') ? */}
          {this.props.sqsonewqsoactive ? (
            <View style={{ flex: 0.16, alignItems: "flex-end", marginTop: 11 }}>
              <TouchableOpacity style={{width: 65,height:63 }}
                onPress={() => this.checkInternetOpenRecording()}
              >
                <Image
                  source={require("../../images/mic.png")}
                  style={{ width: 26, height: 26, marginLeft: 22, marginTop: 2 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 13, color: "black",  marginLeft: I18n.locale.substring(0, 2)==='es' ? 18:16 }}>{I18n.t("QsoScrRecord")}</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* <Button onPress={() => this.props.navigation.navigate("QslScanScreen")} title="QslScan" /> */}
          {/* <Button onPress={() => this.gotoCameraScreen()} title="Camera" /> */}

          {/* { (this.props.sqsosqlrdsid !== '') ? */}
          {this.props.sqsonewqsoactive ? (
            <View style={{ flex: 0.16, alignItems: "center", marginTop: 11 }}>
              {/* <TouchableOpacity style={{ width: 65,height:63 }} onPress={() => this.gotoCameraScreen()}> */}
            <TouchableOpacity style={{ width: 65,height:63 }} onPress={() => this.cameraPress()}>     
                <Image
                  source={require("../../images/camera.png")}
                  style={{ width: 26, height: 26, marginLeft: 15, marginTop: 2 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 13, color: "black",   marginLeft: I18n.locale.substring(0, 2)==='es' ? 16:14 }}>{I18n.t("QsoScrPhoto")}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
          {(this.state.showIntersitial) && <AdInter newqso={this.newqso_after_ad.bind()} subos3={this.subo_s3.bind()} closead={this.closeAd}  /> }
          {(this.state.showVideoReward) && <AdVideoReward newqso={this.newqso_after_ad.bind()} subos3={this.subo_s3.bind()} closead={this.closeAd} notrewared={this.not_rewarded.bind()} /> }
          
          {(this.state.novideomp4) && 
          <VariosModales
            show={this.state.novideomp4}
            modalType="novideomp4"
            closeInternetModal={this.closeVariosModales.bind()}
          />
       }

{(this.state.readingVideo) && 
          <VariosModales
            show={this.state.readingVideo}
            modalType="readingvideo"
            closeInternetModal={this.closeVariosModales.bind()}
          />}

          {/* {(this.props.welcomeuserfirsttime) && 
            <VariosModales
            show={true}
            modalType="welcomefirsttime"
            closeInternetModal={this.closeVariosModales.bind()}
          /> } */}

  {(this.state.camaraSelect) &&
              <CamaraSelect   close={this.CloseCamaraSelect.bind()} photoGallery={this.photoFromGallery.bind()}  cameraScreen={this.gotoCameraScreen.bind()}/>
            }

      {(this.state.stopApp) &&
                              <StopApp appNeedUpgrade={this.state.appNeedUpgrade} pushTokenNotFound={this.state.pushTokenNotFound} 
                              forceChangePassword={this.state.forceChangePassword} upgradeText={this.state.upgradeText}/>
      }

     {(this.state.deletePost) &&
              <DeletePost sqlrdsid={this.props.sqsosqlrdsid} closeDeletePost={this.CloseDeletePost.bind()} deleteqsofolder={this.deleteQSOfolder.bind()}/>
            }
            
    
            {/* {(this.state.startNewPost) &&
              <StartNewPost sqlrdsid={this.props.sqsosqlrdsid} endQso={this.endQso.bind()} closeStartNewPost={this.closeStartNewPost.bind()}/>
            } */}
              {(this.state.missingFields) &&
              <MissingFieldsToPublish  message={this.missingMessage} closeMissingFields={this.closeMissingFields.bind()}/>
            }

      </View>
      </HandleBack>
     
     :

       <View style={{ flex: 1}} >


    <View style={{flex:0.10, 
           alignItems: 'center',
              marginTop: 10}}>

            <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 22 }}>{I18n.t("QsoTypeSelect")} </Text>
           
    
                       
         </View>
        
                   <View style={{ flex:0.17, backgroundColor: '#f5f5f5',
                            borderBottomLeftRadius: 22,
                            borderBottomRightRadius: 22,
                            borderTopLeftRadius: 22,
                            borderTopRightRadius: 22,
                            marginLeft: 5,
                            marginRight: 5,
                            marginTop: 12
                           }}>

                              <TouchableOpacity  style={{ height: 60, marginTop: 9}} onPress={() => this.newQso('QSO')}  >

          <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
                      
                                  <Image source={require('../../images/qso10.png')} style={{width: 50, height: 50, flex: 0.3}}
                                  resizeMode="contain" />      
                    
                            <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 16, flex: 0.7 , marginLeft: 8, marginRight: 10}}>{I18n.t("QsoTypeQSOdesc")}</Text>
                          
                        </View>
                        </TouchableOpacity>
          </View>

      
          
          <View style={{flex:0.17,height: 60, backgroundColor: '#f5f5f5',
                            borderBottomLeftRadius: 22,
                            borderBottomRightRadius: 22,
                            borderTopLeftRadius: 22,
                            borderTopRightRadius: 22,
                            marginLeft: 5,
                            marginRight: 5,
                            marginTop: 12}}>
             
               <TouchableOpacity  style={{ height: 60, marginTop: 9}} onPress={() => this.newQso('LISTEN')}  >
                   <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
                
                           {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/escucha10.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/swl10.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                            <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 16, flex: 0.7 , marginLeft: 8, marginRight: 10}}>{I18n.t("QsoTypeSWLdesc")} </Text>
                          
                        </View>
                        </TouchableOpacity>              
          </View>

         
         
         <View style={{flex:0.17,height: 60, backgroundColor: '#f5f5f5',
           borderBottomLeftRadius: 22,
           borderBottomRightRadius: 22,
           borderTopLeftRadius: 22,
           borderTopRightRadius: 22,
           marginLeft: 5,
           marginRight: 5,
           marginTop: 12}}>

            <TouchableOpacity  style={{ height: 60, marginTop: 9}} onPress={() => this.newQso('FLDDAY')}  >
              <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>


                         {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/activacion.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/fieldday10.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }

                       <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 16, flex: 0.7,  marginLeft: 8, marginRight: 18 }}>{I18n.t("QsoTypeANYdescFieldDay")}
                       </Text>
                     </View>
            </TouchableOpacity>              
         </View>

         <View style={{flex:0.17,height: 65, backgroundColor: '#f5f5f5',
           borderBottomLeftRadius: 22,
           borderBottomRightRadius: 22,
           borderTopLeftRadius: 22,
           borderTopRightRadius: 22,
           marginLeft: 5,
           marginRight: 5,
           marginTop: 12}}>

            <TouchableOpacity  style={{ height: 85, marginTop: 1}} onPress={() => this.newQso('QAP')}  >
              <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
                
                       <Image source={require('../../images/qap10.png')} style={{width: 50, height: 50, flex: 0.3} } 
                       resizeMode="contain" />
                       <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 16, flex: 0.7,  marginLeft: 8, marginRight: 8, height:85, marginTop:3 }}>{I18n.t("QsoTypeANYdescQAP")}
                       </Text>
                     </View>
            </TouchableOpacity>              
         </View>

         <View style={{flex:0.17,height: 60, backgroundColor: '#f5f5f5',
           borderBottomLeftRadius: 22,
           borderBottomRightRadius: 22,
           borderTopLeftRadius: 22,
           borderTopRightRadius: 22,
           marginLeft: 5,
           marginRight: 5,
           marginTop: 12}}>

            <TouchableOpacity  style={{ height: 60, marginTop: 9}} onPress={() => this.newQso('POST')}  >
              <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
                       {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/otro10.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/other10.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                       <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 16, flex: 0.7,  marginLeft: 8, marginRight: 18 }}>{I18n.t("QsoTypeANYdescOther")}
                       </Text>
                     </View>
            </TouchableOpacity>              
         </View>
         
         {/* Pongo componente de INTERNET, ADS y IAP porque pueden llamarse esta en la pantalla de Elegir Publicacion */}
        {/*  Estoy copiando los mismo componentes que estan cuando el QSO esta ACTIVO porque no encontre rapidamente un lugar donde este disponible para ambos*/}
        {/* Despues hay que optimizar esto */}
         <View>
         {(this.state.showIntersitial) && <AdInter newqso={this.newqso_after_ad.bind()} subos3={this.subo_s3.bind()} closead={this.closeAd}  /> }
          {(this.state.showVideoReward) && <AdVideoReward newqso={this.newqso_after_ad.bind()} subos3={this.subo_s3.bind()} closead={this.closeAd} notrewared={this.not_rewarded.bind()} /> }
           {(this.state.nointernet) &&  <VariosModales show={this.state.nointernet} modalType="nointernet"  closeInternetModal={this.closeVariosModales.bind()} /> }

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
          </View> 
        
          
       </View> 

                       


 
  
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
    backgroundColor: '#243665',
  },
    buttonDeletePostContainer:{
      //   backgroundColor: '#2980b9',
      backgroundColor: '#8BD8BD',
         paddingVertical: 2,
         borderRadius: 22,
         width: 85,
         height: 36,
         marginTop: 0,
         },
         buttonStartNewPostContainer:{
          //   backgroundColor: '#2980b9',
          backgroundColor: '#8BD8BD',
             paddingVertical: 2,
             borderRadius: 22,
             width: 90,
             height: 36,
             marginTop: 0,
             },

  
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
    photofromgallery: state.sqso.photoFromGallery,
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
    qra: state.sqso.qra,
    justpublished: state.sqso.justPublished,
    webviewsession: state.sqso.webviewSession,
    mediafiles: state.sqso.currentQso.mediafiles,
    videopercentage: state.sqso.currentQso.videoPercentage,
    videouploaderror: state.sqso.currentQso.videoUploadError,
    externalshareurl: state.sqso.externalShareUrl

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
  confirmReceiptAndroid,
  sendActualMedia,
  setProfileModalStat,
  setConfirmProfilePhotoModal,
  openModalConfirmPhoto,
  setPressHome,
  postQsoEdit,
  postQsoQras,
  setWebView,
  setJustPublished,
  actindicatorPostQsoNewFalse,
  qsoPublish,
  updateCommentInMemory,
  uploadVideoToS3,
  setVideoUploadProgress,
  setExternalShreUrl
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QsoScreen);
