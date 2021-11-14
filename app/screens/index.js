import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import HomeScreen from './Home';
import GameScreen from './Game';
import LeaderboardScreen from './Leaderboard';
import ProfileScreen from './Profile';

import store from 'store';

const screens = {
  GameScreen,
  HomeScreen,
  LeaderboardScreen,
  ProfileScreen,
};

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
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
