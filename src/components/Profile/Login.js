import React, { Component } from 'react';
import { Text, Image, View, Button, StyleSheet, Iamge, KeyboardAvoidingView, Platform, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

class Login extends Component {
//   static navigationOptions = {
//       tabBarLabel: 'Profile'
//behavior="padding"
//   }





Login = () => {
  
    this.props.navigation.navigate("Root");
}
   
    render() { console.log("Login Screen");
   
        return (
              <KeyboardAvoidingView behavior="padding"     style={styles.container}  >
               {/* <View style={styles.container}> */}
                <View style={styles.logoContainer}> 
              
                
                   {/* <Image source={require('../../images/Ham.png')}  style={{width: 250, height: 160, marginTop: 100  } }  /> */}
                   <Image source={require('../../images/desigual.png')}  style={{width: 250, height: 160, marginTop: 100  } }  />
                  
                     {/* <Text style={styles.title}> superQso </Text> */}
                </View>  
                   
                
               
                 <View style={styles.formContainer}>
                
                  <LoginForm navigation={this.props.navigation} /> 
                 </View>

            {/* </View> */}
             </KeyboardAvoidingView> 
        );
       
     } 

 }

 const styles = StyleSheet.create({
  container: {
   flex: 1,

   // backgroundColor: '#3498db'
  // backgroundColor: '#696969'
  backgroundColor: '#808080'
      },
  logoContainer: {
    alignItems: 'center',  
    
  
    
    flex: 0.4,
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
    flex: 1,
    marginTop: 25

               
               
                      },

 
});


 const mapStateToProps = state => {
    return {  };
};


const mapDispatchToProps = {
    
   }

export default connect(mapStateToProps, mapDispatchToProps)(Login);