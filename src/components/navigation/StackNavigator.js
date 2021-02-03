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
import ProfileMenu from '../Feed/Profile/ProfileMenu';
import {
  View,
  StyleSheet,
  Text,
  findNodeHandle,
  NativeModules
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  MenuProvider,
  renderers
} from 'react-native-popup-menu';
const { SlideInMenu } = renderers;
const UIManager = NativeModules.UIManager;
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
      headerLeft: (
        <HeaderBackButton onPress={(_) => navigation.navigate('Home')} />
      )
    })
  },
  ExploreUsers: {
    screen: exploreUsersContainer,

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
const styles = StyleSheet.create({
  trigger: {
    padding: 5,
    margin: 5
  },
  text: {
    fontSize: 30,
    backgroundColor: 'gray'
  },
  slideInOption: {
    padding: 5
  }
});
