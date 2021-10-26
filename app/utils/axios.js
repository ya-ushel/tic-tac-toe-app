import axios from 'axios';

import config from '../config';

const instance = axios.create({
  baseURL: config.apiUrl,
  timeout: 1000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

instance.interceptors.request.use(config => {
  config.headers.post['userId'] = 'value';
  return config;
});

export default instance;
