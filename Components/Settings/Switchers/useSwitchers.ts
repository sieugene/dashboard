import { useSelector } from "react-redux";

export const useSwitchers = () => {
  const { autoSave, progressBar, localstorage } = useSelector(
    (state) => state.settings
  );
  const saveProgress = useSelector((state) => state.editors.saveProgress);

  return { autoSave, progressBar, localstorage, load: saveProgress };
};
