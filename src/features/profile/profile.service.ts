import {API, get, getAuthHeaders} from '../service.common';

export const profileService = {
  getUserProfile: async () => {
    const url = API + '/auth/me';
    const headers = getAuthHeaders();
    const resp = await get(url, headers);
    return resp;
  },
};
