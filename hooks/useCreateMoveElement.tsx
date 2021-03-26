import { ElementCreator } from "../Components/ElementCreator/ElementCreator";
import { DragnItemsList, generateItems } from "../Utils/countInArray";

export const useCreateMoveElement = (
  setState: React.Dispatch<React.SetStateAction<DragnItemsList[]>>,
  state: DragnItemsList[]
) => {
  const createMoveElement = (
    type: string,
    id: string,
    columnOccurrences: Boolean
  ) => {
    const create = ElementCreator(type, id);
    if (!columnOccurrences) {
      return null;
    }
    if (create.extend) {
      setState([...state, create.extend]);
      return null;
    } else {
      return generateItems(1, 0, create.content);
    }
  };
  return createMoveElement;
};
