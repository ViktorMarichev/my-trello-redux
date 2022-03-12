import { actions as ColumnActions } from '../redux/Columns/toolkitSlice';
import { actions as CardActions } from '../redux/Card/toolkitSlice';
import { actions as UserActions } from '../redux/User/toolkitSlice';
const _ = require('lodash');
const rootAction = _.concat(ColumnActions, CardActions, UserActions);
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<
  InferValueTypes<T>
>;
export type ActionType = InferActionTypes<typeof rootAction>;
