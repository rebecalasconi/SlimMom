import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';
import loaderReducer from './loader/loaderReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
  },
});

export default store;
