import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.1.5:8989',
});

export default client;
