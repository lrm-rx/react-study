import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "umi";
import {
  getHouseDetailAction,
  getHouseCommentAction,
  reloadComments,
  resetData,
  hasOrderAction,
  addOrderAction,
  delOrderAction,
  handleOrderAction,
} from "@/stores/modules/house";
import "./index.less";
import Banner from "./components/Banner";
import Info from "./components/Info";
import Lists from "./components/Lists";
import Footer from "./components/Footer";
import { useObserverHook } from "@/hooks";
import { CommonEnum } from "@/enums";
import { urlStrToObj } from "@/utils";

function House(props) {
  // 获取url参数
  const { search } = useLocation();
  const query = urlStrToObj(search);

  const detail = useSelector((state) => state.house.detail);
  const comments = useSelector((state) => state.house.comments);
  const order = useSelector((state) => state.house.order);
  const relaodCommentsNum = useSelector(
    (state) => state.house.relaodCommentsNum
  );
  const showLoading = useSelector((state) => state.house.showLoading);
  const dispatch = useDispatch();

  const handleBtnClick = (id) => {
    if (!id) {
      dispatch(
        addOrderAction({
          id: query?.id,
        })
      );
    } else {
      dispatch(
        delOrderAction({
          id: query?.id,
        })
      );
    }
  };
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
    dispatch(
      getHouseDetailAction({
        id: query?.id,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getHouseCommentAction({
        id: query?.id,
      })
    );
  }, [relaodCommentsNum]);

  useEffect(() => {
    dispatch(
      handleOrderAction({
        id: query?.id,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      hasOrderAction({
        id: query?.id,
      })
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(
        resetData({
          detail: {},
        })
      );
    };
  }, []);

  return (
    <div className="house-page">
      {/* banner */}
      <Banner banner={detail?.banner} />
      {/* 房屋信息 */}
      <Info info={detail?.info} order={order} btnClick={handleBtnClick} />
      {/* 评论列表 */}
      <Lists lists={comments} showLoading={showLoading} />
      {/* footer */}
      <Footer />
    </div>
  );
}

export default memo(House);
