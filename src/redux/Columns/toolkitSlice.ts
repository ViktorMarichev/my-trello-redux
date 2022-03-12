import { createSlice } from '@reduxjs/toolkit';
import { Column } from '../../types/tasks';
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
      const cardId: string = stateTool.generateId(state)!;
      state[_.findIndex(state, { id: action.payload.columnId })].cards.push(cardId);
      console.log(state[_.findIndex(state, { id: action.payload.columnId })].cards);
      action.payload.cardId = cardId;
    },
  },
});

export default ColumnsSlice.reducer;

export const actions = ColumnsSlice.actions;
