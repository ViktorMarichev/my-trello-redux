import { createSlice } from '@reduxjs/toolkit';
const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    username: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload.username);
      state.username = action.payload.username;
    },
  },
});

export default UserSlice.reducer;
export const actions = UserSlice.actions;
