import { memo } from "react";
import {
  EyeOutlined,
  CommentOutlined,
  FieldTimeOutlined,
  WalletOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ArticleItemWraper } from "./style";
import c2 from "@assets/images/bg2.jpg";

export const ArticleItem = memo((props) => {
  const { sourceData = {}, selectCheckBox } = props;
  const navigate = useNavigate();
  const goArticleDetail = (id) => {
    navigate(`/article/detail/${id}`);
  };
  return (
    <ArticleItemWraper>
      <div
        className="article-card"
        onClick={() => goArticleDetail(sourceData?.id)}
      >
        <div className="left">
          <img src={c2} alt="" />
        </div>
        <div className="right">
          <div className="title text-nowrap">{sourceData?.title}</div>
          <ul>
            <li className="watch-count">
              <EyeOutlined style={{ marginRight: "6px" }} />
              查看({sourceData?.viewCount})
            </li>
            <li className="common-cout">
              <CommentOutlined style={{ marginRight: "6px" }} />
              评论({sourceData?.comments?.length})
            </li>
            <li>
              <FieldTimeOutlined style={{ marginRight: "6px" }} />
              {sourceData?.updatedAt}
            </li>
          </ul>
          <div className="sort-content text-nowrap">
            {sourceData?.contentText}
          </div>
          <ul className="text-nowrap">
            <li className="category">
              <WalletOutlined style={{ marginRight: "6px" }} />
              {sourceData?.category?.name}
            </li>
            <li className="tags text-nowrap">
              <TagsOutlined style={{ marginRight: "6px" }} />
              {sourceData?.tags?.map((item) => (
                <span key={item.id} className="article-tag">
                  {item?.name}
                </span>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </ArticleItemWraper>
  );
});
