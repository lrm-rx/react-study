import React, { useState, useEffect } from "react";
import { history } from "umi";
import { useObserverHook } from "@/hooks";

let observer;
let domNode;
export default function (props) {
  const [state, setState] = useState();

  const handleClick = () => {
    history.push("/");
  };

  useObserverHook("#loading", (entries) => {
    console.log("entries:", entries);
  });

  // useEffect(() => {
  //   console.log("进入页面");
  //   observer = new IntersectionObserver((entries) => {
  //     console.log("entries:", entries);
  //   });
  //   domNode = document.querySelector("#loading");
  //   console.log("object:", observer);
  //   observer.observe(domNode);
  //   return () => {
  //     console.log("离开页面", observer);
  //     if (observer && domNode) {
  //       console.log("元素:", domNode);
  //       // 解绑元素
  //       observer.unobserve(domNode);
  //       // 停止监听
  //       observer.disconnect();
  //     }
  //   };
  // }, []);

  return (
    <div>
      observer
      <button onClick={handleClick}>首页</button>
      <div
        id="loading"
        style={{
          width: "100px",
          height: "100px",
          background: "pink",
          marginTop: "1000px",
        }}
      >
        loading我在哪
      </div>
    </div>
  );
}
