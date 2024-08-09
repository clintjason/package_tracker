import { combineReducers } from 'redux';
import userReducer from './userSlice';

// Combine the reducers
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;