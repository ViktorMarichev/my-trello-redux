import { createSelector } from '@reduxjs/toolkit';
import { Card as CardType } from '../../types/tasks';
const _ = require('lodash');
const getCards = (state: any, columnId: string) => {
  return _.filter(state.cards, (card: CardType) => {
    console.log(card);
    return card.columnId === columnId

  });
};
const getCardsByColumnId = createSelector(getCards, (cards) => {
  console.log('getCardsById', cards)
  return cards;
});
const getCardById = (state: any, id: string) => {
  return state.cards[_.findIndex(state.cards, { id })]
}

export default {
  getCardsByColumnId,
  getCardById,
};
