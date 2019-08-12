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
  Dimensions,
  AppState,
  AsyncStorage
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
  uploadMediaToS3
} from "../../actions";
import QsoHeader from "./QsoHeader";
import MediaFiles from "./MediaFiles";
import RecordAudio2 from "./RecordAudio2";
import Muestro from "./Muestro";
import { NavigationActions, addNavigationHelpers } from "react-navigation";
//import {  Permissions } from 'expo';
import {
  hasAPIConnection,
  showVideoReward,
  showIntersitial,
  updateOnProgress, check_firstTime_OnProgress } from "../../helper";
import VariosModales from "./VariosModales";
import Permissions from "react-native-permissions";

import awsconfig from "../../aws-exports";
import { Auth } from "aws-amplify";
//import firebase from "react-native-firebase";
import RNLocation from "react-native-location";
import AdInter from "./AdInter";
import AdVideoReward from "./AdVideoReward";

Auth.configure(awsconfig);

class QsoScreen extends Component {
  constructor(props) {
    super(props);

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
      showVideoReward: false
    };
  }

  static navigationOptions = {
    tabBarLabel: " ",


    tabBarIcon: ({ tintColor }) => {
      return (
        <View
          style={{
            width: 35,
            height: 20,
            marginTop: Platform.OS === "ios" ? 13 : 5
          }}
        >
          <Image
            style={{ width: 31, height: 31 }}
            source={require("../../images/qsoicon3.png")}
          />
          <Text style={{ fontSize: 9, marginTop: 3, marginLeft: 5 }}>QSO</Text>
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
    // }

  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = async nextAppState => {
    // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    console.log("App State:" + nextAppState);

    if (nextAppState === "active") {
      // si vino de background por haber mostrado la publicidad, vuelvo a resetear
      // el adShowed a false
      if (this.props.adshowed)
        this.props.manageLocationPermissions("adshowed", false);
      else {
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

  // loadInter = async () => {
  //   console.log("paso por intersitial");

  //   //  const advert = firebase.admob().interstitial('ca-app-pub-7987914246691031/5729668166');
  //   // const advert = firebase.admob().interstitial('ca-app-pub-3940256099942544/4411468910');
  //   if (Platform.OS === "ios") {
  //     this.advertInter = firebase
  //       .admob()
  //       .interstitial("ca-app-pub-7016811987787025/4660891787");
  //   } else {
  //     this.advertInter = firebase
  //       .admob()
  //       .interstitial("ca-app-pub-7016811987787025/7562044412");
  //   }

  //   try {
  //     const AdRequest = firebase.admob.AdRequest;
  //     const request = new AdRequest();
  //     request.addKeyword("foo").addKeyword("bar");

  //     // Load the advert with our AdRequest
  //     this.advertInter.loadAd(request.build());

  //     this.advertInter.on("onAdLoaded", () => {
  //       console.log("Advert intersitial is ready to show.");
  //       //   this.advertInter.show();
  //       this.intersitialLoaded = true;
  //       alert("intersitial loaded!");
  //     });

  //     this.advertInter.on("onAdClosed", event => {
  //       console.log("Se cerro el AD: ", event);
  //       this.intersitialLoaded = false;
  //         if (this.closeAd==='newqso')
  //             this.newqso_after_ad();
  //         if (this.closeAd==='sendmedia')
  //             this.subo_s3();
          
  //         //  vuelvo a cargar la publicidad por si luego envia otro media o hace otro qsoNew
  //             this.loadInter();
  //     });

  //     this.advertInter.on("onAdOpened", event => {
  //       console.log("se muestra el AD: ", event);
  //       this.intersitialLoaded = false;
  //       this.props.manageLocationPermissions("adshowed", true);

  //       //    this.loadInter();
  //     });

  //     this.advertInter.on("onAdLeftApplication", event => {
  //       console.log("se va de la APP porque hizo click?: ", event);
  //       this.intersitialLoaded = false;
  //     //  this.newqso_after_ad();
       
  //       // if (this.closeAd==='newqso')
  //       // this.newqso_after_ad();
  //   // if (this.closeAd==='sendmedia')
  //   //     this.subo_s3();
    
  //   //  vuelvo a cargar la publicidad por si luego envia otro media o hace otro qsoNew
  //       this.loadInter();


  //       //  this.loadInter();
  //     });
  //   } catch (err) {
  //     alert("intersitial loaded failed: " + err);
  //   }
  // };

  // loadVideoReward = async () => {
  //   //  let advert;

  //   if (Platform.OS === "ios") {
  //     this.advertVideoReward = firebase
  //       .admob()
  //       .rewarded("ca-app-pub-7016811987787025/5828178381");
  //   } else {
  //     this.advertVideoReward = firebase
  //       .admob()
  //       .rewarded("ca-app-pub-7016811987787025/1688132132");
  //   }

  //   // const advert = firebase.admob().rewarded('ca-app-pub-3940256099942544/5224354917');
  //   try {
  //     const AdRequest = firebase.admob.AdRequest;
  //     const request = new AdRequest();
  //     request.addKeyword("foo").addKeyword("bar");

  //     // Load the advert with our AdRequest
  //     this.advertVideoReward.loadAd(request.build());

  //     this.advertVideoReward.on("onAdLoaded", () => {
  //       console.log("Advert video rewarded is ready to show.");
  //       this.videorewardLoaded = true;
  //       alert("video reward loaded!");
  //       //    this.advertVideoReward.show();
  //     });

  //     this.advertVideoReward.on("onRewarded", event => {
  //       console.log(
  //         "The user watched the entire video and will now be rewarded!",
  //         event
  //       );
  //       this.videorewardLoaded = false;
  //       this.usergotreward = true;
  //       if (this.closeAd==='newqso')
  //          this.newqso_after_ad();
  //   if (this.closeAd==='sendmedia')
  //          this.subo_s3();

  //   //    this.newqso_after_ad();
  //       // this.loadVideoReward();
  //       this.loadVideoReward();
  //     });

  //     this.advertVideoReward.on("onAdClosed", event => {
  //       console.log("Se cerro el AD: ", event);
  //       this.videorewardLoaded = false;
  //       this.loadVideoReward();
  //       // if (!this.usergotreward)
  //       //      this.setState({notvideorewarded: true})
  //     });

  //     this.advertVideoReward.on("onAdOpened", event => {
  //       console.log("se muestra el AD: ", event);
  //       this.videorewardLoaded = false;
  //       this.props.manageLocationPermissions("adshowed", true);
  //       this.usergotreward = false;
  //       // this.loadVideoReward();
  //       // this.loadVideoReward();
  //     });

  //     this.advertVideoReward.on("onAdLeftApplication", event => {
  //       console.log("se va de la APP porque hizo click?: ", event);
  //       this.videorewardLoaded = false;
  //      // this.newqso_after_ad();
  //       // this.loadVideoReward();
  //     });
  //   } catch (err) {
  //     alert("video reward failed to load: " + err);
  //   }

  //   // advert.show();
  // };

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

    console.log("ejecuta toggleRecordModal");

    if (this.state.modalRecording) {
      this.setState({
        modalRecording: false
      });
    } else {
      this.setState({
        modalRecording: true
      });
    }

    // }
    // else this.setState({nointernet: true});
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

  openPremiumScreen = () => {
    this.props.navigation.navigate("BePremium", {
      freeparam: "qsoscreen"
    });
  };

  closeVariosModales = (param) => {
  //  this.setState({ nointernet: false, prevideorewarded: false });
    this.setState({ nointernet: false});
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
    this.intersitialmustbeshown = true;
    this.closeAd = 'sendmedia';
    this.setState({showIntersitial:true});
    

  }

  if (showVideoReward(this.props.userinfo,envio.type,this.props.mediafiles)) {
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
            
    this.props.addMedia(env);
    // creo mediafilelocal porque trada en actualizar REDUX entonces si es el caso
    // donde debe crear el QSO le envio del mediafileLocal, ver mas abajo.
    mediafileLocal = [ env ];

        // Fin de agrego a array de media del store

        

//this.props.uploadMediaToS3(fileName2, fileaux, fileauxProfileAvatar, this.props.sqlrdsid, this.state.description,this.size, this.props.sqsomedia.type, rdsUrl,urlNSFW, urlAvatar, fecha, this.width, this.height,this.props.rdsurls3,this.props.jwtToken);

        if (env.status==='inprogress')    // los envia si ya tienen SqlRdsId sino los deja en waiting
        this.props.uploadMediaToS3(env.name, env.url, fileauxProfileAvatar, env.sqlrdsid, env.description,env.size, env.type, env.rdsUrlS3 ,env.urlNSFW, env.urlAvatar, env.date, env.width, env.height,this.props.rdsurls3,this.props.jwtToken);
        else{
          // puede ser que ya este ingresado BAND, MODE y QRA y el ultimo paso que hizo fue agregar MEDIA
          // entonces hay que chequear si esta listo para crear el QSO y enviar todo junto
          console.log('mediafile Local:'+mediafileLocal);
          console.log(mediafileLocal);
          if (ONPROGRESS=updateOnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.qsoqras,mediafileLocal))
              await this.props.onprogressTrue();
            else
              this.props.onprogressFalse();

              console.log('onprogress '+ONPROGRESS)

              if (ONPROGRESS) {
                data = check_firstTime_OnProgress(this.props.qsotype,this.props.band,this.props.mode,
                                            this.props.qra,ONPROGRESS,this.props.sqsosqlrdsid, this.props.latitude,
                                            this.props.longitude);
                    console.log("Data to Send API: "+ JSON.stringify(data));  
                    this.props.actindicatorPostQsoNewTrue();
                    this.props.postQsoNew(data,this.props.qsoqras,mediafileLocal,this.props.jwtToken);
                    
              }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");

          }

  }

  render() {
    console.log("RENDER qso Screen");

    return (
      <View style={{ flex: 1 }}>
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

          <VariosModales
            show={this.state.nointernet}
            modalType="nointernet"
            closeInternetModal={this.closeVariosModales.bind()}
          />

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
              <RecordAudio2 closeModal={this.toggleRecModal.bind(this)} />

              {/* <Button onPress={() => this.toggleRecModal()} title="Cierro" /> */}
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
                marginTop: 35,
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
              <Muestro openPremium={this.openPremiumScreen.bind()} send_data_to_qsoscreen={this.receive_data_from_modal.bind()} height={this.state.heightPhotoConfirm} />

              {/* style={{ paddingBottom: 4}} */}
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ width: 65 }}
                  onPress={() => this.closeModalPhotoConfirmation()}
                >
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 5 }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
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
                left: 20,
                right: 20,
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
                  color: "white",
                  marginBottom: 10
                }}
              >
                Are you sure to END this {this.props.qsotype} mode ?{" "}
              </Text>

              <View style={{ flexDirection: "row", flex: 1 }}>
                <TouchableHighlight
                  onPress={() => this.endQso()}
                  style={{
                    flex: 0.7,
                    paddingTop: 20,
                    paddingBottom: 4,
                    paddingHorizontal: 10
                  }}
                >
                  <Text
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                      fontSize: 14
                    }}
                  >
                    End this {this.props.qsotype} mode
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  onPress={() => this.CancelEndQsoModal()}
                  style={{ flex: 0.3, paddingTop: 20, paddingBottom: 4 }}
                >
                  <Text
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                      fontSize: 14
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          {/* width:this.width-10 */}
        </View>

        <View style={{ flex: 0.58 }}>
          {/* { this.props.sqsonewqsoactive ? */}

          <MediaFiles />
          {/* :
                null } */}
        </View>

        <View style={{ flexDirection: "row", flex: 0.12, marginTop: 6 }}>
          <View style={{ flex: 0.5, marginTop: 3, marginLeft: 5 }}>
            {this.props.sqsonewqsoactive ? (
              <TouchableOpacity style={{ width: 65,height:63 }} onPress={() => this.OpenEndQsoModal()}>
                <Image
                  source={require("../../images/removecircle.png")}
                  style={{ width: 33, height: 33, marginLeft: 15, marginTop: 7 }}
                  resizeMode="contain"
                />
                {/* <Text style={{ fontSize: 12, color: '#999'}}>EndQso</Text>           */}
                <Text style={{ fontSize: 13, color: "black", marginLeft: 8 }}>EndQso</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{  width: 65,height:63 }} onPress={() => this.newQso()}>
                <Image
                  source={require("../../images/iaddcircle.png")}
                  style={{ width: 33, height: 33, marginLeft: 15, marginTop: 7 }}
                  resizeMode="contain"
                />
                {/* <Text style={{ fontSize: 12, color: '#999'}}>NewQso</Text>           */}
                <Text style={{ fontSize: 13, color: "black", marginLeft: 7 }}>NewQso</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* { (this.props.sqsosqlrdsid !== '') ? */}
          {this.props.sqsonewqsoactive ? (
            <View style={{ flex: 0.25, alignItems: "flex-end", marginTop: 5 }}>
              <TouchableOpacity style={{width: 65,height:63 }}
                onPress={() => this.checkInternetOpenRecording()}
              >
                <Image
                  source={require("../../images/mic.png")}
                  style={{ width: 33, height: 33, marginLeft: 15, marginTop: 7 }}
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
                  style={{ width: 33, height: 33, marginLeft: 15, marginTop: 7 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 12, color: "black",   marginLeft: 14 }}>Photo</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
          {(this.state.showIntersitial) && <AdInter newqso={this.newqso_after_ad.bind()} subos3={this.subo_s3.bind()} closead={this.closeAd}  /> }
          {(this.state.showVideoReward) && <AdVideoReward newqso={this.newqso_after_ad.bind()} subos3={this.subo_s3.bind()} closead={this.closeAd} notrewared={this.not_rewarded.bind()} /> }
      </View>
    );
  }
}

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
    qsoscreendidmountfirsttime: state.sqso.qsoScreenDidMountFirstTime,
    rdsurls3: state.sqso.urlRdsS3,
    band: state.sqso.currentQso.band,
    mode: state.sqso.currentQso.mode,
    //qsotype: state.sqso.currentQso.qsotype,
    qsoqras: state.sqso.currentQso.qsoqras,
   // sqlrdsid: state.sqso.currentQso.sqlrdsId,
    latitude: state.sqso.currentQso.latitude,
    longitude: state.sqso.currentQso.longitude,
    mediafiles: state.sqso.currentQso.mediafiles
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
  uploadMediaToS3
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QsoScreen);
