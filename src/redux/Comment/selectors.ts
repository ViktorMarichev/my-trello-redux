import { Comment } from '../../types/tasks';
const _ = require('lodash');
export const getCommentById = (state: any, id: string) => {
    return state.comments[_.findIndex(state.comments, { id })]
}
export const getCommentsByCardId = (state: any, cardId: string) => {
    return _.filter(state.comments, (comment: Comment) => comment.cardId === cardId);
}

export default {
    getCommentById,
    getCommentsByCardId,
};
