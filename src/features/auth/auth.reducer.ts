import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {authService} from './auth.service';
import {userLoginDetails} from '../../utils/types.api';
import {showMessage} from 'react-native-flash-message';

const initialState = {
  loggedIn: false,
  accessToken: null,
  userLoginDetails: null as null | userLoginDetails,
  loading: false,
  isError: false,
  error: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: object, thunkAPI) => {
    const resp = await authService.login(payload);

    if (resp.isSuccessful) return resp.data;
    showMessage({message: resp.data, type: 'danger'});

    return thunkAPI.rejectWithValue(resp.data);
  },
);

export const checkLogin = createAsyncThunk(
  'auth/checkLogin',
  async (_, thunkAPI) => {
    const resp = await authService.checkLogin();
    return resp;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      authService.logout();
      state.loggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      //login
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.userLoginDetails = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })

      //checkLogin
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.loggedIn = action.payload.loginTokenValid;
        state.userLoginDetails = action.payload.loginData;
      });
  },
});

export default authSlice.reducer;
export const {logout} = authSlice.actions;
