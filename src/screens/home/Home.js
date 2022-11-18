import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToD as wp,
} from 'react-native-responsive-screen';
import HomeNavigator from '../../utils/navigators/HomeNavigator';

const Home = () => {
  return <HomeNavigator />;
};

export default Home;
