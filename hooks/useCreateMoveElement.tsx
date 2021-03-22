import { EditImageUpload } from "../Components/EditComponent/EditImageUpload";
import { EditText } from "../Components/EditComponent/EditText";
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
    const elements = {
      TEXT__ELEMENT: {
        content: <EditText id={id} />,
        id,
      },
      EDITOR_IMAGE: {
        content: <EditImageUpload id={id} />,
        id,
      },
      ADD_LAYOUT: {
        extend: generateItems(1),
      },
    };
    const create = elements[type];
    // Если вне колонок
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
