import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, TouchableOpacity,  StyleSheet, Platform, 
  PermissionsAndroid, Alert, Dimensions, TextInput, Modal , Linking } from 'react-native';
import { connect } from 'react-redux';
import Login from './Login';
//import Amplify, { Auth, API, Storage } from 'aws-amplify'
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports'
//import Qra from './../Qso/Qra';
import QraProfile from './../Qso/QraProfile';
import FollowerList from './FollowerList';
import AsyncStorage from '@react-native-community/async-storage';
import { closeModalConfirmPhoto, resetForSignOut, postPushToken, profilePictureRefresh,
  followingsSelected, manage_notifications, confirmedPurchaseFlag, restoreCall,
  setSendingProfilePhotoModal, setConfirmProfilePhotoModal, setProfileModalStat,
  getUserInfo,sendActualMedia, manageLocationPermissions, setPressHome } from '../../actions';
import { hasAPIConnection } from '../../helper';
import VariosModales from '../Qso/VariosModales';
import Permissions from 'react-native-permissions'
import Muestro from './../Qso/Muestro';
// import { kinesis_catch } from '../../helper';
import  ContactUs  from './ContactUs';
import RestoreSubscription from './RestoreSubscription';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import ImagePicker from 'react-native-image-crop-picker';
import CamaraSelect from '../Qso/CamaraSelect';
import I18n from '../../utils/i18n';




//Amplify.configure(awsconfig);
Auth.configure(awsconfig);

class InitialScreen extends Component {
  static navigationOptions = {
      tabBarLabel: ' ',

      tabBarIcon: ({ tintColor }) => {
        // return (<View style={{width: 50, height: 20,marginTop: (Platform.OS==='ios') ? 1 : 2, backgroundColor:'yellow'}}>
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
            // style={{ width: 31, height: 31, marginLeft: 9 }}
            style={{ width: 31, height: 31, marginLeft: 0, marginTop: (Platform.OS==='ios') ? 18 : 24 }}
            source={require('../../images/profile1.png')}/>
             <Text style={{fontSize:9, marginTop: 3, marginLeft: 0}}>{I18n.t("InitialScreenProfile")}</Text>
            {/* <Text style={{fontSize:9, marginTop: 3, marginLeft: I18n.locale.substring(0, 2)==='es' ? 11:7}}>{I18n.t("InitialScreenProfile")}</Text> */}
            </View>
            
            );}

      // tabBarIcon: ({ tintColor }) => {
      //   return (<Image
      //       style={{ width: 31, height: 31  }}
      //       source={require('../../images/profile1.png')}/>);}

  }

  constructor(props) {
    super(props);
    TextInput.defaultProps = { allowFontScaling: false };
    Text.defaultProps = { allowFontScaling: false };

    this.width = Dimensions.get('window').width; //full width
    this.height = Dimensions.get('window').height; //full height
        
    
    this.state = {
        nointernet: false,
        contactus: false,
        showRestoreSubscription: false,
        camaraSelect: false
    };
  }



  async componentDidMount() {
    console.log("component Did Mount InitalScreen");

        // esto detecta cuando se apreta el TAB  de InitialScreen
        this.props.navigation.setParams({
          tapOnTabNavigator: this.tapOnTabNavigator
        })

  }

  tapOnTabNavigator = async () => {
    console.log('PRESS INITIAL SCREEN!');
    this.props.setPressHome(0);
  }

  gotoLoginScreen = () => {
    console.log("va camara Login Screen");
   
    this.props.navigation.navigate("Root");
  
}


onPressAvatar = async (qra) => {
        
  urlnotif = 'https://www.superqso.com/'+qra;
  Linking.canOpenURL(urlnotif).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + urlnotif);
    } else {
      if(__DEV__)
        analytics().logEvent("OPENWEBPROFILE_DEV", {"QRA": this.props.qra});
      else
        analytics().logEvent("OPENWEBPROFILE_PRD", {"QRA": this.props.qra});
      console.log("Recording analytics open Notif")
      return Linking.openURL(urlnotif);
    
    }
  }).catch(err => {
          console.error('An error occurred', err)
          crashlytics().setUserId(this.props.qra);
          crashlytics().log('error: ' + JSON.stringify(err)) ;
          if(__DEV__)
          crashlytics().recordError(new Error('Linking.OpenProfile_DEV'));
          else
          crashlytics().recordError(new Error('Linking.OpenProfile_PRD'));


        });
      }


signOut = async () => {

  if (await hasAPIConnection())
  {
    try {
    console.log("mat llama API pushToken por fallar var pushtoken = await AsyncStorage.getItem('pushtoken'); + token:"+this.props.pushtoken + "QRA: se envia vacio");
    var pushtoken = await AsyncStorage.getItem('pushtoken');
   // await AsyncStorage.setItem('qratoken', 'empty');
    }
    catch(err) {
      console.log(err)
      //  kinesis_catch('#006',err,this.props.qra);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + JSON.stringify(err)) ;
      if(__DEV__)
      crashlytics().recordError(new Error('SignOut_getPushToken_DEV'));
      else
      crashlytics().recordError(new Error('SignOut_getPushToken_PRD'));

      
    }

    await this.props.postPushToken(pushtoken,'',Platform.OS,this.props.jwtToken);
    await Auth.signOut()
      .then(data => {
        console.log(JSON.stringify(data))
        this.props.profilePictureRefresh('');
        this.props.manage_notifications('DELETE_NOTIF','','');

        // crashlytics().setUserId(this.props.qra);
        // crashlytics().log('error: ' + JSON.stringify(data)) ;
        // crashlytics().recordError(new Error('SignOut_DentroSignOut'));
      })
      
      .catch(err => {console.log(err)
     //   kinesis_catch('#006',err,this.props.qra);
        crashlytics().setUserId(this.props.qra);
        crashlytics().log('error: ' + JSON.stringify(err)) ;
        if(__DEV__)
        crashlytics().recordError(new Error('SignOut_AuthSignOut_DEV'));
        else
        crashlytics().recordError(new Error('SignOut_AuthSignOut_PRD'));
  
      });

      try {
        session = await Auth.currentSession();
        console.log("Su token es: " + session.idToken.jwtToken);
        this.setState({ tok: session.idToken.jwtToken })
      }
      catch (e) {
        console.log('caught error', e);
        console.log("va camara Login Screen");
       this.props.resetForSignOut();
        this.props.navigation.navigate("Root");


        // Es ok que de Error aca porque acaba de hacer SignOut, no lo trackeo en crashlytics
        // porque no es un error
        
    //     crashlytics().setUserId(this.props.qra);
    //  //   crashlytics().setAttribute('InitialScreen', '#1');
    //     crashlytics().log('error: ' + e) ;
    //     crashlytics().recordError(new Error('SignOut_AuthCurrentSession'));

  
      }

    } else
    this.setState({nointernet: true});

  }


  closeVariosModales = () => {
    this.setState({nointernet: false}); 
  }

  gotoCameraScreen = async () => {
    if (await hasAPIConnection())
    {
      // pongo flag en 0 del Modal de espera de Upload de Photo Profile por si ya
      // envio una foto antes.
     // this.props.setProfileModalStat(0);

      Permissions.request('camera').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log('Camera Permiso: '+response);
      if (response==='authorized' &&  Platform.OS === 'android')
        {

          Permissions.request('storage').then(res => {
            this.props.closeModalConfirmPhoto('profile');
            this.props.navigation.navigate("CameraScreen2");
            
          });

          
        // this.props.closeModalConfirmPhoto('profile');
        // this.props.navigation.navigate("CameraScreen2");
         }

         if (response==='authorized' &&  Platform.OS !== 'android')
          {
            console.log('Camera Permiso ok IOS: '+response);
            this.props.closeModalConfirmPhoto('profile');
            this.props.navigation.navigate("CameraScreen2");

          }

  
        if (response==='denied' &&  Platform.OS !== 'android')
        {
         Alert.alert(
          I18n.t("DENIED_ACCESS_1"),
          I18n.t("TO_AUTHORIZE_2_IOS"),
          [
            {
              text: 'No, thanks',
              onPress: () => console.log('Permission denied'),
              style: 'cancel',
            },
            { text: 'Open Settings',
               onPress: Permissions.openSettings },
            
          ],
         )
        }
  
        if (response==='restricted' &&  Platform.OS === 'android')
        {
         Alert.alert(
          I18n.t("DENIED_ACCESS_1"),
          I18n.t("TO_AUTHORIZE_2_ANDROID"),
         
          [
            {
              text: 'Ok',
              onPress: () => console.log('ok'),
              style: 'cancel',
            },
            
          ],
         )
        }
        
     
  
      if (response==='restricted' &&  Platform.OS !== 'android')
      {
       Alert.alert(
        I18n.t("ACCESS_TO_CAMERA"),
        I18n.t("PARENTAL_CONTROLS"),
        [
          {
            text: 'Ok',
            onPress: () => console.log('ok'),
            style: 'cancel',
          },
          
        ],
       )
      }
      
   
    });
      
          } else
          this.setState({nointernet: true});
        
     }

     switchToFollowing = () => {
      this.props.followingsSelected(true);
   
    }
    switchToFollowers = () => {
      this.props.followingsSelected(false);
   
    }

     requestCameraPermission = () =>  {
      if (Platform.OS !== 'android') {
        return Promise.resolve(true);
      }
    
      const rationale = {
        'title': 'Camera Permission',
        'message': 'superQso needs access to your Camera to take photos in the QSO.'
      };
    
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, rationale)
        .then((result) => {
          console.log('Permission result:', result);
          return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
        });
    }

    closeContactUs = () => this.setState({contactus: false})

    openContactForm = async () => {
      if (await hasAPIConnection())
      {
        this.setState({contactus: true});

      } else
      this.setState({nointernet: true});
    }

    closeRestore = () => {

      this.setState({showRestoreSubscription: false});
      this.props.restoreCall(false,'');
     
    }

    restoreSubs = async () => {
     
      if (await hasAPIConnection())
      {
       
        this.setState({showRestoreSubscription: true})

      } else
      this.setState({nointernet: true});
    }

  
    closeModalPhotoConfirmation = () => {
      // console.log("closeModalPhotoConfirmation");
      // this.props.closeModalConfirmPhoto();
      this.props.setConfirmProfilePhotoModal(false);
  
     
    };
    
    closeSendingProfilePhotoModal = () => {
     
      this.props.setSendingProfilePhotoModal(false);
      this.props.setProfileModalStat('ambos',0);
  
    };

    CloseCamaraSelect = () => {
      this.setState({
        camaraSelect: false
      });
  
    }

    photoFromGallery = async () => {
  
      if (await hasAPIConnection()) {

    // envio a reducer que se fue a background por usar la GELRIA de FOTOS
    // luego este dato lo uso para cuando venga de background no actualizar notificaciones, etc si
    // se fue a background por la galeria y mejorar performance y llamados a APIs  
    this.props.manageLocationPermissions("photofromgallery", 1);
    
        console.log('tomo imagen de galeria');
      // openCamera
           ImagePicker.openPicker({
         //   ImagePicker.openCamera({
            // path: data.uri,
            cropping: true,
            //  compressImageQuality: (Platform.OS === 'ios') ? 0.8 : 1
            width: (Platform.OS==='ios') ? 1100 : 1200,
            height: (Platform.OS==='ios') ? 1100 : 1200,
           
          }).then(image => {
            console.log(image);
      
         
            uri = image.path;
      
          fileName2 = uri.replace(/^.*[\\\/]/, '');
          
      
          console.log('filename2 es: ' + fileName2);
          envio = {name: fileName2, url: uri, type: 'profile', sent: 'false', size: image.size, width: image.width, height: image.height, qra: this.props.qra,  rectime: 0, gallery: true } 
          
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
          
              this.props.setConfirmProfilePhotoModal(true);
            
          }, timer);
      
      
        
          console.log('este debe aparecer primero');
          //   // ya tomo la foto del picker entonces el flag vuelve a 0.
          //  this.props.manageLocationPermissions("photofromgallery", 0);
      

          }).catch((err) => {
            console.log("cropImage Error", err.message);

            // el usuario cancelo por alguna razon y debe volver a 0 el flag de photoFromGallery
            // para que siga funcionando las rutinas de ejecucion cuando vuelvan de background
            // this.props.manageLocationPermissions("photofromgallery", 2);
            // this.setState({showCamera: true});
            // this.setState({buttonStatus: false});
            crashlytics().setUserId(this.props.qra);
            crashlytics().log('error: ' + JSON.stringify(err)) ;
            if(__DEV__)
            crashlytics().recordError(new Error('openCropperPROF_DEV'));
            else
            crashlytics().recordError(new Error('openCropperPROF_PRD'));
        });
      }
      else this.setState({ nointernet: true });
      
        }
      
   
    
    render() { console.log("InitialScreen Screen");
   // console.log("InitialScreen Screen profile.jpg"+this.props.rdsurl+'/profile/profile.jpg');

  //  if (this.props.sendingprofilemodal_stat===1)
  //            this.closeSendingProfilePhotoModal();


   
        return <View style={{flex:1, marginTop: Platform.OS === 'ios' ? 13 : 13, marginLeft: 6}}>
          

       
             {/* <Text style={{fontSize: 30}}>
             Profile Screen
             </Text> */}

              {/* <TouchableOpacity style={{marginLeft:40, marginTop: 30}} onPress={ () => this.gotoLoginScreen() }>
                    <Image source={require('../../images/camera.png')}  style={{width: 33, height: 33  } } 
                 resizeMode="contain" /> 
                  <Text  style={{ fontSize: 12, color: '#999'}}>Login</Text>             
                </TouchableOpacity> */}

             <View style={{flexDirection: 'row', flex: 0.14}}>
                  {/* <Qra qra={this.props.qra} imageurl={this.props.rdsurl+'profile/profile.jpg?'+this.props.sqsoprofilepicrefresh } />   */}
               <View style={{flex:0.21}}>
                 <TouchableOpacity style={{}} onPress={() => this.setState({camaraSelect: true})}>
                   <QraProfile qra={this.props.qra} imageurl={this.props.sqsoprofilepicrefresh } />  
                  </TouchableOpacity>
              </View>  
              <View style={{flex:0.17}}>
                  {/* <TouchableOpacity style={{marginLeft:18, marginTop: 13}} onPress={ () => this.gotoCameraScreen() }> */}
                  
                  <TouchableOpacity style={{marginLeft: 18, marginTop: 13}} onPress={() => this.setState({camaraSelect: true})}>
                    <Image source={require('../../images/camera.png')}  style={{width: 23, height: 23, marginLeft: I18n.locale.substring(0, 2)==='es' ? 6:0  } } 
                 resizeMode="contain" /> 
                  <Text  style={{ fontSize: 14, color: '#999'}}>{I18n.t("InitialScreenEdit")}</Text>             
                </TouchableOpacity>
                </View>

                <View style={{flex:0.37, alignItems: 'center'}}>
                  <TouchableOpacity style={{marginLeft: 18, marginTop: 13}} onPress={ () => this.openContactForm() }>
                  <Image source={require('../../images/email3.png')}  style={{width: 25, height: 23,  marginLeft: I18n.locale.substring(0, 2)==='es' ? 23:17  } } 
                 resizeMode="contain" /> 
                  <Text  style={{ fontSize: 14, color: '#999'}}>{I18n.t("InitialScreenContactUs")}</Text>             
                </TouchableOpacity>
                </View>

                <View style={{flex:0.25, alignItems: 'flex-end', marginRight: 20}}>
                <TouchableOpacity style={{marginTop: 17, alignItems: 'center'}} onPress={ () => this.signOut() }>
                    <Image source={require('../../images/logout.png')}  style={{width: 20, height: 20, marginLeft: I18n.locale.substring(0, 2)==='es' ? 3:15  } } 
                 resizeMode="contain" /> 
                {/* <TouchableOpacity style={{marginTop: 15}} onPress={ () => this.signOut()} > */}
                    <Text style={{ fontSize: 13, color: '#999'}} >{I18n.t("InitialScreenSignOut")}</Text>
                 </TouchableOpacity>
                </View>
                  {/* ProfileScreen */}
 
              </View> 

              <View style={{flex: 0.08, alignItems: 'flex-end', marginRight: 17}}>
                {/* <TouchableOpacity style={{flexDirection: 'row', marginTop: 15}} onPress={ () => this.restoreSubs()} >
                   <Text style={{fontSize: 14, color: '#999', fontWeight: 'bold'}} >{I18n.t("InitialScreenRestoreSubscriptions")}</Text>
                </TouchableOpacity> */}
              </View>

              <View style={{flexDirection: 'row', flex: 0.08, marginLeft: 6}}>
                 <TouchableOpacity style={{flexDirection: 'row', marginTop: 15}} onPress={ () => this.switchToFollowing()} >
                    <Text style={styles.buttonText2} >{this.props.followings.length}</Text><Text style={styles.followText}> {I18n.t("InitialScreenFollowing")}</Text>
                 </TouchableOpacity>

                  <TouchableOpacity style={{flexDirection: 'row', marginTop: 15, marginLeft: 15}} onPress={ () => this.switchToFollowers()} >
                    <Text style={styles.buttonText2} >{this.props.followers.length}</Text><Text style={styles.followText}> {I18n.t("InitialScreenFollowers")}</Text>
                 </TouchableOpacity>

                  {/* <TouchableOpacity style={{marginTop: 10}} onPress={ () => this.gotoLoginScreen() } >
                    <Text style={styles.buttonText2} >Login Screen</Text>
                 </TouchableOpacity> */}


                      </View>

                 <View style={{flex: 0.105, flexDirection: 'row'}}>
                   {/* <View style={{flex: 1, flexDirection: 'row'}}> */}
                 <View style={{flex: 0.5}}>
                    {(this.props.followingsselected) ?
                          // <TouchableOpacity  >
                              <Text style={styles.FollowingsText} >{I18n.t("InitialScreenFollowing")}</Text>
                          // </TouchableOpacity>
                      :
                      // <TouchableOpacity  style={{ flex:0.8}}  >
                         <Text style={styles.FollowingsText} >{I18n.t("InitialScreenFollowers")}</Text>
                      // </TouchableOpacity>
  
                      }
                    </View>
                    <View style={{flex: 0.5, alignItems: 'flex-end', marginRight: 17}}>

                    <TouchableOpacity style={{}} onPress={ () => this.props.getUserInfo(this.props.jwtToken)}>
                    <Image source={require('../../images/reload.png')}  style={{width: 20, height: 20, marginLeft: I18n.locale.substring(0, 2)==='es' ? 15:12 } } 
                 resizeMode="contain" /> 
                {/* <TouchableOpacity style={{marginTop: 15}} onPress={ () => this.signOut()} > */}
                    <Text style={{ fontSize: 13, color: '#999'}} >{I18n.t("InitialScreenRefrescar")}</Text>
                 </TouchableOpacity>

                       {/* <TouchableOpacity style={styles.FollowingsText}
                          onPress={() => this.props.getUserInfo(this.props.jwtToken)}>
                          <Text
                            style={styles.FollowingsText}
                          >
                            REFRESH
                          </Text>
                        </TouchableOpacity> */}
                     </View>
                              
                      {/* </View>       */}
                   </View> 

               <View style={{flex: 0.605, width:this.width-15, marginBottom: 10}}>
                
                <FollowerList navigation={this.props.navigation}/> 
                
                </View>

        


              {/* Modal para mostrar la foto sacada de Profile */}
          <Modal
             visible={this.props.confirmprofilemodal}
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

                height: 490,
           //  height: 320,
                paddingVertical: 5,
                //   position: 'absolute',

                //  alignItems: 'center',
                borderRadius: 12
              }}
            >
              {/* <Muestro openPremium={this.openPremiumScreen.bind()} send_data_to_qsoscreen={this.receive_data_from_modal.bind()} height={this.state.heightPhotoConfirm} /> */}
              {/* <Muestro  send_data_to_qsoscreen={this.receive_data_from_modal.bind()} height={320} /> */}
              <Muestro  height={490} close={this.closeModalPhotoConfirmation.bind()} />
              {/* style={{ paddingBottom: 4}} */}
              {/* <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ width: 65 }}
                  onPress={() => this.closeModalPhotoConfirmation() }
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

          {/* Modal para mostrar es status de envio de la foto de profile */}
          <Modal
            visible={this.props.sendingprofilemodal}
            // visible={true}
            position={"top"}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            {/* <KeyboardAvoidingView behavior="padding"  > */}
            <View
              style={{
                padding: 10,
                backgroundColor: "rgba(0,0,0,0.85)",
                marginTop: 60,
                left: 35,
                // right: 35,
                width: this.width - 65,

                height: 80,
           //  height: 320,
                paddingVertical: 5,
                //   position: 'absolute',

                //  alignItems: 'center',
                borderRadius: 12,
               
              }}
            >
             
              <View style={{ flex: 1 }} >
             { (this.props.sendingprofilemodal_stat===0) &&
              <View  style={{ flex: 0.70, alignSelf: 'center' }}>
                  <Text
                    style={{ color: "white", fontSize: 16, marginTop: 5 }}
                  >
                    {I18n.t("InitialScreenChangingPhoto")}
                  </Text>
              </View>
             }
                { (this.props.sendingprofilemodal_stat===2) &&
              <View  style={{ flex: 0.70, alignSelf: 'center' }}>
                  <Text
                    style={{ color: "red", fontSize: 16 }}
                  >
                    {I18n.t("InitialScreenInappropriateContent")}
                  </Text>
              </View>
             }

      { (this.props.sendingprofilemodal_stat===3) &&
              <View  style={{ flex: 0.70, alignSelf: 'center' }}>
                  <Text
                    style={{ color: "red", fontSize: 16 }}
                  >
                    {I18n.t("InitialScreenFailed")}
                  </Text>
              </View>
             }
   
      
      { (this.props.cancelbutton_stat===1) &&
              <View style={{ flex: 0.30 , alignSelf: 'center' }}>
                <TouchableOpacity style={{ width: 65 }}
                  onPress={() => this.closeSendingProfilePhotoModal()}>
                  <Text
                    style={{ color: "white", fontSize: 16 }}
                  >
                    {I18n.t("InitialScreenClose")}
                  </Text>
                </TouchableOpacity>
                </View>
            }

              </View>

            </View>
            {/* </KeyboardAvoidingView > */}
          </Modal>

                 
          {(this.state.camaraSelect) &&
              <CamaraSelect   close={this.CloseCamaraSelect.bind()} photoGallery={this.photoFromGallery.bind()}  cameraScreen={this.gotoCameraScreen.bind()}/>
            }
                 
            {(this.state.nointernet) &&           
                 <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
            }
                 {(this.state.contactus) && <ContactUs closecontactus={this.closeContactUs.bind()}  /> }
                 {(this.state.showRestoreSubscription) && <RestoreSubscription  closerestoremodal={this.closeRestore.bind()}/> }
         
            </View>
       
     } 

 }

 const styles = StyleSheet.create({
    container: {
      padding: 20
        },
    input: {
      height: 40,    
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 10,
      color: '#FFF',
      fontSize: 16,
      paddingHorizontal: 10
            },
    buttonContainer:{
        backgroundColor: '#2980b9',
        paddingVertical: 15
        },
    buttonText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700'
             },
             buttonText2: {
              //     textAlign: 'center',
                   color: '#2E2E2E',
                   fontSize: 16,
                   fontWeight: '200'
                  
                          },
                          followText: {
                            //     textAlign: 'center',
                                 color: 'grey',
                                 fontSize: 16,
                                 fontWeight: '200'
                                
                                        },
     activityindicator: {
      flexDirection: 'row',
       justifyContent: 'space-around',
     padding: 10
    
     },
     FollowingsText: {
      //  textAlign: 'center',
        color: '#585858',
        fontSize: 22,
        fontWeight: '700',
         flex:0.8,
         marginLeft: 6
               },
  
          });


 const mapStateToProps = state => {
    return { 
      qra: state.sqso.qra,
      followers: state.sqso.currentQso.followers,
      followings: state.sqso.currentQso.followings,
      followingsselected: state.sqso.currentQso.followingsSelected,   
      rdsurl: state.sqso.urlRdsS3,
      sqsoprofilepicrefresh: state.sqso.profilePicRefresh,
      pushtoken: state.sqso.pushToken,
      sqsomodalconfirmphoto: state.sqso.currentQso.modalconfirmphoto,
      jwtToken: state.sqso.jwtToken,
      sendingprofilemodal: state.sqso.sendingProfileModal, 
      confirmprofilemodal: state.sqso.confirmProfileModal,
      sendingprofilemodal_stat: state.sqso.sendingProfileModal_stat,
      cancelbutton_stat: state.sqso.cancelButton_stat
    };
};


const mapDispatchToProps = {
  closeModalConfirmPhoto,
  resetForSignOut,
  postPushToken,
  profilePictureRefresh,
  followingsSelected,
  manage_notifications,
  confirmedPurchaseFlag,
  restoreCall,
  setSendingProfilePhotoModal,
  setConfirmProfilePhotoModal,
  setProfileModalStat,
  getUserInfo,
  sendActualMedia,
  manageLocationPermissions,
  setPressHome

    
   }

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);