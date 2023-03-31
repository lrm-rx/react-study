import { useState, useEffect, memo } from "react";
import { Tag, message } from "antd";
import { getAllTags } from "@service/tags";
import { TagWraper } from "./style";
import tagBgImg from "@assets/images/bg3.jpg";

const ArticleTag = memo(() => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getAllTags();
      if (Number(result.code) !== 200) {
        message.error({
          content: result.msg,
          duration: 1,
        });
        return;
      }
      (await result?.data) && setTags(result.data);
    })();
  }, []);
  // 不把事件绑定到tag上, 使用事件委托
  // const clickTag = (id) => {
  //   return () => {
  //     console.log("id:", id);
  //   };
  // };

  const clickTag = (e) => {
    if (!e.target.getAttribute("data-tag-id")) return;
  };

  return (
    <TagWraper tagBg={tagBgImg}>
      <div className="tagcloud-all" onClick={clickTag}>
        {tags.map((item) => (
          <Tag
            data-tag-id={item.id}
            className="child-node"
            key={item.id}
            color={item.tagColor}
          >
            {item.name}
          </Tag>
        ))}
      </div>
    </TagWraper>
  );
});

export default ArticleTag;
