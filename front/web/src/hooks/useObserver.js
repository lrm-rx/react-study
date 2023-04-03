import { useEffect } from "react";

let observer;
const useObserver = (ele, callback, wathc = []) => {
  useEffect(() => {
    const node = document.querySelector(ele);
    if (node) {
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
  }, wathc);
};

export default useObserver;
