import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Mantém a tela de splash visível enquanto inicializa o app
SplashScreen.preventAutoHideAsync();

import styles from './styles';

export default function Splash() {
  const [appIsReady, setAppIsReady] = React.useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simula algum trabalho assíncrono de inicialização
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Diz ao app que está pronto
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Isso diz à tela de splash para se esconder imediatamente
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </View>
  );
}