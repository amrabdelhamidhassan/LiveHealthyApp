import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './userReducer';
import activitiesReducer from './activitiesReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
const userpersistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }
const activitiespersistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
    userReducer: persistReducer(userpersistConfig, userReducer) ,
    activitiesReducer: persistReducer(activitiespersistConfig, activitiesReducer) ,

     

});

export const store = createStore(rootReducer,{}, applyMiddleware(thunk));
export const persistor = persistStore(store);