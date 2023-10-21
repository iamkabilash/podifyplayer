import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import notificationReducer from './notification';

const reducer = combineReducers({
  authReducer,
  notificationReducer,
});

const store = configureStore({
  reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
