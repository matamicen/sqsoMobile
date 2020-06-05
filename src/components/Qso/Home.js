import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, Button, ActivityIndicator, TouchableOpacity, ScrollView, Modal,
   Platform, Alert, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
// import QsoHeader from './QsoHeader';
// import QsoHeaderLink from './QsoHeaderLink';
import { getQslScan, updateLinkQso } from '../../actions';
// import MediaImages from './MediaImages';
// import MediaImagesLink from './MediaImagesLink';
// import Likes from './Likes';
// import Comments from './Comments';
// import CommentsLink from './CommentsLink';
// import LikesLink from './LikesLink';
import { getDateQslScan } from '../../helper';
import { hasAPIConnection } from '../../helper';
import VariosModales from './VariosModales';
import Permissions from 'react-native-permissions'
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';


class Home extends Component {
  static navigationOptions = {
      tabBarLabel: ' ',

      tabBarIcon: ({ tintColor }) => {
        return (<View style={{width: 50, height: 20,marginTop: (Platform.OS==='ios') ? 6 : 7}}>
        <Image
             style={{ width: 28, height: 28, marginLeft: 18 }}
            // style={{ width: 28, height: 28, marginLeft: 7 }}
            source={require("../../images/home4.png")}/>
            <Text style={{fontSize:9, marginTop: 3, marginLeft: 19}}>HOME</Text>
            </View>
            
            );}

      // tabBarIcon: ({ tintColor }) => {
      //   return (<Image
      //       style={{ width: 28, height: 28  }}
      //       source={require('../../images/qrcodescan.png')}/>);}

  }

  constructor(props) {
    super(props);
    

    this.state = {
 
      nointernet: false,
     
      
    };
  }


  navigate = () => {
    const navigateToScreen2 = NavigationActions.navigate({
      routeName:'Root'
     
    })

    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Root' })],
      });
   

    // The navigateToScreen2 action is dispatched and new navigation state will be calculated in basicNavigationReducer here ---> https://gist.github.com/shubhnik/b55602633aaeb5919f6f3c15552d1802
    this.props.navigation.dispatch(resetAction)
}

closeVariosModales = () => {
  this.setState({nointernet: false}); 
}

checkInternetScanQR = async (param) => {
    console.log('entro a PEDIR PERMISOS');
    if (await hasAPIConnection())
    {
      Permissions.request('microphone').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log('Microphone Permiso: '+response);
      if (response==='authorized')
        {
          console.log('entro a PEDIR PERMISOS esta AUTORIZADO!!!');
          this.micPermission = true;
          // this.props.navigation.navigate("QslScanQR");
         }
  
        if (response==='denied' &&  Platform.OS !== 'android')
        {
         Alert.alert(
          'You denied the access to the Microphone',
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
          'You denied the access to the Microphone',
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
        'You do not have access to the Microphone',
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
  
  
      Permissions.request('camera').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log('Camera Permiso: '+response);
      if (response==='authorized')
        {
        // this.props.closeModalConfirmPhoto('image');
        // this.props.navigation.navigate("CameraScreen2");
        this.camPermission = true;  
        
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
  
  
    if (this.micPermission && this.camPermission && param==='qslscanScreen')
        // this.props.navigation.navigate("QslScanQR");
  
       this.props.navigation.navigate('QslScanQR', {
        scantype: 'Home'
        
      });
      else{
        this.props.updateLinkQso('','clear');
        this.props.navigation.navigate("QsoLink");
      }
      
   
    });
  
      
  
  
   
    });
  
    
   
  
      
      
    
  
    }
      else
        this.setState({nointernet: true});
  
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


   
render() { console.log("RENDER QSL SCAN SCREEN!" );


return   <View style={{flex: 1}}>


   
   <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'flex-end'}}>    

       <View style={{ flex:0.50, justifyContent: 'center', alignItems: 'center'}}> 
       
      
       <TouchableOpacity  style={{alignItems:"center", alignContent:"center", height:100}}  onPress={() => this.latestPosts()}  >
             
             <Image
                 source={require("../../images/home.png")}
                 style={{ width: 36, height: 36  }}
                 resizeMode="contain"
               />
                    
                     <Text style={{fontSize: 16, color: '#243665'}}>Latest Posts</Text>
             
                   </TouchableOpacity>
    
 

      </View> 
      
      <View style={{ flex:0.50, justifyContent: 'center', alignItems: 'center'}}> 
      
      
      <TouchableOpacity style={{  alignItems:"center", alignContent:"center", height:100}} onPress={() => this.yourPosts(this.props.qra)}  >
              <Image 
                  source={require("../../images/activity2.png")}
                  style={{ width: 36, height: 36}}
                  resizeMode="contain"
                />
                      <Text style={{fontSize: 16, color: '#243665'}}>Your Posts</Text>
                  
                    </TouchableOpacity>



       </View>

     </View>

     <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'flex-start'}}>    

<View style={{ flex:0.50, justifyContent: 'center', alignItems: 'center'}}> 



<TouchableOpacity  style={{alignItems:"center", alignContent:"center", marginTop:30}}  onPress={ () => this.checkInternetScanQR('qslscanScreen')  }>
   
   <Image source={require('../../images/qrcodescan.png')}  style={{width: 36, height: 36 } } 
resizeMode="contain" />    
<Text style={{ fontSize: 16, color: '#243665'}}>Scan Qsl Card</Text>          
</TouchableOpacity> 


</View> 

<View style={{ flex:0.50, justifyContent: 'center', alignItems: 'center'}}> 
{/* // por ahora dejo afuera link QSO porque son muchos features */}
 {/* <TouchableOpacity  style={{alignItems:"center", alignContent:"center", marginTop:30}}  onPress={ () => this.checkInternetScanQR('qsolink')  }>
   
   <Image source={require('../../images/link2.png')}  style={{width: 36, height: 36 } } 
resizeMode="contain" />    
<Text style={{ fontSize: 16, color: '#243665'}}>Link Qso</Text>          
</TouchableOpacity>  */}



</View>

</View>
       
       {(this.state.nointernet) && 
        <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
    }

    </View>

} 

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  contentContainer:{
   
  

  },
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
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

 const mapStateToProps = state => {
    return {  
       // sqsoqslalreadyscan: state.sqso.qslAlreadyScan,
        sqsoqslscan: state.sqso.currentQso.qslscan.body.message,
      //  sqsoqslscanbody: state.sqso.currentQso.qslscan.body,
        sqsoqslscanerror: state.sqso.currentQso.qslscan.body.error,
        qra: state.sqso.qra
        
     };
};


const mapDispatchToProps = {
    getQslScan,
    updateLinkQso
    
   }

export default connect(mapStateToProps, mapDispatchToProps)(Home);