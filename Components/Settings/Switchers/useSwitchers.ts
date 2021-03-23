import { useSelector } from "react-redux";

export const useSwitchers = () => {
  const { autoSave, progressBar, localstorage } = useSelector(
    (state) => state.settings
  );

  return { autoSave, progressBar, localstorage };
};
