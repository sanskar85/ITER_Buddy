import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {COLORS} from '../utils/const';

const NoticeCard = ({title, onOpenNoticeClicked}) => {
  return (
    <Pressable style={styles.container} onPress={onOpenNoticeClicked}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    paddingHorizontal: wp(3),
    paddingVertical: wp(2.5),
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    shadowColor: COLORS.GRAY_DARK,
    marginVertical: wp(1),
    borderRadius: 7,
  },
  title: {
    fontSize: wp(3.5),
    color: COLORS.BLACK,
  },
});

export default NoticeCard;
