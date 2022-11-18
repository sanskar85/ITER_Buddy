import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONT_REGULAR} from '../assets/Font';
import {COLORS} from '../utils/const';

const Card = ({onPress = () => {}, image, title}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(35),
    paddingVertical: wp(2),
    backgroundColor: COLORS.WHITE,
    borderRadius: 7,
    elevation: 5,
    shadowColor: COLORS.GRAY_DARK,
  },
  image: {
    width: wp(25),
    height: wp(25),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: wp(4),
    fontFamily: FONT_REGULAR,
    color: COLORS.BLACK,
    alignSelf: 'center',
    marginTop: hp(1),
  },
});

export default Card;
