import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT_REGULAR} from '../../../assets/Font';
import Row from '../../../components/Row';
import {COLORS} from '../../../utils/const';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Subject = ({subject, isSelected, onChange}) => {
  return (
    <Pressable
      onPress={() => {
        onChange(!isSelected);
      }}
      style={styles.container}>
      <Row style={styles.justifyBetwwen}>
        <Text style={styles.subject_name} numberOfLines={1}>
          {subject.name}
        </Text>
        <BouncyCheckbox
          size={wp(5)}
          fillColor={COLORS.BLACK}
          unfillColor={COLORS.WHITE}
          isChecked={isSelected}
          onPress={isChecked => onChange(isChecked)}
          disableBuiltInState={true}
        />
      </Row>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),

    paddingHorizontal: wp(3),
    paddingVertical: wp(4),
    elevation: 5,
    shadowColor: COLORS.GRAY_DARK,
    borderRadius: 7,
    marginVertical: wp(2),
    backgroundColor: COLORS.WHITE,
  },
  justifyBetwwen: {
    justifyContent: 'space-between',
  },
  subject_name: {
    width: wp(78),
    color: COLORS.BLACK,
    fontFamily: FONT_REGULAR,
    fontSize: wp(3.5),
  },
});

export default Subject;
