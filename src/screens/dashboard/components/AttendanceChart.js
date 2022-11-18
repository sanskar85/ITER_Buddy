import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../utils/const';
import {ProgressChart} from 'react-native-chart-kit';
import * as AttendanceHelper from '../../../utils/Helpers/AttendanceHelper';
import {FONT_MEDIUM, FONT_ORBITRON} from '../../../assets/Font';

const chartConfig = {
  backgroundGradientFrom: COLORS.WHITE,
  backgroundGradientTo: COLORS.WHITE,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const AttendanceChart = ({onPress}) => {
  const [attendance, setAttendance] = React.useState({labels: [], data: []});

  React.useEffect(() => {
    AttendanceHelper.fetchAttendance(_ =>
      setAttendance(AttendanceHelper.parseAttendance(_)),
    );
  }, []);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {attendance.labels.length > 0 ? (
        <ProgressChart
          data={attendance}
          width={wp(80)}
          height={wp(50)}
          strokeWidth={14 - attendance.data.length}
          radius={wp(7)}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      ) : (
        <Text style={styles.text}>Attendance data not available</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    shadowColor: COLORS.GRAY_DARK,
    marginTop: hp(1),
    paddingVertical: hp(1),
    borderRadius: 7,
    marginHorizontal: wp(5),
  },
  text: {
    color: COLORS.GRAY_DARK,
    padding: 15,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONT_ORBITRON,
  },
});

export default AttendanceChart;
