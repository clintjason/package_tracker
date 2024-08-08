import { combineReducers } from 'redux';
import authReducer from './authSlice';
import userReducer from './userSlice';

// Combine the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;