import { memo } from "react";
import { CountWraper } from "./style";

export const Count = memo((props) => {
  return (
    <CountWraper>
      <span>{props.total} 评论</span>
    </CountWraper>
  );
});
