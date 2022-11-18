import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  FONT_MEDIUM,
  FONT_ORBITRON,
  FONT_REGULAR,
  FONT_SEMI_BOLD,
} from '../../assets/Font';
import {NAMASTE} from '../../assets/Lottie';
import {
  ATTENDANCE,
  BOY,
  EXAM,
  GIRL,
  HOLIDAY,
  NOTICEBOARD,
  SETTINGS,
} from '../../assets/Images';
import Row from '../../components/Row';
import {COLORS, SCREEN, TABS, TIME_TABLE_URL} from '../../utils/const';
import * as Storage from '../../utils/Helpers/Storage';
import MaterialCard from './components/MaterialCard';
import * as MaterialsHelper from '../../utils/Helpers/MaterialsHelper';
import AttendanceChart from './components/AttendanceChart';
import Card from '../../components/Card';
import {StackActions} from '@react-navigation/native';
import * as Utilities from '../../utils/Utilities';

const Dashboard = ({route, navigation}) => {
  const [dp, setDP] = React.useState(BOY);

  const [materials, setMaterials] = React.useState([]);

  const fetchDP = React.useCallback(async () => {
    const details = await Storage.getObject('profile');
    if (!details || !details.gender) {
      return;
    }

    if (details.gender === 'F' || details.gender === 'f') {
      setDP(GIRL);
    }
  }, []);

  React.useEffect(() => {
    fetchDP();
  }, [fetchDP]);

  const fetchSubjects = React.useCallback(async () => {
    MaterialsHelper.fetchSubjects(_materials => {
      if (!Utilities.sameArrayOfObjects(_materials, materials)) {
        setMaterials(_materials);
      }
    });
  }, [materials]);

  React.useEffect(() => {
    fetchSubjects();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchSubjects();
    });

    return willFocusSubscription;
  }, [navigation, fetchSubjects]);

  const openAttendancePanel = () => {
    navigation.navigate({name: TABS.ATTENDANCE, merge: true});
  };

  const navigate = (screen, props = {}) => {
    navigation.dispatch(StackActions.push(screen, props));
  };
  const openTimeTable = () => {
    Linking.openURL(TIME_TABLE_URL).catch(err =>
      console.error("Couldn't load page", err),
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.OFF_WHITE} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content_container}>
        <Row style={[styles.justifyBetween, styles.app_padding]}>
          <Row>
            <Text style={styles.headerText}>Namaste</Text>
            <AnimatedLottieView
              style={styles.namaste}
              source={NAMASTE}
              autoPlay
              loop
            />
          </Row>
          <Row>
            <Pressable onPress={() => navigate(SCREEN.PROFILE)}>
              <Image source={dp} style={styles.dp} />
            </Pressable>
          </Row>
        </Row>

        <Row
          style={[
            styles.justifyBetween,
            styles.marginTop5,
            styles.app_padding,
          ]}>
          <Text style={styles.subHeading}>Materials</Text>
          <Pressable onPress={() => navigate(SCREEN.SUBJECTS_SELECTOR)}>
            <Image source={SETTINGS} style={styles.settings} />
          </Pressable>
        </Row>
        {materials.length > 0 ? (
          <ScrollView
            horizontal
            style={[
              styles.horizontalScrollView,
              materials.length > 0 ? styles.visible : styles.hidden,
            ]}
            showsHorizontalScrollIndicator={false}>
            {materials.map((material, index) => (
              <MaterialCard
                key={index}
                material={material}
                onPress={() =>
                  navigate(SCREEN.MATERIALS, {
                    subject: material,
                  })
                }
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.text}>No Subject Selected</Text>
        )}

        <Text
          style={[styles.subHeading, styles.marginTop2, styles.app_padding]}>
          Attendance
        </Text>

        <AttendanceChart onPress={openAttendancePanel} />

        <Row style={[styles.spaceEvenly, styles.marginTop5]}>
          <Card
            image={NOTICEBOARD}
            title={'Student Notice'}
            onPress={() => navigate(SCREEN.NOTICE, {type: 'STUDENT'})}
          />
          <Card
            image={EXAM}
            title={'Exam Notice'}
            onPress={() => navigate(SCREEN.NOTICE, {type: 'EXAM'})}
          />
        </Row>
        <Row style={[styles.spaceEvenly, styles.marginTop2]}>
          <Card
            image={ATTENDANCE}
            title={'Time Table'}
            onPress={openTimeTable}
          />
          <Card
            image={HOLIDAY}
            title={'Holidays'}
            onPress={() => navigate(SCREEN.HOLIDAYS)}
          />
        </Row>
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
    paddingTop: 40,
    backgroundColor: COLORS.OFF_WHITE,
  },
  content_container: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  app_padding: {
    paddingHorizontal: wp(5),
  },
  horizontalScrollView: {
    marginTop: hp(2),
    height: hp(20),
    paddingRight: wp(5),
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  subHeading: {
    fontSize: wp(6),
    fontFamily: FONT_SEMI_BOLD,
    color: COLORS.BLACK,
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  settings: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginTop: 7,
  },
  namaste: {
    width: 40,
    height: 40,
    marginTop: -1,
    marginLeft: 1,
  },
  headerText: {
    color: COLORS.BLACK,
    fontSize: wp(6),
    fontFamily: FONT_SEMI_BOLD,
    letterSpacing: 2,
  },
  dp: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  marginTop5: {
    marginTop: hp(5),
  },
  marginTop2: {
    marginTop: hp(2),
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

export default Dashboard;
