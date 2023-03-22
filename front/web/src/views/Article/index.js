import { memo } from "react";
// 在需要用到的 组件文件中引入中文语言包
import zhCN from "antd/es/locale/zh_CN";
// 引入国际化配置
import { ConfigProvider, Pagination } from "antd";
import { ArticleWraper } from "./style";

const Article = memo(() => {
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <ArticleWraper>
      <div className="wrap-v2 article-area">1111</div>
      <div className="wrap-v2 article-area-paging">
        <ConfigProvider local={zhCN}>
          <Pagination
            showSizeChanger
            showQuickJumper
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={3}
            total={500}
          />
        </ConfigProvider>
      </div>
    </ArticleWraper>
  );
});

export default Article;
