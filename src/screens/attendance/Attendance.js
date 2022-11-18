import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  FONT_MEDIUM,
  FONT_ORBITRON,
  FONT_ORBITRON_SEMIBOLD,
} from '../../assets/Font';
import {COLORS} from '../../utils/const';
import AttendanceCard from './component/AttendanceCard';
import * as AttendanceHelper from '../../utils/Helpers/AttendanceHelper';

const Attendance = () => {
  const [attendance, setAttendance] = React.useState([]);

  React.useEffect(() => {
    AttendanceHelper.getLocalAttendance(setAttendance);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.OFF_WHITE} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content_container}>
        <Text style={styles.header}>Bunk Calculator</Text>
        {attendance.length > 0 ? (
          attendance.map((subject, index) => (
            <AttendanceCard
              key={index}
              subject={subject.subject}
              total={subject.total}
              present={subject.attended}
              lastUpdated={subject.last_update}
            />
          ))
        ) : (
          <Text style={styles.text}>No Attendance Data Found</Text>
        )}
      </ScrollView>
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
    paddingTop: 20,
    backgroundColor: COLORS.OFF_WHITE,
  },
  content_container: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  header: {
    fontSize: wp(5),
    fontFamily: FONT_ORBITRON_SEMIBOLD,
    color: COLORS.BLACK,
    marginBottom: wp(8),
    textAlign: 'center',
  },
  text: {
    color: COLORS.GRAY_DARK,
    padding: 15,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONT_ORBITRON,
    elevation: 5,
    shadowColor: COLORS.GRAY_DARK,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: wp(5),
    marginTop: hp(2),
    borderRadius: 7,
  },
});

export default Attendance;
