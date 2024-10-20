import axios, {AxiosResponse, AxiosError} from 'axios';
import {MMKV} from 'react-native-mmkv';
import {store} from '../app/store';
import {logout} from './auth/auth.reducer';
import {storageKeys} from '../utils/constants';
import {showMessage} from 'react-native-flash-message';
import {jwtDecode, JwtPayload} from 'jwt-decode';

export const storage = new MMKV();

const API = 'https://dummyjson.com';

const instance = axios.create({
  baseURL: API,
  timeout: 10000,
  timeoutErrorMessage:
    'Request taking longer than expected. Check your network',
});

instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    let accessToken = storage.getString(storageKeys.accessToken);
    let isExpired: boolean = false;
    let decodedToken: JwtPayload;
    if (accessToken) {
      let current_time = new Date().getTime() / 1000;
      decodedToken = jwtDecode(accessToken);
      isExpired = !(
        typeof decodedToken.exp === 'undefined' ||
        current_time <= decodedToken.exp
      );
    }

    if (isExpired) {
      try {
        const response: AxiosResponse = await axios({
          method: 'post',
          url: 'https://dummyjson.com/auth/refresh',
          data: {
            refreshToken: storage.getString(storageKeys.refreshToken),
          },
        });
        console.log('REFRESH');
        accessToken = response.data.accessToken;
        storage.set(storageKeys.accessToken, response.data.accessToken);
      } catch (error) {
        console.log('Error in getting refresh Token');
      }
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('Error in interceptors', error);
    return Promise.reject(error);
  },
);

const SUCCESS = (resp: AxiosResponse) => ({
  data: resp.data,
  status: resp.status,
  isSuccessful: true,
});

const ERROR = (resp: AxiosError) => {
  const status = resp.response?.status;

  if (status === 403 || status === 401) {
    showMessage({
      description: 'Please login again!',
      message: 'Session Expired!',
      type: 'warning',
      textStyle: {
        color: '#000',
      },
    });
    store.dispatch(logout());
  }

  return {
    data: (resp.response?.data as AxiosError).message || 'Unknown Error',
    status,
    isSuccessful: false,
  };
};

export const getAuthHeaders = () => ({
  Authorization: 'Bearer ' + storage.getString(storageKeys.accessToken),
});

export const get = async (
  url: string,
  headers: object = {},
  params: object = {},
) => {
  try {
    const response = await instance.get(url, {params, headers});
    return SUCCESS(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return ERROR(error);
    else
      return {
        isSuccessful: false,
        data: 'Unexpected Error!',
        status: 0,
      };
  }
};

export const post = async (
  url: string,
  data: object = {},
  headers: object = {},
  params: object = {},
) => {
  try {
    const response = await instance.post(url, data, {params, headers});
    return SUCCESS(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return ERROR(error);
    else
      return {
        isSuccessful: false,
        data: 'Unexpected Error!',
        status: 0,
      };
  }
};
