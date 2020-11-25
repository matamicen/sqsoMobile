import { createStackNavigator } from 'react-navigation';
import FeedHeaderBar from '../Feed/FeedHeaderBar';
import QRAProfile from '../Feed/Profile';
import QRAProfileBioEdit from '../Feed/Profile/QRAProfileBioEdit';
import QRAProfileInfoEdit from '../Feed/Profile/QRAProfileInfoEdit';
import QSODetail from '../Feed/QSODetail';
import Notifications from '../Notifications/Notification';
import ForgotScreen from '../Profile/ForgotPassword';
//import SignOutScreen from './SignOutScreen';
import ProfileScreen from '../Profile/InitialScreen';
import SignUpScreen from '../Profile/SignUpForm';
import QslScanQR from '../QslScan/QslScanQR';
import QslScanResult from '../QslScan/QslScanResult';
import QsoLink from '../QslScan/QsoLink';
import CameraScreen from '../Qso/Camera';
// import Home from './Qso/Home';
import QsoScreen from '../Qso/QsoScreen';
import UtilScreen from '../Util/Util';
import { TabNavigator } from './TabNavigator';
export const HomeNavigator = createStackNavigator({
  //   Root: {
  //     screen: Login,
  //     navigationOptions: {
  //       header: null
  //     }
  //   },
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  FeedHeaderBar: {
    screen: FeedHeaderBar,
    navigationOptions: {
      header: null
    }
  },
  //   AppNavigator2: {
  //     screen: AppNavigator2,
  //     navigationOptions: {
  //       header: null
  //     }
  //   },

  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     header: null

  //   },

  //  },

  // BePremium: {
  //   screen: BePremium,
  //   navigationOptions: {
  //     header: null

  //   },

  //   },

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

  initialRouteName: 'Login'
});

export const PostNavigator = createStackNavigator({
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
});
export const NotifNavigator = createStackNavigator({
  Notifications: {
    screen: Notifications,
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
  }
});
export const ToolsNavigator = createStackNavigator({
  UtilScreen: {
    screen: UtilScreen,
    navigationOptions: {
      header: null
    }
  },
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
  }
});
export const ProfileNavigator = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  }
});
