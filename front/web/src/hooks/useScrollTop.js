import { useState, useEffect } from "react";
export const useScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScrollTop = () => {
      let s = document.documentElement.scrollTop || document.body.scrollTop;
      setScrollTop(Number.parseInt(s));
    };
    window.addEventListener("scroll", handleScrollTop);

    return () => window.removeEventListener("scroll", handleScrollTop);
  }, []);

  return { scrollTop };
};
