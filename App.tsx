import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import 'react-native-url-polyfill/auto';

import moment from 'moment';
import 'moment/locale/pt-br';


import { NativeBaseProvider,  } from 'native-base'
import { NativeBaseTheme } from '@styles/nativeBaseTheme';

import { Routes } from '@screens/routes';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from '@hooks/useAuth';

SplashScreen.preventAutoHideAsync();

export default function App() {
  
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Montserrat_400Regular,
          Montserrat_500Medium,
          Montserrat_600SemiBold,
          Montserrat_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        // Tell the application to render
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
       <AuthProvider>
          <FlashMessage position="top" />
          <NativeBaseProvider theme={NativeBaseTheme}>
            <StatusBar style="light" animated />
            <Routes />
          </NativeBaseProvider> 
       </AuthProvider>
    </View>
  );
}
