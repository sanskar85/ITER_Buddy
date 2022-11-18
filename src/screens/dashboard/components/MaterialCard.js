import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT_ORBITRON_SEMIBOLD, FONT_REGULAR} from '../../../assets/Font';
import {COLORS} from '../../../utils/const';
import {
  generateDarkColorHex,
  generateLightColorHex,
} from '../../../utils/Utilities';

const MaterialCard = ({material, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.codeWrapper,
          {backgroundColor: generateLightColorHex()},
        ]}>
        <Text style={styles.code}>{material.short}</Text>
      </View>
      <Text
        style={[styles.text, {color: generateDarkColorHex()}]}
        numberOfLines={1}>
        {material.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: wp(35),
    width: wp(33),
    backgroundColor: COLORS.WHITE,
    marginHorizontal: wp(2),
    borderRadius: 7,
    alignItems: 'center',
    paddingVertical: wp(2),
    elevation: 5,
    shadowColor: COLORS.GRAY_DARK,
  },
  codeWrapper: {
    height: wp(25),
    width: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(12.5),
  },
  code: {
    fontSize: wp(6),
    letterSpacing: 1,
    fontFamily: FONT_ORBITRON_SEMIBOLD,
    color: COLORS.BLACK,
  },
  text: {
    letterSpacing: 1,
    fontFamily: FONT_REGULAR,
    fontWeight: 'bold',
    width: wp(30),
    paddingHorizontal: wp(1.5),
    marginTop: wp(1),
    textTransform: 'capitalize',
  },
});

export default MaterialCard;
