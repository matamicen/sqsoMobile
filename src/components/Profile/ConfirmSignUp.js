import React, { Component } from 'react';
import { Text, TextInput, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';






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
                          
                  <Text style={{ color: '#FFFFFF', fontSize: 18, padding: 10 }}>We have sent the confirmation code to your email. Please enter the code to activate the account.</Text>
                  <TextInput 
                  placeholder="confirmation code"
                  onFocus={() => this.setState({ confirmationcodeError: 0})}
                  underlineColorAndroid='transparent'
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.inputConfirmation}
                  value={this.state.confirmationcode}
                  onChangeText={(text) => this.setState({confirmationcode: text})} />

                  <View style={{ justifyContent: 'space-around',   padding: 3,
                        opacity: this.props.confirmationcodeError }}>
                        <Text style={{ color: this.props.color, textAlign: 'center', fontSize: 16, width: 290 }}> {this.props.errormessage2}
                        </Text>
                   </View>

                    <View style={{flex: 1, flexDirection: 'row'}}>

                    <TouchableOpacity disabled={this.state.buttonsEnabled} onPress={() => this.props.close_confirmSignup()} style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5}}>
                      <Text style={{ color: '#999', fontSize: 14}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.buttonsEnabled} onPress={() => this.props.resendCode() } style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5, alignItems: 'flex-start'}}>
                      <Text style={{ color: '#999', fontSize: 14}}>Resend Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  disabled={this.state.buttonsEnabled} onPress={() => this.props.confirmSignup(this.state.confirmationcode) } style={{ paddingTop: 4, paddingBottom: 4, flex: 0.5, alignItems: 'flex-end'}}>
                      <Text style={{ color: 'white', fontSize: 18}}>CONFIRM</Text>
                    </TouchableOpacity>
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