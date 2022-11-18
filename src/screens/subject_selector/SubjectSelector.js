import React from 'react';
import {
  Alert,
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
import {FONT_ORBITRON} from '../../assets/Font';
import {BACK} from '../../assets/Images';
import Row from '../../components/Row';
import {COLORS} from '../../utils/const';
import Button from '../../components/Button';
import * as MaterialsHelper from '../../utils/Helpers/MaterialsHelper';
import Subject from './components/Subject';
import {StackActions} from '@react-navigation/native';

const SubjectSelector = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);
  const [selectedSubjects, setSelectedSubjects] = React.useState({});
  const [subjects, setSubjects] = React.useState([]);
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(StackActions.replace('Home'));
    }
  };

  React.useEffect(() => {
    setLoading(false);
    MaterialsHelper.fetchAllSubjects(_subjects => {
      _subjects.sort((a, b) => {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
      setLoading(false);
      setSubjects(_subjects);
    });
    MaterialsHelper.fetchSubjects(_subjects => {
      const _selected = {};
      for (const subject of _subjects) {
        _selected[subject.code] = true;
      }
      setSelectedSubjects(_selected);
    });
  }, []);

  const handleChange = async (key, selected) => {
    setSelectedSubjects(prev => {
      return {...prev, [key]: selected};
    });
  };
  const handleSave = async () => {
    Alert.alert(
      'Are you sure?',
      'Materials of unselected subjects will be removed.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: save},
      ],
    );
  };

  const save = async () => {
    const _selectedSubjectsArray = subjects.filter(
      subject => selectedSubjects[subject.code],
    );
    const _selectedSubjectsMapping = selectedSubjects;

    await MaterialsHelper.saveSubjects(
      _selectedSubjectsArray,
      _selectedSubjectsMapping,
    );
    goBack();
  };

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
          <Text style={styles.header}>Subjects</Text>
          <View />
        </Row>

        {subjects.map((subject, index) => (
          <Subject
            subject={subject}
            key={index}
            onChange={isSelected => {
              handleChange(subject.code, isSelected);
            }}
            isSelected={selectedSubjects[subject.code]}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          label="Apply"
          onPress={handleSave}
          isLoading={loading}
          style={styles.button}
          lableStyle={styles.button_label}
        />
      </View>
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
    paddingTop: 20,
    backgroundColor: COLORS.OFF_WHITE,
  },
  content_container: {
    flexGrow: 1,
    paddingHorizontal: wp(5),
  },
  back: {
    height: 15,
    width: 15,
    marginTop: 5,
    resizeMode: 'contain',
  },
  justifyContent: {
    justifyContent: 'space-between',
    marginBottom: wp(3),
    paddingHorizontal: wp(5),
  },
  header: {
    fontSize: wp(4),
    fontFamily: FONT_ORBITRON,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: hp(2),
    position: 'absolute',
    bottom: 0,
    marginHorizontal: wp(5),
  },
  button: {
    backgroundColor: COLORS.BLUE,
  },
  button_label: {
    color: COLORS.WHITE,
  },
});

export default SubjectSelector;
