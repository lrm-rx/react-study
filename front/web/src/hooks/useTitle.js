import { useState, useLayoutEffect } from "react";

const useTitle = (title) => {
  const [state, setState] = useState();

  useLayoutEffect(() => {
    document.title = title;
    setState(title);
  }, [title]);

  return state;
};

export default useTitle;
