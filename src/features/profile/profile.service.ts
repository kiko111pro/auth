import {API, get, getAuthHeaders} from '../service.common';

export const profileService = {
  getUserProfile: async () => {
    const url = API + '/auth/me';
    const authHeaders = getAuthHeaders();
    const resp = await get(url, authHeaders);
    return resp;
  },
};
