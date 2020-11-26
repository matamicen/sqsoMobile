import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from '../Profile/Login';
import ErrorBoundary from '../Qso/ErrorBoundary';
import { DrawerNavigator } from './DrawerNavigator';
const SwitchNavigator = createSwitchNavigator(
  {
    App: DrawerNavigator,
    Auth: {
      screen: Login
    }
  },
  {
    initialRouteName: 'Auth'
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export const AppNavigator = ({ dispatch, nav }) => (
  // <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} />
  // <AppNavigator />
  <ErrorBoundary>
    <AppContainer />
  </ErrorBoundary>
);
