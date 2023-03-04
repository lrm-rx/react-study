import { useLayoutEffect, useState, memo } from "react";

function useTitleHook(title) {
  const [state, setState] = useState();

  useLayoutEffect(() => {
    document.title = title;
    setState(title);
  }, [title]);

  return state;
}

export default memo(useTitleHook);
