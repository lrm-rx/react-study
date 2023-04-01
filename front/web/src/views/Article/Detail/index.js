import { useState, useEffect, useRef, memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from "rehype-raw"; // 解析标签，支持html语法
import MarkNav from "markdown-navbar";
import classnames from "classnames";
import "github-markdown-css"; //代码块的背景和表格线条等样式
import "./navbar.scss"; //引入修改后的目录格式
import {
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { message, Row, Col, Space, Tag } from "antd";
import { getArticleDetail } from "@service/article";
import { ArticleDetailWraper } from "./style";
import { mdText } from "@common/local-data";
import { GLOBAL_HEADER_TO_TOP } from "@common/contants";
import { useViewWidth } from "@hooks/useViewWidth";
import { useScrollTop } from "@hooks/useScrollTop";
import { Comment } from "@components/comment";

const ArticleDetail = memo(() => {
  const navRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [mdContent, setMdContent] = useState("");
  const { scrollTop } = useScrollTop();
  const [fixMarkNav, setFixMarkNav] = useState(false);
  const [markNavWidth, setMarkNavWidth] = useState(0);
  const [markNavOffsetLeft, setMarkNavOffsetLeft] = useState(0);
  const { windowWidth } = useViewWidth();
  useEffect(() => {
    setMarkNavWidth(navRef.current.getBoundingClientRect().width);
    setMarkNavOffsetLeft(navRef.current.getBoundingClientRect().x);
  }, [windowWidth]);
  useEffect(() => {
    if (scrollTop >= GLOBAL_HEADER_TO_TOP) {
      setFixMarkNav(true);
      return;
    }
    setFixMarkNav(false);
  }, [scrollTop]);

  const [articleTitle, setArticleTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    (async () => {
      const result = await getArticleDetail(Number(params.id));
      if (Number(result.code) !== 200) {
        message.error({
          content: result.msg,
          duration: 1,
        });
        return;
      }
      const detail = result.data || {};
      setArticleTitle(detail.title);
      setAuthor(detail.user.username);
      setCategory(detail.category.name);
      setTags(detail.tags);
      setCreatedAt(detail.createdAt);
      setMdContent(detail.contentText);
    })();
  }, [params.id]);

  return (
    <ArticleDetailWraper
      navWidth={markNavWidth}
      navOffsetLet={markNavOffsetLeft}
    >
      <h3 className="article-title">{articleTitle}</h3>
      <Row justify="center" className="article-info">
        <Col span={3}>作者: {author}</Col>
        <Col span={3}>分类: {category}</Col>
        <Col span={8}>
          <span className="article-info-tag">标签:</span>
          <Space>
            {tags.map((item) => (
              <Tag key={item.id} color={item.tagColor}>
                {item.name}
              </Tag>
            ))}
          </Space>
        </Col>
        <Col span={5}>创建时间: {createdAt}</Col>
      </Row>
      <div className="article-detail">
        <div className="article-nav" ref={navRef}>
          <MarkNav
            className={classnames({ ["article-mark-nav"]: fixMarkNav })}
            source={mdContent}
            headingTopOffset={40} //离顶部的距离
            ordered={false} //是否显示标题题号1,2等
            updateHashAuto={false}
          />
        </div>
        <div className="article-main-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className={"markdown-body"}
          >
            {mdContent}
          </ReactMarkdown>
        </div>
      </div>
      {/* 评论 */}
      <Comment />
    </ArticleDetailWraper>
  );
});

export default ArticleDetail;
