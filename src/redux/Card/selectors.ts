import { createSelector } from '@reduxjs/toolkit';
import { Card as CardType } from '../../types/tasks';
import { RootState } from '../configureStore';
const _ = require('lodash');

const getCards = (state: RootState, columnId: string) => {
  return _.filter(state.cards, (card: CardType) => {
    return card.columnId === columnId;
  });
};
const getCardsByColumnId = createSelector(getCards, (cards) => {
  return cards;
});
const getCardById = (state: RootState, id: string) => {
  return state.cards[_.findIndex(state.cards, { id })];
};

export default {
  getCardsByColumnId,
  getCardById,
};
