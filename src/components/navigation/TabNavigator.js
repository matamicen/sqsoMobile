/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Platform, View, Text, Image } from 'react-native';
import CameraScreen from '../Qso/Camera';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import exploreUsersContainer from '../Feed/follow/exploreUsersContainer';
import I18n from '../../utils/i18n';
import ProfileMenu from '../Feed/Profile/ProfileMenu';
// import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import Home from '../Feed/Home';
import Notifications from '../Notifications/Notification';
// import { HomeStackNavigator } from './StackNavigator';
import ProfileScreen from '../Profile/InitialScreen';
import React from 'react';
import { Icon } from 'react-native-elements';
import QsoScreen from '../Qso/QsoScreen';
import QRAProfile from '../Feed/Profile';
import QRAProfileBioEdit from '../Feed/Profile/QRAProfileBioEdit';
import QRAProfileInfoEdit from '../Feed/Profile/QRAProfileInfoEdit';
import QSODetail from '../Feed/QSODetail';
import UnreadCounter from '../Notifications/UnreadCounter';
import FieldDaysFeed from '../Feed/FieldDaysFeed';

// const middleware = createReactNavigationReduxMiddleware(
//   'root',
//   (state) => state.nav
// );
//  const addListener = createReduxBoundAddListener("root");
// end for react-navigation 1.0.0-beta.30

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
export const PostStackNavigator = createStackNavigator(
  {
    QsoScreen: {
      screen: QsoScreen,
      navigationOptions: {
        header: null
      }
    },
    CameraScreen2: {
      screen: CameraScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      // get the name of the route
      let tabBarVisible;
      const { routeName } = navigation.state.routes[navigation.state.index];

      if (routeName === 'QsoScreen') {
        tabBarVisible = true;
      } else {
        tabBarVisible = false;
      }
      return {
        tabBarVisible // this now varies based on screen
        // tabBarLabel: 'Search' // this is the same for all screens
      };
    }
  }
);
export const NotificationStackNavigator = createStackNavigator({
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      header: null
    }
  }
});
export const ProfileStackNavigator = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  }
});
export const FieldDaysStackNavigator = createStackNavigator({
  Activities: {
    screen: FieldDaysFeed,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('navBar.actCarouselTitle')
    })
  }
});
export const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    QRAProfile: {
      screen: QRAProfile,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('navBar.viewProfile'),
        headerLeft: (
          <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
        ),
        headerRight: (
          <View style={{ padding: 9 }}>
            <ProfileMenu />
          </View>
        )
      })
    },
    QSODetail: {
      screen: QSODetail,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('viewPost'),
        headerLeft: (
          <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
        )
      })
      // navigationOptions: {
      //   header: null
      // }
    },
    QRAProfileBioEdit: {
      screen: QRAProfileBioEdit,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('navBar.editBio'),
        headerLeft: (
          <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
        ),
        headerRight: (
          <View style={{ padding: 15 }}>
            <Icon
              size={30}
              name="ellipsis-v"
              type="font-awesome"
              onPress={() => navigation.state.params.openMenu()}
            />
          </View>
        )
      })
    },
    QRAProfileInfoEdit: {
      screen: QRAProfileInfoEdit,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('navBar.editProfile'),
        headerLeft: (
          <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
        )
      })
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      // get the name of the route
      let tabBarVisible;
      const { routeName } = navigation.state.routes[navigation.state.index];

      if (routeName === 'Home') {
        tabBarVisible = true;
      } else {
        tabBarVisible = false;
      }
      return {
        tabBarVisible // this now varies based on screen
        // tabBarLabel: 'Search' // this is the same for all screens
      };
    }
  }
);
export const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStackNavigator,
    QsoScreen: PostStackNavigator,
    Activities: FieldDaysStackNavigator,
    Notifications: NotificationStackNavigator,
    ProfileScreen: ProfileStackNavigator
  },
  {
    // initialRouteName: 'QsoScreen',
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: true, // fixes a bug in react navigation
    lazy: true, // fixes a bug in react navigation
    // navigationOptions: {
    //   tabBarOnPress: ({ navigation, defaultHandler }) => {
    //     // Called when tab is press
    //     console.log('click');
    //   }

    tabBarOptions: {
      style: {
        backgroundColor: 'white',
        //   height: (Platform.OS==='ios') ? 60 : 60
        // funciona bien porque si en ANDROID sale con 60 y esta bien.
        height: Platform.OS === 'ios' && isIphoneXorAbove() ? 35 : 60
      },
      showLabel: false,
      activeTintColor: '#243665',
      inactiveTintColor: 'gray',
      showIcon: true,
      // iconStyle: {
      //   width: 31,
      //   height: 31
      // },
      tabStyle: {
        marginTop: 10,
        height: 30,
        paddingRight: 20,
        paddingLeft: 20
      }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        switch (routeName) {
          case 'Home':
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Image
                  style={{
                    width: 28,
                    height: 28,
                    tintColor,
                    marginTop: Platform.OS === 'ios' ? 4 : 8
                  }}
                  source={require('../../images/home4.png')}
                />

                <Text style={{ fontSize: 9, marginTop: 3, marginLeft: 5 }}>
                  {I18n.t('HomeTitle')}
                </Text>
              </View>
            );
          case 'QsoScreen':
            return (
              <View
                style={{
                  flex: 1,
                  width: 78,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Image
                  style={{
                    width: 28,
                    height: 28,
                    tintColor,
                    marginLeft: I18n.locale.substring(0, 2) === 'es' ? 0 : 0,
                    marginTop: Platform.OS === 'ios' ? 4 : 8
                  }}
                  source={require('../../images/MicrofonoGris.png')}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 9, marginTop: 3, marginLeft: 5 }}>
                  {I18n.t('QsoScrTitle')}
                </Text>
              </View>
            );
          case 'Notifications':
            return (
              <View
                style={{
                  flex: 1,
                  width: 78,

                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Image
                  style={{
                    width: 28,
                    height: 28,
                    tintColor,
                    marginTop: Platform.OS === 'ios' ? 4 : 8
                  }}
                  source={require('../../images/notifications.png')}
                />
                <Text style={{ fontSize: 8, marginTop: 3, marginLeft: 5 }}>
                  {I18n.t('NotificationTitle1')}
                </Text>

                <UnreadCounter />
              </View>
            );
          case 'Activities':
            return (
              <View
                style={{
                  flex: 1,
                  width: 80,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Image
                  style={{
                    width: 28,
                    height: 28,
                    tintColor,
                    marginTop: Platform.OS === 'ios' ? 4 : 8
                  }}
                  source={require('../../images/agenda1.png')}
                />
                <Text style={{ fontSize: 8.5, marginTop: 3, marginLeft: 0 }}>
                  {I18n.t('ActivitiesTitle')}
                </Text>
              </View>
            );

          case 'ProfileScreen':
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Image
                  style={{
                    width: 31,
                    height: 31,
                    tintColor,
                    marginTop: Platform.OS === 'ios' ? 4 : 4
                  }}
                  source={require('../../images/profile1.png')}
                />
                <Text style={{ fontSize: 9, marginTop: 3, marginLeft: 0 }}>
                  {I18n.t('InitialScreenProfile')}
                </Text>
              </View>
            );
        }
      },
      tabBarOnPress: ({ defaultHandler }) => {
        if (navigation && navigation.isFocused()) {
          if (navigation.state.key === 'Home') {
            // console.log(navigation.state.params);
            // navigation.state.params.tapOnTabNavigator();
          }
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
      // tabBarOnPress: ({ defaultHandler }) => {
      //   if (navigation) {
      //     if (navigation.state.key === 'Home') {
      //       navigation.state.params.tabBarOnPress();
      //     }
      //     const screenFunctions = getScreenRegisteredFunctions(
      //       navigation.state
      //     );

      //     if (
      //       screenFunctions &&
      //       typeof screenFunctions.tapOnTabNavigator === 'function'
      //     ) {
      //       screenFunctions.tapOnTabNavigator();
      //     }
      //   }

      //   // Always call defaultHandler()
      //   defaultHandler();
      // }
    })
  }
);
