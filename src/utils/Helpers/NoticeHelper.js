import axios from 'axios';
import {ToastAndroid} from 'react-native';
import * as cheerio from 'react-native-cheerio';
import {STUDENT_EXAM_URL, STUDENT_NOTICE_URL} from '../const';

export const scrapeStudentNotice = async callback => {
  try {
    const {data} = await axios.get(STUDENT_NOTICE_URL);
    const $ = cheerio.load(data);
    const $articles = $('article');

    const articles = [];

    $articles.each((i, el) => {
      const title = $(el).children('a').text();
      const link = $(el).children('a').attr('href');
      articles.push({title, link});
    });
    callback(articles);
  } catch (e) {
    ToastAndroid.show(
      'Error fetching student notice.\n' + e.message,
      ToastAndroid.SHORT,
    );
  }
};

export const scrapeExamNotice = async callback => {
  try {
    const {data} = await axios.get(STUDENT_EXAM_URL);
    const $ = cheerio.load(data);
    const $articles = $('article');

    const articles = [];

    $articles.each((i, el) => {
      const title = $(el).children('a').text();
      const link = $(el).children('a').attr('href');
      articles.push({title, link});
    });
    callback(articles);
  } catch (e) {
    ToastAndroid.show(
      'Error fetching student notice\n' + e.message,
      ToastAndroid.SHORT,
    );
  }
};

export const scrapePDFLink = async link => {
  try {
    const {data} = await axios.get(link);
    const $ = cheerio.load(data);
    const $pdf = $('a.sqs-block-button-element--medium');
    const pdfLink = $pdf.attr('href');
    return pdfLink;
  } catch (e) {
    return undefined;
  }
};
