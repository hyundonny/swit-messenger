import { createSlice, nanoid } from '@reduxjs/toolkit';

import getSortedData from 'utils/getSortedData';
import { initMessages } from 'constants/messages';

export const messageSlice = createSlice({
  name: 'message',
  initialState: initMessages,
  reducers: {
    add: {
      reducer: (state, { payload }) => {
        state.push({ ...payload });
      },
      prepare: ({ userId, userName, profileImage, content, reply }) => {
        return {
          payload: {
            userId,
            userName,
            profileImage,
            date: getSortedData(),
            id: nanoid(),
            content,
            reply,
          },
        };
      },
    },

    remove: (state, { payload }) => {
      return state.filter(message => message.id !== payload.id);
    },
  },
});

export const { add, remove } = messageSlice.actions;
export default messageSlice.reducer;
