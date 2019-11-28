import React from 'react';
import {

  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert

} from 'react-native';
import { connect } from 'react-redux';


import crashlytics from '@react-native-firebase/crashlytics';



//const App: () => React$Node = () => {
  class ErrorBoundary extends React.Component {


    constructor(props) {
        super(props);
        this.state = { hasError: false,
            error: null,
            errorInfo: null
         };
      }


    
      componentDidCatch(error, errorInfo) {
        // Display fallback UI
        this.setState({ hasError: true, error: error,
            errorInfo: errorInfo });
        console.log('paso por crash didCatch : '+this.props.qra);
        crashlytics().setUserId(this.props.qra);
        crashlytics().log('error: ' + error + ' StackError: '+ errorInfo.componentStack) ;

        console.log(errorInfo.componentStack);
        crashlytics().recordError(new Error('Boundary Error'));


       
    
      }
    
      render() {
       
          // You can render any custom fallback UI
          return(
              (this.state.hasError) ?
        


            <View style={{flex:1, backgroundColor: '#243665',   justifyContent: 'center'
          }}>
                   <Text style={{ color: "white", fontSize: 22, padding: 10,textAlign: "center" }}>Sorry, we found an error :(</Text>
                        <Text style={{ color: "#8BD8BD", fontSize: 18, padding: 10 ,  textAlign: "center"}}>We are processing and fixing it as soon as possible.</Text>
                        {/* <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>Enjoy SuperQso 59+100 !!!</Text> */}
                        <Text style={{ color: "#FFFFFF", fontSize: 16, padding: 10,  textAlign: "center" }}>Please restart the App.</Text>

          </View>
          :
          this.props.children 
          )
        }
    
      }

  
      const styles = StyleSheet.create({
        container: {
   
          
           flex: 1,
           flexDirection: 'row',

          backgroundColor: '#243665'
     //   backgroundColor: 'rgba(0,0,0,0.85)',
        //  alignItems: 'center'
          
            }
      });


      const mapStateToProps = state => {
        return { qra: state.sqso.qra,
                 jwtToken: state.sqso.jwtToken
        }
              //   isfetching: state.sqso.isFetching };
    };
    
    
    const mapDispatchToProps = {
    
       }
    
 export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);

//export default ErrorBoundary;
