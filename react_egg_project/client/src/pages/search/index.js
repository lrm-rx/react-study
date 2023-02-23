import React, { useState, useEffect } from "react";
import { SearchBar, SpinLoading } from "antd-mobile";
import { useHttpHook, useObserverHook, useImgHook } from "@/hooks";
import { useLocation } from "umi";
import { urlStrToObj } from "@/utils";
import { ShowLoading } from "@/components";
import { CommonEnum } from "@/enums";

import "./index.less";

export default function (props) {
  const { search } = useLocation();
  const query = urlStrToObj(search);
  const [houseName, setHouseName] = useState("");
  const [page, setPage] = useState({
    pageSize: CommonEnum.PAGE.pageSize,
    pageNum: CommonEnum.PAGE.pageNum,
  });

  const [houseLists, setHouseLists] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [houseSearchName, setHouseSearchName] = useState("");

  const [houses, loading] = useHttpHook({
    url: "/house/search",
    body: {
      ...page,
      houseName,
      code: query?.code,
      startTime: `${query?.startTime} 00:00:00`,
      endTime: `${query?.endTime} 23:59:59`,
    },
    watch: [page.pageNum, houseSearchName],
  });

  /**
   * 1. 监听loading是否展示出来
   * 2. 修改分页数据
   * 3. 监听分页数据的修改,发送接口, 请求下一页的数据
   * 4. 监听loading变化,拼装数据
   */
  useObserverHook(
    `#${CommonEnum.LOADING_ID}`,
    (entries) => {
      if (!loading && entries[0].isIntersecting) {
        setPage({
          ...page,
          pageNum: page.pageNum + 1,
        });
      }
    },
    null
  );

  useEffect(() => {
    if (!loading && houses) {
      if (houses.length) {
        setHouseLists([...houseLists, ...houses]);
        if (houses.length < page.pageSize) {
          setShowLoading(false);
        }
      } else {
        setShowLoading(false);
      }
    }
  }, [loading]);

  useImgHook(".item-img", (enties) => {}, null);

  const handleChange = (value) => {
    setHouseName(value);
  };

  const _handleSearch = (value) => {
    setHouseName(value);
    setHouseSearchName(value);
    setPage({
      pageSize: CommonEnum.PAGE.pageSize,
      pageNum: CommonEnum.PAGE.pageNum,
    });
    setHouseLists([]);
  };

  const handleCancel = () => {
    _handleSearch("");
  };

  const handleSearch = (value) => {
    _handleSearch(value);
  };

  return (
    <div className="search-page">
      {/* 顶部搜索栏 */}
      <div className="search-page-top">
        <SearchBar
          placeholder="搜索民宿"
          showCancelButton
          value={houseName}
          onChange={handleChange}
          onCancel={handleCancel}
          onSearch={handleSearch}
        />
      </div>
      {/* 搜索结果 */}
      {!houseLists.length ? (
        <SpinLoading className="houses-loading" color="primary" />
      ) : (
        <div className="result">
          {houseLists.map((item) => (
            <div className="item" key={item.id}>
              <img
                src={require("../../assets/blank.png")}
                data-src={item.img}
                className="item-img"
                alt="img"
              />
              <div className="item-right">
                <div className="title">{item.title}</div>
                <div className="price">{item.price}</div>
              </div>
            </div>
          ))}
          {/* {showLoading ? (
            <div id="ak-loading" className="loading-bottom">
              <SpinLoading color="primary" />
            </div>
          ) : (
            <div className="loading-bottom">~~我是有底线的哦~~</div>
          )} */}
          <ShowLoading showLoading={showLoading} />
        </div>
      )}
    </div>
  );
}
