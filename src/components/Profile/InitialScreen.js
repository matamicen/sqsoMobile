import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, TouchableOpacity,  StyleSheet, Platform, 
  PermissionsAndroid, Alert, Dimensions, AsyncStorage, TextInput, Modal  } from 'react-native';
import { connect } from 'react-redux';
import Login from './Login';
//import Amplify, { Auth, API, Storage } from 'aws-amplify'
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports'
//import Qra from './../Qso/Qra';
import QraProfile from './../Qso/QraProfile';
import FollowerList from './FollowerList';
import { closeModalConfirmPhoto, resetForSignOut, postPushToken, profilePictureRefresh,
  followingsSelected, manage_notifications, confirmedPurchaseFlag, restoreCall,
  setSendingProfilePhotoModal } from '../../actions';
import { hasAPIConnection } from '../../helper';
import VariosModales from '../Qso/VariosModales';
import Permissions from 'react-native-permissions'
import Muestro from './../Qso/Muestro';
// import { kinesis_catch } from '../../helper';
import  ContactUs  from './ContactUs';
import RestoreSubscription from './RestoreSubscription';
import crashlytics from '@react-native-firebase/crashlytics';



//Amplify.configure(awsconfig);
Auth.configure(awsconfig);

class InitialScreen extends Component {
  static navigationOptions = {
      tabBarLabel: ' ',

      tabBarIcon: ({ tintColor }) => {
        return (<View style={{width: 50, height: 20,marginTop: (Platform.OS==='ios') ? 1 : 2}}>
        <Image
            style={{ width: 31, height: 31, marginLeft: 9 }}
            source={require('../../images/profile1.png')}/>
            <Text style={{fontSize:9, marginTop: 3, marginLeft: 7}}>PROFILE</Text>
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
        showRestoreSubscription: false
    };
  }

  gotoLoginScreen = () => {
    console.log("va camara Login Screen");
   
    this.props.navigation.navigate("Root");
  
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
      crashlytics().log('error: ' + err) ;
      crashlytics().recordError(new Error('SignOut_getPushToken'));

      
    }

    await this.props.postPushToken(pushtoken,'',Platform.OS,this.props.jwtToken);
    await Auth.signOut()
      .then(data => {
        console.log(JSON.stringify(data))
        this.props.profilePictureRefresh('');
        this.props.manage_notifications('DELETE_NOTIF','');

        // crashlytics().setUserId(this.props.qra);
        // crashlytics().log('error: ' + JSON.stringify(data)) ;
        // crashlytics().recordError(new Error('SignOut_DentroSignOut'));
      })
      
      .catch(err => {console.log(err)
     //   kinesis_catch('#006',err,this.props.qra);
        crashlytics().setUserId(this.props.qra);
        crashlytics().log('error: ' + err) ;
        crashlytics().recordError(new Error('SignOut_AuthSignOut'));
  
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

        crashlytics().setUserId(this.props.qra);
     //   crashlytics().setAttribute('InitialScreen', '#1');
        crashlytics().log('error: ' + e) ;
        crashlytics().recordError(new Error('SignOut_AuthCurrentSession'));

        //kinesis_catch('#007',e,this.props.qra);
        // Handle exceptions
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
          'You denied the access to the Camera',
          'In order to Authorize choose Open Settings',
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
          'You denied the access to the Camera',
          'In order to Authorize go to settings->Apps->superQso->Permissions',
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
        'You do not have access to the Camera',
        'Cause: it is not supported by the device or because it has been blocked by parental controls',
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
      this.props.closeModalConfirmPhoto();
  
      // // this.navigateRoot();
      // this.setState({
      //   photoConfirm: false
      // });
    };
    
    closeSendingProfilePhotoModal = () => {
     
      this.props.setSendingProfilePhotoModal(false);
  
    };
      
   
    
    render() { console.log("InitialScreen Screen");
   // console.log("InitialScreen Screen profile.jpg"+this.props.rdsurl+'/profile/profile.jpg');
   
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
                  <QraProfile qra={this.props.qra} imageurl={this.props.sqsoprofilepicrefresh } />  
              </View>  
              <View style={{flex:0.15}}>
                  <TouchableOpacity style={{marginLeft:18, marginTop: 13}} onPress={ () => this.gotoCameraScreen() }>
                    <Image source={require('../../images/camera.png')}  style={{width: 23, height: 23  } } 
                 resizeMode="contain" /> 
                  <Text  style={{ fontSize: 14, color: '#999'}}>Edit</Text>             
                </TouchableOpacity>
                </View>

                <View style={{flex:0.37, alignItems: 'center'}}>
                  <TouchableOpacity style={{marginLeft:18, marginTop: 13}} onPress={ () => this.openContactForm() }>
                  <Image source={require('../../images/email3.png')}  style={{width: 25, height: 23,  marginLeft: 17  } } 
                 resizeMode="contain" /> 
                  <Text  style={{ fontSize: 14, color: '#999'}}>Contact us</Text>             
                </TouchableOpacity>
                </View>

                <View style={{flex:0.27, alignItems: 'flex-end', marginRight: 20}}>
                <TouchableOpacity style={{marginTop: 17}} onPress={ () => this.signOut() }>
                    <Image source={require('../../images/logout.png')}  style={{width: 20, height: 20, marginLeft: 15  } } 
                 resizeMode="contain" /> 
                {/* <TouchableOpacity style={{marginTop: 15}} onPress={ () => this.signOut()} > */}
                    <Text style={{ fontSize: 13, color: '#999'}} >SignOut</Text>
                 </TouchableOpacity>
                </View>
                  {/* ProfileScreen */}
 
              </View> 

              <View style={{flex: 0.08, alignItems: 'flex-end', marginRight: 17}}>
                <TouchableOpacity style={{flexDirection: 'row', marginTop: 15}} onPress={ () => this.restoreSubs()} >
                   <Text style={{fontSize: 14, color: '#999', fontWeight: 'bold'}} >Restore Subscription</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', flex: 0.08, marginLeft: 6}}>
                 <TouchableOpacity style={{flexDirection: 'row', marginTop: 15}} onPress={ () => this.switchToFollowing()} >
                    <Text style={styles.buttonText2} >{this.props.followings.length}</Text><Text style={styles.followText}> Following</Text>
                 </TouchableOpacity>

                  <TouchableOpacity style={{flexDirection: 'row', marginTop: 15, marginLeft: 15}} onPress={ () => this.switchToFollowers()} >
                    <Text style={styles.buttonText2} >{this.props.followers.length}</Text><Text style={styles.followText}> Followers</Text>
                 </TouchableOpacity>

                  {/* <TouchableOpacity style={{marginTop: 10}} onPress={ () => this.gotoLoginScreen() } >
                    <Text style={styles.buttonText2} >Login Screen</Text>
                 </TouchableOpacity> */}


                      </View>

                      <View style={{flex: 0.105}}>
                 
                 {(this.props.followingsselected) ?
                          // <TouchableOpacity  >
                              <Text style={styles.FollowingsText} >Following</Text>
                          // </TouchableOpacity>
                      :
                      // <TouchableOpacity  style={{ flex:0.8}}  >
                         <Text style={styles.FollowingsText} >Followers</Text>
                      // </TouchableOpacity>
  
                      }
                   
                   </View> 

               <View style={{flex: 0.605, width:this.width-15, marginBottom: 10}}>
                
                <FollowerList /> 
                
                </View>

        


              {/* Modal para mostrar la foto sacada de Profile */}
              <Modal
            visible={this.props.sqsomodalconfirmphoto}
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
                marginTop: 35,
                left: 15,
                right: 35,
                width: this.width - 35,

                height: 320,
           //  height: 320,
                paddingVertical: 5,
                //   position: 'absolute',

                //  alignItems: 'center',
                borderRadius: 12
              }}
            >
              {/* <Muestro openPremium={this.openPremiumScreen.bind()} send_data_to_qsoscreen={this.receive_data_from_modal.bind()} height={this.state.heightPhotoConfirm} /> */}
              {/* <Muestro  send_data_to_qsoscreen={this.receive_data_from_modal.bind()} height={320} /> */}
              <Muestro  height={320}/>
              {/* style={{ paddingBottom: 4}} */}
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ width: 65 }}
                  onPress={() => this.closeModalPhotoConfirmation() }
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
                marginTop: 35,
                left: 15,
                right: 35,
                width: this.width - 35,

                height: 320,
           //  height: 320,
                paddingVertical: 5,
                //   position: 'absolute',

                //  alignItems: 'center',
                borderRadius: 12
              }}
            >
              {/* <Muestro openPremium={this.openPremiumScreen.bind()} send_data_to_qsoscreen={this.receive_data_from_modal.bind()} height={this.state.heightPhotoConfirm} /> */}
              {/* <Muestro  send_data_to_qsoscreen={this.receive_data_from_modal.bind()} height={320} /> */}
              {/* <Muestro  height={320}/> */}
              {/* style={{ paddingBottom: 4}} */}
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ width: 65 }}
                  onPress={() => this.closeSendingProfilePhotoModal()}>
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
      sendingprofilemodal: state.sqso.sendingProfileModal 
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
  setSendingProfilePhotoModal

    
   }

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);