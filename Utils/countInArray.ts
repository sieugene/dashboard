/**
 * Список карточек
 *
 * @param {count} first - количество элементов генерируемого списка
 * @param {props} second - props children
 * @returns {[id: string, content: ChildNode]}
 */
export type DragnItem = {
  id: string;
  content: React.ReactNode;
};
export type DragnItemsList = DragnItem[];

export const countInArray = (
  count: number = 1,
  childrens: React.ReactNode[]
): DragnItemsList =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const custom = {
      id: `id-${k}`,
      content: childrens[k],
    };
    return custom;
  });
