const _ = require('lodash');
const getColumns = (state: any) => {
  return state.columns;
};
export const getColumnById = (state: any, id: string) => {
  return state.columns[_.findIndex(state.columns, { id })]
}

export default {
  getColumns,
  getColumnById,
};
