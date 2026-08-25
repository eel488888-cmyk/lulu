import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTypewriter } from "@/hooks/useTypewriter";

type Stage = "stopped" | "clip";

const TYPE_SEGMENTS = [
  { text: "Portfolio", speed: 80 },
];

export default function VideoIntro() {
  const [stage, setStage] = useState<Stage>("stopped");
  const [stoppedSrc, setStoppedSrc] = useState<string | null>(null);
  const [showLabel, setShowLabel] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const clipVideoRef = useRef<HTMLVideoElement | null>(null);
  const hotZoneRef = useRef<HTMLDivElement | null>(null);

  const { lines, activeLine, done } = useTypewriter(TYPE_SEGMENTS, true);

  // 直接加载定格画面作为静态首屏
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setStoppedSrc(img.src);
    img.onerror = () => setStoppedSrc("");
    img.src = "/images/stopped_frame.jpg";
  }, []);

  // 彩蛋视频播放
  useEffect(() => {
    if (stage === "clip") {
      const v = clipVideoRef.current;
      if (v) {
        v.currentTime = 0;
        const t = window.setTimeout(() => {
          const p = v.play();
          if (p) p.catch((err) => console.warn("彩蛋视频播放失败:", err));
        }, 50);
        return () => window.clearTimeout(t);
      }
    }
  }, [stage]);

  // 定格画面右侧热区交互（彩蛋）
  useEffect(() => {
    if (stage !== "stopped") return;
    const el = hotZoneRef.current;
    if (!el) return;

    const handleNativeMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setShowLabel(true);
    };
    const handleNativeLeave = () => setShowLabel(false);
    const handleNativeClick = () => {
      flushSync(() => setStage("clip"));
    };

    el.addEventListener("mousemove", handleNativeMove);
    el.addEventListener("mouseleave", handleNativeLeave);
    el.addEventListener("click", handleNativeClick);
    return () => {
      el.removeEventListener("mousemove", handleNativeMove);
      el.removeEventListener("mouseleave", handleNativeLeave);
      el.removeEventListener("click", handleNativeClick);
    };
  }, [stage]);

  const handleClipEnded = useCallback(() => {
    setStage("stopped");
  }, []);

  return (
    <section
      id="top"
      data-stage={stage}
      className="relative w-full overflow-hidden bg-charcoal"
      style={{ height: "100%" }}
    >
      {/* 定格画面作为静态首屏 */}
      {stoppedSrc !== null && (
        <img
          src={stoppedSrc || "/images/stopped_frame.jpg"}
          alt="定格画面"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-200"
          onError={(e) => console.error("定格图片错误:", e)}
        />
      )}

      {/* 彩蛋视频 */}
      {stage === "clip" && (
        <video
          ref={clipVideoRef}
          className="absolute inset-0 z-20 h-full w-full object-cover"
          src="/videos/clip.mp4"
          crossOrigin="anonymous"
          autoPlay
          playsInline
          onEnded={handleClipEnded}
          onError={(e) => console.error("彩蛋视频错误:", e)}
        />
      )}

      {/* ===== 左侧打字标题 - Portfolio 2026 ===== */}
      <div className="absolute left-[4%] top-1/2 z-20 -translate-y-1/2" style={{ width: "92%" }}>
        <div className="relative inline-block">
          <h1
            className="leading-none"
            style={{
              fontFamily: '"Canela", "Recoleta", "Cormorant Garamond", serif',
              fontSize: "clamp(80px, 16vw, 150px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#F8F8F5",
              textShadow: "0 6px 18px rgba(0,0,0,0.18)",
            }}
          >
            {lines[0]}
            {activeLine === 0 && !done && (
              <span
                className="inline-block w-[4px] translate-y-[2px]"
                style={{
                  height: "0.65em",
                  background: "#FF6B6B",
                  animation: "cursor-blink 0.9s infinite",
                }}
              />
            )}
          </h1>
          {/* 上标数字 2026 */}
          <span
            className="absolute"
            style={{
              fontFamily: '"Inter", "SF Pro Display", sans-serif',
              fontSize: "clamp(20px, 3.2vw, 30px)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "#F8F8F5",
              right: "0",
              top: "-28%",
              opacity: done ? 1 : 0,
              transition: "opacity 0.4s ease-in",
            }}
          >
            2026
          </span>
        </div>
        {done && (
          <p
            className="mt-6 font-round text-sm md:text-base"
            style={{ color: "rgba(248,248,245,0.7)" }}
          >
            向下滚动，了解更多 ↓
          </p>
        )}
      </div>

      {/* ===== 定格画面右侧热区（彩蛋） ===== */}
      {stage === "stopped" && (
        <div
          ref={hotZoneRef}
          data-testid="hot-zone"
          className="absolute right-0 top-0 z-30 h-full w-[30%] cursor-pointer"
        />
      )}

      {/* ===== 跟随标签"点击我" ===== */}
      {showLabel && stage === "stopped" && (
        <div
          className="anim-toast pointer-events-none fixed z-40 rounded px-3 py-1.5 text-sm font-medium text-white"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y + 10,
            background: "rgba(0,0,0,0.55)",
            borderRadius: 4,
            backdropFilter: "blur(4px)",
          }}
        >
          点击我
        </div>
      )}
    </section>
  );
}
