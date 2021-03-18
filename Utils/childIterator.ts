import { DragnItemsList, generateItems } from "./countInArray";

export const childIterator = (children: JSX.Element[]): DragnItemsList[] => {
  let gridItetator = 0;
  return children.reduce((items, child) => {
    if (child?.props?.children) {
      items.push(
        generateItems(
          child.props.children.length,
          gridItetator,
          child.props.children
        )
      );
      gridItetator += 10;
    }
    return items;
  }, []);
};
