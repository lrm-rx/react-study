import { useState, useEffect, useRef, memo } from "react";
import MyAritcleItem from "./components/MyAritcleItem";
import { Button, Input, Space, message } from "antd";
import { SearchOutlined, InboxOutlined } from "@ant-design/icons";
import { getArticleList, delArticle } from "@service/article";
import { ARTICLEDEL } from "@common/contants";
import { MyArticleWraper } from "./style";
const MyArticle = memo(() => {
  const chageFlagRef = useRef();
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [list, setList] = useState([]);
  const [delIds, setDelIds] = useState([]);
  const [selectAllFlag, setSelectAllFlag] = useState(true);
  const articleList = async () => {
    const result = await getArticleList();
    if (Number(result.code) !== 200) {
      message.error({
        content: result.msg || "出错啦!",
        duration: 1,
      });
      return;
    }
    const newList = result.data.list.map((item) => {
      return {
        ...item,
        isCheck: false,
      };
    });
    newList.length > 0 && setList(newList);
  };
  useEffect(() => {
    articleList();
  }, []);
  const delMyArticle = async (ids, type) => {
    let delIds = ids;
    if (type === ARTICLEDEL.BATCHDEL && !ids.length) {
      message.warning({
        content: "请选择需要删除的文章!",
        duration: 1,
      });
      return;
    }
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
    if (delIds.length === list.length) {
      setSelectAllFlag(false);
    } else {
      setSelectAllFlag(true);
    }
  }, [delIds]);

  return (
    <MyArticleWraper>
      <div className="list-header">
        <Input
          className="header-search"
          placeholder="搜索我的文章"
          prefix={<SearchOutlined />}
          onPressEnter={(e) => {
            alert(e.target.value);
          }}
        />
        <Space>
          <Button type="primary" onClick={selectAll} ref={chageFlagRef}>
            {selectAllFlag ? "全选" : "取消全选"}
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => delMyArticle(delIds, ARTICLEDEL.BATCHDEL)}
          >
            批量删除
          </Button>
        </Space>
      </div>
      {list.length ? (
        <div className="item-content-area global-scrollbar-style">
          {list.map((item) => (
            <MyAritcleItem
              selectCheckBox={selectCheckBox}
              sourceData={item}
              delArticle={delMyArticle}
              key={item.id}
            />
          ))}
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
