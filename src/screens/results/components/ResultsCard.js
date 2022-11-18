import React from 'react';
import {LayoutAnimation, Pressable, StyleSheet, Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Row from '../../../components/Row';
import {COLORS} from '../../../utils/const';
import * as ResultsHelper from '../../../utils/Helpers/ResultsHelper';
import {FONT_MEDIUM, FONT_ORBITRON} from '../../../assets/Font';
import {parseSubjectShortCode} from '../../../utils/Helpers/MaterialsHelper';

const chartConfig = {
  backgroundGradientFrom: COLORS.WHITE,
  backgroundGradientTo: COLORS.WHITE,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const ResultsCard = ({details}) => {
  const [cardExpanded, setCardExpanded] = React.useState(false);
  const [subjectWiseResult, setSubjectWiseResult] = React.useState([]);

  const handleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setCardExpanded(prev => !prev);
  };

  React.useState(() => {
    ResultsHelper.fetchResultsForSemester(
      details.semester,
      setSubjectWiseResult,
    );
  }, [details]);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleExpand}>
        <View style={styles.details}>
          <Text style={styles.semester_name} numberOfLines={1}>
            Semester {details.semester}
          </Text>

          <Row style={styles.justifyBetween}>
            <Text style={styles.data} numberOfLines={1}>
              Credit: {details.credit}
            </Text>
            <Text style={styles.data} numberOfLines={1}>
              SGPA: {details.sgpa}
            </Text>
          </Row>
        </View>
      </Pressable>

      {cardExpanded ? (
        <View style={styles.marginTop5}>
          {subjectWiseResult.map((subject, index) => (
            <Row key={index} style={styles.justifyBetween}>
              <Text
                style={[styles.data, styles.subject_name]}
                numberOfLines={1}>
                {subject.subject}
              </Text>
              <Text style={styles.data} numberOfLines={1}>
                {subject.grade}
              </Text>
            </Row>
          ))}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(95),
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
  justifyBetween: {
    justifyContent: 'space-between',
  },
  semester_name: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontFamily: FONT_ORBITRON,
    textAlign: 'center',
    marginBottom: wp(1),
  },
  data: {
    color: COLORS.GRAY_DARK,
    paddingHorizontal: wp(5),
  },
  marginTop5: {
    marginTop: wp(5),
  },
  subject_name: {
    width: wp(70),
  },
});

export default ResultsCard;
