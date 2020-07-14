import React, { Component } from 'react';
import { Text, TextInput, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../utils/i18n';






class StopApp extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            confirmationcode: ""
         
        };
      }

  

   componentDidMount() {
    
     
     
       }


       gotoMarket = async () => {
    
      if (Platform.OS==='android')
        urlnotif = 'market://details?id=com.sqsomobile'
      else
        urlnotif = 'https://apps.apple.com/ar/app/superqso/id1478967853'
        
        // 'https://www.superqso.com/';
        Linking.canOpenURL(urlnotif).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + urlnotif);
          } else {
            // if(__DEV__)
            //   analytics().logEvent("OPENlatestposts_DEV", {"QRA": this.props.qra});
            // else
            //   analytics().logEvent("OPENlatestposts_PRD", {"QRA": this.props.qra});
          
    
            return Linking.openURL(urlnotif);
          
          }
        }).catch(err => {
                console.error('An error occurred', err)
                // crashlytics().setUserId(this.props.qra);
                // crashlytics().log('error: ' + JSON.stringify(err)) ;
                // if(__DEV__)
                // crashlytics().recordError(new Error('Linking.latestposts_DEV'));
                // else
                // crashlytics().recordError(new Error('Linking.latestposts_PRD'));
      
      
              });
            }





            

    render() { console.log("RENDER confirmSignUp");
       
  
              
        return( <View >

<Modal visible ={true}  transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{
                      //  margin:20,
                          padding:20, 
                      //    backgroundColor:  '#475788',
                          backgroundColor:"rgba(139,216,189,0.93)",
                          top: 90,
                          left: 30,
                          right: 30,
                          position: 'absolute',
                          borderBottomLeftRadius: 22,
                          borderBottomRightRadius: 22,
                          borderTopLeftRadius: 22,
                          borderTopRightRadius: 22,
                                                    
                        //  alignItems: 'center'                      
                          }}>
          

                    <View style={{flex: 1, alignItems: 'center'}}>


                     {(this.props.appNeedUpgrade) &&
                     <View>
                     <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 18, padding: 10 }}>{this.props.upgradeText.split('<br/>').join('\n') }</Text> 
                    
                     <TouchableOpacity  style={{ height:50 }}  onPress={() => this.gotoMarket()}  >
                     <Text style={{fontSize: 20, marginTop:12, fontWeight: 'bold', color: '#243665', padding: 10}}>{I18n.t("STOPAPP_UPGRADEAPPNOW")}</Text>
                   
                     </TouchableOpacity> 

                     <Text style={{fontSize: 18, marginTop:12, fontWeight: 'bold', color: '#243665', padding: 10}}>{I18n.t("STOPAPP_UPGRADEAPPNOWLATER")}{"\n\n"}{I18n.t("STOPAPP_UPGRADEAPPNOWLATER2")}</Text>
                     </View>
                     }

                      {(this.props.pushTokenNotFound) &&
                     <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 20, padding: 10 }}>{I18n.t("STOPAPP_SORRY")}{"\n\n"}{I18n.t("STOPAPP_PLEASE")} {"\n\n"} {I18n.t("STOPAPP_APOLOGIZE")}</Text>
                     }

               {(this.props.forceChangePassword) &&
                     <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 20, padding: 10 }}>{I18n.t("STOPAPP_CHANGEPASSWORD")} {"\n\n"}{I18n.t("STOPAPP_THENTRY")} {"\n\n"} {I18n.t("STOPAPP_APOLOGIZE")}</Text>
                     }    
                 
                    
                    </View>
                    
                    </View>

               
               </Modal>



         

            

         </View>
            
           
       
        )} 

 }

 
const styles = StyleSheet.create({
       faceImageStyle: {
      width: 65,
      height: 65,
      borderRadius: 30
       },
       inputConfirmation: {
        height: 40,    
        width: 250,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 5,
        color: '#FFF',
        fontSize: 16,
        borderRadius: 22,
        paddingHorizontal: 10
              },
    name:{
        fontSize: 12,
        marginLeft: 5,
        padding: 2,
        fontWeight: 'bold',        
        color: 'orange'        
    },
    name2:{
      fontSize: 12,
    //   marginLeft: 3,
      // padding: 2,
      fontWeight: 'bold',        
      color: 'orange'        
  }
  });





 const mapStateToProps = state => {
    return { 
    }
          
};


const mapDispatchToProps = {
 
   }

export default connect(mapStateToProps, mapDispatchToProps)(StopApp);