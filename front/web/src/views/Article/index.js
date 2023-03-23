import { memo } from "react";
import { Pagination } from "antd";
import { ArticleWraper } from "./style";
import { ArticleItem } from "@/components/ArticleItem";

const Article = memo(() => {
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <ArticleWraper>
      <div className="wrap-v2 article-area">
        <ArticleItem />
      </div>
      <div className="wrap-v2 article-area-paging">
        <Pagination
          showSizeChanger
          showQuickJumper
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={500}
          showTotal={(total) => `共 ${total} 条`}
          pageSizeOptions={[10, 20]}
        />
      </div>
    </ArticleWraper>
  );
});

export default Article;
