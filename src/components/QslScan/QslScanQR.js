import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, Button, ActivityIndicator, TouchableOpacity, ScrollView, Modal, PermissionsAndroid
,Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
// import QsoHeader from './QsoHeader';
import { getQslScan } from '../../actions';
// import MediaImages from './MediaImages';
// import Likes from './Likes';
// import Comments from './Comments';
import QRCodeScanner from 'react-native-qrcode-scanner';
 import AdInter from "../Qso/AdInter"
 import AdVideoReward from "../Qso/AdVideoReward";
import {
  showVideoReward,
  showIntersitial
  } from "../../helper";


class QslScanQR extends Component {
  // static navigationOptions = {
  //     tabBarLabel: 'Qsl ScanQR'

     



  // }

  constructor(props) {
    super(props);
    
    this.scantype = '';
    this.videorewardmustbeshown = false;
    this.intersitialmustbeshown = false;
    this.closeAd = null;
    this.gotrewarded = false;
    this.qrToScan = '';

    this.state = {
      conta: 0,
      actindicatorfecthQslCard: false,
      scanQR: false,
      hasPermission: undefined,
      showCamera: true,
      showIntersitial: false,
      showVideoReward: false
    
      
    };
  }

  componentDidMount() {
    
    //  this.props.fetchPeople();
    this.setState({ showCamera: true})
   
     }


  gotoQslScanScreen = async (param) => {
    this.gotrewarded = true;
    console.log('llamo Screen '+ param);
      this.setState({showIntersitial:false});
      this.setState({showVideoReward:false});

       if (param==='qslScan')
           this.props.navigation.navigate("QslScanResult");
          
           if (param==='mainQsoLink' || param==='linkQso' )
           this.props.navigation.navigate("QsoLink");

           if (param==='qslscanScreen')   
           this.props.navigation.navigate("QslScanScreen");

           if (param==='Home')   
           this.props.navigation.navigate("Home");
     }

  onSuccess = async function(e) {
    // onSuccess(e) {
    // 
       // Linking
       //   .openURL(e.data)
       //   .catch(err => console.error('An error occured', err));
       //this.ScanQSL2(e);
       
  //   this.setState({actindicatorfecthQslCard: true})
       console.log('el codigo Scaneado es: ' +e.data);
       this.qrToScan = e.data;
     //  await this.props.getQslScan(e.data,this.scantype);
    
          if (this.scantype==='mainQsoLink' || this.scantype==='linkQso')
          {
            this.setState({actindicatorfecthQslCard: true})
            await this.props.getQslScan(e.data,this.scantype,this.props.myqra, this.props.jwtToken);
            this.gotoQslScanScreen(this.scantype);
            this.setState({actindicatorfecthQslCard: false})
              // showCamera: false})  

          }
          else
          {  

           //  await this.props.getQslScan(e.data,'qslScan',this.props.myqra, this.props.jwtToken);
          //   this.gotoQslScanScreen('qslScan');
        //     this.setState({actindicatorfecthQslCard: false, showCamera: false})
                            // showCamera: false})

                            
                            this.videorewardmustbeshown = false;
                            this.intersitialmustbeshown = false;
                          
                            if (showIntersitial(this.props.userinfo,'scanqr','')) {
                              this.intersitialmustbeshown = true;
                              this.closeAd = 'scanqr';
                              this.setState({showIntersitial:true, showCamera: false});
                              
                             
                            }
                          
                            if (showVideoReward(this.props.userinfo,'scanqr','')) {
                              this.videorewardmustbeshown = true;
                              this.closeAd = 'scanqr';
                              this.setState({showVideoReward:true, showCamera: false});
                           
                            }
                            
                            if (!this.intersitialmustbeshown && !this.videorewardmustbeshown){
                              // this.setState({actindicatorfecthQslCard: true})
                              // await this.props.getQslScan(e.data,'qslScan',this.props.myqra, this.props.jwtToken);
                              // this.gotoQslScanScreen('qslScan');
                              // this.setState({actindicatorfecthQslCard: false, showCamera: false})
                              this.scanQr();
                            }
                               
                                  
                            
                          

              
          }


  
         //   this.setState({scanQR: !this.state.scanQR})

        
   
       //   this.setState({scanQR: !this.state.scanQR})
     }

     scanQr = async () =>  {

      this.setState({actindicatorfecthQslCard: true})
      await this.props.getQslScan(this.qrToScan,'qslScan',this.props.myqra, this.props.jwtToken);
      this.gotoQslScanScreen('qslScan');
      this.setState({actindicatorfecthQslCard: false, showCamera: false})

    }  

     onSuccess_test = async function() {
      // onSuccess(e) {
      // 
         // Linking
         //   .openURL(e.data)
         //   .catch(err => console.error('An error occured', err));
         //this.ScanQSL2(e);
         console.log('ESCANEO TEST y el PARAMETRO es:'+this.scantype);
          this.setState({actindicatorfecthQslCard: true})
        //  console.log('el codigo Scaneado es: ' +e.data);
        
        //  await this.props.getQslScan('2734ee49-bdc0-11e8-ae0b-061cacc9b2a2');
        await this.props.getQslScan('0e5866a5-c97d-11e8-ae0b-061cacc9b2a2',this.scantype,this.props.myqra,this.props.jwtToken);
         this.setState({actindicatorfecthQslCard: false})
         this.gotoQslScanScreen(this.scantype);
       //   this.setState({scanQR: !this.state.scanQR})
  
          
     
         //   this.setState({scanQR: !this.state.scanQR})
       }

       not_rewarded = () => {
        console.log('not_rewarded QslScanrQR screen');
        this.setState({ showVideoReward: false });
        if (!this.gotrewarded)
            setTimeout(() => {
              this.props.navigation.navigate("QslScanScreen");
            }
            , 50)
          else
           this.gotrewarded = false;
       
         
      }

     

     render() { console.log("RENDER QSL SCAN SCREEN!" );
     const { params } = this.props.navigation.state;
     this.scantype = params ? params.scantype : null;
     
      
    
    console.log("QSL SCAN parametros: "+JSON.stringify(this.scantype) );
    console.log("QSL SCAN showcamera: "+this.state.showCamera );
    console.log(this.props.userinfo);
    

  


return   <View style={{flex: 1}}>
      
    { (!this.state.actindicatorfecthQslCard) &&
       (this.state.showCamera) &&

    <View style={{flex: 0.9, justifyContent: 'center'}}>
      <QRCodeScanner
               onRead={this.onSuccess.bind(this)}
             // onRead={() => this.ScanQSL2(this)}
           
  
            >
                   

            </QRCodeScanner>


             <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>


              {/* <TouchableOpacity
                  onPress={() => this.gotoQslScanScreen(this.scantype)}
                  style = {styles.capture} >
                  <Text style={{fontSize: 14}}> Go Back </Text>
              </TouchableOpacity> */}

               <TouchableOpacity
                  onPress={() => this.gotoQslScanScreen(this.scantype)}
                  style = {{ marginTop: 7}} >
                  <Image source={require('../../images/arrow_back_grey.png')}  style={{width: 27, height: 27 } } 
                  resizeMode="contain" />    
                  <Text style={{fontSize: 12}}> Back </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                  onPress={() => this.onSuccess_test()}
                  style = {styles.capture} >
                  <Text style={{fontSize: 14}}> test </Text>
              </TouchableOpacity> */}
              </View>
        </View>

    }


             <Modal visible={this.state.actindicatorfecthQslCard} position= {'top'} transparent={true}  onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:10, 
                  backgroundColor : 'rgba(0,0,0,0.85)',
                   marginTop: 210,
                   left: 95,
                   right: 25,
                   width: 160,
                   height: 35,
                   paddingVertical: 5,
                 //   position: 'absolute',
                   
                 //  alignItems: 'center',
                   borderRadius: 12                       
                    }}>
                   <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15}}>Fetching QSO ...</Text>
                   
                  

                    </View>
                {/* </KeyboardAvoidingView > */}
                   
                      </Modal>

                  


               
                  {(this.state.showIntersitial) && <AdInter showscanresults={this.scanQr.bind()}  closead={this.closeAd}  /> }
                 
                  {(this.state.showVideoReward) && <AdVideoReward  showscanresults={this.scanQr.bind()} closead={this.closeAd} notrewared={this.not_rewarded.bind()} /> }
            </View>

            }






}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
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
      padding: 5,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 5
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
        //   sqsoqslscan: state.sqso.currentQso.qslscan.body.message,
        //   sqsoqslscanerror: state.sqso.currentQso.qslscan.body.error
        jwtToken: state.sqso.jwtToken,
        userinfo: state.sqso.userInfo,
        myqra: state.sqso.qra
          
       };
  };
  
  
  const mapDispatchToProps = {
      getQslScan
      
     }
  
  export default connect(mapStateToProps, mapDispatchToProps)(QslScanQR);
