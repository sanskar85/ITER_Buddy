import {ToastAndroid} from 'react-native';
import Axios from '../../controllers/Axios';
import {sameArrayOfObjects} from '../Utilities';
import {parseSubjectShortCode} from './MaterialsHelper';
import * as Storage from './Storage';

export const fetchAttendance = async callback => {
  try {
    const storedAttendance = await Storage.getObject('attendance');

    if (storedAttendance) {
      callback(storedAttendance);
    }

    const {data} = await Axios.post('/attendanceinfo');

    const {reglov} = data;
    let regID;
    for (const key in reglov) {
      regID = key;
      break;
    }

    const attendance = await fetchAttendanceByRegID(regID);

    if (attendance && !sameArrayOfObjects(attendance, storedAttendance)) {
      await Storage.putObject('attendance', attendance);
      callback(attendance);
    }
  } catch (e) {
    ToastAndroid.show(
      'Error fetching attendance\n' + e.message,
      ToastAndroid.SHORT,
    );
  }
};

const fetchAttendanceByRegID = async regID => {
  try {
    const {data} = await Axios.post('/attendanceinfo', {
      registerationid: regID,
    });

    const {griddata} = data;
    if (!griddata || griddata.length === 0) {
      throw new Error('No attendance found');
    }

    const attendance = griddata.map(entry => {
      let attended = 0;
      let total = 0;

      if (entry.Latt !== 'Not Applicable') {
        const lectures = entry.Latt.split('/');
        if (!isNaN(lectures[0].trim()) && !isNaN(lectures[1].trim())) {
          attended += Number(lectures[0].trim());
          total += Number(lectures[1].trim());
        }
      }

      if (entry.Patt !== 'Not Applicable') {
        const lectures = entry.Patt.split('/');
        if (!isNaN(lectures[0].trim()) && !isNaN(lectures[1].trim())) {
          attended += Number(lectures[0].trim());
          total += Number(lectures[1].trim());
        }
      }

      const res = {
        subject: entry.subject,
        total_attendance: entry.TotalAttandence,
        attended,
        total,
      };

      if (entry.lastupdatedon && entry.lastupdatedon.split(' ').length > 0) {
        res.last_update = entry.lastupdatedon.split(' ')[0];
      }

      return res;
    });
    return attendance;
  } catch (e) {
    return [];
  }
};

export const getLocalAttendance = async callback => {
  const storedAttendance = await Storage.getObject('attendance');

  if (storedAttendance) {
    callback(storedAttendance);
  } else {
    fetchAttendance(callback);
  }
};

export const parseAttendance = attendance => {
  if (!attendance) {
    return [];
  }
  const subjects = attendance.map(entry =>
    parseSubjectShortCode(entry.subject),
  );

  const attendances = attendance.map(entry => entry.total_attendance / 100);

  return {labels: subjects, data: attendances};
};

export const calculateBunk = (attended, total, aim) => {
  if (attended === 0 || total === 0) {
    return 0;
  }
  if ((attended / total) * 100 < aim) {
    return Math.ceil((aim * total - 100 * attended) / (100 - aim));
  }
  return -Math.floor((100 * attended - aim * total) / aim);
};
