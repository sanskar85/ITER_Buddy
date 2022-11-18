import {ToastAndroid} from 'react-native';
import Axios from '../../controllers/Axios';
import * as Storage from './Storage';

export const isLoggedIn = async () => {
  const isLogged = await Storage.getString('isLogged');
  return isLogged ? true : false;
};

export const login = async (username, password) => {
  try {
    let {data} = await Axios.post('/login', {
      username,
      password,
      MemberType: 's',
    });
    if (data.status !== 'success') {
      throw new Error(data.message);
    }

    const success = await fetchProfileInfo();
    if (!success) {
      throw new Error('Failed to fetch profile info');
    }

    await Storage.putString('isLogged', 'true');
    await Storage.putString('name', data.name);
    await Storage.putString('username', username);
    await Storage.putString('password', password);

    return true;
  } catch (error) {
    return false;
  }
};

export const fetchProfileInfo = async () => {
  try {
    const {data} = await Axios.post('/studentinfo');
    const details = data.detail[0];

    const info = {
      blood_group: details.bloodgroup,
      course: details.programdesc,
      branch: details.branchdesc,
      city: details.ccityname,
      district: details.cdistrict,
      pincode: details.cpin,
      state: details.cstatename,
      dob: details.dateofbirth,
      registration_no: details.enrollmentno,
      father_name: details.fathersname,
      gender: details.gender,
      mother_name: details.mothersname,
      name: details.name,
      mobile_no: details.scellno,
      email: details.semailid,
      section: details.sectioncode,
      semester: details.stynumber,
    };

    await Storage.putObject('profile', info);
    return true;
  } catch (error) {
    return false;
  }
};

export const relogin = async () => {
  try {
    const username = await Storage.getString('username');
    const password = await Storage.getString('password');
    const success = await login(username, password);
    if (!success) {
      throw new Error('Failed to relogin');
    }
    return true;
  } catch (error) {
    return false;
  }
};
