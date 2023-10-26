import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string;
  followers: number;
  followings: number;
}
interface AuthProps {
  profile: UserProfile | null;
  loggedIn: boolean;
  isBusy: boolean;
}

const initialState: AuthProps = {
  profile: null,
  loggedIn: false,
  isBusy: false,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateProfile: (authState, action) => {
      authState.profile = action.payload;
    },
    updateLoggedInState: (authState, action) => {
      authState.loggedIn = action.payload;
    },
    updateBusyState: (authState, action) => {
      authState.isBusy = action.payload;
    },
  },
});

export const {updateProfile, updateLoggedInState, updateBusyState} =
  slice.actions;

export const getAuthState = createSelector(
  (state: RootState) => state,
  authState => authState.authReducer,
);

export default slice.reducer;
