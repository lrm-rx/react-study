import { useState, useEffect, useRef, useMemo, memo } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { WriteArticleWraper } from "./style";

const WriteArticle = memo(() => {
  const delay = 1000;
  const [markdown, setMarkdown] = useState("");

  return (
    <WriteArticleWraper>
      <div className="article-write">
        <MarkdownEditor
          className="article-write-md"
          value={markdown}
          visible={true}
          onChange={(editor, data, value) => setMarkdown(value)}
        />
      </div>
    </WriteArticleWraper>
  );
});

export default WriteArticle;
