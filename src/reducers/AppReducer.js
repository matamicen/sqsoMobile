import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import qsoReducer from './qsoReducer';

const AppReducer = combineReducers({
  nav: NavReducer,
  sqso: qsoReducer  
});

export default AppReducer;