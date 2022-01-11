import React from 'react';
import { MoralisProvider } from 'react-moralis';
import Moralis from 'moralis/react-native.js';

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import WalletConnectProvider from '@walletconnect/react-native-dapp';

import HomeScreen from './Home';
import GameScreen from './Game';
import LeaderboardScreen from './Leaderboard';
import ProfileScreen from './Profile';
import IntroScreen from './Intro';

import store from 'store';

const screens = {
  GameScreen,
  HomeScreen,
  LeaderboardScreen,
  ProfileScreen,
  IntroScreen,
};

function WrappedComponent(Component) {
  return function inject(props) {
    const serverUrl = 'https://bbybpfzl2xb4.usemoralis.com:2053/server';
    const appId = 'tfEroJuCgFZHiMqLUn8RxrhsObDw0iUgXZxePvhx';
    const environment = 'native';
    const enableViaWalletConnect = () => true;
    // const getMoralis = () => Moralis;
    // Initialize Moralis with AsyncStorage to support react-native storage
    // Moralis.setAsyncStorage(AsyncStorage);
    // Replace the enable function to use the react-native WalletConnect
    // Moralis.enable = enableViaWalletConnect;

    const walletConnectOptions = {
      redirectUrl: Platform.OS === 'web' ? window.location.origin : `scheme://`,
      storageOptions: {
        asyncStorage: AsyncStorage,
      },
      qrcodeModalOptions: {
        mobileLinks: [
          'rainbow',
          'metamask',
          'argent',
          'trust',
          'imtoken',
          'pillar',
        ],
      },
      // Uncomment to show a QR-code to connect a wallet
      // renderQrcodeModal: Qrcode,
    };

    const EnhancedComponent = () => (
      // <WalletConnectProvider {...walletConnectOptions}>
      //   <MoralisProvider
      //     appId={appId}
      //     serverUrl={serverUrl}
      //     getMoralis={getMoralis}
      //     environment={environment}>
          <Provider store={store}>
            <Component {...props} />
          </Provider>
      //   </MoralisProvider>
      // </WalletConnectProvider>
    );

    return <EnhancedComponent />;
  };
}

export function registerScreens() {
  console.log('registerScreens');
  for (let key in screens) {
    Navigation.registerComponent(key, () => WrappedComponent(screens[key]));
  }
  console.log('registerScreens done');
}
