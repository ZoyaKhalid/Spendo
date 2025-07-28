import React from 'react';
import { AppProvider } from './context/AppContext';
import AppNavigator from './screens/AppNavigator';

export default function Index() {

  // const Stack = createNativeStackNavigator();

  return (
    <AppProvider>
        <AppNavigator />
    </AppProvider>
  );
}
