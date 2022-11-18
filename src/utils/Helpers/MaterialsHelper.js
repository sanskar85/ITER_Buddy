import {ToastAndroid} from 'react-native';
import * as Storage from './Storage';
import firestore from '@react-native-firebase/firestore';
import {sameSubjects} from '../Utilities';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

export const fetchSubjects = async callback => {
  try {
    const storedSubjects = await Storage.getObject('subjects');

    if (storedSubjects) {
      callback(storedSubjects);
    }
  } catch (e) {
    ToastAndroid.show(
      'Error fetching study materials\n' + e.message,
      ToastAndroid.SHORT,
    );
  }
};

export const saveSubjects = async (subjectArray, subjectMapping) => {
  if (!Array.isArray(subjectArray)) {
    return;
  }

  const prevSubjects = await Storage.getObject('subjects');

  if (prevSubjects) {
    const deleted = prevSubjects.filter(
      subject => !subjectMapping[subject.code],
    );
    for (const subject of deleted) {
      await deleteFolder(subject.code);
    }
  }

  await Storage.putObject('subjects', subjectArray);
};

export const fetchAllSubjects = async callback => {
  try {
    const _subjects = await firestore()
      .collection('Subjects')
      .doc('all_subjects')
      .get();

    const subjects = _subjects.data();

    const subjectArray = [];

    for (const key in subjects) {
      subjectArray.push({
        code: key,
        name: subjects[key],
        short: parseSubjectShortCode(subjects[key]),
      });
    }

    callback(subjectArray);
  } catch (e) {
    ToastAndroid.show(
      'Error fetching subjects list.\n' + e.message,
      ToastAndroid.SHORT,
    );
  }
};

export const parseSubjectShortCode = subject => {
  const nameSplitted = subject.split(' ');
  let shortCode = '';
  for (const name of nameSplitted) {
    shortCode += name.charAt(0);
  }
  return shortCode;
};

export const fetchStudyMaterials = async (
  subject_code,
  onlineFilesCallback,
  localFilesCallback,
) => {
  try {
    const ref = storage().ref(subject_code);
    let materials_list = await ref.listAll();

    materials_list = materials_list.items.map(item => {
      return {
        name: item.name,
        storage_path: item.fullPath,
      };
    });
    materials_list.sort((a, b) => {
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
    onlineFilesCallback(materials_list);
  } catch (e) {
    ToastAndroid.show(
      'Error fetching study materials\n' + e.message,
      ToastAndroid.SHORT,
    );
    const localFiles = await localFiles(subject_code);
    localFilesCallback(localFiles || []);
  }
};

export const localFiles = async subject_code => {
  try {
    const path = RNFS.DocumentDirectoryPath + `/Materials/${subject_code}/`;

    let files = await RNFS.readDir(path);
    files = files.map(file => {
      return {
        name: file.name,
      };
    });
    return files;
  } catch (e) {
    return [];
  }
};

const deleteFolder = async subject_code => {
  try {
    const path = RNFS.DocumentDirectoryPath + `/Materials/${subject_code}/`;

    await RNFS.unlink(path);
  } catch (e) {
    console.log(e);
  }
};
