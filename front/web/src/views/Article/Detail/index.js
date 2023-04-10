import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useRef,
  memo,
} from "react";
import { CommentOutlined } from "@ant-design/icons";
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
  NavLink,
} from "react-router-dom";
import { message, Row, Col, Space, Tag, Tooltip } from "antd";
import { getArticleDetail } from "@service/article";
import { createComment, deleteComment } from "@service/comment";
import { ArticleDetailWraper } from "./style";
import { mdText } from "@common/local-data";
import { GLOBAL_HEADER_TO_TOP } from "@common/contants";
import {
  useViewWidth,
  useScrollTop,
  usePrevious,
  useObserverHook,
} from "@hooks";
import { LOADING_ID } from "@common/contants";
import { Comment } from "@components/comment";
import { setShowLoginModal } from "@store/modules/globalSlice";
import {
  getCommentListByArticleIdAction,
  reloadCommentListByArticleIdAction,
  resetPaging,
  reloadComments,
  resetCommentData,
} from "@store/modules/commentSlice";

// 创造一个上下文
export const articleComent = createContext(null);

const ArticleDetail = memo(() => {
  const relaodCommentsNumRef = useRef();
  const aidRef = useRef();
  const prevPosition = usePrevious(window.pageYOffset);
  const commentTopRef = useRef();
  const commentRef = useRef();
  const articleIdRef = useRef();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const commentList = useSelector((state) => state.comment.list);
  const commentTotal = useSelector((state) => state.comment.total);
  const showLoading = useSelector((state) => state.comment.showLoading);
  const relaodCommentsNum = useSelector(
    (state) => state.comment.relaodCommentsNum
  );
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [mdContent, setMdContent] = useState("");
  const { scrollTop } = useScrollTop();
  const [markNavWidth, setMarkNavWidth] = useState(0);
  const [markNavOffsetLeft, setMarkNavOffsetLeft] = useState(0);
  const { windowWidth } = useViewWidth();
  aidRef.current = params?.id || 0;
  /**
   * 1. 监听loading是否展示出来
   * 2. 发出reload, 修改分页
   * 3. 监听reload变化, 重新请求接口
   * 4. 拼装数据
   */
  useObserverHook(
    `#${LOADING_ID}`,
    (entries) => {
      if (
        commentList &&
        commentList.length &&
        showLoading &&
        entries[0].isIntersecting
      ) {
        dispatch(reloadComments());
      }
    },
    [commentList, showLoading]
  );

  const [articleTitle, setArticleTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [pagesInfo, setPagesInfo] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getArticleDetail(Number(params.id));
      if (Number(result.code) !== 200) {
        message.error({
          content: result.msg || "出错啦!",
          duration: 1,
        });
        return;
      }
      const detail = result?.data?.article || {};
      const pagesInfoRes = result?.data?.pageInfo || [];
      setPagesInfo(pagesInfoRes);
      // useRef有记忆功能
      articleIdRef.current = detail?.id;
      setArticleTitle(detail?.title);
      setAuthor(detail?.user?.nickname);
      setCategory(detail?.category?.name);
      setTags(detail?.tags);
      setCreatedAt(detail?.createdAt);
      setMdContent(detail?.contentText);
    })();
    return () => {
      // 重置数据
      dispatch(resetCommentData());
    };
  }, [params.id]);

  useEffect(() => {
    // 获取评论
    dispatch(getCommentListByArticleIdAction({ articleId: Number(params.id) }));
  }, [relaodCommentsNum]);

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
        content: result.msg || "出错啦!",
        duration: 1,
      });
      return;
    }
    commentRef.current.removeCommentText();
    // 重置数据
    await dispatch(resetPaging());
    // 获取评论
    dispatch(
      reloadCommentListByArticleIdAction({ articleId: Number(params.id) })
    );
    message.success({
      content: result.msg,
      duration: 1,
    });
  };

  const delComment = async (id) => {
    const result = await deleteComment([id]);
    if (Number(result.code) !== 200) {
      message.error({
        content: result.msg || "出错啦!",
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
    dispatch(
      reloadCommentListByArticleIdAction({ articleId: Number(params.id) })
    );
  };

  return (
    <ArticleDetailWraper
      navWidth={markNavWidth}
      navOffsetLet={markNavOffsetLeft}
    >
      <div
        className="comment-icon-fix"
        onClick={() => {
          window.scrollTo(0, commentTopRef.current.offsetTop - 60);
        }}
      >
        <Tooltip
          placement="left"
          title="滚动到评论区"
          color="#fff"
          overlayInnerStyle={{ color: "#000" }}
        >
          <CommentOutlined className="comment-icon" />
        </Tooltip>
      </div>
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
        <div className="article-nav">
          <MarkNav
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
      {/* 评论, 练习Context跨组件通过 */}
      {/* <articleComent.Provider value={{ addComment }}> */}
      <div ref={commentTopRef}></div>
      <Comment
        addComment={addComment}
        delComment={delComment}
        total={commentTotal}
        commentList={commentList}
        showLoading={showLoading}
        ref={commentRef}
      />
      <div className="up-and-down-pages">
        <ul className="pages-ul">
          {pagesInfo.length > 1 ? (
            <>
              <li className="text-nowrap">
                &lt;&lt;上一篇:
                <NavLink
                  className="pages-nav"
                  to={`/article/detail/${pagesInfo[1]?.id}`}
                >
                  {pagesInfo[1]?.title}
                </NavLink>
              </li>
              <li className="text-nowrap">
                &gt;&gt;下一篇:
                <NavLink
                  className="pages-nav"
                  to={`/article/detail/${pagesInfo[0]?.id}`}
                >
                  {pagesInfo[0]?.title}
                </NavLink>
              </li>
            </>
          ) : (
            <li className="text-nowrap">
              {pagesInfo[0]?.id < aidRef.current ? (
                <>&gt;&gt;下一篇:</>
              ) : (
                <>&lt;&lt;上一篇:</>
              )}
              <NavLink
                className="pages-nav"
                to={`/article/detail/${pagesInfo[0]?.id}`}
              >
                {pagesInfo[0]?.title}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      {/* </articleComent.Provider> */}
    </ArticleDetailWraper>
  );
});

export default ArticleDetail;
