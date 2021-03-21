import { DragnItemsList } from "./countInArray";

type DroppableData = {
  droppableId: string;
  index: number;
};
type MovededItems = {
  [key: number]: DragnItemsList;
};
export const moveItems = (
  source: DragnItemsList,
  destination: DragnItemsList,
  droppableSource: DroppableData,
  droppableDestination: DroppableData
): MovededItems => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);
  const clearedDestClone = destClone.filter((item) => !!item);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = clearedDestClone;

  return result;
};
