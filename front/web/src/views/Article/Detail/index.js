import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useRef,
  memo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { createComment, deleteComment } from "@service/comment";
import { ArticleDetailWraper } from "./style";
import { mdText } from "@common/local-data";
import { GLOBAL_HEADER_TO_TOP } from "@common/contants";
import { useViewWidth } from "@hooks";
import { useScrollTop } from "@hooks";
import { usePrevious } from "@hooks";
import { debounce } from "@utils/common";
import { Comment } from "@components/comment";
import { setShowLoginModal } from "@store/modules/globalSlice";
import {
  getCommentListByArticleIdAction,
  resetPaging,
} from "@store/modules/commentSlice";

// 创造一个上下文
export const articleComent = createContext(null);

const ArticleDetail = memo(() => {
  const prevPosition = usePrevious(window.pageYOffset);
  const navRef = useRef();
  const commentRef = useRef();
  const articleIdRef = useRef();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const commentList = useSelector((state) => state.comment.list);
  const comment = useSelector((state) => state.comment);
  const commentTotal = useSelector((state) => state.comment.total);
  const dispatch = useDispatch();
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
    // setMarkNavWidth(navRef.current.getBoundingClientRect().width);
    // setMarkNavOffsetLeft(navRef.current.getBoundingClientRect().x);
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
      // useRef有记忆功能
      articleIdRef.current = detail.id;
      setArticleTitle(detail.title);
      setAuthor(detail.user.nickname);
      setCategory(detail.category.name);
      setTags(detail.tags);
      setCreatedAt(detail.createdAt);
      setMdContent(detail.contentText);
      // 获取评论
      dispatch(
        getCommentListByArticleIdAction({ articleId: Number(params.id) })
      );
    })();
  }, [params.id]);

  const addComment = async (content) => {
    // 判断是否已经登录
    if (!isLogin) {
      dispatch(setShowLoginModal(true));
      return;
    }
    if (!content.trim()) {
      message.error({
        content: "评论内容不能为空!",
        duration: 1,
      });
      return;
    }
    const data = { articleId: articleIdRef.current, content };
    const result = await createComment(data);
    if (Number(result.code) !== 200) {
      message.error({
        content: result.msg,
        duration: 1,
      });
      return;
    }
    commentRef.current.removeCommentText();
    // 重置数据
    await dispatch(resetPaging());
    // 获取评论
    dispatch(getCommentListByArticleIdAction({ articleId: Number(params.id) }));
    message.success({
      content: result.msg,
      duration: 1,
    });
  };

  const delComment = async (id) => {
    const result = await deleteComment([id]);
    if (Number(result.code) !== 200) {
      message.error({
        content: result.msg,
        duration: 1,
      });
      return;
    }
    message.success({
      content: "删除成功!",
      duration: 1,
    });
    // 重置数据
    await dispatch(resetPaging());
    // 获取评论
    dispatch(getCommentListByArticleIdAction({ articleId: Number(params.id) }));
    message.success({
      content: result.msg,
      duration: 1,
    });
  };

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
        <div className="article-nav global-scrollbar-style" ref={navRef}>
          <MarkNav
            className={classnames({ ["article-mark-nav"]: fixMarkNav })}
            source={mdContent}
            headingTopOffset={40} //离顶部的距离
            ordered={false} //是否显示标题题号1,2等
            updateHashAuto={false}
          />
        </div>
        <div className="article-main-content global-scrollbar-style">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className={"markdown-body"}
          >
            {mdContent}
          </ReactMarkdown>
        </div>
      </div>
      {/* 评论, 练习Context跨组件通过 */}
      {/* <articleComent.Provider value={{ addComment }}> */}
      <Comment
        addComment={addComment}
        delComment={delComment}
        total={commentTotal}
        commentList={commentList}
        ref={commentRef}
      />
      {/* </articleComent.Provider> */}
    </ArticleDetailWraper>
  );
});

export default ArticleDetail;
