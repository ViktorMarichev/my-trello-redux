import { createSelector } from '@reduxjs/toolkit';
import { Card as CardType } from '../../types/tasks';
const _ = require('lodash');
const getCards = (state: any, ids: Array<string>) => {
  return _.filter(state.cards, (card: CardType) => _.includes(ids, card.id));
};
const getCardsByIds = createSelector(getCards, (cards) => {
  return cards;
});

export default {
  getCardsByIds,
};
