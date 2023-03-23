import { useState, useEffect, memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from "rehype-raw"; // 解析标签，支持html语法
import MarkNav from "markdown-navbar";
import "github-markdown-css"; //代码块的背景和表格线条等样式
import "./navbar.scss"; //引入修改后的目录格式
import {
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { ArticleDetailWraper } from "./style";
import { mdText } from "@/common/local-data";
import { useScrollTop } from "@/hooks/useScrollTop";

const ArticleDetail = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [mdContent, setMdContent] = useState("");
  const { scrollTop } = useScrollTop();
  useEffect(() => {
    console.log("scrollTop:", scrollTop);
  }, [scrollTop]);

  useEffect(() => {
    setMdContent(mdText);
  }, []);
  // console.log("id:", params.id);

  return (
    <ArticleDetailWraper>
      <div className="article-detail">
        <div className="article-nav">
          <MarkNav
            className="article"
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
    </ArticleDetailWraper>
  );
});

export default ArticleDetail;
