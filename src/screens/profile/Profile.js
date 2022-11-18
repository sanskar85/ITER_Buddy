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
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  FONT_MEDIUM,
  FONT_ORBITRON_SEMIBOLD,
  FONT_REGULAR,
} from '../../assets/Font';
import {BACK, BOY, GIRL} from '../../assets/Images';
import Row from '../../components/Row';
import {COLORS} from '../../utils/const';
import * as Storage from '../../utils/Helpers/Storage';

const Profile = ({navigation}) => {
  const [details, setDetails] = React.useState({});
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const fetchProfile = React.useCallback(async () => {
    const profile = await Storage.getObject('profile');

    setDetails(profile);
  }, []);

  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.OFF_WHITE} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content_container}>
        <Row style={styles.justifyContent}>
          {navigation.canGoBack() ? (
            <Pressable onPress={goBack}>
              <Image source={BACK} style={styles.back} />
            </Pressable>
          ) : (
            <View />
          )}
          <Text style={styles.header}>Profile</Text>
          <View />
        </Row>

        <Image
          source={details.gender === 'F' || details.gender === 'f' ? GIRL : BOY}
          style={styles.dp}
        />

        <Text style={styles.name}>{details.name}</Text>

        <View style={styles.block}>
          <Data label="Registration No." value={details.registration_no} />
          <Data label="Course" value={details.course} />
          <Data label="Branch" value={details.branch} />
          <Data label="Section" value={details.section} />
          <Data label="Semester" value={details.semester} />
        </View>
        <View style={styles.block}>
          <Data label="Mobile" value={details.mobile_no} />
          <Data label="Email" value={details.email} />
          <Data label="D.O.B" value={details.dob} />
          <Data label="Blood Group" value={details.blood_group} />
          <Data
            label="Gender"
            value={
              details.gender === 'F' || details.gender === 'f'
                ? 'Female'
                : 'Male'
            }
          />
          <Data label="Father's Name" value={details.father_name} />
          <Data label="Mother's Name" value={details.mother_name} />
        </View>

        <View style={styles.block}>
          <Data label="City" value={details.city} />
          <Data label="District" value={details.district} />
          <Data label="State" value={details.state} />
          <Data label="Pincode" value={details.pincode} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Data = ({label, value}) => {
  return (
    <Row style={styles.data}>
      <Text style={styles.label}>{label} :-</Text>
      <Text style={styles.value}>{value}</Text>
    </Row>
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
    backgroundColor: COLORS.OFF_WHITE,
  },
  content_container: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  back: {
    height: 15,
    width: 15,
    marginTop: 5,
    resizeMode: 'contain',
  },
  justifyContent: {
    justifyContent: 'space-between',
    marginVertical: wp(2),
    paddingHorizontal: wp(5),
  },
  header: {
    fontSize: wp(5),
    fontFamily: FONT_MEDIUM,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  dp: {
    alignSelf: 'center',
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
  },
  name: {
    fontSize: wp(5),
    color: COLORS.BLACK,
    fontFamily: FONT_ORBITRON_SEMIBOLD,
    marginTop: wp(3),
    textAlign: 'center',
  },
  label: {
    color: COLORS.BLACK_70,
    fontFamily: FONT_REGULAR,
  },
  value: {
    color: COLORS.GRAY_DARK,
    fontFamily: FONT_MEDIUM,
  },
  data: {
    justifyContent: 'space-between',
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.SHADOW,
  },
  block: {
    paddingTop: wp(10),
  },
});

export default Profile;
