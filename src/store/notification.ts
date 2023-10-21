import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

type notificationType = 'error' | 'success' | null;

interface Notification {
  message: string;
  type: notificationType;
}

const initialState: Notification = {
  message: '',
  type: 'error',
};

const slice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    updateNotifocation: (notificationState, action) => {
      notificationState.message = action.payload.message;
      notificationState.type = action.payload.type;
    },
  },
});

export const {updateNotifocation} = slice.actions;
export default slice.reducer;

export const getNotificationState = createSelector(
  (state: RootState) => state,
  notificationState => notificationState.notificationReducer,
);
