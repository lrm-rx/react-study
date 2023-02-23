import React, { useState, useEffect } from "react";
import { SpinLoading } from "antd-mobile";
import PropTypes from "prop-types";
import { CommonEnum } from "@/enums";
import "./index.less";

export default function ShowLoading(props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div>
      {props.showLoading ? (
        <div id={CommonEnum.LOADING_ID} className="loading-info">
          <SpinLoading color="primary" />
        </div>
      ) : (
        <div className="loading-info">~~我是有底线的哦~~</div>
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
