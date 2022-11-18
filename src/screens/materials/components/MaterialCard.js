import React from 'react';
import {
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT_REGULAR} from '../../../assets/Font';
import Row from '../../../components/Row';
import {COLORS} from '../../../utils/const';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const MaterialCard = ({material, subjectCode}) => {
  const [downloaded, setDownloaded] = React.useState(false);

  const checkFileExists = React.useCallback(
    fileName => {
      const path =
        RNFS.DocumentDirectoryPath + `/Materials/${subjectCode}/` + fileName;

      RNFS.exists(path).then(exists => {
        if (exists) {
          setDownloaded(true);
        }
      });
    },
    [subjectCode],
  );

  React.useEffect(() => {
    checkFileExists(material.name);
  }, [checkFileExists, material]);

  const downloadHandler = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!granted) {
      return ToastAndroid.show(
        'Storage Permission Denied.\n Please allow to download materials.',
        ToastAndroid.SHORT,
      );
    }

    try {
      ToastAndroid.show('Downloading...', ToastAndroid.SHORT);
      const ref = storage().ref(material.storage_path);
      const url = await ref.getDownloadURL();

      const _dir_exists = await RNFS.exists(
        RNFS.DocumentDirectoryPath + `/Materials/${subjectCode}/`,
      );
      if (!_dir_exists) {
        await RNFS.mkdir(
          RNFS.DocumentDirectoryPath + `/Materials/${subjectCode}/`,
        );
      }

      const path =
        RNFS.DocumentDirectoryPath +
        `/Materials/${subjectCode}/` +
        material.name;

      const options = {
        fromUrl: url,
        toFile: path,
      };
      RNFS.downloadFile(options)
        .promise.then(() => {
          setDownloaded(true);
        })
        .catch(e => {
          ToastAndroid.show(
            'Error downloading file\n' + e.message,
            ToastAndroid.SHORT,
          );
        });
    } catch (e) {
      ToastAndroid.show(
        'Error downloading file\n' + e.message,
        ToastAndroid.SHORT,
      );
    }
  };

  const openHandler = async () => {
    const path =
      RNFS.DocumentDirectoryPath + `/Materials/${subjectCode}/` + material.name;
    FileViewer.open(path, {showOpenWithDialog: true}).catch(error => {
      ToastAndroid.show('No app found to open this file.', ToastAndroid.SHORT);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{material.name}</Text>
      </View>
      <Row>
        {downloaded ? (
          <Pressable style={[styles.button, styles.blue]} onPress={openHandler}>
            <Text style={styles.text}>Open</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.button, styles.green]}
            onPress={downloadHandler}>
            <Text style={styles.text}>Download</Text>
          </Pressable>
        )}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    shadowColor: COLORS.GRAY_DARK,
    marginVertical: wp(2),
    borderRadius: 7,
  },
  nameWrapper: {
    paddingBottom: wp(1),
  },
  name: {
    fontSize: wp(4),
    color: COLORS.BLACK,
    fontFamily: FONT_REGULAR,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(1.5),
    borderRadius: 7,
    marginHorizontal: wp(2),
  },
  green: {
    backgroundColor: COLORS.GREEN,
  },
  blue: {
    backgroundColor: COLORS.BLUE,
  },
  text: {
    fontFamily: FONT_REGULAR,
    fontSize: wp(3),
    color: COLORS.WHITE,
    textTransform: 'uppercase',
  },
});

export default MaterialCard;
