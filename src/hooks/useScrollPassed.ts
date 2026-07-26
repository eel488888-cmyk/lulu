import { useEffect, useState } from "react";

/**
 * 监听页面滚动，返回是否超过指定阈值。
 * 用于导航栏背景加深判断。
 */
export function useScrollPassed(threshold: number) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPassed(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return passed;
}
