import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, Button, ActivityIndicator, TouchableOpacity, ScrollView, Modal,
   Platform, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
// import QsoHeader from './QsoHeader';
import QsoHeaderLink from './QsoHeaderLink';
import { getQslScan } from '../../actions';
// import MediaImages from './MediaImages';
import MediaImagesLink from './MediaImagesLink';
// import Likes from './Likes';
// import Comments from './Comments';
import CommentsLink from './CommentsLink';
import LikesLink from './LikesLink';
import ImageCarousel from './ImageCarousel';
import { getDateQslScan } from '../../helper';
import { hasAPIConnection } from '../../helper';
import VariosModales from '../Qso/VariosModales';
import Permissions from 'react-native-permissions'
import I18n from '../../utils/i18n';


class QslScanResult extends Component {
  static navigationOptions = {
      tabBarLabel: 'Qsl Scan',

      tabBarIcon: ({ tintColor }) => {
        return (<Image
            style={{ width: 28, height: 28  }}
            source={require('../../images/qrcodescan.png')}/>);}

  }

  constructor(props) {
    super(props);
    this.micPermission = false;
    this.camPermission = false;
    


    this.width = Dimensions.get('window').width; //full width
    this.height = Dimensions.get('window').height; //full height

    this.state = {
      conta: 0,
      actindicatorfecthQslCard: false,
      scanQR: false,
      nointernet: false,
      vari: true
     
      
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

    console.log("Mic Permission:"+this.micPermission + "camPermission: " + this.camPermission + " param:"+param);

  if (this.micPermission && this.camPermission && param==='qslscanScreen')
      // this.props.navigation.navigate("QslScanQR");
    
      this.props.navigation.navigate('QslScanQR', {
        scantype: 'qslscanScreen'});

    //  this.props.navigation.navigate('QslScanQR', {
    //   scantype: 'qslScan'
      
    // });

    
    else
     this.props.navigation.navigate("QsoLink");

 
  });

    


 
  });

  
 

    
    
  

  }
    else
      this.setState({nointernet: true});

 }

 gotoQslScanScreen = async () => {

    // this.props.navigation.navigate("QslScanScreen");
    this.props.navigation.navigate("Home");

}
   
render() { console.log("RENDER QSL SCAN RESULT SCREEN!" );
console.log(this.props.sqsoqslscan);

// console.log(this.props.sqsoqslscan.links);

console.log('Dimensions Width:'+this.width);
// console.log('lisandro');
// console.log(this.props.sqsoqslscan.links);



return   (this.state.vari) ? <View style={{flex: 1}}>
   
            
       
      
       <View style={{flex: 0.29, width: this.width-10, marginLeft: 3, marginRight: 3}}>
  {(this.state.nointernet) && 
        <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
  }
        {/* <QsoHeader /> */}
      
        {/* {(this.props.sqsoqslscan.datetime) && */}
        {(this.props.sqsoqslscanerror===0 && this.props.sqsoqslscan.type!=='SHARE') && 
         <QsoHeaderLink qra={this.props.sqsoqslscan.qra} mode={this.props.sqsoqslscan.mode} band={this.props.sqsoqslscan.band} type={this.props.sqsoqslscan.type}
         profilepic={this.props.sqsoqslscan.profilepic} avatarpic={this.props.sqsoqslscan.avatarpic} qras={this.props.sqsoqslscan.qras} datetime={this.props.sqsoqslscan.datetime} 
                               />
           }
        
         {(this.props.sqsoqslscanerror===0 && this.props.sqsoqslscan.type==='SHARE') &&                        
          <QsoHeaderLink qra={this.props.sqsoqslscan.original[0].qra} mode={this.props.sqsoqslscan.original[0].mode} band={this.props.sqsoqslscan.original[0].band} type={this.props.sqsoqslscan.original[0].type}
         profilepic={this.props.sqsoqslscan.original[0].profilepic} avatarpic={this.props.sqsoqslscan.original[0].avatarpic} qras={this.props.sqsoqslscan.qras} datetime={this.props.sqsoqslscan.original[0].datetime} 
                               />
        }


  
        </View>

       <View style={{ flex: 0.61, width: this.width-10, marginLeft: 3, marginRight: 3, marginTop: 6}}>

       <View style={{marginLeft: 30}}>
      
        {(this.props.sqsoqslscanerror===1) &&  
            <Text style={{color:"grey"}}> Sorry, the scanned Qsl Card doesn't exist.</Text> 
             }

        </View>

       <Modal visible={this.state.actindicatorfecthQslCard} position= {'top'} transparent={true}  onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:10, 
                  backgroundColor : 'rgba(0,0,0,0.85)',
                   marginTop: 210,
                   left: 105,
                   right: 15,
                   width: 185,
                   height: 35,
                   paddingVertical: 5,
                 //   position: 'absolute',
                   
                 //  alignItems: 'center',
                   borderRadius: 12                       
                    }}>
                   <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15}}>Fetching QSL Card ...</Text>
                   
                  

                    </View>
                {/* </KeyboardAvoidingView > */}
                   
                      </Modal>

        
                      {(this.props.sqsoqslscanerror===0) && 

       <ScrollView contentContainerStyle={styles.contentContainer} >
       {/* { (this.props.qslalreadyscan==='full') ? */}
        {/*  <MediaImages mostrar='image'/> */}
        {/* <MediaImagesLink media={this.props.sqsoqslscan.media} qra={(this.props.sqsoqslscan.type!=='SHARE') ? this.props.sqsoqslscan.qra : this.props.sqsoqslscan.original[0].qra} mostrar='image' type={this.props.sqsoqslscan.type}/>  */}
        <ImageCarousel media={this.props.sqsoqslscan.media} qra={(this.props.sqsoqslscan.type!=='SHARE') ? this.props.sqsoqslscan.qra : this.props.sqsoqslscan.original[0].qra} />
       
       {/* :
        null } */}
       {/* <MediaImages mostrar='audio'/> */}
       <MediaImagesLink media={this.props.sqsoqslscan.media} qra={(this.props.sqsoqslscan.type!=='SHARE') ? this.props.sqsoqslscan.qra : this.props.sqsoqslscan.original[0].qra} mostrar='audio' type={this.props.sqsoqslscan.type} /> 

       <LikesLink likes={this.props.sqsoqslscan.likes} type={this.props.sqsoqslscan.type}/>
       <CommentsLink comments={this.props.sqsoqslscan.comments} />

       {/*  <Likes />
       <Comments />*/}
       { (this.props.sqsoqslscan.links) && (this.props.sqsoqslscan.links.length>0) &&   
               <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 15}}>The followings QSOs are linked:</Text>}
       
           {
           
             (this.props.sqsoqslscan.links) && 
            
            
                  this.props.sqsoqslscan.links.map((m, i) =>    
                    // console.log('loop links: '+m.idqsos +' ' +m.mode)
                    <View   key={i} style={{ paddingBottom: 7, felx:1, backgroundColor: 'white', borderRadius: 12, marginTop: 18, marginLeft: 2 }}>
                    {/* <Text>  idqso: {m.idqsos}</Text>
                    <Text>  mode: {m.mode}</Text>
                    <Text>  band: {m.band}</Text> */}
                    <QsoHeaderLink qra={m.qra} mode={m.mode} band={m.band} type={m.type}
                                   profilepic={m.profilepic} avatarpic={m.avatarpic} qras={m.qras} datetime={getDateQslScan(m.datetime)} 
                               />

                    {/* <MediaImagesLink   media={m.media} qra={m.qra} mostrar='image'/>  */}
                    <ImageCarousel media={m.media} qra={m.qra} />
                    <MediaImagesLink media={m.media} qra={m.qra} mostrar='audio'/> 



                    <LikesLink likes={m.likes} type={m.type}/>
                    <CommentsLink comments={m.comments} />
                  
                    
                  </View> 
                   )
              
             }

       </ScrollView>
                      }
       
       </View>
      
       

       
     

       <View style={{ flexDirection: 'row', flex:0.08, marginTop:7, justifyContent: 'center'}}> 
       
       <View style={{flex: 1, flexDirection: 'row' }}>

       {/* this.scanQR() */}
    
      <View style={{flex: 0.60, alignItems: 'flex-end' }}> 
       {/* <TouchableOpacity  style={{}}  onPress={ () => this.checkInternetScanQR('qslscanScreen')  }>
          
            <Image source={require('../../images/qrcodescan.png')}  style={{width: 27, height: 27, marginLeft: 9 } } 
         resizeMode="contain" />    
         <Text style={{ fontSize: 12}}>Scan Qsl</Text>          
        </TouchableOpacity>  */}
        </View>

           <View style={{flex: 0.40, alignItems: 'flex-end', marginRight: 10 }}>
       

        <TouchableOpacity
                  onPress={() => this.gotoQslScanScreen()}
                  style = {{ }} >
                  <Image source={require('../../images/arrow_back_grey.png')}  style={{width: 27, height: 27 } } 
                  resizeMode="contain" />    
                  <Text style={{fontSize: 12}}> Back </Text>
              </TouchableOpacity>


      </View> 

      </View>

       </View>
       
      

    </View>
    :
    <View>
          <TouchableOpacity
                  onPress={() => this.gotoQslScanScreen()}
                  style = {{ }} >
                  <Image source={require('../../images/arrow_back_grey.png')}  style={{width: 27, height: 27 } } 
                  resizeMode="contain" />    
                  <Text style={{fontSize: 12}}> TEST! </Text>
              </TouchableOpacity>
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
        sqsoqslscan: state.sqso.currentQso.qslscan.body.message.qso,
      //  sqsoqslscanbody: state.sqso.currentQso.qslscan.body,
        sqsoqslscanerror: state.sqso.currentQso.qslscan.body.error
        
     };
};


const mapDispatchToProps = {
    getQslScan
    
   }

export default connect(mapStateToProps, mapDispatchToProps)(QslScanResult);