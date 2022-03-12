import { createSlice } from '@reduxjs/toolkit';
import { Card as CardType } from '../../types/tasks';
import { addCard as addCardId } from '../Columns/index';

const ColumnsSlice = createSlice({
  name: 'CardSlice',
  initialState: [],
  reducers: {
    addCard(state: Array<CardType>, action) {
      alert('here');
      state.push(action.payload! as CardType);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCardId, (state: any, action) => {
      console.log(action);
      state.push({
        id: action.payload.cardId,
        title: action.payload.title,
        author: action.payload.author,
        description: '',
        comments: [],
      } as CardType);
    });
  },
});

export default ColumnsSlice.reducer;

export const actions = ColumnsSlice.actions;
