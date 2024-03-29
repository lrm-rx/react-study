import { useState, useEffect, memo } from "react";
import { Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleByTagAction,
  inputValChange,
  openModal,
} from "@store/modules/globalSlice";
import { TagWraper } from "./style";
import tagBgImg from "@assets/images/bg3.jpg";

const ArticleTag = memo(() => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tagsInfo.list);

  const clickTag = (id, count, name) => {
    return async () => {
      if (count === 0) {
        message.warning({
          content: "没有文章引用该标签!",
          duration: 1,
        });
        return;
      }
      const content = `${name}(${count})`;
      await dispatch(inputValChange(content));
      dispatch(
        openModal({
          isSearchInput: false,
          open: true,
        })
      );
      dispatch(getArticleByTagAction([id]));
    };
  };

  return (
    <TagWraper tagBg={tagBgImg}>
      <div className="tagcloud-all">
        {tags.map((item) => (
          <Tag
            className="child-node"
            key={item.id}
            color={item.tagColor}
            onClick={clickTag(item.id, item.articleCount, item.name)}
          >
            {item.name}({item.articleCount})
          </Tag>
        ))}
      </div>
    </TagWraper>
  );
});

export default ArticleTag;
