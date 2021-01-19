import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ErrorBoundary from '../Qso/ErrorBoundary';
import { DrawerNavigator } from './DrawerNavigator';
import { AuthNavigator } from './StackNavigator';
const SwitchNavigator = createSwitchNavigator(
  {
    App: DrawerNavigator,
    Auth: AuthNavigator
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
