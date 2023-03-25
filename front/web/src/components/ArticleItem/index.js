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

export const ArticleItem = memo(() => {
  const navigate = useNavigate();
  const goArticleDetail = () => {
    navigate(`/article/detail/${1}`);
  };
  return (
    <ArticleItemWraper>
      <div className="article-card">
        <div className="left">
          <img src={c2} alt="" />
        </div>
        <div className="right">
          <div className="title text-nowrap">
            JS常用正则合集JS常用正则合集JS常用正则合集JS常用正则合集JS常用正则合集JS常用正则合集
          </div>
          <ul>
            <li onClick={goArticleDetail} className="watch-count">
              <EyeOutlined style={{ marginRight: "6px" }} />
              查看(99)
            </li>
            <li className="common-cout">
              <CommentOutlined style={{ marginRight: "6px" }} />
              评论(99)
            </li>
            <li>
              <FieldTimeOutlined style={{ marginRight: "6px" }} /> 2022-05-23
              09:35
            </li>
          </ul>
          <div className="sort-content text-nowrap">
            网络中的常用正则表达式网络中的常用正则表达式网络中的常用正则表达式
          </div>
          <ul className="text-nowrap">
            <li className="skill">
              <WalletOutlined style={{ marginRight: "6px" }} />
              技术
            </li>
            <li className="tags text-nowrap">
              <TagsOutlined style={{ marginRight: "6px" }} />
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
              <span className="article-tag">正则</span>
            </li>
          </ul>
        </div>
      </div>
    </ArticleItemWraper>
  );
});
