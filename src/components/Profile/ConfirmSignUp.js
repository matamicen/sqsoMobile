import React, { Component } from 'react';
import { Text, TextInput, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../utils/i18n';





class ConfirmSignUp extends Component {

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

<Modal visible={true}  transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{
                      //  margin:20,
                          padding:20, 
                 //         backgroundColor:  '#475788',
                          backgroundColor:"rgba(0,0,0,0.85)",
                          top: 90,
                          left: 30,
                          right: 30,
                          position: 'absolute',
                          borderBottomLeftRadius: 22,
                          borderBottomRightRadius: 22,
                          borderTopLeftRadius: 22,
                          borderTopRightRadius: 22,

                                                    
                          alignItems: 'center'                      
                          }}>

                <View style={{flex: 1}}> 
                
                  <View style={{flex: 0.60}}>           
                 
                  <Text style={{ color: '#FFFFFF', fontSize: 17, padding: 10 }}>{I18n.t("confirmSignUpWeHaveSent")}</Text>
                    <TextInput 
                    placeholder={I18n.t("confirmSignUpConfirmationCode")}
                    onFocus={() => this.setState({ confirmationcodeError: 0})}
                    underlineColorAndroid='transparent'
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.inputConfirmation}
                    value={this.state.confirmationcode}
                    onChangeText={(text) => this.setState({confirmationcode: text})} />
                  </View>

                  <View style={{flex: 0.20, justifyContent: 'space-around',   padding: 3,
                        opacity: this.props.confirmationcodeError }}>
                        <Text style={{ color: this.props.color, textAlign: 'center', fontSize: 16, width: 290 }}> {this.props.errormessage2}
                        </Text>
                   </View>

                    <View style={{flex: 0.20, flexDirection: 'row'}}>
                     <View style={{flex: 0.25, alignItems: 'flex-start'}} > 
                    <TouchableOpacity disabled={this.state.buttonsEnabled} onPress={() => this.props.close_confirmSignup()} style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5}}>
                      <Text style={{ color: '#999', fontSize: 14}}>{I18n.t("confirmSignUpCancelButton")}</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flex: 0.40, alignItems: 'center'}} > 
                    <TouchableOpacity disabled={this.state.buttonsEnabled} onPress={() => this.props.resendCode() } style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5, alignItems: 'flex-start'}}>
                      <Text style={{ color: '#999', fontSize: 14}}>{I18n.t("confirmSignUpResendCodeButton")}</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flex: 0.35, alignItems: 'flex-end' }} > 
                    <TouchableOpacity  disabled={this.state.buttonsEnabled} onPress={() => this.props.confirmSignup(this.state.confirmationcode.trim()) } style={{ paddingTop: 4, paddingBottom: 4, flex: 0.5, alignItems: 'flex-end'}}>
                      <Text style={{ color: 'white', fontSize: 17}}>{I18n.t("confirmSignUpConfirmButton")}</Text>
                    </TouchableOpacity>
                    </View>
                    </View>


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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSignUp);