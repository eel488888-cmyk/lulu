import { useEffect, useState } from "react";
import { STRENGTHS, TOOLS } from "@/data/portfolio";

export default function AboutSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  // 移动端不加载视频，直接用图片；桌面端尝试加载视频
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      // 移动端直接用图片背景
      const img = new Image();
      img.onload = () => setBgImageLoaded(true);
      img.src = "/images/eyes.png";
      return;
    }
    // 桌面端优先视频
    const video = document.createElement("video");
    video.onloadeddata = () => setVideoLoaded(true);
    video.onerror = () => {
      // 视频失败则用图片
      const img = new Image();
      img.onload = () => setBgImageLoaded(true);
      img.src = "/images/eyes.png";
    };
    video.src = "/videos/bg-eyes.mp4";
    // 同时预加载图片作为 fallback
    const img = new Image();
    img.onload = () => setBgImageLoaded(true);
    img.src = "/images/eyes.png";
  }, []);

  return (
    <section
      id="about"
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundColor: "#1A1A1A",
        backgroundImage:
          !videoLoaded && bgImageLoaded ? 'url("/images/eyes.png")' : undefined,
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
      <div className="absolute z-20 left-5 top-20 md:left-10 md:top-24 max-w-[calc(100%-40px)] md:max-w-none">
        <h2
          className="font-bold"
          style={{
            fontFamily: "Inter, SF Pro Display, Roboto, system-ui, sans-serif",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#000000",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <span className="block text-3xl md:text-[56px]">
            你好，我是王鹭芳。
          </span>
        </h2>

        <p
          className="mt-4"
          style={{
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(0,0,0,0.85)",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <span className="block text-sm md:text-base">
            热爱内容创作与策划，努力用AI把灵感变成作品。
          </span>
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
    </section>
  );
}
