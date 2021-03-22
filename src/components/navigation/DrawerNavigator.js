import { createDrawerNavigator } from 'react-navigation-drawer';
import I18n from '../../utils/i18n';
import SideMenu from './SideMenu';
import {
  editBioStackNavigator,
  editInfoStackNavigator,
  FieldDaysStackNavigator,
  ExploreUsersStackNavigator,
  MyPostsStackNavigator
} from './StackNavigator';
import { TabNavigator } from './TabNavigator';
const DrawerRouteConfigs = {
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      title: I18n.t('HomeTitle')
    }
  },
  ExploreUsers: {
    screen: ExploreUsersStackNavigator,
    navigationOptions: {
      title: I18n.t('navBar.exploreUsers')
    }
  },
  FieldDays: {
    screen: FieldDaysStackNavigator,
    navigationOptions: {
      title: I18n.t('navBar.lastFieldDays')
    }
  },
  myPosts: {
    screen: MyPostsStackNavigator,
    navigationOptions: {
      title: I18n.t('navBar.myPosts')
    }
  },
  editBio: {
    screen: editBioStackNavigator,
    navigationOptions: {
      title: I18n.t('navBar.editBio')
    }
  },
  editInfo: {
    screen: editInfoStackNavigator,
    navigationOptions: {
      title: I18n.t('navBar.editProfile')
    }
  }
};
const DrawerNavigatorConfig = {
  // contentComponent: (props) => <DrawerNavigator {...props} />,
  // drawerType: 'slide',
  initialRouteName: 'Home',
  drawerPosition: 'right',
  overlayColor: 'transparent',
  contentComponent: SideMenu,
  drawerWidth: 300
};

export const DrawerNavigator = createDrawerNavigator(
  DrawerRouteConfigs,
  DrawerNavigatorConfig
);
