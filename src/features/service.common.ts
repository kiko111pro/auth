import axios, {AxiosResponse, AxiosError} from 'axios';
import {MMKV} from 'react-native-mmkv';
import {store} from '../app/store';
import {logout} from './auth/auth.reducer';
import {storageKeys} from '../utils/constants';
import {showMessage} from 'react-native-flash-message';

export const storage = new MMKV();

export const API = 'https://dummyjson.com';

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
    const response = await axios.get(url, {params, headers});
    return SUCCESS(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return ERROR(error);
    else
      return {
        isSuccessful: false,
        data: 'Unexpected Error!',
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
    const response = await axios.post(url, data, {params, headers});
    return SUCCESS(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return ERROR(error);
    else
      return {
        isSuccessful: false,
        data: 'Unexpected Error!',
      };
  }
};
