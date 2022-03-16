import stateToolType from '../types/stateTool';
function generateId(array: Array<any>) {
  const id = Math.random().toString(36).substr(2, 9);

  if (array.find((x) => x.id === id) == undefined) {
    return id;
  } else {
    generateId(array);
  }
}
export const stateTool = {
  generateId: generateId,
} as stateToolType;
