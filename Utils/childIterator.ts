import { DragnItemsList, generateItems } from "./countInArray";

export const childIterator = (children: JSX.Element[]): DragnItemsList[] => {
  let gridItetator = 0;
  return children.reduce((items, child) => {
    const isHaveChilds = child?.props?.children;
    const notEmpty = Object.values(child).length >= 1;
    const parentProps = child?.props || undefined;
    if (notEmpty) {
      items.push(
        generateItems(
          isHaveChilds ? child.props.children.length : 1,
          gridItetator,
          isHaveChilds ? child.props.children : child,
          parentProps
        )
      );
      gridItetator += 10;
    }
    return items;
  }, []);
};
