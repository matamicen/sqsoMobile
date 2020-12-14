import { createDrawerNavigator } from 'react-navigation';
import I18n from '../../utils/i18n';
import SideMenu from './SideMenu';
import {
  editBioStackNavigator,
  editInfoStackNavigator,
  FieldDaysStackNavigator,
  MainNavigator,
  MyPostsStackNavigator
} from './StackNavigator';
const DrawerRouteConfigs = {
  Home: {
    screen: MainNavigator,
    navigationOptions: {
      title: I18n.t('HomeTitle')
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
