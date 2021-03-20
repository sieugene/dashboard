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
  draggable: Boolean;
};
export type DragnItemsList = DragnItem[];
export const generateItems = (
  count: number = 1,
  offset: number = 0,
  childrens?: React.ReactNode[],
  parentProps?: any
): DragnItemsList => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: (childrens && childrens[k]) ?? (childrens || ""),
    draggable: parentProps?.draggable ?? true,
  }));
};
