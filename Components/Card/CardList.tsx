import React from "react";
import { Card } from ".";
import { DragnItemsList } from "../../Utils/countInArray";

type Props = {
  cards: DragnItemsList;
};

export const CardList: React.NamedExoticComponent<Props> = React.memo(
  function CardList({ cards }) {
    return (
      <>
        {cards.map((card, index) => (
          <Card card={card} index={index} key={card.id} />
        ))}
      </>
    );
  }
);
