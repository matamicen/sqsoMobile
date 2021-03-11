import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ErrorBoundary from '../Qso/ErrorBoundary';
import { DrawerNavigator } from './DrawerNavigator';
import { AuthNavigator } from './StackNavigator';
import analytics from '@react-native-firebase/analytics';
const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: DrawerNavigator
  },
  {
    initialRouteName: 'Auth'
  }
);

const AppContainer = createAppContainer(SwitchNavigator);
// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
export const AppNavigator = ({ dispatch, nav }) => (
  // <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} />
  // <AppNavigator />
  <ErrorBoundary>
    <AppContainer
      onNavigationStateChange={(prevState, currentState, action) => {
        const currentRouteName = getActiveRouteName(currentState);
        const previousRouteName = getActiveRouteName(prevState);

        if (previousRouteName !== currentRouteName) {
          // The line below uses the @react-native-firebase/analytics tracker
          // change the tracker here to use other Mobile analytics SDK.
          analytics().setCurrentScreen(currentRouteName, currentRouteName);
        }
      }}
    />
  </ErrorBoundary>
);
