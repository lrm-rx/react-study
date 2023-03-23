import { useState, useEffect, memo, useMemo } from "react";
import { Pagination, Calendar } from "antd";
import dayjs from "dayjs";
import { ArticleWraper } from "./style";
import { ArticleItem } from "@/components/ArticleItem";

const Article = memo(() => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    let timer = 0;
    const setTiem = () => {
      setCurrentTime(dayjs(new Date()).format("YYYY-MM-DD hh:mm:ss"));
      timer = setTimeout(setTiem, 1000);
    };
    timer = setTimeout(setTiem, 1000);

    return () => {
      clearTimeout(timer); // 组件销毁时，一定清除定时器
    };
  });
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <ArticleWraper>
      <div className="wrap-v2 article-area">
        <div className="article-left">
          <ArticleItem />
        </div>
        <div className="article-right">
          <p className="current-date-time">现在是: {currentTime}</p>
          <Calendar fullscreen={false} />
        </div>
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
