import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {profileService} from './profile.service';

const initialState = {
  userProfile: null as null | object,
  loading: false as boolean,
};

export const fetchProfile = createAsyncThunk(
  'profile/getUserProfile',

  async (_, thunkAPI) => {
    const resp = await profileService.getUserProfile();
    if (resp.isSuccessful) return resp.data;

    return thunkAPI.rejectWithValue(resp.data);
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;
