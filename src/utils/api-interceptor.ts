import axios from 'axios';

import { URL } from './constants';

const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/auth/login/' && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await axiosInstance.post('/auth/token_refresh/', {
            refresh: localStorage.getItem('refresh'),
          });

          const { access } = rs.data;
          localStorage.setItem('access', access);

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);

export { axiosInstance };
