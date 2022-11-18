import axios from 'axios';
import * as AuthHelper from '../utils/Helpers/AuthHelper';

const ServerURL = 'http://103.112.27.37:8282/CampusPortalSOA/';

const Axios = axios.create({
  baseURL: ServerURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

Axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error &&
      error.response &&
      error.response.status === 417 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const res = await AuthHelper.relogin();
      if (res) {
        return Axios(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export default Axios;
