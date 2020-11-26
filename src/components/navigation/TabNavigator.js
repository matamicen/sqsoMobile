import { Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
//import MainPage from './MainPage';
//import ChooseColorPage from './ChooseColorPage';
// for react-navigation 1.0.0-beta.30
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import Home from '../Feed/Home';
import Notifications from '../Notifications/Notification';
//import SignOutScreen from './SignOutScreen';
import ProfileScreen from '../Profile/InitialScreen';
// import Home from './Qso/Home';
import QsoScreen from '../Qso/QsoScreen';
import UtilScreen from '../Util/Util';
const middleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav
);
//  const addListener = createReduxBoundAddListener("root");
// end for react-navigation 1.0.0-beta.30
/*
    export const AppNavigator = StackNavigator({
    Main: { screen: MainPage, },
    ChooseColor: { 
        screen: ChooseColorPage, 
        navigationOptions: {
            headerLeft: null,
        } 
    }
}, {
    initialRouteName: 'Main',
    mode: 'modal'
});
  */

/*
 export const AppNavigator = TabNavigator({
 Main: { screen: MainPage, },
 Tab2: { screen: ChooseColorPage,
    navigationOptions: {
        headerLeft: null,
    }  },
 /*Tab3: { screen: CameraScreen, },
 Tab4: { screen: QslScanScreen, } ,
 Tab5: { screen: SignOutScreen, } 
 
    
 }, {
    initialRouteName: 'Main',
    mode: 'modal'
});
*/
export function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}

console.log('es iphoneX o mas: ' + isIphoneXorAbove());
//const majorVersionIOS = parseInt(Platform.Version, 10);
// if (majorVersionIOS <= 9) {
//   console.log('Es MENOR que 9 la version');
//   console.log('version: '+ majorVersionIOS);
//  // const varheight = 60;
// }
// else{
//     console.log('Es MAYOR que 9 la version');
//     console.log('version: '+ majorVersionIOS);
//    // const varheight = 45;
// }
const getScreenRegisteredFunctions = (navState) => {
  // When we use stack navigators.
  // Also needed for react-navigation@2
  const { routes, index, params } = navState;

  if (navState.hasOwnProperty('index')) {
    return getScreenRegisteredFunctions(routes[index]);
  }
  // When we have the final screen params
  else {
    return params;
  }
};

//  const AppNavigator2 = TabNavigator({
export const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home },
    QsoScreen: { screen: QsoScreen },

    //   tabBarOptions: {

    //     showIcon: true,

    //       //  navigationOptions:

    //         // ({ tintColor }) => {
    //         //   return (<Image
    //         //       style={{ width: 25, height: 25 }}
    //         //       source={require('../images/removecircle.png')}/>);}

    //     //     tabBarIcon: (
    //     //       <Image style={{ width: 50, height: 50 }} source={require('../images/removecircle.png')}/>
    //     // )
    //         // }
    //  }},
    // CameraScreen: { screen: CameraScreen, },
    Notifications: { screen: Notifications },
    // Search: { screen: SearchScreen, },
    UtilScreen: { screen: UtilScreen },

    // QslScanScreen: { screen: QslScanScreen, },
    ProfileScreen: { screen: ProfileScreen }
  },
  {
    // initialRouteName: 'QsoScreen',
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: true, // fixes a bug in react navigation
    lazy: true, // fixes a bug in react navigation

    tabBarOptions: {
      //  labelStyle: {
      //      fontSize: 10,
      //      width: 90,
      //      padding: 0,
      //  },
      // indicatorStyle: { backgroundColor: 'transparent' },
      style: {
        backgroundColor: 'white',
        //   height: (Platform.OS==='ios') ? 60 : 60
        // funciona bien porque si en ANDROID sale con 60 y esta bien.
        height: Platform.OS === 'ios' && isIphoneXorAbove() ? 35 : 60
      },
      inactiveTintColor: 'black',
      activeTintColor: 'black',
      showIcon: true,
      iconStyle: {
        width: 31,
        height: 31
      },
      tabStyle: {
        marginTop: 10,
        height: 30,
        paddingRight: 20,
        paddingLeft: 5
      }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ defaultHandler }) => {
        if (navigation) {
          const screenFunctions = getScreenRegisteredFunctions(
            navigation.state
          );

          if (
            screenFunctions &&
            typeof screenFunctions.tapOnTabNavigator === 'function'
          ) {
            screenFunctions.tapOnTabNavigator();
          }
        }

        // Always call defaultHandler()
        defaultHandler();
      }
    })
  }
);