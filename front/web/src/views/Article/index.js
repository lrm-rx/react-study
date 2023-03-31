import { useState, useEffect, memo, useMemo } from "react";
import { Pagination, Calendar, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getArticleList } from "@service/article";
import { ArticleWraper } from "./style";
import { ArticleItem } from "@components/ArticleItem";

const Article = memo(() => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    let timer = 0;
    const setTiem = () => {
      setCurrentTime(dayjs(new Date()).format("YYYY年MM月DD日 hh:mm:ss"));
      timer = setTimeout(setTiem, 1000);
    };
    timer = setTimeout(setTiem, 1000);

    return () => {
      clearTimeout(timer); // 组件销毁时，一定清除定时器
    };
  });

  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const articleList = async () => {
    const result = await getArticleList({ pageNum, pageSize });
    if (Number(result.code) !== 200) {
      message.error({
        content: result.msg,
        duration: 1,
      });
      return;
    }
    result?.data?.total && setTotal(result.data.total);
    result?.data?.list && setList(result.data.list);
  };
  useEffect(() => {
    articleList();
  }, [pageNum, pageSize]);

  const onShowSizeChange = (current, pageSize) => {
    setPageNum(1);
    setPageSize(pageSize);
  };
  const onChangePage = (current, pageSize) => {
    setPageNum(current);
    setPageSize(pageSize);
  };
  return (
    <ArticleWraper>
      <div className="wrap-v2 article-area">
        <div className="article-left">
          {list.length ? (
            list.map((item) => (
              <ArticleItem sourceData={item} key={item.id} list={list} />
            ))
          ) : (
            <div className="list-no-data">
              <div className="content-tip">
                <InboxOutlined className="no-data-icon" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
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
          onChange={onChangePage}
          current={pageNum}
          total={total}
          showTotal={(total) => `共 ${total} 条`}
          pageSizeOptions={[10, 20]}
        />
      </div>
    </ArticleWraper>
  );
});

export default Article;
