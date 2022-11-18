import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {BACK} from '../../assets/Images';
import {LOADING_DARK} from '../../assets/Lottie';
import Row from '../../components/Row';
import {COLORS} from '../../utils/const';
import * as NoticeHelper from '../../utils/Helpers/NoticeHelper';
import {WebView} from 'react-native-webview';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  FONT_MEDIUM,
  FONT_ORBITRON,
  FONT_ORBITRON_SEMIBOLD,
} from '../../assets/Font';

const NoticeViewer = ({route, navigation}) => {
  const {noticeLink} = route.params;

  const [link, setLink] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const fetchPDF = React.useCallback(async _link => {
    const pdfLink = await NoticeHelper.scrapePDFLink(_link);

    setLoading(false);
    if (!pdfLink) {
      ToastAndroid.show(
        'Error fetching student notice...\n Redirecting to official website.',
        ToastAndroid.SHORT,
      );

      setLink(_link);
    } else {
      setLink(pdfLink);
    }
  }, []);

  React.useEffect(() => {
    setLoading(true);

    if (!noticeLink) {
      if (navigation.canGoBack()) {
        return navigation.goBack();
      } else {
        return navigation.exitApp();
      }
    }

    fetchPDF(noticeLink);
  }, [noticeLink, navigation, fetchPDF]);

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
        <Text style={styles.header}>Notice</Text>
        <View />
      </Row>

      {link ? <WebView source={{uri: link}} style={styles.page} /> : <View />}

      <AnimatedLottieView
        style={[styles.loading, loading ? styles.visible : styles.hidden]}
        source={LOADING_DARK}
        autoPlay
        loop={true}
      />
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
  loading: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  page: {
    flex: 1,
    width: wp(100),
  },
});

export default NoticeViewer;
