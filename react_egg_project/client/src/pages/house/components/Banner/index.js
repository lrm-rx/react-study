import React, { useState, useEffect } from "react";
import { Swiper } from "antd-mobile";

export default function (props) {
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
