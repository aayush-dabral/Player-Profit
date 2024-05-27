import axios from 'axios';
import {BASE_URL} from './Config';

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log(BASE_URL)

export const httpMultipart = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**Add a request interceptor */
http.interceptors.request.use(
  async config => {
    const token =  await localStorage.getItem('accessToken');
    if (token)
      config.headers.Authorization = `token ${token}`
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**Add a response interceptor */
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (400 === error.response.status) {
        return error;
        // toast message
      } else if (403 === error.response.status) {
        return error;
      } else {
        return error
      }
    }
  },
);

/**Add a request interceptor */
httpMultipart.interceptors.request.use(
  async config => {
    const token =  await localStorage.getItem('accessToken');
    if(token)
        config.headers.Authorization = `token ${token}`;
      return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**Add a response interceptor */
httpMultipart.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (401 === error.response.status) {
        return  error?.response
      } else {
        // toast message
        return error;
      }
    }
  },
);
