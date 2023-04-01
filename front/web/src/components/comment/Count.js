import { memo } from "react";
import { CountWraper } from "./style";

export const Count = memo(() => {
  return (
    <CountWraper>
      <span>99+ 评论</span>
    </CountWraper>
  );
});
