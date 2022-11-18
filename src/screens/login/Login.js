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
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONT_MEDIUM} from '../../assets/Font';
import {LOGIN} from '../../assets/Images';
import {WINK} from '../../assets/Lottie';
import {COLORS, SCREEN} from '../../utils/const';
import Button from '../../components/Button';
import InputField from './components/InputField';
import {loginDetailsReducer, LOGIN_DETAIL} from './components/reducers';
import * as AuthHelper from '../../utils/Helpers/AuthHelper';
import {StackActions} from '@react-navigation/native';

const Login = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [state, onStateUpdate] = React.useReducer(loginDetailsReducer, {});

  const handleLogin = async () => {
    if (loading) {
      return;
    }
    if (!state[LOGIN_DETAIL.USERNAME]) {
      onStateUpdate({type: LOGIN_DETAIL.USERNAME_ERROR});
      return;
    } else if (!state[LOGIN_DETAIL.PASSWORD]) {
      onStateUpdate({type: LOGIN_DETAIL.PASSWORD_ERROR});
      return;
    } else {
      onStateUpdate({type: LOGIN_DETAIL.VALID});
    }

    setLoading(true);

    const success = await AuthHelper.login(
      state[LOGIN_DETAIL.USERNAME],
      state[LOGIN_DETAIL.PASSWORD],
    );

    if (success) {
      return navigation.dispatch(StackActions.replace(SCREEN.HOME));
    } else {
      onStateUpdate({type: LOGIN_DETAIL.INVALID_CREDENTIALS, payload: true});
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.BLACK} />
      <View style={styles.container}>
        <Text style={styles.text}>Hola</Text>
        <AnimatedLottieView
          style={styles.wink}
          source={WINK}
          autoPlay
          loop={false}
        />
        <Image source={LOGIN} style={styles.image} />
        <InputField
          placeholder="Registration No."
          keyboardType="number-pad"
          disabled={loading}
          containerStyles={[styles.marginTop5, styles.inputContainer]}
          error={state[LOGIN_DETAIL.USERNAME_ERROR]}
          onChangeText={text =>
            onStateUpdate({type: LOGIN_DETAIL.USERNAME, payload: text})
          }
        />
        <InputField
          placeholder="Password"
          isPassword={true}
          disabled={loading}
          containerStyles={styles.inputContainer}
          error={state[LOGIN_DETAIL.PASSWORD_ERROR]}
          onChangeText={text =>
            onStateUpdate({type: LOGIN_DETAIL.PASSWORD, payload: text})
          }
        />

        <View style={styles.buttonContainer}>
          <Button label="SIGN IN" onPress={handleLogin} isLoading={loading} />
        </View>
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
    paddingVertical: hp(3),
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
  },
  image: {
    width: wp(60),
    height: wp(60),
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
  marginTop5: {
    marginTop: wp(5),
  },
  inputContainer: {
    marginVertical: wp(2),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp(3),
  },
});

export default Login;
