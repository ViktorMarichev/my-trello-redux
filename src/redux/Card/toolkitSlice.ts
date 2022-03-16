import { createSlice } from '@reduxjs/toolkit';
import { Card as CardType } from '../../types/tasks';
import { stateTool } from '../index';
const _ = require('lodash');

const ColumnsSlice = createSlice({
  name: 'CardSlice',
  initialState: [],
  reducers: {
    setCardName(state: Array<CardType>, action) {
      state[_.findIndex(state, (card: CardType) => card.id === action.payload.id)].title =
        action.payload.title;
    },
    setCardDescription(state: Array<CardType>, action) {
      state[_.findIndex(state, (card: CardType) => card.id === action.payload.id)].description =
        action.payload.description;
    },
    addCard(state: Array<CardType>, action) {
      const cardId = stateTool.generateId(state);
      state.push({
        id: cardId,
        columnId: action.payload.columnId,
        title: action.payload.title,
        author: action.payload.author,
        description: '',
      } as CardType);
    },
    deleteCard(state: Array<CardType>, action) {
      return (state = _.filter(state, (card: CardType) => {
        return card.id !== action.payload.cardId;
      }));
    },
  },
});

export default ColumnsSlice.reducer;

export const actions = ColumnsSlice.actions;
