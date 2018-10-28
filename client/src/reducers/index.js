import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  item: itemReducer,
  user: userReducer,
  alert: alertReducer
});