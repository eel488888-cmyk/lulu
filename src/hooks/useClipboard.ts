import { useCallback, useRef, useState } from "react";

/**
 * 复制到剪贴板 Hook，带 toast 反馈状态。
 * 返回 copied（最近复制的标识）、copy 函数。
 */
export function useClipboard(timeout = 1800) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string, key?: string) => {
      const id = key ?? text;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // 回退方案
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setCopiedKey(id);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopiedKey(null), timeout);
        return true;
      } catch (err) {
        console.error("复制失败:", err);
        return false;
      }
    },
    [timeout],
  );

  return { copiedKey, copy } as const;
}
