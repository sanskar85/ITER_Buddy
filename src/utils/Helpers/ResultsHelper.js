import {ToastAndroid} from 'react-native';
import Axios from '../../controllers/Axios';
import {sameArrayOfObjects} from '../Utilities';
import * as Storage from './Storage';

export const fetchResults = async callback => {
  try {
    const storedResults = await Storage.getObject('results');

    if (storedResults) {
      callback(storedResults);
    }

    const {data} = await Axios.post('/stdrst');

    const _results = data.data;

    const results = _results.map(entry => {
      return {
        semester: entry.stynumber,
        fail: entry.fail,
        sgpa: entry.sgpaR,
        credit: entry.totalearnedcredit,
      };
    });

    if (!sameArrayOfObjects(storedResults, results)) {
      await Storage.putObject('results', results);
      callback(results);
    }
  } catch (e) {
    ToastAndroid.show(
      'Error fetching report card\n' + e.message,
      ToastAndroid.SHORT,
    );
  }
};

export const fetchResultsForSemester = async (semester, callback) => {
  try {
    const storedResults = await Storage.getObject('result_card_' + semester);

    if (storedResults) {
      return callback(storedResults);
    }

    const {data} = await Axios.post('/rstdtl', {
      styno: `${semester}`,
    });
    const result_card = data.Semdata.map(entry => {
      return {
        semester: entry.stynumber,
        subject_code: entry.subjectcode,
        credit: entry.earnedcredit,
        subject: entry.subjectdesc,
        grade: entry.grade,
      };
    });

    await Storage.putObject('result_card_' + semester, result_card);
    callback(result_card);
  } catch (e) {
    ToastAndroid.show(
      'Error fetching report card\n' + e.message,
      ToastAndroid.SHORT,
    );
  }
};
