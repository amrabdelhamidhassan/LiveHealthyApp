import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './store/store';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigation/mainStack';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
            <MainStack/>
        </NavigationContainer>
        </PersistGate>
    </Provider>
  );
}


