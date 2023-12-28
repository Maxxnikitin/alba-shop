import axios from 'axios';

interface CustomAxiosDefaults {
  retry?: boolean;
}

declare module 'axios' {
  interface AxiosDefaults extends CustomAxiosDefaults {}
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
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
      if (err.response.status === 401 && !axios.defaults.retry) {
        axios.defaults.retry = true;

        try {
          const rs = await axiosInstance.post('/auth/token_refresh/');

          const { access } = rs.data;
          localStorage.setItem('access', access);

          axios.defaults.retry = false;

          return axiosInstance(originalConfig);
        } catch (_error) {
          localStorage.removeItem('access');
          window.location.href = `${process.env.REACT_APP_URL_FRONT}/sign-in`;

          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);

export { axiosInstance };
