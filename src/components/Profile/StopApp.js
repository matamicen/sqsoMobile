import React, { Component } from 'react';
import { Text, TextInput, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';






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
                          backgroundColor:"rgba(0,0,0,0.85)",
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
                     <Text style={{ color: '#FFFFFF', fontSize: 20, padding: 10 }}>{this.props.upgradeText.split('<br/>').join('\n') }</Text> 
                     }

                      {(this.props.pushTokenNotFound) &&
                     <Text style={{ color: '#FFFFFF', fontSize: 20, padding: 10 }}>Sorry, there was a problem during the APP installation.{"\n\n"}Please delete the APP and reinstall it from the store again. {"\n\n"} Apologize. SuperQSO.</Text>
                     }

               {(this.props.forceChangePassword) &&
                     <Text style={{ color: '#FFFFFF', fontSize: 20, padding: 10 }}>Sorry, you have to change your password in order to use SuperQSO APP, please change your password in superqso.com {"\n\n"}Then try login again with the App. {"\n\n"} Apologize. SuperQSO.</Text>
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