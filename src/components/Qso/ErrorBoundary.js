import React from 'react';
import {

  View,
  Text,

} from 'react-native';



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
        console.log('paso por crash didCatch');
        crashlytics().setUserId('LU1CGB');
        crashlytics().log('error1: ' + error + ' error2: '+ errorInfo.componentStack) ;

        console.log(errorInfo.componentStack);
        crashlytics().recordError(new Error('Boundary Error'));
    
      }
    
      render() {
       
          // You can render any custom fallback UI
          return(
              (this.state.hasError) ?
            <View >
                     <Text >hubo un error!!!</Text>
              <Text >  {this.state.error && this.state.error.toString()}</Text>
              <Text >{this.state.errorInfo.componentStack}</Text> 
         
          
          </View>
          :
          this.props.children 
          )
        }
    
      }

  




export default ErrorBoundary;
