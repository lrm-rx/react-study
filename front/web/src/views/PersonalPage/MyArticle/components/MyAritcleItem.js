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
import { Space, Popconfirm } from "antd";
import { ARTICLEDEL } from "@common/contants";
import { useImgHook } from "@hooks";
import { MyAritcleItemWraper } from "./style";
import c2 from "@assets/images/bg2.jpg";
import blank from "@assets/images/blank.png";

const MyAritcleItem = memo((props) => {
  const { sourceData = {}, selectCheckBox } = props;
  useImgHook(".item-img", (enties) => {}, null);
  return (
    <MyAritcleItemWraper>
      <div className="left">
        <input
          className="checkbox-input"
          onChange={() => selectCheckBox(sourceData?.id)}
          type="checkbox"
          checked={sourceData?.isCheck}
        />
        <img
          src={blank}
          data-src={sourceData?.coverImage || c2}
          className="item-img"
          alt="文章封面"
        />
      </div>
      <div
        className="right"
        onClick={() => {
          props.readArticle && props.readArticle(sourceData?.id);
        }}
      >
        <div className="title text-nowrap">{sourceData?.title}</div>
        <ul>
          <li className="watch-count">
            <EyeOutlined style={{ marginRight: "6px" }} />
            查看({sourceData?.viewCount})
          </li>
          <li className="common-cout">
            <CommentOutlined style={{ marginRight: "6px" }} />
            评论({sourceData?.comments?.length})
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
              props.updateArticle && props.updateArticle(sourceData?.id);
            }}
          />
          <Popconfirm
            title="温馨提示"
            description="您确定要删除吗?"
            onConfirm={() => {
              props.delArticle &&
                props.delArticle(sourceData?.id, ARTICLEDEL.SINGGLEDEL);
            }}
            okText="确定"
            cancelText="取消"
          >
            <DeleteOutlined className="delete-icon" />
          </Popconfirm>
        </Space>
      </div>
    </MyAritcleItemWraper>
  );
});

export default MyAritcleItem;
