import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { STRENGTHS, TOOLS } from "@/data/portfolio";

interface HotZone {
  x: number;
  y: number;
  diameter: number;
  route: string;
  label: string;
  name: string;
}

const HOT_ZONES: HotZone[] = [
  { x: 13.6, y: 64.4, diameter: 11.2, route: "/account", label: "账号运营", name: "猫左眼" },
  { x: 30.9, y: 69.6, diameter: 11.2, route: "/project", label: "项目", name: "猫右眼" },
  { x: 59.0, y: 60.4, diameter: 12.0, route: "/experience", label: "个人经历", name: "人物左眼" },
  { x: 84.0, y: 40.8, diameter: 12.0, route: "/skills", label: "技能", name: "人物右眼" },
];

function EyeHotZone({ zone, isMobile, isEyesClosed }: { zone: HotZone; isMobile: boolean; isEyesClosed: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log("热区已渲染", zone.name, zone.route);
  }, [zone.name, zone.route]);

  useEffect(() => {
    if (isEyesClosed) {
      setIsHovered(false);
    }
  }, [isEyesClosed]);

  if (isEyesClosed) {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{
          position: "absolute" as const,
          left: `${zone.x}%`,
          top: `${zone.y}%`,
          width: isMobile ? "88px" : `${zone.diameter}%`,
          height: isMobile ? "88px" : `${zone.diameter}%`,
          borderRadius: "50%",
          background: "transparent",
          border: "none",
          outline: "none",
          zIndex: 10,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          cursor: "default",
        }}
      />
    );
  }

  return (
    <Link
      to={zone.route}
      className="relative flex cursor-pointer items-center justify-center"
      style={{
        position: "absolute" as const,
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: isMobile ? "88px" : `${zone.diameter}%`,
        height: isMobile ? "88px" : `${zone.diameter}%`,
        borderRadius: "50%",
        background: "transparent",
        border: "none",
        outline: "none",
        zIndex: 10,
        transform: "translate(-50%, -50%)",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <span
          className="absolute inset-0 animate-ripple rounded-full"
          style={{
            background: "rgba(255,255,255,0.15)",
          }}
        />
      )}

      {isHovered && (
        <span
          className="absolute whitespace-nowrap font-medium"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: "#FFD700",
            WebkitTextStroke: "1px white",
            background: "transparent",
            display: "block",
            fontSize: isMobile ? "14px" : "16px",
          }}
        >
          {zone.label}
        </span>
      )}
    </Link>
  );
}

export default function AboutSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isEyesClosed, setIsEyesClosed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("AboutSection 已挂载");
    const video = document.createElement("video");
    video.onloadeddata = () => {
      console.log("眼睛背景视频加载成功");
      setVideoLoaded(true);
    };
    video.onerror = () => {
      console.warn("眼睛背景视频 /videos/bg-eyes.mp4 加载失败，回退到图片");
      setVideoError(true);
      const img = new Image();
      img.onload = () => {
        console.log("眼睛背景图片加载成功");
        setImageLoaded(true);
      };
      img.onerror = () => {
        console.warn("眼睛背景图片 /images/eyes.png 加载失败，使用深灰色背景");
        setImageError(true);
      };
      img.src = "/images/eyes.png";
    };
    video.src = "/videos/bg-eyes.mp4";
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const closed = currentTime >= 2 && currentTime <= 3;
      setIsEyesClosed(closed);
      console.log(`视频时间: ${currentTime.toFixed(2)}s, 闭眼状态: ${closed}`);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoLoaded]);

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{
        height: "100%",
        background: imageError ? "#1A1A1A" : undefined,
        backgroundImage: (videoError && imageLoaded) ? 'url("/images/eyes.png")' : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {videoLoaded && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full"
          style={{
            objectFit: "cover",
            zIndex: 0,
          }}
          src="/videos/bg-eyes.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      {/* 四个圆形热区 - 桌面端 */}
      <div className="hidden md:block" style={{ position: "absolute", inset: 0, zIndex: 10 }}>
        {HOT_ZONES.map((zone, index) => (
          <EyeHotZone key={index} zone={zone} isMobile={false} isEyesClosed={isEyesClosed} />
        ))}
      </div>

      {/* 四个圆形热区 - 移动端 */}
      <div className="md:hidden" style={{ position: "absolute", inset: 0, zIndex: 10 }}>
        {HOT_ZONES.map((zone, index) => (
          <EyeHotZone key={index} zone={zone} isMobile={true} isEyesClosed={isEyesClosed} />
        ))}
      </div>

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

        {/* 工具标签 - 放在擅长标签正下方，左对齐 */}
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

      {/* 右下角提示文字 */}
      <div className="absolute z-20" style={{ right: "40px", bottom: "40px", textAlign: "right" }}>
        <p
          className="font-medium"
          style={{
            fontSize: "20px",
            fontWeight: 500,
            color: "rgba(0,0,0,0.8)",
            whiteSpace: "nowrap",
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          点击眼睛了解详情
        </p>
        <p
          className="mt-1"
          style={{
            fontSize: "14px",
            fontWeight: 300,
            color: "rgba(0,0,0,0.6)",
            whiteSpace: "nowrap",
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          Click the eyes to see more
        </p>
      </div>

      {/* 移动端响应式样式 */}
      <style>{`
        @media (max-width: 768px) {
          .absolute[style*="left: 40px"] {
            left: 24px !important;
            top: 80px !important;
          }
          .absolute[style*="right: 40px"] {
            right: 24px !important;
          }
          .absolute[style*="bottom: 40px"] {
            bottom: 24px !important;
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
          p[style*="fontSize: 20px"] {
            font-size: 16px !important;
          }
          p[style*="fontSize: 14px"] {
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
