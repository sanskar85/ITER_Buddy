import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT_REGULAR} from '../../../assets/Font';
import {COLORS} from '../../../utils/const';

const DEFAULT_PROPS = {
  keyboardType: 'default',
  placeholder: '',
  isPassword: false,
  containerStyles: {},
  inputStyles: {},
  onChangeText: () => {},
  error: false,
  disabled: false,
};

const InputField = (props = DEFAULT_PROPS) => {
  return (
    <View
      style={[
        styles.container,
        props.containerStyles,
        props.error ? styles.error : styles.no_error,
      ]}>
      <TextInput
        style={[styles.input, props.inputStyles]}
        placeholder={props.placeholder}
        placeholderTextColor={COLORS.GRAY}
        secureTextEntry={props.isPassword}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        editable={!props.disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
  },
  input: {
    fontFamily: FONT_REGULAR,
    paddingHorizontal: wp(2),
    color: COLORS.WHITE,
  },
  error: {
    borderColor: COLORS.RED,
    backgroundColor: COLORS.RED_300,
  },
  no_error: {
    borderColor: COLORS.GRAY_DARK,
    backgroundColor: COLORS.BLACK_70,
  },
});

export default InputField;
