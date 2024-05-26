import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.reducer';
import profileReducer from '../features/profile/profile.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
