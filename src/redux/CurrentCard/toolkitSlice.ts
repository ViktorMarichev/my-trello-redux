import { createSlice } from '@reduxjs/toolkit';
import { currentCard as currentCardType } from '../../types/tasks';
const CurrentCardSlice = createSlice({
  name: 'CurrentCardSlice',
  initialState: {
    cardId: null,
    columnId: null,
  },
  reducers: {
    setCurrentCard(state: currentCardType, action) {
      console.log('set in reducer');
      state.cardId = action.payload.cardId;
      state.columnId = action.payload.columnId;
    },
  },
});

export default CurrentCardSlice.reducer;

export const actions = CurrentCardSlice.actions;
