let timer;
export const dbclick = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  fn: () => void
) => {
  clearTimeout(timer);
  if (event.detail === 1) {
    timer = setTimeout(() => {}, 200);
  } else if (event.detail === 2) {
    setTimeout(() => {
      // react-draft-wysiwyg will be catch error, this fn to macrotask
      fn();
    }, 0);
    event.preventDefault();
  }
};
