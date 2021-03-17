import { DragnItemsList } from "./countInArray";

export const reorder = (
  list: DragnItemsList,
  startIndex: number,
  endIndex: number
): DragnItemsList => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
