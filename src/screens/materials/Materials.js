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
  ToastAndroid,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_MEDIUM, FONT_ORBITRON, FONT_REGULAR} from '../../assets/Font';
import {BACK} from '../../assets/Images';
import {LOADING_DARK} from '../../assets/Lottie';
import Row from '../../components/Row';
import {COLORS} from '../../utils/const';
import * as MaterialsHelper from '../../utils/Helpers/MaterialsHelper';
import MaterialCard from './components/MaterialCard';

const Materials = ({route, navigation}) => {
  const {subject} = route.params;

  const [loading, setLoading] = React.useState(true);
  const [materials, setMaterials] = React.useState([]);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  React.useEffect(() => {
    MaterialsHelper.fetchStudyMaterials(
      subject.code,
      onLineMaterials => {
        setMaterials(onLineMaterials);
        setLoading(false);
      },
      localFiles => {
        ToastAndroid.show(
          'No internet connection\nViewing local files.',
          ToastAndroid.SHORT,
        );
        setMaterials(localFiles);
        setLoading(false);
      },
    );
  }, [subject]);

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
        <Text style={styles.header}>{subject.name}</Text>
        <View />
      </Row>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content_container}>
        {!loading ? (
          materials.length > 0 ? (
            materials.map((material, index) => (
              <MaterialCard
                material={material}
                key={index}
                subjectCode={subject.code}
              />
            ))
          ) : (
            <Text style={styles.empty}>No Materials Found</Text>
          )
        ) : (
          <View />
        )}

        <AnimatedLottieView
          style={[styles.loading, loading ? styles.visible : styles.hidden]}
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
    fontSize: wp(4),
    fontFamily: FONT_ORBITRON,
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
    paddingHorizontal: wp(2.5),
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
  empty: {
    textAlign: 'center',
    fontSize: wp(5),
    fontFamily: FONT_REGULAR,
    color: COLORS.GRAY_DARK,
    textAlignVertical: 'center',
    height: hp(80),
  },
});

export default Materials;
