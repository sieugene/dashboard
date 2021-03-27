import { v4 as uuidv4 } from "uuid";
/**
 * Список карточек
 *
 * @param {count} first - количество элементов генерируемого списка
 * * @param {offset} second - отступ
 * @param {childrens} three - props children
 * @returns {[id: string, content: ChildNode]}
 */
export type DragnItem = {
  id: string;
  content: React.ReactNode;
  element: {
    type: string;
    props: unknown;
  };
};
export type DragnItemRaw = {
  id: string;
  element: {
    type: string;
    props: unknown;
  };
};
export type DragnItemsRawList = DragnItemRaw[];
export type DragnItemsList = DragnItem[];
export const generateItems = (
  count: number = 1,
  offset: number = 0,
  childrens?: React.ReactNode[] & any
): DragnItemsList => {
  const id = !!childrens?.props?.id ? childrens.props.id : uuidv4();
  const type =
    childrens?.props?.type ||
    (childrens?.type?.name ?? childrens?.type) ||
    undefined;

  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id,
    content: (childrens && childrens[k]) ?? (childrens || ""),
    element: {
      type,
      props: childrens && childrens.props,
    },
  }));
};
