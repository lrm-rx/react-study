import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHouseDetailAction,
  getHouseCommentAction,
  reloadComments,
} from "@/stores/modules/house";
import "./index.less";
import Banner from "./components/Banner";
import Info from "./components/Info";
import Lists from "./components/Lists";
import Footer from "./components/Footer";
import { useObserverHook } from "@/hooks";
import { CommonEnum } from "@/enums";

export default function (props) {
  const detail = useSelector((state) => state.house.detail);
  const comments = useSelector((state) => state.house.comments);
  const relaodCommentsNum = useSelector(
    (state) => state.house.relaodCommentsNum
  );
  const showLoading = useSelector((state) => state.house.showLoading);
  const dispatch = useDispatch();

  /**
   * 1. 监听loading是否展示出来
   * 2. 出发reload, 修改分页
   * 3. 监听reload变化, 重新请求接口
   * 4. 拼装数据
   */
  useObserverHook(
    `#${CommonEnum.LOADING_ID}`,
    (entries) => {
      if (
        comments &&
        comments.length &&
        showLoading &&
        entries[0].isIntersecting
      ) {
        dispatch(reloadComments());
      }
    },
    [comments, showLoading]
  );

  useEffect(() => {
    dispatch(getHouseDetailAction({}));
  }, []);

  useEffect(() => {
    dispatch(getHouseCommentAction({}));
  }, [relaodCommentsNum]);

  return (
    <div className="house-page">
      {/* banner */}
      <Banner banner={detail?.banner} />
      {/* 房屋信息 */}
      <Info info={detail?.info} />
      {/* 评论列表 */}
      <Lists lists={comments} showLoading={showLoading} />
      {/* footer */}
      <Footer />
    </div>
  );
}
