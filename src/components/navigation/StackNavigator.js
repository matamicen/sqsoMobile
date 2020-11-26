import React from 'react';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import FeedHeaderBar from '../Feed/FeedHeaderBar';
import FieldDaysFeed from '../Feed/FieldDaysFeed';
import QRAProfile from '../Feed/Profile';
import QRAProfileBioEdit from '../Feed/Profile/QRAProfileBioEdit';
import QRAProfileInfoEdit from '../Feed/Profile/QRAProfileInfoEdit';
import QSODetail from '../Feed/QSODetail';
import Notifications from '../Notifications/Notification';
import ForgotScreen from '../Profile/ForgotPassword';
import SignUpScreen from '../Profile/SignUpForm';
import QslScanQR from '../QslScan/QslScanQR';
import QslScanResult from '../QslScan/QslScanResult';
import QsoLink from '../QslScan/QsoLink';
import CameraScreen from '../Qso/Camera';
import { TabNavigator } from './TabNavigator';
export const MainNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },

  CameraScreen2: {
    screen: CameraScreen,
    navigationOptions: {
      header: null
    }
  },

  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     header: null

  //   },

  //  },

  QslScanQR: {
    screen: QslScanQR,
    navigationOptions: {
      header: null
    }
  },

  QsoLink: {
    screen: QsoLink,
    navigationOptions: {
      header: null
    }
  },

  QslScanResult: {
    screen: QslScanResult,
    navigationOptions: {
      header: null
    }
  },

  // BePremium: {
  //   screen: BePremium,
  //   navigationOptions: {
  //     header: null

  //   },

  //   },

  Notifications: {
    screen: Notifications,
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

  //        SignUpScreen: {
  // screen: SignUpScreen,
  // navigationOptions: {
  //   header: null

  // },

  // },

  ForgotScreen: {
    screen: ForgotScreen,
    navigationOptions: {
      header: null
    }
  },
  QRAProfile: {
    screen: QRAProfile
    // navigationOptions: {
    //   header: null
    // }
  },
  QSODetail: {
    screen: QSODetail
    // navigationOptions: {
    //   header: null
    // }
  },
  QRAProfileBioEdit: {
    screen: QRAProfileBioEdit
  },
  QRAProfileInfoEdit: {
    screen: QRAProfileInfoEdit
  },
  FeedHeaderBar: {
    screen: FeedHeaderBar,
    navigationOptions: {
      header: null
    }
  },
  initialRouteName: 'Home'
});
const editBioRouteConfigs = {
  qraBioEdit: {
    screen: QRAProfileBioEdit,
    // params: { tab: this.props.currentQRA },
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
    // params: { tab: this.props.currentQRA },
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};
const MyPostsRouteConfigs = {
  QRAProfile: {
    screen: QRAProfile,
    // params: { qra: this.props.currentQRA },
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
  qraInfoEdit: {
    screen: QRAProfileInfoEdit,
    // params: { tab: this.props.currentQRA },
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
  qraBioEdit: {
    screen: QRAProfileBioEdit,
    // params: { tab: this.props.currentQRA },
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};
const FieldDaysRouteConfigs = {
  // Home: {
  //   screen: TabNavigator,
  //   navigationOptions: {
  //     title: I18n.t('navBar.lastFieldDays')
  //   }
  // },
  FieldDaysFeed: {
    screen: FieldDaysFeed,

    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};
const StackNavigatorConfig = {
  mode: 'modal',
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
export const MyPostsStackNavigator = createStackNavigator(
  MyPostsRouteConfigs,
  StackNavigatorConfig
);
export const FieldDaysStackNavigator = createStackNavigator(
  FieldDaysRouteConfigs,
  StackNavigatorConfig
);
