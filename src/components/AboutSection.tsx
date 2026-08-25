import { useEffect, useState } from "react";
import { STRENGTHS, TOOLS } from "@/data/portfolio";

export default function AboutSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.onloadeddata = () => setVideoLoaded(true);
    video.onerror = () => {
      setVideoError(true);
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
      img.src = "/images/eyes.png";
    };
    video.src = "/videos/bg-eyes.mp4";
  }, []);

  return (
    <section
      id="about"
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: imageError ? "#1A1A1A" : undefined,
        backgroundImage: videoError && imageLoaded ? 'url("/images/eyes.png")' : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {videoLoaded && (
        <video
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover", zIndex: 0 }}
          src="/videos/bg-eyes.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      {/* 左上角标题与描述 */}
      <div className="absolute z-20" style={{ left: "40px", top: "100px" }}>
        <h2
          className="font-bold"
          style={{
            fontFamily: "Inter, SF Pro Display, Roboto, system-ui, sans-serif",
            fontSize: "56px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#000000",
            whiteSpace: "nowrap",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          你好，我是王鹭芳。
        </h2>

        <p
          className="mt-4"
          style={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(0,0,0,0.85)",
            whiteSpace: "nowrap",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          热爱内容创作与策划，努力用AI把灵感变成作品。
        </p>

        {/* 擅长标签 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {STRENGTHS.map((tag) => (
            <span
              key={tag}
              className="text-[12px] font-semibold text-black"
              style={{
                borderRadius: "999px",
                padding: "4px 12px",
                border: "1px solid rgba(0,0,0,0.2)",
                textShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 工具标签 */}
        <div className="mt-3 flex flex-wrap gap-2">
          {TOOLS.map((tag) => (
            <span
              key={tag}
              className="text-[12px] font-medium text-black/70"
              style={{
                borderRadius: "999px",
                padding: "4px 12px",
                border: "1px solid rgba(0,0,0,0.15)",
                textShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 底部中间向下箭头 */}
      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
        <span
          className="anim-breathe block text-3xl"
          style={{
            color: "rgba(0,0,0,0.7)",
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          ↓
        </span>
      </div>

      {/* 移动端响应式样式 */}
      <style>{`
        @media (max-width: 768px) {
          .absolute[style*="left: 40px"] {
            left: 24px !important;
            top: 80px !important;
          }
          h2[style*="fontSize: 56px"] {
            font-size: 36px !important;
            white-space: normal !important;
            text-shadow: 0 2px 12px rgba(0,0,0,0.4) !important;
            -webkit-text-stroke: 0.3px rgba(0,0,0,0.2);
          }
          p[style*="fontSize: 16px"] {
            font-size: 14px !important;
            white-space: normal !important;
            text-shadow: 0 2px 12px rgba(0,0,0,0.4) !important;
            -webkit-text-stroke: 0.2px rgba(0,0,0,0.15);
          }
        }
      `}</style>
    </section>
  );
}
