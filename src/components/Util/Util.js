import React, { Component } from 'react';
import { Text, Image, View, Button, StyleSheet, Platform, TouchableOpacity, Dimensions, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Permissions from 'react-native-permissions'
import {  followingsSelected, getQrasFromSearch, insertQraSearched, getUserInfo, refreshFollowings,
  searchQrasLocal} from '../../actions';
import { hasAPIConnection} from '../../helper';
import VariosModales from '../Qso/VariosModales';
// import User from './User';
import I18n from '../../utils/i18n';





class Util extends Component {
  static navigationOptions = {
      tabBarLabel: ' ',  

      tabBarIcon: ({ tintColor }) => {
        // return (<View style={{width: 55, height: 20,marginTop: (Platform.OS==='ios') ? 5 : 5,marginLeft:15, backgroundColor:'green'}}>
    return (<View style={{ flex: 1,width: 60, justifyContent: 'center', alignItems: 'center' }}>
        <Image
            // style={{ width: 28, height: 28, marginLeft: 13 }}
            style={{ width: 28, height: 28, marginLeft: 10, marginTop: (Platform.OS==='ios') ? 23 : 26 }}
            source={require('../../images/qrcodescan.png')}/>
             <Text style={{fontSize:8, marginTop: 3, marginLeft: 5}}>{I18n.t("UtilTitle")}</Text>
            {/* <Text style={{fontSize:9, marginTop: 3.5, marginLeft: 9}}>{I18n.t("SearchTitle")}</Text> */}
            </View>
            
            );}



  }

  constructor(props) {
    super(props);

    //   this.width = Dimensions.get('window').width; //full width
    //   this.height = Dimensions.get('window').height; //full height
    this.micPermission = false;
    this.camPermission = false;
      
      this.state = {
   
       qra: '',
      
       nointernet: false,
      
      };
      
   
  }




  async componentDidMount() {
    console.log("component Did Mount Util");



  }

  onChange = async (text) => {
   
    this.setState({qra: text});
   if (await hasAPIConnection())
   { 
     // this.countLenght = this.countLenght + 1;
       long = text.length.toString();
       long2 = text.length;
       if (long2===0)  this.apretoSearch = false;
      console.log('escribe:'+long);
      if (long2===4 && !this.entro) {
        // this.setState({actindicatorfecthQras: true})
        console.log("es igual a 4, llama api search");
        this.entro = true;
        this.props.getQrasFromSearch(this.props.qra,text.toUpperCase(),this.props.jwtToken);
        console.log("NO DA BOLA AWAIT");
        this.setState({searching: true});
        setTimeout(() => {      
          this.setState({searching: false});
         }
        , 2000);

        // this.setState({actindicatorfecthQras: false})
      }else this.props.searchQrasLocal(text.toUpperCase(),long2);

      if (long2>4) {
        this.setState({searching: true});
        setTimeout(() => {      
          this.setState({searching: false});
         }
        , 500);

        this.props.searchQrasLocal(text.toUpperCase(),long2);
      }
       

      if (long2<4) { 
        this.entro = false;
        // this.props.searchQrasLocal('',long2);

      }
    }else 
    {
      this.setState({addfollowersModal: false});
      this.setState({nointernet: true}); 
     // this.props.openVariosModales();
      
    }
         
    
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
              I18n.t("DENIED_ACCESS_2"),
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
              I18n.t("DENIED_ACCESS_2"),
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
            I18n.t("ACCESS_TO_MICROPHONE"),
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
      
      
        if (this.micPermission && this.camPermission && param==='qslscanScreen')
            // this.props.navigation.navigate("QslScanQR");
      
           this.props.navigation.navigate('QslScanQR', {
            scantype: 'Util'
            
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

 
   
render() { console.log("RENDER util Screen" );

return   <View style={{flex: 1,  backgroundColor: '#fff', alignContent: "center", alignItems: "center"}}>
      
      <View  style={{flex: 0.5}}>
    
  </View>  
      
     <View  style={{flex: 0.5}}>
      <TouchableOpacity  style={{alignItems:"center", alignContent:"center", height:50}}  onPress={ () => this.checkInternetScanQR('qslscanScreen')  }>
        
        <Image source={require('../../images/qrcodescan.png')}  style={{width: 36, height: 36 } } 
      resizeMode="contain" />  
      <Text style={{ fontSize: 16, marginTop: 5, fontWeight: 'bold',color: '#243665'}}>{I18n.t("UTILSCANQSLCARD")}</Text>
      </TouchableOpacity> 
      
  </View>


   
       {(this.state.nointernet) && 
       <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
       }
      
       

           </View>

} 

}

const styles = StyleSheet.create({
 
  searchSection: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: Platform.OS==='android' ? '#f5f5f5':'#939393',
    fontSize: 12
   // backgroundColor: 'grey',
},


});



 const mapStateToProps = state => {
    return {  
  
      jwtToken: state.sqso.jwtToken,
    
      qra: state.sqso.qra
    };
};


const mapDispatchToProps = {


   }

export default connect(mapStateToProps, mapDispatchToProps)(Util);