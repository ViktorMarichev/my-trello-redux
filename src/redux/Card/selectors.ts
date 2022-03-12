import { createSelector } from '@reduxjs/toolkit';
import { Card as CardType } from '../../types/tasks';
const _ = require('lodash');
const getCards = (state: any, ids: Array<string>) => {
  return _.filter(state, (card: CardType) => {
    return _.includes(ids, card.id);
  });
};
const getCardsByIds = createSelector(getCards, (cards) => {
  return cards;
});

export default {
  getCardsByIds,
};
