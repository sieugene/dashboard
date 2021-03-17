import React, { FC, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { countInArray, DragnItemsList } from "../../Utils/countInArray";
import { reorder } from "../../Utils/reorder";
import { Card } from "../Card";
import { CardList } from "../Card/CardList";

type Props = {
  children: React.ReactNode[];
};

const DragndropWrapper: FC<Props> = ({ children }) => {
  const count = children?.length;

  const [state, setState] = useState<{ cards: DragnItemsList }>({
    cards: countInArray(count, children),
  });

  function onDragEnd(result) {
    const isDrag =
      !result.destination || result.destination.index === result.source.index;

    if (isDrag) {
      return;
    }

    const cards = reorder(
      state.cards,
      result.source.index,
      result.destination.index
    );

    setState({ cards });
  }

  return (
    <>
      {process.browser && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <CardList cards={state.cards} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
};
export default DragndropWrapper;
