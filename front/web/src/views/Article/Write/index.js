import { useState, useEffect, useRef, useMemo, memo } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import classnames from "classnames";
import NicknameAvatar from "@components/NicknameAvatar";
import Footer from "@components/Footer";
import { useScrollTop } from "@hooks/useScrollTop";
import { ARTICLE_HEADER_TO_TOP } from "@common/contants";
import { WriteArticleWraper } from "./style";

const WriteArticle = memo(() => {
  const { scrollTop } = useScrollTop();
  const [fixArticleHeader, setFixArticleHeader] = useState(false);
  useEffect(() => {
    if (scrollTop >= ARTICLE_HEADER_TO_TOP) {
      setFixArticleHeader(true);
    } else {
      setFixArticleHeader(false);
    }
  }, [scrollTop]);
  const [form] = Form.useForm();
  const [markdown, setMarkdown] = useState("");

  const handleChange = () => {};

  return (
    <WriteArticleWraper>
      <div
        className={classnames({
          ["article-write-header"]: true,
          ["fix-article-header"]: fixArticleHeader,
        })}
      >
        <div className="article-write-header-form">
          <Form
            className="write-article-form"
            form={form}
            name="writeArticle"
            layout="inline"
          >
            <Form.Item
              name="title"
              label="文章标题"
              rules={[
                {
                  required: true,
                  message: "请输入文章标题!",
                },
              ]}
            >
              <Input className="article-title-input" />
            </Form.Item>

            <Form.Item
              name="category"
              label="分类"
              rules={[
                {
                  required: true,
                  message: "请选择文章分类!",
                },
              ]}
            >
              <Select
                className="category-select"
                defaultValue="lucy"
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="tag"
              label="标签"
              rules={[
                {
                  required: true,
                  message: "请选择文章标签!",
                },
              ]}
            >
              <Select
                className="tag-select"
                defaultValue="lucy"
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="article-form-button"
                type="primary"
                htmlType="submit"
              >
                发布
              </Button>
            </Form.Item>
          </Form>
        </div>
        <NicknameAvatar />
      </div>
      <div className="article-write">
        <MarkdownEditor
          className="article-write-md"
          value={markdown}
          visible={true}
          onChange={(editor, data, value) => setMarkdown(value)}
        />
      </div>
      <Footer />
    </WriteArticleWraper>
  );
});

export default WriteArticle;
