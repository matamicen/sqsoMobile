import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import React, { Component } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Permissions from 'react-native-permissions';
import { WebView } from 'react-native-webview';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
// import QsoHeader from './QsoHeader';
// import QsoHeaderLink from './QsoHeaderLink';
import { getQslScan, updateLinkQso, manage_notifications, setWebView, setPressHome, setExternalShreUrl } from '../../actions';

import { getDateQslScan } from '../../helper';
import { hasAPIConnection } from '../../helper';
import I18n from '../../utils/i18n';
import VariosModales from './VariosModales';
import global_config from '../../global_config.json';

import ShareMenu from 'react-native-share-menu';
import AsyncStorage from '@react-native-community/async-storage';





class Home extends Component {
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

    this.urlWebView = '';
    this.session = '';
    this.time = 3000;

    //  this._pasEditUnmountFunction = this._pasEditUnmountFunction.bind(this);
    this.backHandler = null;

    this.state = {
      nointernet: false,
      urlWebView: '',
      iap: false
    };
  }

  componentDidMount () {


    ShareMenu.getSharedText((text) => {
      console.log('el text del share 09:'+JSON.stringify(text) )
       if (text!==null && (typeof text !== 'undefined')) {
        // if (typeof text !== 'undefined') {
        console.log('el text del share 09: '+ text)
        auxshare1 = JSON.stringify(text);
        auxshare2 = JSON.parse(auxshare1);
        console.log('auxshare: ' + auxshare2.data)
        AsyncStorage.setItem('shareExternalMedia', auxshare2.data);
        AsyncStorage.setItem('shareExternalMediaMimeType', auxshare2.mimeType);
       
        this.props.setExternalShreUrl(true);
        this.props.navigation.navigate("QsoScreen");
        
        //  console.log('timeout share 1')
        //       setTimeout(
        //       () => {
        //           console.log('timeout share 2')
                 
                  
 
        //         },
        //       3000);
        
      }
      // else
      // this.props.setExternalShreUrl(false);
    })
    // if (Platform.OS==='ios')

    // setTimeout(
    //   () => this.handleInjectJavascript(this.props.webviewsession),
    // 20000);
    // if (this.backHandler)
    //    this.backHandler.remove();
    //    this.backHandler = BackAndroid.addEventListener('hardwareBackPress', this._pasEditUnmountFunction);

    // estaban este
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction
    );

    // estaba este
    this.props.navigation.addListener('didFocus', this.onScreenFocus);
    this.props.navigation.setParams({
      tapOnTabNavigator: this.tapOnTabNavigator
    });
  }

  componentWillUnmount() {
    if (this.backHandler) this.backHandler.remove();
  }

  backAction = () => {
    // I18n.t("BACKBUTTONANDROID")
    // I18n.t("BACKBUTTONANDROIDCANCEL") BACKBUTTONANDROIDEXIT

    Alert.alert(I18n.t('BACKBUTTONANDROIDTITLE'), I18n.t('BACKBUTTONANDROID'), [
      {
        text: I18n.t('BACKBUTTONANDROIDCANCEL'),
        onPress: () => null,
        style: I18n.t('BACKBUTTONANDROIDCANCEL')
      },
      {
        text: I18n.t('BACKBUTTONANDROIDEXIT'),
        onPress: () => BackHandler.exitApp()
      }
    ]);
    return true;
  };

  onScreenFocus = async () => {
    // Screen was focused, our on focus logic goes here
    console.log('HOME en FOCUS!');
    // session = await Auth.currentSession();
    // console.log("Su token session home: " + session.idToken.jwtToken);
    // console.log('session home: '+session);
    // aux = 'https://test.dd39wvlkuxk5j.amplifyapp.com/?'+ JSON.stringify(new Date());
    // console.log('aux OnScreenFocus: '+aux)
    // this.setState({urlWebView: aux})
    // // setTimeout(
    // // () => {

    // //   this.webView.postMessage(JSON.stringify(session))

    // // },
    // // 5000);
    // this.session = JSON.stringify(session);
  };
  tapOnTabNavigator = async () => {
    console.log('PRESS HOME!');
    // sumo contador de press home para resfrescar el feed solo cuando apreta la segunda vez

    if (this.props.presshome === 1) {
      //  home = global_config.urlWeb + '?' + new Date();
      home = global_config.urlWeb + '?embedded=true&date=' + new Date();
      // cada vez que apreta el INICIO le bajo a 50 el timeout asi se loguea una vez y no dos veces como la primera vez
      // la primera vez tiene un tiemout de 3000 porque hay que darle mas tiempo para asegurar el LOGIN.
      this.time = 50;
      await this.props.setWebView(this.props.webviewsession, home);

      //   this.props.setPressHome(0);
    } else this.props.setPressHome(1);
  };

  navigate = () => {
    const navigateToScreen2 = NavigationActions.navigate({
      routeName: 'Root'
    });

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Root' })]
    });

    // The navigateToScreen2 action is dispatched and new navigation state will be calculated in basicNavigationReducer here ---> https://gist.github.com/shubhnik/b55602633aaeb5919f6f3c15552d1802
    this.props.navigation.dispatch(resetAction);
  };

  closeVariosModales = () => {
    this.setState({ nointernet: false });
  };

  checkInternetScanQR = async (param) => {
    console.log('entro a PEDIR PERMISOS');
    if (await hasAPIConnection()) {
      Permissions.request('microphone').then((response) => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log('Microphone Permiso: ' + response);
        if (response === 'authorized') {
          console.log('entro a PEDIR PERMISOS esta AUTORIZADO!!!');
          this.micPermission = true;
          // this.props.navigation.navigate("QslScanQR");
        }

        if (response === 'denied' && Platform.OS !== 'android') {
          Alert.alert(I18n.t('DENIED_ACCESS_2'), I18n.t('TO_AUTHORIZE_2_IOS'), [
            {
              text: 'No, thanks',
              onPress: () => console.log('Permission denied'),
              style: 'cancel'
            },
            { text: 'Open Settings', onPress: Permissions.openSettings }
          ]);
        }

        if (response === 'restricted' && Platform.OS === 'android') {
          Alert.alert(
            I18n.t('DENIED_ACCESS_2'),
            I18n.t('TO_AUTHORIZE_2_ANDROID'),
            [
              {
                text: 'Ok',
                onPress: () => console.log('ok'),
                style: 'cancel'
              }
            ]
          );
        }

        if (response === 'restricted' && Platform.OS !== 'android') {
          Alert.alert(
            I18n.t('ACCESS_TO_MICROPHONE'),
            I18n.t('PARENTAL_CONTROLS'),
            [
              {
                text: 'Ok',
                onPress: () => console.log('ok'),
                style: 'cancel'
              }
            ]
          );
        }

        Permissions.request('camera').then((response) => {
          // Returns once the user has chosen to 'allow' or to 'not allow' access
          // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
          console.log('Camera Permiso: ' + response);
          if (response === 'authorized') {
            // this.props.closeModalConfirmPhoto('image');
            // this.props.navigation.navigate("CameraScreen2");
            this.camPermission = true;
          }

          if (response === 'denied' && Platform.OS !== 'android') {
            Alert.alert(
              I18n.t('DENIED_ACCESS_1'),
              I18n.t('TO_AUTHORIZE_2_IOS'),
              [
                {
                  text: 'No, thanks',
                  onPress: () => console.log('Permission denied'),
                  style: 'cancel'
                },
                { text: 'Open Settings', onPress: Permissions.openSettings }
              ]
            );
          }

          if (response === 'restricted' && Platform.OS === 'android') {
            Alert.alert(
              I18n.t('DENIED_ACCESS_1'),
              I18n.t('TO_AUTHORIZE_2_ANDROID'),
              [
                {
                  text: 'Ok',
                  onPress: () => console.log('ok'),
                  style: 'cancel'
                }
              ]
            );
          }

          if (response === 'restricted' && Platform.OS !== 'android') {
            Alert.alert(
              I18n.t('ACCESS_TO_CAMERA'),
              I18n.t('PARENTAL_CONTROLS'),
              [
                {
                  text: 'Ok',
                  onPress: () => console.log('ok'),
                  style: 'cancel'
                }
              ]
            );
          }

          if (
            this.micPermission &&
            this.camPermission &&
            param === 'qslscanScreen'
          )
            // this.props.navigation.navigate("QslScanQR");

            this.props.navigation.navigate('QslScanQR', {
              scantype: 'Home'
            });
          else {
            this.props.updateLinkQso('', 'clear');
            this.props.navigation.navigate('QsoLink');
          }
        });
      });
    } else this.setState({ nointernet: true });
  };

  yourPosts = async (qra) => {
    console.log('yourlatest');
    // urlnotif = 'https://www.superqso.com/'+qra;
    urlnotif = global_config.urlWeb + qra;
    Linking.canOpenURL(urlnotif)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + urlnotif);
        } else {
          // if(__DEV__)
          //   analytics().logEvent("OPENyourposts_DEV", {"QRA": this.props.qra});
          // else
          if (!__DEV__)
            analytics().logEvent('OPENyourposts_PRD', { QRA: this.props.qra });

          return Linking.openURL(urlnotif);
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
        crashlytics().setUserId(this.props.qra);
        crashlytics().log('error: ' + JSON.stringify(err));
        if (__DEV__)
          crashlytics().recordError(new Error('Linking.yourposts_DEV'));
        else crashlytics().recordError(new Error('Linking.yourposts_PRD'));
      });
  };

  latestPosts = async () => {
    console.log('latest');
    urlnotif = urlnotif = global_config.urlWeb;
    // 'https://www.superqso.com/';
    Linking.canOpenURL(urlnotif)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + urlnotif);
        } else {
          // if(__DEV__)
          //   analytics().logEvent("OPENlatestposts_DEV", {"QRA": this.props.qra});
          // else
          if (!__DEV__)
            analytics().logEvent('OPENlatestposts_PRD', {
              QRA: this.props.qra
            });

          return Linking.openURL(urlnotif);
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
        crashlytics().setUserId(this.props.qra);
        crashlytics().log('error: ' + JSON.stringify(err));
        if (__DEV__)
          crashlytics().recordError(new Error('Linking.latestposts_DEV'));
        else crashlytics().recordError(new Error('Linking.latestposts_PRD'));
      });
  };

  handleInjectJavascript = (data) => {
    console.log('handleJavascript!');
    const injectJavascriptStr = `(function() {
        setTimeout(() => {
         window.WebViewBridge.onMessage(${JSON.stringify(data)});
        
         
        }, 100);
      })()`;
    if (this.webView) {
      this.webView.injectJavaScript(injectJavascriptStr);
    }
  };

  // onMessage(data) {
  //   //Prints out data that was passed.
  //   console.log(data);
  // }

  render() {
    console.log('RENDER Home SCAN SCREEN!');
    // const { params } = this.props.navigation.state;
    //   // this.urlWebView = params ? params.url : 'http://192.168.0.9:3000';
    //   aux = 'https://test.dd39wvlkuxk5j.amplifyapp.com/?'+ JSON.stringify(new Date());
    //   console.log('aux: '+aux)
    //   console.log('params:'+ params)

    //  this.urlWebView = params ? params.url : aux;
    // console.log('urlhome:'+ this.urlWebView);
    // this.toast('Cargando Publicaciones...',5000);

    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{flex: 0.4, flexDirection: 'column', alignItems: 'flex-end'}}>   

// este andaba en comments
 <KeyboardAvoidingView
      behavior="padding"
      style={{ flex:1 }}
      enabled={Platform.OS === "android"}
    > 



<KeyboardAvoidingView
  behavior="padding"
  style={{ flex:1 }}
  enabled={Platform.OS === "android"}
  >
 
    <FixViewJs />




</View> */}

        {1 === 1 ? (
          Platform.OS === 'android' ? (
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1 }}
              enabled={Platform.OS === 'android'}>
              <WebView
                //  source={{ uri: 'https://www.superqso.com' }}
                source={{ uri: this.props.webviewurl }}
                //  source={{ uri: 'http://192.168.0.39:3000' }}
                // source={{ uri: 'http://192.168.0.9:3000' }}
                // source={{ uri: params ? params.url : 'http://192.168.0.9:3000' }}
                ref={(view) => (this.webView = view)}
                style={{ marginTop: 0 }}
                automaticallyAdjustContentInsets={false}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                textZoom={100}
                //  scalesPageToFit={false}
                //  onMessage={this.onMessage}
                //  onMessage={(event) => {
                //    if (this.ejecuta)
                //   {
                //     this.setState({iap:true})
                //     // alert(event.nativeEvent.data);
                //     setTimeout(
                //       () => this.setState({iap:false}),
                //     2000);
                //     this.ejecuta=false;
                //   }
                // }}

                onShouldStartLoadWithRequest={(event) => {
                  // termine usando este evento para no usar this.webView.stopLoading(); en el evento onNavigationStateChange
                  // que hacia que me freeze la webview cuando volvia de twitter

                  console.log('event url:' + event.url);
                  auxurl = event.url.substring(0, 27);
                  console.log('event auxurl:' + auxurl);

                  // if (event.url !== this.props.webviewurl) {
                  // porque si hace click en un avatar evito abrir LinkURL y se queda en webview.
                  if (
                    auxurl.indexOf('test.') !== -1 ||
                    auxurl.indexOf('superqso.') !== -1
                  ) {
                    console.log('es test o superqso.com');
                    return true;
                  } else {
                    // this.webView.stopLoading();

                    // este flag es para que cuando regrese de background luego de un share no traiga notificactions de vuelta.
                    // this.props.manage_notifications("NOTIF_BACKGROUND_TRUE", "",'');  no llama al flag cuando comaprte wsapp
                    this.props.manage_notifications(
                      'NOTIF_BACKGROUND_TRUE',
                      '',
                      ''
                    );
                    Linking.openURL(event.url);
                    return false;
                  }
                }}
                //     onNavigationStateChange={(event)  => {

                //       console.log('event url:'+ event.url)
                //       auxurl = event.url.substring(0, 27);
                //       console.log('event auxurl:'+ auxurl)

                //       // if (event.url !== this.props.webviewurl) {
                //       // porque si hace click en un avatar evito abrir LinkURL y se queda en webview.
                //       if  ((auxurl.indexOf("test.") !== -1) || (auxurl.indexOf("superqso.") !== -1))
                //       { console.log('es test o superqso.com')

                //       }else
                //       {
                //       this.webView.stopLoading();

                //       // este flag es para que cuando regrese de background luego de un share no traiga notificactions de vuelta.
                //       // this.props.manage_notifications("NOTIF_BACKGROUND_TRUE", "",'');  no llama al flag cuando comaprte wsapp
                //       this.props.manage_notifications("NOTIF_BACKGROUND_TRUE", "",'');
                //         Linking.openURL(event.url);

                //   }

                // }}

                mediaPlaybackRequiresUserAction={false} // para que ande el play automatico del audio
                startInLoadingState={true}
                renderError={(errorName) => <Error name={errorName} />}
                // cacheEnabled = {true}
                //    injectedJavaScript={`(function() {
                //   setTimeout(() => {
                //     window.WebViewBridge.onMessage(${this.props.webviewsession});

                //    }, 100);
                //  })()`}

                onLoadStart={(syntheticEvent) => {
                  // update component to be aware of loading statuss
                  const { nativeEvent } = syntheticEvent;

                  console.log('webviewUrl: ' + this.props.webviewurl);
                  console.log(
                    'webviewSession: ' +
                      JSON.stringify(this.props.webviewsession)
                  );

                  //esta esto en v1.3.0
                  setTimeout(
                    () =>
                      this.webView.postMessage(
                        JSON.stringify(this.props.webviewsession)
                      ),
                    this.time
                  );
                  // setTimeout(
                  //   () => this.handleInjectJavascript(JSON.stringify(this.props.webviewsession)),
                  //   this.time);
                }}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.warn('WebView error: ', nativeEvent);
                }}
              />
            </KeyboardAvoidingView>
          ) : (
            // WebView para IOS con  onNavigationStateChange no anda bien el Should por eso se lo deje solo a Android
            <WebView
              source={{ uri: this.props.webviewurl }}
              // source={{ uri: 'http://192.168.0.9:3000' }}
              // source={{ uri: params ? params.url : 'http://192.168.0.9:3000' }}
              ref={(view) => (this.webView = view)}
              style={{ marginTop: 0 }}
              automaticallyAdjustContentInsets={false}
              domStorageEnabled={true}
              javaScriptEnabled={true}
              //  onNavigationStateChange={this.onNavigationStateChange.bind(this)}
              //  originWhitelist={['*']}
              //  ref={this.WEBVIEW_REF}
              //  source={{uri: 'https://www.***.com/'}}

              onNavigationStateChange={(event) => {
                console.log('event url:' + event.url);
                auxurl = event.url.substring(0, 27);
                console.log('event auxurl:' + auxurl);

                // if (event.url !== this.props.webviewurl) {
                // porque si hace click en un avatar evito abrir LinkURL y se queda en webview.
                if (
                  auxurl.indexOf('test.') !== -1 ||
                  auxurl.indexOf('superqso.') !== -1
                ) {
                  console.log('es test o superqso.com');

                  //esto anda
                  // setTimeout( () => this.handleInjectJavascript(JSON.stringify(this.props.webviewsession)),
                  // 100);
                } else {
                  this.webView.stopLoading();

                  // este flag es para que cuando regrese de background luego de un share no traiga notificactions de vuelta.
                  // this.props.manage_notifications("NOTIF_BACKGROUND_TRUE", "",'');  no llama al flag cuando comaprte wsapp
                  this.props.manage_notifications(
                    'NOTIF_BACKGROUND_TRUE',
                    '',
                    ''
                  );
                  Linking.openURL(event.url);
                }
              }}
              mediaPlaybackRequiresUserAction={false} // para que ande el play automatico del audio
              startInLoadingState={true}
              renderError={(errorName) => <Error name={errorName} />}
              // cacheEnabled = {true}
              //    injectedJavaScript={`(function() {
              //   setTimeout(() => {
              //     window.WebViewBridge.onMessage(${this.props.webviewsession});

              //    }, 100);
              //  })()`}

              onLoadStart={(syntheticEvent) => {
                // update component to be aware of loading statuss
                const { nativeEvent } = syntheticEvent;
                console.log('webview comenzo a cargar 3000 ios');

                console.log('webviewUrl: ' + this.props.webviewurl);
                console.log(
                  'webviewSession: ' + JSON.stringify(this.props.webviewsession)
                );

                // ios necesita 100 de timeout minimo (android no necesita)
                // estos dos andan
                //  if (Platform.OS==='android')

                //       setTimeout(
                //         () => this.webView.postMessage(JSON.stringify(this.props.webviewsession)),
                //       100);
                // if (Platform.OS==='ios')
                setTimeout(
                  () =>
                    this.handleInjectJavascript(
                      JSON.stringify(this.props.webviewsession)
                    ),
                  this.time
                );
              }}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
              }}
            />
          )
        ) : (
          <View />
          //           <View
          //             style={{
          //               flex: 1,
          //               flexDirection: 'column',
          //               alignItems: 'center',
          //               justifyContent: 'center'
          //             }}>
          //             <View
          //               style={{
          //                 flex: 0.12,
          //                 flexDirection: 'row',
          //                 justifyContent: 'center',
          //                 alignItems: 'center'
          //               }}>
          //               <View style={{ flex: 0.2 }}>
          //                 <TouchableOpacity
          //                   style={{
          //                     alignItems: 'center',
          //                     alignContent: 'center',
          //                     height: 60
          //                   }}
          //                   onPress={() => this.props.navigation.navigate('QsoScreen')}>
          //                   <Image
          //                     source={require('../../images/startPost.png')}
          //                     style={{ width: 39, height: 39 }}
          //                     resizeMode="contain"
          //                   />
          //                 </TouchableOpacity>
          //               </View>
          //               <View style={{ flex: 0.8 }}>
          //                 <TouchableOpacity
          //                   style={{ height: 50 }}
          //                   onPress={() => this.props.navigation.navigate('QsoScreen')}>
          //                   <Text
          //                     style={{
          //                       fontSize: 16,
          //                       marginTop: 12,
          //                       fontWeight: 'bold',
          //                       color: '#243665'
          //                     }}>
          //                     {I18n.t('variosModprevideoRewStartPost')}
          //                   </Text>
          //                   {/* <Text style={{fontSize: 16, fontWeight: 'bold', color: '#243665'}}>{I18n.t("HomeLatestPosts2")}</Text> */}
          //                 </TouchableOpacity>
          //               </View>
          //             </View>

          //             <View
          //               style={{
          //                 flex: 0.12,
          //                 flexDirection: 'row',
          //                 justifyContent: 'center',
          //                 alignItems: 'center'
          //               }}>
          //               <View style={{ flex: 0.2 }}>
          //                 <TouchableOpacity
          //                   style={{
          //                     alignItems: 'center',
          //                     alignContent: 'center',
          //                     height: 50
          //                   }}
          //                   onPress={() => this.latestPosts()}>
          //                   <Image
          //                     source={require('../../images/home.png')}
          //                     style={{ width: 36, height: 36 }}
          //                     resizeMode="contain"
          //                   />
          //                 </TouchableOpacity>
          //               </View>
          //               <View style={{ flex: 0.8 }}>
          //                 <TouchableOpacity
          //                   style={{ height: 50 }}
          //                   onPress={() => this.latestPosts()}>
          //                   <Text
          //                     style={{
          //                       fontSize: 16,
          //                       marginTop: 12,
          //                       fontWeight: 'bold',
          //                       color: '#243665'
          //                     }}>
          //                     {I18n.t('HomeLatestPosts1')} {I18n.t('HomeLatestPosts2')}
          //                   </Text>
          //                   {/* <Text style={{fontSize: 16, fontWeight: 'bold', color: '#243665'}}>{I18n.t("HomeLatestPosts2")}</Text> */}
          //                 </TouchableOpacity>
          //               </View>
          //             </View>

          //             {/* <View style={{ flex:0.50, justifyContent: 'center', alignItems: 'center'}}>  */}
          //             <View
          //               style={{
          //                 flex: 0.12,
          //                 flexDirection: 'row',
          //                 justifyContent: 'center',
          //                 alignItems: 'center'
          //               }}>
          //               <View style={{ flex: 0.2 }}>
          //                 <TouchableOpacity
          //                   style={{
          //                     alignItems: 'center',
          //                     alignContent: 'center',
          //                     height: 50
          //                   }}
          //                   onPress={() => this.yourPosts(this.props.qra)}>
          //                   <Image
          //                     source={require('../../images/activity2.png')}
          //                     style={{ width: 36, height: 36 }}
          //                     resizeMode="contain"
          //                   />
          //                 </TouchableOpacity>
          //               </View>
          //               <View style={{ flex: 0.8 }}>
          //                 <TouchableOpacity
          //                   style={{ height: 50 }}
          //                   onPress={() => this.yourPosts(this.props.qra)}>
          //                   <Text
          //                     style={{
          //                       fontSize: 16,
          //                       marginTop: 12,
          //                       fontWeight: 'bold',
          //                       color: '#243665'
          //                     }}>
          //                     {I18n.t('HomeMyPosts1')} {I18n.t('HomeMyPosts2')}
          //                   </Text>
          //                   {/* <Text style={{fontSize: 16, fontWeight: 'bold', color: '#243665'}}>{I18n.t("HomeMyPosts2")}</Text> */}
          //                 </TouchableOpacity>
          //               </View>
          //             </View>
          //             {/*
          //      </View>

          //      <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'flex-start'}}>     */}

          //             {/* <View style={{ flex:0.50, justifyContent: 'center', alignItems: 'center'}}>  */}
          //             <View
          //               style={{
          //                 flex: 0.12,
          //                 flexDirection: 'row',
          //                 justifyContent: 'center',
          //                 alignItems: 'center'
          //               }}>
          //               <View style={{ flex: 0.2 }}>
          //                 <TouchableOpacity
          //                   style={{
          //                     alignItems: 'center',
          //                     alignContent: 'center',
          //                     height: 50
          //                   }}
          //                   onPress={() => this.checkInternetScanQR('qslscanScreen')}>
          //                   <Image
          //                     source={require('../../images/qrcodescan.png')}
          //                     style={{ width: 36, height: 36 }}
          //                     resizeMode="contain"
          //                   />
          //                 </TouchableOpacity>
          //               </View>
          //               <View style={{ flex: 0.8 }}>
          //                 <TouchableOpacity
          //                   style={{ height: 50 }}
          //                   onPress={() => this.checkInternetScanQR('qslscanScreen')}>
          //                   <Text
          //                     style={{
          //                       fontSize: 16,
          //                       marginTop: 12,
          //                       fontWeight: 'bold',
          //                       color: '#243665'
          //                     }}>
          //                     {I18n.t('HomeScanQslCard')}
          //                   </Text>
          //                 </TouchableOpacity>
          //               </View>
          //             </View>

          //             {/* <View style={{ flex:0.50, justifyContent: 'center', alignItems: 'center'}}>  */}
          //             {/* // por ahora dejo afuera link QSO porque son muchos features */}
          //             {/* <TouchableOpacity  style={{alignItems:"center", alignContent:"center", marginTop:30}}  onPress={ () => this.checkInternetScanQR('qsolink')  }>

          //    <Image source={require('../../images/link2.png')}  style={{width: 36, height: 36 } }
          // resizeMode="contain" />
          // <Text style={{ fontSize: 16, color: '#243665'}}>Link Qso</Text>
          // </TouchableOpacity>  */}

          //             {/* </View> */}
          //           </View>
        )}

        {this.state.nointernet && (
          <VariosModales
            show={this.state.nointernet}
            modalType="nointernet"
            closeInternetModal={this.closeVariosModales.bind()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  contentContainer: {},
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

const mapStateToProps = (state) => {
  return {
    // sqsoqslalreadyscan: state.sqso.qslAlreadyScan,
    sqsoqslscan: state.sqso.currentQso.qslscan.body.message,
    //  sqsoqslscanbody: state.sqso.currentQso.qslscan.body,
    sqsoqslscanerror: state.sqso.currentQso.qslscan.body.error,
    qra: state.sqso.qra,
    webviewurl: state.sqso.webviewUrl,
    webviewsession: state.sqso.webviewSession,
    presshome: state.sqso.pressHome
  };
};

const mapDispatchToProps = {
    getQslScan,
    updateLinkQso,
    manage_notifications,
    setWebView,
    setPressHome,
    setExternalShreUrl
    
   }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
