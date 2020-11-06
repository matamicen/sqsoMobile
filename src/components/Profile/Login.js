import React, { Component } from 'react';
import { Text, Image, View, Button, StyleSheet, Iamge, KeyboardAvoidingView, Platform,
     TouchableOpacity, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

class Login extends React.PureComponent {
//   static navigationOptions = {
//       tabBarLabel: 'Profile'
//behavior="padding"
//   }





Login = () => {
  
    this.props.navigation.navigate("Root");
}
   
    render() { console.log("Login Screen");
   
        return (
            <View style={{ flex:1}}>
                 <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
              <KeyboardAvoidingView behavior="padding"     style={styles.container}  >
               {/* <View style={styles.container}> */}
                <View style={styles.logoContainer}> 
              
                
                   {/* <Image source={require('../../images/Ham.png')}  style={{width: 250, height: 160, marginTop: 100  } }  /> */}
                   {/* <Image source={require('../../images/desigual.png')}  style={{width: 250, height: 160, marginTop: 100  } }  /> */}
                   <Image source={require('../../images/SuperQSO_1.png')}  
                   style={{width: 190 , marginTop: 100 } } 
                   resizeMode="contain" /> 
        {/* 195 y 127 */}
                     {/* <Text style={styles.title}> superQso </Text> */}
                </View>  
                   
                
               
                 <View style={styles.formContainer}>
                
                  <LoginForm navigation={this.props.navigation} /> 
                 </View>

            {/* </View> */}
             </KeyboardAvoidingView> 
             </TouchableWithoutFeedback >

             </View>
        );
       
     } 

 }

 const styles = StyleSheet.create({
  container: {
   flex: 1,

   // backgroundColor: '#3498db'
  // backgroundColor: '#696969'
 // backgroundColor: '#808080'
  backgroundColor: '#243665'
      },
  logoContainer: {
    alignItems: 'center',  
    justifyContent: 'center',
    
  
    
    flex: 0.30,
    justifyContent: 'center'
    
          },
 title: {
      fontSize: 18,
      color: '#FFF',    
      marginTop: 10,
      width: 100,
      textAlign: 'center',
      opacity: 0.7
      
            },
            title2: {
                fontSize: 18,
                color: '#FFF',    
                marginTop: 10,
              //  width: 100,
                textAlign: 'center',
                opacity: 0.7
                
                      },
 formContainer: {
    flex: 0.70,
   // marginTop: 25

               
               
                      },

 
});


 const mapStateToProps = state => {
    return {  };
};


const mapDispatchToProps = {
    
   }

export default connect(mapStateToProps, mapDispatchToProps)(Login);