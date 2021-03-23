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
    props: any;
  };
};
export type DragnItemsList = DragnItem[];
export const generateItems = (
  count: number = 1,
  offset: number = 0,
  childrens?: React.ReactNode[] & any
): DragnItemsList => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: uuidv4(),
    content: (childrens && childrens[k]) ?? (childrens || ""),
    element: {
      type: childrens && (childrens.type?.name ?? childrens.type),
      props: childrens && childrens.props,
    },
  }));
};
