import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/tasks';
import { stateTool } from '..';
const _ = require('lodash');
const CommentSlice = createSlice({
    name: 'commentSlice',
    initialState: [],
    reducers: {
        changeComment: (state: Array<Comment>, action) => {
            const commentIndex: number = _.findIndex(state, { id: action.payload.id });
            state[commentIndex].message = action.payload.message;
            state[commentIndex].date = new Date();

        },
        addComment: (state: Array<Comment>, action) => {
            const commentId = stateTool.generateId(state);
            state.push({
                id: commentId,
                cardId: action.payload.cardId,
                message: action.payload.message,
                date: new Date(),
                user: action.payload.username,
            } as Comment);

        },
        deleteComment: (state: Array<string>, action) => {
            return state = _.filter(state, (comment: Comment) => comment.id != action.payload.commentId);

        },
    },
});
export default CommentSlice.reducer;
export const actions = CommentSlice.actions;