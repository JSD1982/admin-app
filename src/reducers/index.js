import { combineReducers } from 'redux';
import authReducer from './authReducer';
import supportReducer from './supportReducer';
import reportReducer from './reportReducer';
import managementReducer from './managementReducer';
import globalReducer from './globalReducer';

const appReducer = combineReducers({
  authReducer,
  supportReducer,
  reportReducer,
  managementReducer,
  globalReducer
  
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer;