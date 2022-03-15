import reducer, { actions } from './toolkitSlice';
export const { setCardName, deleteCard, addCard, setCardDescription } = actions;
export { default as CardSelectors } from './selectors';
export default reducer;
