import {StackActions} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_MEDIUM, FONT_ORBITRON_SEMIBOLD} from '../../assets/Font';
import {BACK} from '../../assets/Images';
import {LOADING_DARK} from '../../assets/Lottie';
import NoticeCard from '../../components/NoticeCard';
import Row from '../../components/Row';
import {COLORS, SCREEN, WEBPAGE_URL} from '../../utils/const';
import * as NoticeHelper from '../../utils/Helpers/NoticeHelper';

const Notice = ({route, navigation}) => {
  const {type} = route.params;
  const [notice, setNotice] = React.useState([]);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  React.useEffect(() => {
    if (type === 'STUDENT') {
      NoticeHelper.scrapeStudentNotice(setNotice);
    } else {
      NoticeHelper.scrapeExamNotice(setNotice);
    }
  }, [type]);

  const openNotice = noticeLink => {
    navigation.dispatch(
      StackActions.push(SCREEN.NOTICE_VIEWER, {
        noticeLink: WEBPAGE_URL + noticeLink,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.OFF_WHITE} />
      <Row style={styles.justifyContent}>
        {navigation.canGoBack() ? (
          <Pressable onPress={goBack}>
            <Image source={BACK} style={styles.back} />
          </Pressable>
        ) : (
          <View />
        )}
        <Text style={styles.header}>
          {type === 'STUDENT' ? 'Student' : 'Exam'} Notice
        </Text>
        <View />
      </Row>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content_container}>
        {notice.map(({title, link}, index) => (
          <NoticeCard
            key={index}
            title={title}
            onOpenNoticeClicked={() => openNotice(link)}
          />
        ))}

        <AnimatedLottieView
          style={[
            styles.loading,
            notice.length === 0 ? styles.visible : styles.hidden,
          ]}
          source={LOADING_DARK}
          autoPlay
          loop={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  back: {
    height: 15,
    width: 15,
    marginTop: 5,
    resizeMode: 'contain',
  },
  justifyContent: {
    justifyContent: 'space-between',
    marginVertical: wp(5),
    paddingHorizontal: wp(5),
  },
  header: {
    fontSize: wp(5),
    fontFamily: FONT_ORBITRON_SEMIBOLD,
    color: COLORS.BLACK,
    textAlign: 'center',
  },

  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.OFF_WHITE,
  },
  container: {
    width: wp(100),
    height: hp(100),
    paddingBottom: wp(5),
    backgroundColor: COLORS.OFF_WHITE,
  },
  content_container: {
    flexGrow: 1,
    paddingBottom: 60,
    alignItems: 'center',
  },
  loading: {
    width: 45,
    height: 45,
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
});

export default Notice;
