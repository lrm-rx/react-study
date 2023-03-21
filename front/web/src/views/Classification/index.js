import { memo } from "react";
import { CategoryWraper } from "./style";
import categoryBgImg from "@/assets/images/bg4.jpg";

const Category = memo(() => {
  return <CategoryWraper categoryBg={categoryBgImg}>分类</CategoryWraper>;
});

export default Category;
