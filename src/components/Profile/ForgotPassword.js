import React, { Component } from 'react';
import { Text, Image, View, Button, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight, Keyboard,
     ActivityIndicator, KeyboardAvoidingView, DatePickerAndroid, DatePickerIOS,
    Platform, Modal } from 'react-native';
import { connect } from 'react-redux';
//import Amplify, { Auth, API, Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';

import awsconfig from '../../aws-exports';
//import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { setQra, setUrlRdsS3 } from '../../actions';
import { hasAPIConnection } from '../../helper';
import VariosModales from '../Qso/VariosModales';
// import { kinesis_catch } from '../../helper';
import crashlytics from '@react-native-firebase/crashlytics';



//Amplify.configure(awsconfig);
Auth.configure(awsconfig);


class ForgotPassword extends Component {
//   static navigationOptions = {
//       tabBarLabel: 'Profile'

//   }


constructor(props) {
    super(props);

    this.usernotfound = false;
    this.error = false;
    
    this.state = {
   
     qra: '',
     email: '',
     birthdate: 'birthdate',
     password: '',
     passwordConfirm: '',
     indicator: 0,
     loginerror: 0,
     errormessage: '',
     chosenDate: new Date() ,
     pickerDateIOS: false,
     day: 0,
     month: 0,
     year: 0,
     confirmSignup: false,
     confirmationcode: '',
     confirmationcodeError: 0,
     indicatorQRA: 1,
     indicatorNewPassword : 0,
     newPassword: '',
     code: '',
     passwordChanged: false,
     nointernet: false
     
    };
  }

  componentDidMount() {

    console.log("COMPONENT did mount SignupForm");

 
       }

  signInAfterConfirmed = async () => {

    await Auth.signIn(this.state.qra.toUpperCase(), this.state.newPassword)
    .then(() =>  {console.log('entro!')
    this.usernotfound = false;
  
  })
    .catch(err => {console.log('error:', err.code)
    this.usernotfound = true;

    // kinesis_catch('#001',err,this.state.qra.toUpperCase());
    crashlytics().setUserId(this.state.qra.toUpperCase());
    crashlytics().log('error: ' + err) ;
    crashlytics().recordError(new Error('signInAfterConfirmed_1'));


  });


  if (!this.usernotfound)
  {  try {
      const { identityId } = await Auth.currentCredentials();
      console.log('PASO POR SIGNIN la credencial es:' + identityId);
      var res = identityId.replace(":", "%3A");
      // this.props.setUrlRdsS3('https://s3.amazonaws.com/sqso/protected/'+res+'/');
      this.props.setUrlRdsS3(res,'https://d3gbqmcrekpw4.cloudfront.net/protected/'+res+'/');
      console.log('la credencial RES:' + res);
    }
    catch (e) {
      console.log('caught error', e);

      crashlytics().setUserId(this.state.qra.toUpperCase());
      crashlytics().log('error: ' + e) ;
      crashlytics().recordError(new Error('signInAfterConfirmed_2'));

      // kinesis_catch('#002',e,this.state.qra.toUpperCase());
      // Handle exceptions
    }
    session = await Auth.currentSession();
    console.log("PASO POR SIGNIN token: " + session.idToken.jwtToken);
    
    // seteo el usuario logueado en store 
    this.props.setQra(this.state.qra.toUpperCase());
    // guardo en local storage el username
    try {
      await AsyncStorage.setItem('username', this.state.qra.toUpperCase());
    } catch (error) {

      crashlytics().setUserId(this.state.qra.toUpperCase());
      crashlytics().log('error: ' + error) ;
      crashlytics().recordError(new Error('signInAfterConfirmed_3'));

      // kinesis_catch('#003',error,this.state.qra.toUpperCase());
      // Error saving data
    }
    
   

    this.setState({indicator: 0, confirmationcodeError:0});
     this.props.navigation.navigate("AppNavigator2");

     }



  }


  next = async () => {
    if (await hasAPIConnection())
    {
      Keyboard.dismiss();

    this.setState({confirmationcodeError: 0, indicator:1});
    
    await Auth.forgotPassword(this.state.qra.toUpperCase())
            .then(data => {console.log(data)
                       this.setState({confirmationcodeError: 0, indicator:0, indicatorQRA:0, indicatorNewPassword:1});
              })
            .catch(err => {console.log(err)

                if (err.code==='LimitExceededException')
                  this.setState({errormessage: 'Attempt limit exceeded, please try after some time',  confirmationcodeError: 1, indicator:0}) 
              else
                this.setState({errormessage: 'Error! Please enter the callsign again',  confirmationcodeError: 1, indicator:0 })
              

                crashlytics().setUserId(this.state.qra.toUpperCase());
                crashlytics().log('error: ' + err) ;
                crashlytics().recordError(new Error('Auth.forgotPassword'));

                // kinesis_catch('#004',err,this.state.qra.toUpperCase());
              });

            

          }
          else 
      { 
        this.setState({indicator: 0}); 
        this.setState({nointernet: true});
      }


 }

    sendNewPassword = async () => {

         Keyboard.dismiss();
         if (await hasAPIConnection())
         {   

        this.setState({confirmationcodeError: 0, indicator:1});

        if (this.state.newPassword.length<6)
        {
    
          this.setState({errormessage: 'The Passwords must have 6 characters at least', confirmationcodeError: 1, indicator:0});
          this.error = true;
          this.newPass.focus();
        }

        if (this.state.code.length<1)
        {
    
          this.setState({errormessage: 'You must enter the code that you received in your email', confirmationcodeError: 1, indicator:0});
          this.error = true;
          this.code.focus();
        }

        // if (this.state.newPassword.length<6)
        // {
    
        //   this.setState({errormessage: 'The Passwords must have 6 characters at least', confirmationcodeError: 1, indicator:0});
        //   this.error = true;
        //   this.newPass.focus();
        // }

        if (!this.error){
          this.error = false;    
   
         await Auth.forgotPasswordSubmit(this.state.qra.toUpperCase(), this.state.code, this.state.newPassword)
            .then(data => {console.log(JSON.stringify(data))
            this.setState({indicator:0, passwordChanged:true});
            
     //       this.signInAfterConfirmed();
            })
            .catch(err => {
                console.log(err);
                console.log(err.code);
            if(err.code==='CodeMismatchException') 
                    this.setState({errormessage: 'The code is invalid, check your email and try again.',confirmationcodeError: 1, indicator:0});
            
            if(err.code==='ExpiredCodeException') 
                    this.setState({errormessage: 'Invalid code provided, please request a code again.',confirmationcodeError: 1, indicator:0});
                  
                    crashlytics().setUserId(this.state.qra.toUpperCase());
                    crashlytics().log('error: ' + err) ;
                    crashlytics().recordError(new Error('Auth.forgotPasswordSubmit'));
                    
                    // kinesis_catch('#005',err,this.state.qra.toUpperCase());
        });
      }
    } else 
    { 
      this.setState({indicator: 0}); 
      this.setState({nointernet: true});
    }

    }

    closePasswordChanged = () => {
        this.setState({passwordChanged:false});
        this.props.navigation.navigate("Root");


    }

    closeVariosModales = () => {
      this.setState({nointernet: false}); 
    }
   
    render() { console.log("ForgotPassword Screen");
               console.log("qra: "+this.state.qra + " email:"+ this.state.email + 
               " birthdate: "+this.state.birthdate +
              " password: " +this.state.password + 
            "passwordConfirm: "+this.state.passwordConfirm);
   
        return (
         //   <KeyboardAvoidingView behavior="padding" style={{ justifyContent: 'space-around'}}>
         <View style={styles.container}> 
         
              
               <View style={{flexDirection: 'row',  justifyContent: 'space-around',   padding: 1,
                        opacity: this.state.indicator,   marginTop: 30 }} >
                  
                    <ActivityIndicator  animating={true} size="large" color='#8BD8BD' />
                    
                 </View>
                 <View style={{ justifyContent: 'space-around',   padding: 1,
                        opacity: this.state.confirmationcodeError }}>
                        <Text style={{ color: '#ff3333', textAlign: 'center', }}> {this.state.errormessage}
                        </Text>
                   </View>
                  
         {(this.state.indicatorQRA===1) ?  
            // <View style={{  justifyContent: 'space-around',   padding: 1,
            //             opacity: this.state.indicatorQRA }} >
          <KeyboardAvoidingView behavior="padding"    style={{  justifyContent: 'space-around',   padding: 1,
                          opacity: this.state.indicatorQRA }}   >
                
                <Text style={{ color: '#FFFFFF', fontSize: 18, marginBottom: 10  }}>Password Recovery</Text>
               <TextInput 
                  ref={qraRef => this.qraRef = qraRef}
                  placeholder="enter your callsign"
                  underlineColorAndroid='transparent'
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  // onSubmitEditing={() => this.emailRef.focus()} 
                  style={styles.input}
                  value={this.state.qra}
                    onChangeText={(text) => this.setState({qra: text})} />

    

                 <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.next()} >
                    <Text style={styles.buttonText}> Next</Text>
                 </TouchableOpacity>

                <TouchableOpacity  style={{marginTop: 10}} onPress={ () => this.props.navigation.navigate("Root")} >
                    <Text style={styles.buttonText2} >Login Screen</Text>
                 </TouchableOpacity>

                 </KeyboardAvoidingView>
                 
            // </View>
          :
                <View style={{  justifyContent: 'space-around',   padding: 1,
                        opacity: this.state.indicatorNewPassword }} >
                
                <Text style={{ color: '#FFFFFF', fontSize: 15  }}>We have sent the code to your email</Text>
               <TextInput 
                  ref={qraRef => this.qraRef = qraRef}
                  placeholder="qra"
                  underlineColorAndroid='transparent'
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => this.newPass.focus()} 
                  style={styles.input}
                  value={this.state.qra}
                    onChangeText={(text) => this.setState({qra: text})} />

                    <TextInput 
                  ref={newPass => this.newPass = newPass}
                  placeholder="new password"
                  underlineColorAndroid='transparent'
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  onSubmitEditing={() => this.code.focus()} 
                  style={styles.input}
                  value={this.state.newPassword}
                    onChangeText={(text) => this.setState({newPassword: text})} />

                      <TextInput 
                  ref={code => this.code = code}
                  placeholder="code"
                  underlineColorAndroid='transparent'
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                //  onSubmitEditing={() => this.emailRef.focus()} 
                  style={styles.input}
                  value={this.state.code}
                    onChangeText={(text) => this.setState({code: text})} />

  
                 <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.sendNewPassword()} >
                    <Text style={styles.buttonText}>Send</Text>
                 </TouchableOpacity>

                 <TouchableOpacity  style={{marginTop: 10}} onPress={ () => this.props.navigation.navigate("Root")} >
                    <Text style={styles.buttonText2} >Login Screen</Text>
                 </TouchableOpacity>
            </View>
         }

             

                

  <Modal visible ={this.state.passwordChanged}  transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{
                      //  margin:20,
                          padding:20, 
                        //  backgroundColor:  '#475788',
                         // backgroundColor: '#808080',
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
                          
                  
                   
                   <Text style={{ color: '#999', fontSize: 20}}>Your Password has been changed succesfull.</Text>
                   <View style={{ marginTop: 15,  alignItems: 'center',  justifyContent: 'center'}}>
                    {/* <TouchableOpacity  onPress={() => this.closePasswordChanged()} style={styles.buttonContainer}> */}
                    <TouchableOpacity  onPress={() => this.closePasswordChanged()} >
                      <Text style={{color: 'white', fontSize: 18}}>OK</Text>
                    </TouchableOpacity >
                 </View>
        
               
                    
                    </View>

               
               </Modal>

{(this.state.nointernet) && 
               <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
}


           
            </View>
           
        );
       
     } 

 }

 const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
   // backgroundColor: '#3498db'
   //backgroundColor: '#808080'
   backgroundColor: '#243665'
      },
  input: {
    height: 40,    
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 5,
    color: '#FFF',
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 22
          },
  buttonContainer:{
     // backgroundColor: '#2980b9',
    //  backgroundColor: '#696969',
      backgroundColor: '#8BD8BD',
      paddingVertical: 15,
      marginTop: 10,
      borderRadius: 22
      },
  birthdateContainer:{
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 10,
        height: 40,
        marginBottom: 5,
        paddingHorizontal: 8,
               },
   birthdateText:{
    color: '#FFF',
    fontSize: 16,
    opacity: 0.7
         
          },
  buttonText: {
    textAlign: 'center',
   // color: '#FFFFFF',
   color: '#243665',
    fontSize: 16,
  //  fontWeight: '700'
           },
           buttonText2: {
            //     textAlign: 'center',
                 color: '#FFFFFF',
                 fontSize: 16,
          //       fontWeight: '700'
                
                        },  
   activityindicator: {
    flexDirection: 'row',
     justifyContent: 'space-around',
   padding: 10
  
   }

        });


 const mapStateToProps = state => {
    return {  };
};


const mapDispatchToProps = {
  setQra,
  setUrlRdsS3 
   }

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
