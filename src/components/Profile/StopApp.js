import React, { Component } from 'react';
import { Text, TextInput, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
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
                     <Text style={{ color: '#243665', fontWeight: 'bold', fontSize: 20, padding: 10 }}>{this.props.upgradeText.split('<br/>').join('\n') }</Text> 
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