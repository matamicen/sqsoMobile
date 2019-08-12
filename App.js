import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView , AsyncStorage} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import peopleReducer from './src/reducers/peopleReducer';
import awsconfig from './src/aws-exports';
import thunk from "redux-thunk"
//import AppContainer from "./src/containers/AppContainer";

// agregado nuevo
import AppReducer from './src/reducers/AppReducer';
import AppWithNavigationState2 from './src/components/MainNavigator';
import PushNotification from '@aws-amplify/pushnotification';
import {  kinesis_catch } from './src/helper';

PushNotification.configure(awsconfig);

// fin agregado nuevo

const createStoreWithMidddleware = applyMiddleware(thunk)(createStore);

PushNotification.onRegister((token) => {
  console.log('in app registration App.js', token);
 // this.setState({token: token});
  //  this.props.managePushToken(token,'','');
  //  this.pushToken = token;
   try {
  //  await AsyncStorage.setItem('pushtoken', token);
  AsyncStorage.setItem('pushtoken', token);
   } 
   catch (error) {
     console.log('Error al grabar pushtoken en asynstorage', error);
     
     kinesis_catch('#015',error,'');
     // Error retrieving data
    }
 

});


//const store = createStoreWithMidddleware(peopleReducer);
//const store = createStoreWithMidddleware(AppReducer);

export default class App extends React.Component {

   store = createStoreWithMidddleware(AppReducer);
   //store = createStore(AppReducer);



  render() { console.disableYellowBox = true


    return (
    <SafeAreaView style={styles.safeArea}>
      <Provider store={this.store}>
    
    <AppWithNavigationState2 />
      </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  }
})
