/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import FieldDaysFeed from '../Feed/FieldDaysFeed';
import QRAProfile from '../Feed/Profile';
import QRAProfileBioEdit from '../Feed/Profile/QRAProfileBioEdit';
import QRAProfileInfoEdit from '../Feed/Profile/QRAProfileInfoEdit';
import I18n from '../../utils/i18n';
import Login from '../Profile/Login';
import SignUpScreen from '../Profile/SignUpForm';
import ForgotScreen from '../Profile/ForgotPassword';
import QSODetail from '../Feed/QSODetail';
import Notifications from '../Notifications/Notification';
import { TabNavigator } from './TabNavigator';

import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import exploreUsersContainer from '../Feed/follow/exploreUsersContainer';
import Settings from '../Feed/Settings';
export const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null
    }
  },
  ForgotScreen: {
    screen: ForgotScreen,
    navigationOptions: {
      header: null
    }
  }
});

const editBioRouteConfigs = {
  qraBioEdit: {
    screen: QRAProfileBioEdit,
    params: { qra: null },
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};
const editInfoRouteConfigs = {
  qraInfoEdit: {
    screen: QRAProfileInfoEdit,
    params: { qra: null },
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};
const editSettingsRouteConfigs = {
  settingsEdit: {
    screen: Settings,
    params: { qra: null },
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('navBar.settings'),
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};
const MyPostsRouteConfigs = {
  QRAProfile: {
    screen: QRAProfile,
    params: { screen: 'MYPOSTS' },
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('navBar.myPosts'),
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate('Home')} />
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
  qraInfoEdit: {
    screen: QRAProfileInfoEdit,
    params: { screen: 'qraInfoEdit' },
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('navBar.editProfile'),
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
  qraBioEdit: {
    screen: QRAProfileBioEdit,
    params: { screen: 'qraBioEdit' },
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('navBar.editBio'),
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
  settingsEdit: {
    screen: Settings,
    params: { screen: 'settingsEdit' },
    navigationOptions: ({ navigation }) => ({
      title: 'SettingsStack',
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
};
const ExploreUsersRouteConfigs = {
  ExploreUsers: {
    screen: exploreUsersContainer,
    path: 'explore',
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('navBar.exploreUsers'),
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};

const FieldDaysRouteConfigs = {
  FieldDaysFeed: {
    screen: FieldDaysFeed,
    path: 'activities',
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('navBar.actCarouselTitle'),
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};
const StackNavigatorConfig = {
  drawerType: 'slide',
  unmountInactiveRoutes: false,
  headerMode: 'float',
  headerTransitionPreset: 'face-in-place'
};
export const editBioStackNavigator = createStackNavigator(
  editBioRouteConfigs,
  StackNavigatorConfig
);
export const editInfoStackNavigator = createStackNavigator(
  editInfoRouteConfigs,
  StackNavigatorConfig
);
export const editSettingsStackNavigator = createStackNavigator(
  editSettingsRouteConfigs,
  StackNavigatorConfig
);
export const NotificationStackNavigator = createStackNavigator({
  Notifications: {
    screen: Notifications,
    path: 'notifications',
    navigationOptions: {
      header: null
    }
  }
});
export const ProfileStackNavigator = createStackNavigator({
  QRAProfile: {
    screen: QRAProfile,
    path: 'profile/:qra',
    // params: { screen: 'MYPOSTS' },
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('navBar.viewProfile'),
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate('Home')} />
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
  }
});
export const PostStackNavigator = createStackNavigator({
  QSODetail: {
    screen: QSODetail,
    path: 'qso/:QSO_GUID',
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('viewPost'),
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
    // navigationOptions: {
    //   header: null
    // }
  }
});
export const MyPostsStackNavigator = createStackNavigator(
  MyPostsRouteConfigs,
  StackNavigatorConfig
);
export const FieldDaysStackNavigator = createStackNavigator(
  FieldDaysRouteConfigs,
  StackNavigatorConfig
);
export const ExploreUsersStackNavigator = createStackNavigator(
  ExploreUsersRouteConfigs,
  StackNavigatorConfig
);
