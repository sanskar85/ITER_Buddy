import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {FONT_ORBITRON_SEMIBOLD} from '../../assets/Font';
import {COLORS} from '../../utils/const';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LineChart} from 'react-native-chart-kit';
import * as ResultsHelper from '../../utils/Helpers/ResultsHelper';
import AnimatedLottieView from 'lottie-react-native';
import {LOADING_DARK} from '../../assets/Lottie';
import ResultsCard from './components/ResultsCard';

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const Results = () => {
  const [results, setResults] = React.useState([]);

  const cgpa = React.useMemo(() => {
    const sgpa_sum = results.reduce(
      (partialSum, element) => partialSum + element.sgpa,
      0,
    );

    let _cgpa = sgpa_sum;
    if (_cgpa > 0) {
      _cgpa = _cgpa / results.length;
    }

    return _cgpa.toFixed(2);
  }, [results]);

  const lineChartData = React.useMemo(() => {
    const labels = results.map(result => result.semester);
    const data = results.map(result => result.sgpa);
    return {
      labels,
      datasets: [
        {
          data,
        },
      ],
    };
  }, [results]);

  React.useEffect(() => {
    ResultsHelper.fetchResults(setResults);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.OFF_WHITE} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content_container}>
        <Text style={styles.header}>Report</Text>

        {results.length > 0 ? (
          <LineChart
            data={lineChartData}
            width={wp(95)} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        ) : (
          <AnimatedLottieView
            style={[styles.loading, true ? styles.visible : styles.hidden]}
            source={LOADING_DARK}
            autoPlay
            loop={true}
          />
        )}

        <Text style={styles.header}>CGPA :- {cgpa}</Text>

        {results.map((result, index) => (
          <ResultsCard key={index} details={result} />
        ))}
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
    paddingHorizontal: wp(2.5),
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
    marginBottom: wp(3),
    textAlign: 'center',
  },
  loading: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Results;
