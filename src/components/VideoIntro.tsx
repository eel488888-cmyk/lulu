import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

type Stage = "cat" | "main" | "stopped" | "clip";

interface VideoIntroProps {
  onStageChange?: (stage: Stage) => void;
  skipIntro?: boolean;
}

const TYPE_SEGMENTS = [
  { text: "Portfolio", speed: 80 },
];

export default function VideoIntro({ onStageChange, skipIntro }: VideoIntroProps) {
  const [stage, setStage] = useState<Stage>(skipIntro ? "stopped" : "cat");
  const [catEnded, setCatEnded] = useState(false);
  const [catOverlayRemoved, setCatOverlayRemoved] = useState(!!skipIntro);
  const [stoppedSrc, setStoppedSrc] = useState<string | null>(skipIntro ? "" : null);
  const [showLabel, setShowLabel] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const catVideoRef = useRef<HTMLVideoElement | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const clipVideoRef = useRef<HTMLVideoElement | null>(null);
  const hotZoneRef = useRef<HTMLDivElement | null>(null);

  const { lines, activeLine, done } = useTypewriter(TYPE_SEGMENTS, stage !== "cat");

  useEffect(() => {
    onStageChange?.(stage);
  }, [stage, onStageChange]);

  useEffect(() => {
    if (stage === "cat") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  useEffect(() => {
    if (!skipIntro) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setStoppedSrc(img.src);
    img.onerror = () => setStoppedSrc("");
    img.src = "/images/stopped_frame.jpg";
  }, [skipIntro]);

  useEffect(() => {
    if (stage === "main") {
      const v = mainVideoRef.current;
      if (v) {
        v.currentTime = 0;
        const p = v.play();
        if (p) p.catch((err) => console.warn("主视频播放失败:", err));
      }
    }
  }, [stage]);

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
      flushSync(() => {
        setStage("clip");
      });
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

  const captureFromVideo = useCallback(() => {
    const v = mainVideoRef.current;
    if (!v) {
      setStoppedSrc("");
      return;
    }
    try {
      const canvas = document.createElement("canvas");
      canvas.width = v.videoWidth || 1280;
      canvas.height = v.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setStoppedSrc("");
        return;
      }
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
      setStoppedSrc(canvas.toDataURL("image/jpeg", 0.92));
    } catch (err) {
      console.warn("Canvas 截取最后一帧失败:", err);
      setStoppedSrc("");
    }
  }, []);

  const handleMainEnded = useCallback(() => {
    setStage("stopped");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setStoppedSrc(img.src);
    img.onerror = () => {
      console.warn("定格图片加载失败，改用 Canvas 截取");
      requestAnimationFrame(captureFromVideo);
    };
    img.src = "/images/stopped_frame.jpg";
  }, [captureFromVideo]);

  const handleCatClick = useCallback(() => {
    if (stage !== "cat") return;
    sessionStorage.setItem("visited", "true");
    setStage("main");
    window.setTimeout(() => setCatOverlayRemoved(true), 320);
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
      <video
        ref={mainVideoRef}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
          stage === "main" ? "opacity-100" : "opacity-0",
          (stage === "stopped" || stage === "clip") && "pointer-events-none",
        )}
        src="/videos/main.mp4"
        crossOrigin="anonymous"
        muted={false}
        playsInline
        preload="auto"
        onEnded={handleMainEnded}
        onError={(e) => console.error("主视频错误:", e)}
      />

      {stoppedSrc !== null && (stage === "stopped" || stage === "clip") && (
        <img
          src={stoppedSrc || "/images/stopped_frame.jpg"}
          alt="定格画面"
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-200",
            stage === "stopped" ? "opacity-100" : "opacity-0",
          )}
          onError={(e) => console.error("定格图片错误:", e)}
        />
      )}

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
      {stage !== "cat" && (
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
              style={{
                color: "rgba(248,248,245,0.7)",
              }}
            >
              向下滚动，了解更多 ↓
            </p>
          )}
        </div>
      )}

      {/* ===== 定格图片右侧热区 ===== */}
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

      {/* ===== 小猫开场遮罩 ===== */}
      {!catOverlayRemoved && (
        <div
          className={cn(
            "fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/85 transition-opacity duration-300",
            stage === "cat" ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            onClick={handleCatClick}
            className="group relative cursor-pointer"
            role="button"
            aria-label="点击小猫进入"
          >
            <video
              ref={catVideoRef}
              className="max-h-[55vh] w-auto max-w-[80vw] rounded-2xl shadow-2xl"
              src="/videos/cat.mp4"
              crossOrigin="anonymous"
              autoPlay
              muted
              playsInline
              onEnded={() => setCatEnded(true)}
              onError={(e) => console.error("小猫视频错误:", e)}
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/0 transition-all group-hover:ring-coral/70" />
          </div>
          <p className="anim-breathe mt-8 text-center font-round text-xl text-white">
            点击小猫
          </p>
          {!catEnded && (
            <p className="mt-2 text-xs text-white/40">正在播放开场…</p>
          )}
        </div>
      )}
    </section>
  );
}
