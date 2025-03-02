import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';

// Un reducer temporar gol — doar pentru ca store-ul să funcționeze
const rootReducer = combineReducers({
  placeholder: (state = {}) => state,
});

const store = configureStore({
  reducer: rootReducer,
});

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
