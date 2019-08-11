import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../components/MainNavigator';


 const router = AppNavigator.router;
// const mainNavAction = router.getActionForPathAndParams('AppNavigator2');
// const initialNavState = router.getStateForAction(mainNavAction);

// const NavReducer = (state = initialNavState, action) => {
    const NavReducer = (state, action) => {
    console.log("ActionType: " + action.type + " y STRINGIFY:" + JSON.stringify(state) );
    
   // console.log("STRINGIFY:" + JSON.stringify(state));
    return router.getStateForAction(action, state);
};

export default NavReducer;