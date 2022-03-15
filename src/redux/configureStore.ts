import { currentCard } from './../types/tasks';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import ColumnReducer from './Columns/index';
import CardReducer from './Card/index';
import UserReducer from './User/index';
import CommentReducer from './Comment/index';
import CurrentCardReducer from './CurrentCard/index';
const rootReducer = combineReducers({
  columns: ColumnReducer,
  cards: CardReducer,
  currentCard: CurrentCardReducer,
  user: UserReducer,
  comments: CommentReducer,
});
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store;
