import { useState, useEffect, useMemo, memo } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { Button, Form, Input, Select, message } from "antd";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { debounce } from "@utils/common";
import { createArticle } from "@service/article";
import NicknameAvatar from "@components/NicknameAvatar";
import Footer from "@components/Footer";
import { useScrollTop } from "@hooks/useScrollTop";
import { ARTICLE_HEADER_TO_TOP } from "@common/contants";
import { WriteArticleWraper } from "./style";

const WriteArticle = memo(() => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categoryInfo.list);
  const tags = useSelector((state) => state.TagsInfo.list);

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

  const writeFinish = async (values) => {
    if (!markdown?.trim()) {
      message.error({
        content: "文章内容不能为空!",
        duration: 1,
      });
      return;
    }
    const data = {
      ...values,
      contentText: markdown?.trim(),
    };

    const result = await createArticle(data);
    if (Number(result.code) === 200) {
      message.success({
        content: result.msg,
        duration: 1,
      });
      navigate("/personalhomepage");
      return;
    }
    message.error({
      content: result.msg,
      duration: 1,
    });
  };

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
            onFinish={writeFinish}
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
              <Input autoComplete="off" className="article-title-input" />
            </Form.Item>

            <Form.Item
              name="categoryId"
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
                // defaultValue="lucy"
                fieldNames={{
                  value: "id",
                  label: "name",
                  options: categories,
                }}
                options={categories}
                placeholder="请选择"
              />
            </Form.Item>

            <Form.Item
              name="tagIds"
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
                // defaultValue="lucy"
                mode="tags"
                maxTagCount={2}
                fieldNames={{
                  value: "id",
                  label: "name",
                  options: tags,
                }}
                options={tags}
                placeholder="请选择"
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
          onChange={(editor, data, value) => debounce(setMarkdown(editor), 300)}
        />
      </div>
      <Footer />
    </WriteArticleWraper>
  );
});

export default WriteArticle;
