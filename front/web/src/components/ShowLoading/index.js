import { memo } from "react";
import { Spin } from "antd";
import PropTypes from "prop-types";
import { LOADING_ID } from "@common/contants";
import "./index.scss";

export const ShowLoading = memo((props) => {
  return (
    <>
      {props.showLoading ? (
        <div id={LOADING_ID} className="loading-info">
          <Spin size="large" />
        </div>
      ) : (
        <div className="loading-info">
          {props?.title || "~~没有更多数据啦!~~"}
        </div>
      )}
    </>
  );
});

ShowLoading.defalutProps = {
  showLoading: true,
};

ShowLoading.propTypes = {
  showLoading: PropTypes.bool,
};
