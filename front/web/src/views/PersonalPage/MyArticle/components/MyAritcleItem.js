import { useState, useEffect, memo } from "react";
import {
  EyeOutlined,
  CommentOutlined,
  FieldTimeOutlined,
  WalletOutlined,
  TagsOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import { MyAritcleItemWraper } from "./style";
import c2 from "@assets/images/bg2.jpg";

const MyAritcleItem = memo((props) => {
  const { sourceData = {}, selectCheckBox } = props;
  return (
    <MyAritcleItemWraper>
      <div className="left">
        <input
          className="checkbox-input"
          onChange={() => selectCheckBox(sourceData?.id)}
          type="checkbox"
          checked={sourceData?.isCheck}
        />
        <img src={c2} alt="" />
      </div>
      <div
        className="right"
        onClick={() => {
          alert("查看");
        }}
      >
        <div className="title text-nowrap">{sourceData?.title}</div>
        <ul>
          <li className="watch-count">
            <EyeOutlined style={{ marginRight: "6px" }} />
            查看({sourceData?.viewCount})
          </li>
          <li
            className="common-cout"
            onClick={(e) => {
              e.stopPropagation();
              alert("评论");
            }}
          >
            <CommentOutlined style={{ marginRight: "6px" }} />
            评论(99)
          </li>
          <li>
            <FieldTimeOutlined style={{ marginRight: "6px" }} />{" "}
            {sourceData?.updatedAt}
          </li>
        </ul>
        <div className="sort-content text-nowrap">
          {sourceData?.contentText}
        </div>
        <ul className="text-nowrap">
          <li className="category">
            <WalletOutlined style={{ marginRight: "6px" }} />
            {sourceData?.category?.name}
          </li>
          <li className="tags text-nowrap">
            <TagsOutlined style={{ marginRight: "6px" }} />
            {sourceData?.tags?.map((item) => (
              <span key={item.id} className="article-tag">
                {item?.name}
              </span>
            ))}
          </li>
        </ul>
      </div>
      <div className="article-operation">
        <Space size={30}>
          <EditOutlined
            className="edit-icon"
            onClick={() => {
              alert("编辑");
            }}
          />
          <DeleteOutlined
            className="delete-icon"
            onClick={() => {
              alert("删除");
            }}
          />
        </Space>
      </div>
    </MyAritcleItemWraper>
  );
});

export default MyAritcleItem;
