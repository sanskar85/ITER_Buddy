import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_MEDIUM} from '../../assets/Font';
import {SPLASH} from '../../assets/Images';
import {WINK} from '../../assets/Lottie';
import * as AuthHelper from '../../utils/Helpers/AuthHelper';
import {COLORS, SCREEN} from '../../utils/const';
import {StackActions} from '@react-navigation/native';

const Splash = ({navigation}) => {
  const checkLogin = React.useCallback(async () => {
    const loggedIn = await AuthHelper.isLoggedIn();
    if (loggedIn) {
      AuthHelper.relogin();

      setTimeout(() => {
        navigation.dispatch(StackActions.replace(SCREEN.HOME));
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.dispatch(StackActions.replace(SCREEN.LOGIN));
      }, 2000);
    }
  }, [navigation]);

  React.useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.BLACK} />
      <View style={styles.container}>
        <Image source={SPLASH} style={styles.image} />
        <AnimatedLottieView
          style={styles.wink}
          source={WINK}
          autoPlay
          loop={false}
        />
        <Text style={styles.text}>ITER BUDDY</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    width: wp(100),
    height: hp(100),
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp(50),
    height: wp(50),
    resizeMode: 'contain',
  },
  wink: {
    width: wp(30),
    height: wp(30),
    marginTop: hp(-2),
  },
  text: {
    color: COLORS.WHITE,
    fontSize: wp(5),
    fontFamily: FONT_MEDIUM,
  },
});

export default Splash;
