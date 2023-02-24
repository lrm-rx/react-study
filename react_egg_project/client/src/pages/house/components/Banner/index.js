import React, { useState, useEffect } from "react";
import { Swiper } from "antd-mobile";

const colors = [
  "https://5b0988e595225.cdn.sohucs.com/images/20181023/49199010439c4f819751cdb1c8043a8a.jpeg",
  "https://5b0988e595225.cdn.sohucs.com/images/20171205/61601034a37249b0801c4a0a6130d2fe.jpeg",
  "https://sghimages.shobserver.com/img/catch/2021/10/01/6242601f-0c60-4bd8-8e02-c6330fe59a29.jpg",
  "https://5b0988e595225.cdn.sohucs.com/images/20181128/6bb1e7f87ced4cc8ac36526492f8453e.jpeg",
];
export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <Swiper autoplay loop>
      {colors.map((img, index) => (
        <Swiper.Item key={index}>
          <img className="ak-swiper-img" src={img} alt="" />
        </Swiper.Item>
      ))}
    </Swiper>
  );
}
