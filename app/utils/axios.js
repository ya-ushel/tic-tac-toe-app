import axios from 'axios';

import config from '../config';
import store from '../store';

const instance = axios.create({
  baseURL: config.apiUrl,
  timeout: 1000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

instance.interceptors.request.use(config => {
  config.headers.post['userId'] = store.getState().user?.data?.id;
  return config;
});

export default instance;
