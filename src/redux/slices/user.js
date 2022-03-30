import { createSlice } from '@reduxjs/toolkit';

export const DO_NOT_INSERT_NAME = '유저 이름이 입력되지 않았습니다.';
export const DO_NOT_INSERT_ID = -1000;
export const DO_NOT_INSERT_PROFILE_IMAGE = '이미지가 등록되지 않았습니다.';

const initialState = {
  isLogin: false,
  isChatAvailable: false,
  userId: 0,
  userName: '',
  profileImage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.userId = payload?.userId || DO_NOT_INSERT_ID;
      state.userName = payload?.userName || DO_NOT_INSERT_NAME;
      state.profileImage = payload?.profileImage || DO_NOT_INSERT_PROFILE_IMAGE;
      if (payload?.userId > 0 && payload?.userName && payload?.profileImage) {
        state.isLogin = true;
        state.isChatAvailable = true;
      }
    },
    logout: () => initialState,
    editUserName: (state, { payload }) => {
      state.userName = payload;
    },
    changeChattingStatus: state => {
      return !state.isChatAvailable;
    },
  },
});

export const { login, logout, editUserName, changeChattingStatus } =
  userSlice.actions;
export default userSlice.reducer;
