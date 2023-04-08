import { useState, useEffect, useMemo, memo } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { Button, Form, Input, Select, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { debounce } from "@utils/common";
import {
  createArticle,
  getArticleDetail,
  updateArticle,
  uploadCoverImage,
} from "@service/article";
import NicknameAvatar from "@components/NicknameAvatar";
import Footer from "@components/Footer";
import { useScrollTop } from "@hooks";
import { ARTICLE_HEADER_TO_TOP } from "@common/contants";
import { WriteArticleWraper } from "./style";

const WriteArticle = memo(() => {
  const navigate = useNavigate();
  const params = useParams();
  const detail = useSelector((state) => state.articleInfo.detail);
  const [form] = Form.useForm();
  const [markdown, setMarkdown] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [search, setSearch] = useSearchParams();
  if (!(params.type === "create" || params.type === "update")) {
    navigate("/404");
  }
  useEffect(() => {
    document.title = params.type === "create" ? "博客-写文章" : "博客-编辑文章";
    if (params.type === "update") {
      form.setFieldsValue({
        title: detail?.title,
        coverImage: detail?.coverImage,
        categoryId: detail?.categoryId,
        tagIds: detail?.tags?.map((item) => item.id),
      });
      setMarkdown(detail?.contentText);
    }
    return () => {
      form.resetFields();
      setMarkdown("");
    };
  }, [params.type, detail]);
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
      coverImage: coverImg,
    };
    const result =
      params.type === "create"
        ? await createArticle(data)
        : await updateArticle(search.get("id"), data);
    if (Number(result.code) === 200) {
      message.success({
        content: result.msg,
        duration: 1,
      });
      navigate("/personalhomepage");
      return;
    }
    message.error({
      content: result.msg || "出错啦!",
      duration: 1,
    });
  };

  const handleUpload = async (options) => {
    const { file } = options;
    // 2M
    if (file.size > 1048576 * 2) {
      message.error({
        content: "图片大小不能超过2M, 请重新上传!",
        duration: 1,
      });
      return;
    }
    const formData = new FormData();
    formData.append("coverImage", file);
    const result = await uploadCoverImage(formData);
    if (Number(result.code) === 200) {
      message.success({
        content: "上传封面成功!",
        duration: 1,
      });
      const imgUrl = result.data || "";
      setCoverImg(imgUrl);
      return;
    }
    message.error({
      content: result.msg || "出错啦!",
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

            <Form.Item name="coverImage" label="文章封面">
              <Upload
                customRequest={handleUpload}
                accept=".jpg,.gif,.png,.jpeg"
                maxCount={1}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>上传封面</Button>
              </Upload>
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
          visible={false}
          onChange={(editor, data, value) => debounce(setMarkdown(editor), 300)}
        />
      </div>
      <Footer />
    </WriteArticleWraper>
  );
});

export default WriteArticle;
