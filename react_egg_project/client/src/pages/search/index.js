import React, { useState, useEffect } from "react";
import { SearchBar, SpinLoading } from "antd-mobile";
import { useHttpHook } from "@/hooks";

import "./index.less";

export default function (props) {
  const [houseName, setHouseName] = useState("");

  const [houses, loading] = useHttpHook({
    url: "/house/search",
    body: {
      pageNum: 1,
    },
  });

  useEffect(() => {}, []);

  const handleChange = (value) => {
    setHouseName(value);
  };

  const handleCancel = () => {
    console.log("取消");
  };

  const handleSearch = (value) => {
    console.log("handleSearch");
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
      {loading ? (
        <SpinLoading className="houses-loading" color="primary" />
      ) : (
        <div className="result">
          {houses.map((item) => (
            <div className="item" key={item.id}>
              <img src={item.img} alt="img" />
              <div className="item-right">
                <div className="title">{item.title}</div>
                <div className="price">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
