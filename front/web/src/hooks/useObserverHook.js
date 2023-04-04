import { useEffect, useRef } from "react";

const useObserverHook = (ele, callback, watch = []) => {
  const observer = useRef(null);
  useEffect(() => {
    const node = document.querySelector(ele);
    if (node) {
      observer.current = new IntersectionObserver((entries) => {
        callback && callback(entries);
      });
      observer.current.observe(node);
    }

    return () => {
      if (observer && node) {
        // 解绑元素
        observer.current.unobserve(node);
        // 停止监听
        observer.current.disconnect();
      }
    };
  }, watch);
};

export default useObserverHook;
