import React from 'react';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import FieldDaysFeed from '../Feed/FieldDaysFeed';
import QRAProfile from '../Feed/Profile';
import QRAProfileBioEdit from '../Feed/Profile/QRAProfileBioEdit';
import QRAProfileInfoEdit from '../Feed/Profile/QRAProfileInfoEdit';
import QSODetail from '../Feed/QSODetail';
import Notifications from '../Notifications/Notification';
import ForgotScreen from '../Profile/ForgotPassword';
import Login from '../Profile/Login';
import SignUpScreen from '../Profile/SignUpForm';
import QslScanQR from '../QslScan/QslScanQR';
import QslScanResult from '../QslScan/QslScanResult';
import QsoLink from '../QslScan/QsoLink';
import CameraScreen from '../Qso/Camera';
import { TabNavigator } from './TabNavigator';
import exploreUsersContainer from '../Feed/follow/exploreUsersContainer';
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
  }
});
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
    screen: QRAProfile,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
  QSODetail: {
    screen: QSODetail,
    navigationOptions: ({ navigation }) => ({
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
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
  QRAProfileInfoEdit: {
    screen: QRAProfileInfoEdit,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
  // FeedHeaderBar: {
  //   screen: FeedHeaderBar,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  initialRouteName: 'Home'
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
const MyPostsRouteConfigs = {
  QRAProfile: {
    screen: QRAProfile,
    params: { screen: 'MYPOSTS' },
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderBackButton onPress={(_) => navigation.push('Home')} />
    })
  },
  qraInfoEdit: {
    screen: QRAProfileInfoEdit,
    params: { screen: 'qraInfoEdit' },
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
  qraBioEdit: {
    screen: QRAProfileBioEdit,
    params: { screen: 'qraBioEdit' },
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};
const ExploreUsersRouteConfigs = {
  ExploreUsers: {
    screen: exploreUsersContainer,

    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  }
};
const FieldDaysRouteConfigs = {
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
  drawerType: 'slide',
  unmountInactiveRoutes: true,
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
export const ExploreUsersStackNavigator = createStackNavigator(
  ExploreUsersRouteConfigs,
  StackNavigatorConfig
);
