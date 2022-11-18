import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/const';
import storage from '@react-native-firebase/storage';

const Holidays = () => {
  const [url, setURL] = React.useState('');
  const downloadHolidayList = React.useCallback(async () => {
    ToastAndroid.show('Loading...', ToastAndroid.SHORT);
    const _url = await storage().ref('holiday.jpeg').getDownloadURL();
    setURL(_url);
  }, []);

  React.useEffect(() => {
    downloadHolidayList();
  }, [downloadHolidayList]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={COLORS.GRAY_DARK}
      />
      <View style={styles.container}>
        <Image source={{uri: url}} style={styles.image} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_DARK,
  },
  image: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    resizeMode: 'contain',
  },
});

export default Holidays;
