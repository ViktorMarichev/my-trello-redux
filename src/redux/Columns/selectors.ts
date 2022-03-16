import { RootState } from '../configureStore';
const _ = require('lodash');

const getColumns = (state: RootState) => {
  return state.columns;
};
export const getColumnById = (state: RootState, id: string) => {
  return state.columns[_.findIndex(state.columns, { id })];
};

export default {
  getColumns,
  getColumnById,
};
