import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './app/Components/AppNavigator';
import AuthProvider from './app/Context/AuthProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from './app/Translation/i18n';
import Toast from 'react-native-toast-message';
import DataProvider from './app/Context/DataProvider';
import { Provider } from 'react-redux';
import { persistor, store } from './app/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react'

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar style="auto" backgroundColor='black' />
          <AuthProvider>
            <DataProvider>
              <I18nextProvider i18n={i18n}>
                <AppNavigator />
                <Toast ref={(ref) => Toast.setRef(ref)} />
              </I18nextProvider>
            </DataProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}


