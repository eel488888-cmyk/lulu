import { useEffect, useState } from "react";

export interface TypewriterSegment {
  text: string;
  speed?: number; // 每字间隔 ms
}

/**
 * 逐字打字效果 Hook（支持多段独立行）。
 * 返回各行当前文本、当前正在打字的行索引、是否全部完成。
 */
export function useTypewriter(segments: TypewriterSegment[], enabled: boolean) {
  const [lines, setLines] = useState<string[]>(() =>
    segments.map(() => ""),
  );
  const [activeLine, setActiveLine] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let segIndex = 0;
    let charIndex = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = () => {
      if (cancelled) return;
      if (segIndex >= segments.length) {
        setDone(true);
        return;
      }
      const seg = segments[segIndex];
      const speed = seg.speed ?? 80;

      if (charIndex < seg.text.length) {
        charIndex += 1;
        const cur = segIndex;
        const ci = charIndex;
        setLines((prev) => {
          const next = [...prev];
          next[cur] = seg.text.slice(0, ci);
          return next;
        });
        setActiveLine(segIndex);
        timers.push(setTimeout(tick, speed));
      } else {
        segIndex += 1;
        charIndex = 0;
        timers.push(setTimeout(tick, 240));
      }
    };

    tick();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { lines, activeLine: done ? segments.length - 1 : activeLine, done };
}
