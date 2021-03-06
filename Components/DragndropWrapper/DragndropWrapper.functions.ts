import { moveItems } from "./../../Utils/moveItems";
import { reorder } from "./../../Utils/reorder";
import { DragnItemsList } from "./../../Utils/countInArray";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
/**
 * onDragEndHandler - обработчик onDragEnd события, обновляет положение элементов в столбах
 * @param {result} first - result от onDragEnd
 * @param {state} second - state
 * @param {setState} three - обновление стейта
 * @param {createMoveElement} four - функция для создания элемента, должен содержать content и id
 * @returns {[id: string, content: ChildNode]}
 */
export const onDragEndHandler = (
  result: DropResult,
  state: DragnItemsList[],
  setState: React.Dispatch<React.SetStateAction<DragnItemsList[]>>,
  createMoveElement: (
    type: string,
    id: string,
    columnOccurrences: Boolean
  ) => DragnItemsList
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
    : createMoveElement(
        draggableId,
        uuidv4(),
        Boolean(newLocationId === 0 ? true : newLocationId)
      );
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
      source,
      destination
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
const movingBetween = (
  state,
  result,
  sourceId,
  newLocationId,
  source,
  destination
) => {
  const newState = [...state];
  // If create new move element, get by type in the result
  if (!sourceId && sourceId !== 0) {
    newState[newLocationId] = [...newState[newLocationId]];
    newState[newLocationId].splice(
      destination.index,
      0,
      result[source.droppableId][0]
    );
  } else {
    newState[sourceId] = result[sourceId];
    newState[newLocationId] = result[newLocationId];
  }
  return newState;
};
