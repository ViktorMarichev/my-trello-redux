import reducer, { actions } from './toolkitSlice';
export const { changeComment, addComment, deleteComment } = actions;
export { default as CommentSelectors } from './selectors';
export default reducer;