import { createSlice } from '@reduxjs/toolkit';

const CurrentCardSlice = createSlice({
  name: 'CurrentCardSlice',
  initialState: null,
  reducers: {
    setCurrentCard(state: any, action) {
      state = action.payload;
    },
  },
});

export default CurrentCardSlice.reducer;

export const actions = CurrentCardSlice.actions;
