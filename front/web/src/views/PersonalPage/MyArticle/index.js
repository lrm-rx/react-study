import { useState, useEffect, useRef, memo } from "react";
import MyAritcleItem from "./components/MyAritcleItem";
import { Button, Input, Space, message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, InboxOutlined } from "@ant-design/icons";
import { ShowLoading } from "@components/ShowLoading";
import { getMyArticleList, delArticle } from "@service/article";
import { ARTICLEDEL } from "@common/contants";
import { useObserverHook } from "@hooks";
import { LOADING_ID } from "@common/contants";
import { MyArticleWraper } from "./style";
const MyArticle = memo(() => {
  const chageFlagRef = useRef();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [list, setList] = useState([]);
  const [delIds, setDelIds] = useState([]);
  const [selectAllFlag, setSelectAllFlag] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);
  const [showselected, setShowselected] = useState(false);
  const [refreshCount, setRefreshCount] = useState(false);
  const articleList = async () => {
    const result = await getMyArticleList({
      keyword,
      pageNum,
      pageSize: 10,
    });
    if (Number(result.code) !== 200) {
      message.error({
        content: result.msg || "出错啦!",
        duration: 1,
      });
      return;
    }
    setTotal(result.data.total);
    result.data.list.length > 0 ? setShowLoading(true) : setShowLoading(false);
    const newList = result.data.list.map((item) => {
      return {
        ...item,
        isCheck: false,
      };
    });
    newList.length > 0 && setList([...list, ...newList]);
  };
  useEffect(() => {
    if (!isLogin) return;
    articleList();
  }, [pageNum, refreshCount]);
  useObserverHook(
    `#${LOADING_ID}`,
    (entries) => {
      if (list && list.length && showLoading && entries[0].isIntersecting) {
        setPageNum((prePageNum) => prePageNum + 1);
      }
    },
    [list, showLoading]
  );
  const delMyArticle = async (ids, type) => {
    let delIds = ids;
    if (type === ARTICLEDEL.SINGGLEDEL) {
      delIds = [ids];
    }
    const result = await delArticle(delIds);
    if (Number(result.code) !== 200) {
      message.error({
        content: result.msg || "出错啦!",
        duration: 1,
      });
      return;
    }
    setList([]);
    if (pageNum === 1) {
      setRefreshCount((preRefreshCount) => preRefreshCount + 1);
    } else {
      setPageNum(1);
    }
    message.success({
      content: result.msg,
      duration: 1,
    });
  };
  const selectCheckBox = (id) => {
    const newList = list.map((item) => {
      return {
        ...item,
        isCheck: item.id === id ? !item.isCheck : item.isCheck,
      };
    });
    setList(newList);
  };

  const selectAll = () => {
    setSelectAllFlag(!selectAllFlag);
    if (chageFlagRef.current.innerText !== "取消全选") {
      const selectList = list.map((item) => {
        return {
          ...item,
          isCheck: true,
        };
      });
      setList(selectList);
    } else {
      const selectList = list.map((item) => {
        return {
          ...item,
          isCheck: false,
        };
      });
      setList(selectList);
    }
  };

  useEffect(() => {
    const ids = list
      .filter((item) => item.isCheck)
      .map((subItem) => subItem.id);
    setDelIds(ids);
  }, [list]);

  useEffect(() => {
    delIds.length > 0 ? setShowselected(true) : setShowselected(false);
    delIds.length === list.length
      ? setSelectAllFlag(false)
      : setSelectAllFlag(true);
  }, [delIds]);

  const updateArticle = (id) => {
    navigate(`/article/update?id=${id}`);
  };

  const readArticle = (id) => {
    navigate(`/article/detail/${id}`);
  };

  const seachInputEnter = (value) => {
    setKeyword(value);
    setList([]);
    if (pageNum === 1) {
      setRefreshCount((preRefreshCount) => preRefreshCount + 1);
      return;
    }
    setPageNum(1);
  };

  return (
    <MyArticleWraper>
      <div className="list-header">
        <Input
          className="header-search"
          placeholder="搜索我的文章"
          prefix={<SearchOutlined />}
          onPressEnter={(e) => {
            seachInputEnter(e.target.value);
          }}
        />

        <Space>
          <Button
            type="primary"
            onClick={selectAll}
            ref={chageFlagRef}
            disabled={list.length === 0}
          >
            {selectAllFlag ? "全选" : "取消全选"}
          </Button>
          <Popconfirm
            title="温馨提示"
            description="您确定要删除吗?"
            onConfirm={() => delMyArticle(delIds, ARTICLEDEL.BATCHDEL)}
            disabled={delIds.length === 0}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger disabled={delIds.length === 0}>
              批量删除
            </Button>
          </Popconfirm>

          <div>共 {total} 篇文章</div>
          {showselected && <div>已选中:{delIds.length}篇文章</div>}
        </Space>
      </div>
      {list.length ? (
        <div className="item-content-area global-scrollbar-style">
          {list.map((item) => (
            <MyAritcleItem
              selectCheckBox={selectCheckBox}
              sourceData={item}
              delArticle={delMyArticle}
              updateArticle={updateArticle}
              readArticle={readArticle}
              key={item.id}
            />
          ))}
          <ShowLoading showLoading={showLoading} />
        </div>
      ) : (
        <div className="list-no-data">
          <div className="content-tip">
            <InboxOutlined className="no-data-icon" />
            <span>暂无数据</span>
          </div>
        </div>
      )}
    </MyArticleWraper>
  );
});

export default MyArticle;
