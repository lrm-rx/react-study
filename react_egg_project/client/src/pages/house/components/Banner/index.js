import React, { useState, useEffect, memo } from "react";
import { Swiper } from "antd-mobile";

function Banner(props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <Swiper autoplay loop>
      {props?.banner?.map((img, index) => (
        <Swiper.Item key={index}>
          <img className="ak-swiper-img" src={img} alt="" />
        </Swiper.Item>
      ))}
    </Swiper>
  );
}

export default memo(Banner)
