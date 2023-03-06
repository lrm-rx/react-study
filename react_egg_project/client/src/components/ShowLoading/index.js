import React, { useState, useEffect, memo } from "react";
import { SpinLoading } from "antd-mobile";
import PropTypes from "prop-types";
import { CommonEnum } from "@/enums";
import "./index.less";

function ShowLoading(props) {
  useEffect(() => {}, []);

  return (
    <div>
      {props.showLoading ? (
        <div id={CommonEnum.LOADING_ID} className="loading-info">
          <SpinLoading color="primary" />
        </div>
      ) : (
        <div className="loading-info">~~没有更多数据啦!~~</div>
      )}
    </div>
  );
}

ShowLoading.defalutProps = {
  showLoading: true,
};

ShowLoading.propTypes = {
  showLoading: PropTypes.bool,
};

export default memo(ShowLoading);
