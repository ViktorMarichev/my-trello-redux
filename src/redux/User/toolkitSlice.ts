import { createSlice } from '@reduxjs/toolkit';
const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    username: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export default UserSlice.reducer;
export const actions = UserSlice.actions;
