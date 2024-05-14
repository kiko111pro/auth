import {storageKeys} from '../../utils/constants';
import {API, post, storage} from '../service.common';
import {JwtPayload, jwtDecode} from 'jwt-decode';

export const authService = {
  login: async (data: object) => {
    const url = API + '/auth/login';
    const res = await post(url, data);

    if (res.isSuccessful) storage.set(storageKeys.accessToken, res.data.token);
    return res;
  },

  checkLogin: async () => {
    const token = storage.getString(storageKeys.accessToken) as string;

    if (!token) return false;

    const decodedToken: JwtPayload = jwtDecode(token);
    var current_time = new Date().getTime() / 1000;

    return (
      typeof decodedToken.exp === 'undefined' ||
      current_time <= decodedToken.exp
    );
    //will return true if not expired
  },

  logout: () => {
    storage.clearAll();
  },
};
