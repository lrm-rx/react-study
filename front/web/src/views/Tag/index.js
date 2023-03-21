import { memo } from "react";
import { TagWraper } from "./style";
import tagBgImg from "@/assets/images/bg3.jpg";

const Tag = memo(() => {
  return <TagWraper tagBg={tagBgImg}>标签</TagWraper>;
});

export default Tag;
