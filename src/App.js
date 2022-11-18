import React from 'react';
import {Platform, UIManager} from 'react-native';

import MainNavigator from './utils/navigators/MainNavigator';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const App = () => {
  return <MainNavigator />;
};

export default App;
