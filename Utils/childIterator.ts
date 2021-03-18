import { DragnItemsList, generateItems } from "./countInArray";

export const childIterator = (children: JSX.Element[]): DragnItemsList[] => {
  let gridItetator = 0;
  return children.reduce((items, child) => {
    const isHaveChilds = child?.props?.children;
    const notEmpty = Object.values(child).length >= 1;
    if (notEmpty) {
      items.push(
        generateItems(
          isHaveChilds ? child.props.children.length : 1,
          gridItetator,
          isHaveChilds ? child.props.children : child
        )
      );
      gridItetator += 10;
    }
    return items;
  }, []);
};
