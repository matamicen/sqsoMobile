import { createDrawerNavigator } from 'react-navigation';
import I18n from '../../utils/i18n';
import { HomeNavigator } from './StackNavigator';
const DrawerRouteConfigs = {
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: I18n.t('HomeTitle')
    }
  }
};
const DrawerNavigatorConfig = {
  // contentComponent: (props) => <DrawerNavigator {...props} />,
  // drawerType: 'slide',
  initialRouteName: 'Home',
  drawerPosition: 'right',
  overlayColor: 'transparent'
  // mode: 'modal'
};

export const DrawerNavigator = createDrawerNavigator(
  DrawerRouteConfigs,
  DrawerNavigatorConfig
);
