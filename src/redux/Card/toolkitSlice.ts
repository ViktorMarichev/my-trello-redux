import { createSlice } from '@reduxjs/toolkit';
import { Card as CardType } from '../../types/tasks';
const ColumnsSlice = createSlice({
  name: 'CardSlice',
  initialState: [],
  reducers: {
    addCard(state: Array<CardType>, action) {
      alert('here');
      state.push(action.payload! as CardType);
    },
  },
});

export default ColumnsSlice.reducer;

export const actions = ColumnsSlice.actions;
