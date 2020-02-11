import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
//import peopleReducer from './src/reducers/peopleReducer';
import awsconfig from './src/aws-exports';
import thunk from "redux-thunk"
//import AppContainer from "./src/containers/AppContainer";

// agregado nuevo
import AppReducer from './src/reducers/AppReducer';
import AppWithNavigationState2 from './src/components/MainNavigator';
import AsyncStorage from '@react-native-community/async-storage';
// import PushNotification from '@aws-amplify/pushnotification';
//import {  kinesis_catch } from './src/helper';
import reactotron from './ReactotronConfig';


// PushNotification.configure(awsconfig);

// fin agregado nuevo

var PushNotification = require('react-native-push-notification');


PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
      console.log('nuevo push token!!!')
      console.log(token);

         try {
  //  await AsyncStorage.setItem('pushtoken', token);
  AsyncStorage.setItem('pushtoken', token.token);
   } 
   catch (error) {
     console.log('Error al grabar pushtoken en asynstorage', error);
     
    //  kinesis_catch('#015',error,'');
     // Error retrieving data
    }
    },

    

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "750953848595",

    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
 
    popInitialNotification: true,
    requestPermissions: true,

});




if(__DEV__){
  store = createStore(AppReducer, compose(applyMiddleware(thunk), reactotron.createEnhancer()));
}
else{
    var createStoreWithMidddleware = applyMiddleware(thunk)(createStore);
    store = createStoreWithMidddleware(AppReducer);
}

// PushNotification.onRegister((token) => {
//   console.log('in app registration App.js', token);
 
//    try {
//   //  await AsyncStorage.setItem('pushtoken', token);
//   AsyncStorage.setItem('pushtoken', token);
//    } 
//    catch (error) {
//      console.log('Error al grabar pushtoken en asynstorage', error);
     
//      kinesis_catch('#015',error,'');
//      // Error retrieving data
//     }
 

// });


export default class App extends React.Component {


  render() { console.disableYellowBox = true


    return (
    <SafeAreaView style={styles.safeArea}>
      <Provider store={store}>
    
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
