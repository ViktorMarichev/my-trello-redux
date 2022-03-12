import { createSlice } from '@reduxjs/toolkit';
import { Column, Card as CardType } from '../../types/tasks';
import { stateTool } from '../index';

const _ = require('lodash');
const ColumnsSlice = createSlice({
  name: 'ColumnsSlice',
  initialState: [
    {
      id: 'TODO',
      title: 'TODO',
      cards: [],
    },
    {
      id: 'In Process',
      title: 'In Process',
      cards: [],
    },
    { id: '2', title: 'Testing', cards: [] },
    { id: '3', title: 'Done', cards: [] },
  ],
  reducers: {
    addCard(state: Array<Column>, action) {
      console.log(state, action);
      const cardId: string = stateTool.generateId(state)!;

      state[_.findIndex(state, { id: action.payload.columnId })].cards.push(cardId);
      action.payload.addCardToCards({
        id: cardId,
        title: action.payload.title,
        author: action.payload.author,
        description: '',
        comments: [],
      } as CardType);
    },
  },
});

export default ColumnsSlice.reducer;

export const actions = ColumnsSlice.actions;
