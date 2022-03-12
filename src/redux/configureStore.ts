import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ColumnReducer from './Columns/index';
import CardReducer from './Card/index';
import UserReducer from './User/index';
const rootReducer = combineReducers({
  columns: ColumnReducer,
  cards: CardReducer,
  user: UserReducer,
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
export const persistor = persistStore(store);
export default store;
