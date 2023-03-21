import { memo } from "react";
import { ArticleWraper } from "./style";
import articleBgImg from "@/assets/images/bg1.jpg";

const Article = memo(() => {
  return <ArticleWraper articleBg={articleBgImg}>文章</ArticleWraper>;
});

export default Article;
