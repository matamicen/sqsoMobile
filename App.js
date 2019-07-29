/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

import { Auth } from "aws-amplify";
import Analytics from "@aws-amplify/analytics";

import awsconfig from "./aws-exports";
import AsyncStorage from "@react-native-community/async-storage";

import PushNotification from "@aws-amplify/pushnotification";

Analytics.configure(awsconfig);

PushNotification.configure(awsconfig);

Auth.configure(awsconfig);

PushNotification.onRegister(token => {
  console.log("in app registration App.js", token);
  // this.setState({token: token});
  // this.props.managePushToken(token,'','');
  // this.pushToken = token;
  try {
    // await AsyncStorage.setItem('pushtoken', token);
    AsyncStorage.setItem("pushtoken", token);
  } catch (error) {
    console.log("Error al grabar pushtoken en asynstorage", error);
    // kinesis_catch("#015", error, "");
    // Error retrieving data
  }
});

PushNotification.onNotification(notification => {
  console.log("antes imprimir");
//   console.log("in app notification", notification);
    if (Platform.OS==='android')
    {   // console.log('AVATR: '+notification.data);
    try {
          console.log('paso por ANDROID')
              let body = notification.data['pinpoint.jsonBody'];
            // let body = notification._data['data.pinpoint.jsonBody'];
            
              let bodyJson = JSON.parse(body)
            
              console.log(bodyJson);
              

    } 
    catch (e)
        {   }
 
    }else
    {
      try {
        console.log('paso por IOS')
        let bodyJson = notification._data.data.jsonBody;
        
        // let body = notification._data['data.pinpoint.jsonBody'];

          // let bodyJson = JSON.parse(body)
        
          console.log(bodyJson);
         
        } 
        catch (e)
            {   }


    }
  console.log("despues de imprimir");
});

class App extends React.Component {
  async componentDidMount() {
   
  }
  signin = async () => {
    await Auth.signIn("LU2FFF", "sabrina")
      .then(() => {
        console.log("entro!");
        this.usernotfound = false;
      })
      .catch(err => {
        console.log("error:", err.code);
        console.log(err);
      });
  };
  get = async () => {
    const res = await AsyncStorage.getItem("identity");
    console.log("identityID: " + res);
  };

  save = async () => {
    await AsyncStorage.setItem("identity", "pepin");
  };
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View>
              <Text>Hola</Text>

              <TouchableOpacity onPress={() => this.signin()}>
                <Text>LOGIN</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.save()}>
                <Text>SET</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.get()}>
                <Text>GET</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark
  },
  highlight: {
    fontWeight: "700"
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  }
});

export default App;
