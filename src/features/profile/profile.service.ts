import {get, getAuthHeaders} from '../service.common';

export const profileService = {
  getUserProfile: async () => {
    const url = '/auth/me';
    // const headers = getAuthHeaders();
    const resp = await get(url);
    return resp;
  },
};
