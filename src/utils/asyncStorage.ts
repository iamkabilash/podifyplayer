import AsyncStorage from '@react-native-async-storage/async-storage';

// set to storage
export const saveToAsyncStorage = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

// get from storage
export const getFromAsyncStorage = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

// clear storage
export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

export enum Keys {
  AUTH_TOKEN = 'AUTH_TOKEN',
}
