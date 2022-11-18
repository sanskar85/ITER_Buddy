import React from 'react';
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT_MEDIUM, FONT_ORBITRON} from '../../../assets/Font';
import Row from '../../../components/Row';
import {COLORS} from '../../../utils/const';
import {parseSubjectShortCode} from '../../../utils/Helpers/MaterialsHelper';
import {calculateBunk} from '../../../utils/Helpers/AttendanceHelper';

const chartConfig = {
  backgroundGradientFrom: COLORS.WHITE,
  backgroundGradientTo: COLORS.WHITE,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const targets = [60, 70, 75, 80, 90];

const AttendanceCard = ({lastUpdated, subject, present, total}) => {
  const [aim, setAim] = React.useState(75);
  const [cardExpanded, setCardExpanded] = React.useState(false);

  const bunk = React.useMemo(
    () => calculateBunk(present, total, aim),
    [present, total, aim],
  );

  const handleCustomTarget = text => {
    if (isNaN(text)) {
      return;
    }
    let target = Number(text);
    target = target >= 100 ? 99 : target < 0 ? 0 : target;
    setAim(Number(target));
  };

  const handleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setCardExpanded(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.lastUpdated]}>{lastUpdated}</Text>
      <Pressable onPress={handleExpand}>
        <Row>
          <View style={styles.progressContainer}>
            <ProgressChart
              data={[present / total]}
              width={wp(20)}
              height={wp(20)}
              strokeWidth={12}
              radius={wp(7)}
              chartConfig={chartConfig}
              hideLegend={true}
            />
            <Text style={styles.percentageMarker}>
              {Math.round((present / total) * 100, 2)}
            </Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.subject_name} numberOfLines={1}>
              {parseSubjectShortCode(subject)}
            </Text>

            <Row>
              <Text style={styles.data} numberOfLines={1}>
                Attended: {present}
              </Text>
              <Text style={styles.data} numberOfLines={1}>
                Absent: {total - present}
              </Text>
            </Row>

            <Text style={styles.text}>
              {bunk > 0
                ? `You have to attend next ${bunk} classes to achieve ${aim}% attendance`
                : `You can bunk next ${Math.abs(
                    bunk,
                  )} days to maintain ${aim}% attendance`}
            </Text>
          </View>
        </Row>
      </Pressable>

      {cardExpanded ? (
        <Row>
          {targets.map((target, index) => (
            <Pressable
              key={index}
              style={styles.box}
              onPress={() => setAim(target)}>
              <Text style={styles.text}>{target}</Text>
            </Pressable>
          ))}

          <TextInput
            style={[styles.box, styles.expand]}
            placeholder="Target"
            value={aim.toString()}
            onChangeText={handleCustomTarget}
            keyboardType="numeric"
          />
        </Row>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    paddingHorizontal: wp(3),
    paddingVertical: wp(4),
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    shadowColor: COLORS.GRAY_DARK,
    marginVertical: wp(1),
    borderRadius: 7,
  },
  progressContainer: {
    position: 'relative',
  },
  percentageMarker: {
    fontSize: 14,
    position: 'absolute',
    color: COLORS.BLACK,
    width: wp(20),
    height: wp(20),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONT_ORBITRON,
  },
  details: {
    flex: 1,
  },
  subject_name: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontFamily: FONT_MEDIUM,
    textAlign: 'center',
    marginBottom: wp(1),
  },
  data: {
    color: COLORS.GRAY_DARK,
    paddingHorizontal: wp(5),
  },
  text: {
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
    marginTop: wp(1),
  },
  box: {
    marginHorizontal: wp(2),
    marginTop: wp(3),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    backgroundColor: COLORS.OFF_WHITE,
    elevation: 2,
    shadowColor: COLORS.GRAY_DARK,
    borderRadius: 5,
  },
  expand: {
    flex: 1,
    color: COLORS.BLACK,
  },
  lastUpdated: {
    position: 'absolute',
    right: 8,
    top: 3,
  },
});

export default AttendanceCard;
