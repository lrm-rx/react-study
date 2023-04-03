import { useEffect, useRef } from "react";

let observer;
const useObserverHook = (ele, callback, watch = []) => {
  useEffect(() => {
    const node = document.querySelector(ele);
    if (node) {
      console.log("object");
      observer = new IntersectionObserver((entries) => {
        callback && callback(entries);
      });
    }

    return () => {
      if (observer && node) {
        // 解绑元素
        observer.unobserve(node);
        // 停止监听
        observer.disconnect();
      }
    };
  }, watch);
};

export default useObserverHook;
