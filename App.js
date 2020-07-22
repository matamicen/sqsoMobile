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
import { armoPushNotifyLocalNotif } from './src/helper';


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

    onNotification: (notification) => {
      console.log('onNotifications APPS.js esto funciona solo en Android cuando esta KILLED');
     
          parseo =  JSON.parse(notification.data.message); 
          mensajes =  armoPushNotifyLocalNotif(parseo['title-loc-key'],parseo['loc-key'],parseo['title-loc-args'],parseo['loc-args']);
      // mensajes =  armoPushNotifyLocalNotif(notification.data['title-loc-key'],notification.data['loc-key'],notification.data['title-loc-args'],notification.data['loc-args']);

      PushNotification.localNotification({
        //     id: notification.id,
        userInfo: { id: notification.id,  url: 'https://www.superqso.com/qso/7c4ace43-4e19-41d9-a248-5b2b451efd60' },
        // title: notification.data['pinpoint.notification.title'],
        // message: notification.data['pinpoint.notification.body'],
        title: mensajes.pushTitle,
        message: mensajes.pushMessage,
        priority: "max",
        autoCancel: true,
              // title: 'Notification with my name',
              // message: notification['name'], // (required)
              // date: new Date(Date.now()) // in 60 secs
            });

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
