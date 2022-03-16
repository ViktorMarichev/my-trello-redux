import { Comment } from '../../types/tasks';
import { RootState } from '../configureStore';
const _ = require('lodash');
export const getCommentById = (state: RootState, id: string) => {
  return state.comments[_.findIndex(state.comments, { id })];
};
export const getCommentsByCardId = (state: RootState, cardId: string) => {
  return _.filter(state.comments, (comment: Comment) => comment.cardId === cardId);
};

export default {
  getCommentById,
  getCommentsByCardId,
};
