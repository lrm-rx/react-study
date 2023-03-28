import { useState, useEffect, memo } from "react";
import { MyArticleWraper } from "./style";
const MyArticle = memo(() => {
  return <MyArticleWraper>我的文章</MyArticleWraper>;
});

export default MyArticle;
