import {storageKeys} from '../../utils/constants';
import {post, storage} from '../service.common';
import {JwtPayload, jwtDecode} from 'jwt-decode';

export const authService = {
  login: async (data: object) => {
    const url = '/auth/login';

    const res = await post(url, data);

    if (res.isSuccessful) {
      storage.set(storageKeys.accessToken, res.data.accessToken);
      storage.set(storageKeys.refreshToken, res.data.refreshToken);
      storage.set(storageKeys.loginDetails, JSON.stringify(res.data));
    }
    return res;
  },

  checkLogin: async () => {
    const token = storage.getString(storageKeys.accessToken) as
      | string
      | undefined;

    if (!token)
      return {
        loginTokenValid: false,
        loginData: null,
      };

    const decodedToken: JwtPayload = jwtDecode(token);
    let current_time = new Date().getTime() / 1000;

    const loginData = storage.getString(storageKeys.loginDetails);

    return {
      loginTokenValid:
        typeof decodedToken.exp === 'undefined' ||
        current_time <= decodedToken.exp,
      loginData: loginData ? JSON.parse(loginData) : null,
    };
    //will return true if not expired
  },

  logout: () => {
    storage.clearAll();
  },
};
