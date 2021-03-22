import { moveItems } from "./../../Utils/moveItems";
import { reorder } from "./../../Utils/reorder";
import { DragnItemsList } from "./../../Utils/countInArray";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

type SetState = React.Dispatch<React.SetStateAction<DragnItemsList[]>>;

export const onDragEndHandler = (
  result: DropResult,
  state: DragnItemsList[],
  setState: SetState,
  createMoveElement: (type: string, id: string) => DragnItemsList
) => {
  const { source, destination, draggableId } = result;
  if (!destination) {
    return;
  }
  const sourceId = +source.droppableId;
  const newLocationId = +destination.droppableId;
  const isNotChangeCol = sourceId === newLocationId;
  const sourceElement = state[sourceId]
    ? state[sourceId]
    : createMoveElement(draggableId, uuidv4());
  const unrelated = !sourceElement || !state[newLocationId];

  if (unrelated) {
    return null;
  }

  if (isNotChangeCol) {
    setState(sortingСolumn(state, sourceId, source, destination));
  } else {
    const result = moveItems(
      sourceElement,
      state[newLocationId],
      source,
      destination
    );
    const newState = movingBetween(
      state,
      result,
      sourceId,
      newLocationId,
      source
    );
    setState(newState.filter((group) => group.length));
  }
};
// Изменение положения внутри колонки
const sortingСolumn = (
  state: DragnItemsList[],
  sourceId,
  source,
  destination
) => {
  const items = reorder(state[sourceId], source.index, destination.index);
  const newState = [...state];
  newState[sourceId] = items;
  return newState;
};
//Перемещение между колонками
const movingBetween = (state, result, sourceId, newLocationId, source) => {
  const newState = [...state];
  // If create new move element, get by type in the result
  if (!sourceId && sourceId !== 0) {
    newState[newLocationId] = [
      ...newState[newLocationId],
      ...result[source.droppableId],
    ];
  } else {
    newState[sourceId] = result[sourceId];
    newState[newLocationId] = result[newLocationId];
  }
  return newState;
};
