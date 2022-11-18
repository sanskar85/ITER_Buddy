import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT_MEDIUM} from '../assets/Font';
import {LOADING_DARK} from '../assets/Lottie';
import {COLORS} from '../utils/const';

const DEFAULT_PROPS = {
  label: '',
  onPress: () => {},
  isLoading: false,
  style: {},
  lableStyle: {},
};

const Button = (props = DEFAULT_PROPS) => {
  return (
    <Pressable style={[styles.button, props.style]} onPress={props.onPress}>
      <View
        style={[
          styles.center,
          props.isLoading ? styles.visible : styles.hidden,
        ]}>
        <AnimatedLottieView
          style={styles.loading}
          source={LOADING_DARK}
          autoPlay
          loop={true}
        />
      </View>
      <Text
        style={[
          styles.text,
          props.lableStyle,
          !props.isLoading ? styles.visible : styles.hidden,
        ]}>
        {props.label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    paddingVertical: wp(3),
    width: wp(90),
    height: 45,
  },
  text: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontFamily: FONT_MEDIUM,
    fontSize: wp(4),
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 45,
    height: 45,
    marginTop: -5,
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
});

export default Button;
