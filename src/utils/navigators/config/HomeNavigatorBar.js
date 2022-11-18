import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {
  ATTENDANCE,
  HOME,
  RESULTS,
  ATTENDANCE_OUTLINED,
  HOME_OUTLINED,
  RESULTS_OUTLINED,
} from '../../../assets/Images';
import {COLORS, TABS} from '../../const';

const MenuItems = [
  {icon: HOME, name: TABS.DASHBOARD, inactiveIcon: HOME_OUTLINED},
  {icon: ATTENDANCE, name: TABS.ATTENDANCE, inactiveIcon: ATTENDANCE_OUTLINED},
  {icon: RESULTS, name: TABS.RESULTS, inactiveIcon: RESULTS_OUTLINED},
];

const HomeNavigatorBar = ({state, navigation}) => {
  return (
    <View style={styles.container}>
      {MenuItems.map((item, index) => {
        const {icon, name, inactiveIcon} = item;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: name,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: name, merge: true});
          }
        };

        return (
          <Pressable key={index} style={styles.item} onPress={onPress}>
            <Image
              source={isFocused ? icon : inactiveIcon}
              style={[styles.icon, isFocused ? styles.active : styles.inactive]}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: COLORS.OFF_WHITE,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(3),
  },
  icon: {
    height: 20,
    width: 20,
  },
  active: {
    opacity: 1,
    marginBottom: 5,
  },
  inactive: {
    opacity: 0.5,
  },
});

export default HomeNavigatorBar;
