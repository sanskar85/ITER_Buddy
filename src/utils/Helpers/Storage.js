import AsyncStorage from '@react-native-async-storage/async-storage';

export const putString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {}
};

export const putObject = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};

export const getString = async (key, defaultValue = undefined) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value !== null ? value : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const getObject = async (key, defaultValue = undefined) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const remove = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {}
};

export const mergeObject = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (e) {}
};
