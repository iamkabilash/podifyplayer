import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import axios, {CreateAxiosDefaults} from 'axios';

const baseURL = 'http://192.168.1.5:8989';

const client = axios.create({
  baseURL: baseURL,
});

type headers = CreateAxiosDefaults<any>['headers'];

export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

  if (!token)
    return axios.create({
      baseURL: baseURL,
    });

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    ...headers,
  };

  return axios.create({
    baseURL: baseURL,
    headers: defaultHeaders,
  });
};

export default client;
