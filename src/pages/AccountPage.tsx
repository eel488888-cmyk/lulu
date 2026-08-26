import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface WorkItem {
  title: string;
  type: "image" | "video";
  url: string;
}

interface Highlight {
  value: string;
  label: string;
  accent?: "coral" | "mint" | "sunny" | "lavender";
}

interface Account {
  id: string;
  name: string;
  handle: string;
  platform: string;
  dateRange: string;
  role: string;
  summary: string;
  highlights: Highlight[];
  details: {
    title: string;
    content: string;
  }[];
  placeholderText: string;
  coverImage?: string;
  works: WorkItem[];
}

const ACCOUNTS: Account[] = [
  {
    id: "douyin-ai",
    name: "抖音AI账号",
    handle: "叫我小矩",
    platform: "抖音",
    dateRange: "2026.07.22 – 至今",
    role: "独立运营 · AIGC内容创作",
    summary: "聚焦AIGC内容创作，上线1个月内视频累计播放量突破10w+，单条视频最高点赞收藏近2k。",
    highlights: [
      { value: "10W+", label: "累计播放量", accent: "coral" },
      { value: "2K", label: "单条最高赞藏", accent: "sunny" },
      { value: "AI拼贴", label: "差异化视觉", accent: "mint" },
      { value: "Codex", label: "自动化工作流", accent: "lavender" },
    ],
    details: [
      {
        title: "内容运营与数据成果",
        content: "独立运营抖音AI账号，聚焦AIGC内容创作，上线1个月内视频累计播放量突破10w+，单条视频最高点赞收藏近2k。",
      },
      {
        title: "AI创作实践",
        content: "运用AI工具完成照片拼贴创作，探索AI视觉内容的差异化表达，形成个人化的AI拼贴创作技能。",
      },
      {
        title: "AI工作流搭建",
        content: "使用Codex搭建自媒体运营工作流，将内容策划、素材整理、创作辅助等环节流程化、自动化，提升内容生产效率。",
      },
      {
        title: "Vibe Coding实践",
        content: "通过Vibe Coding独立完成个人网页搭建，将AI辅助编程能力落地为可访问的个人作品。",
      },
    ],
    placeholderText: "抖音AI",
    coverImage: "/images/douyin-cover.jpg",
    works: [
      { title: "AI拼贴作品", type: "image", url: "/images/douyin-img-1.jpg" },
      { title: "数据详情-8万播放", type: "image", url: "/images/douyin-data-stats.jpg" },
      { title: "内容视频1", type: "video", url: "/images/douyin-video-1.mp4" },
      { title: "内容视频2", type: "video", url: "/images/douyin-video-2.mp4" },
    ],
  },
  {
    id: "xiaohongshu-photo",
    name: "小红书摄影账号",
    handle: "图南北西东",
    platform: "小红书",
    dateRange: "2024.04 – 2025.06",
    role: "内容策划与运营 · 摄影垂类",
    summary: "摄影作品分享，执行日常运营策略，策划\"杨超越写真复刻\"等爆款教程选题，实现摄影类账号点赞收藏破千，用户转化率65%，粉丝月环比增长53%。",
    highlights: [
      { value: "1K+", label: "点赞收藏破千", accent: "coral" },
      { value: "65%", label: "用户转化率", accent: "sunny" },
      { value: "+53%", label: "粉丝月环比增长", accent: "mint" },
      { value: "教程+成片", label: "转化模式", accent: "lavender" },
    ],
    details: [
      {
        title: "内容策划与爆款产出",
        content: "策划\"杨超越写真复刻\"等爆款教程选题，采用\"教程+成片\"双栏对比模式输出，总结出强共鸣标题与利他性教程结合的爆款公式，账号互动率显著提升。",
      },
      {
        title: "用户增长与运营",
        content: "执行账号日常运营策略，通过用户画像分析与博主对标，采用\"教程+成片\"模式提升转化，策划粉丝互动活动，实现摄影类账号点赞收藏破千，用户转化率65%，粉丝月环比增长53%。",
      },
      {
        title: "数据分析",
        content: "以周为维度监控账号核心数据并进行复盘，通过数据驱动内容优化与策略调整，带动账号粉丝增长25%。",
      },
    ],
    placeholderText: "小红书摄影",
    coverImage: "/images/account-photo-cover.jpg",
    works: [
      { title: "樱花JK写真笔记", type: "image", url: "/images/photography-1.jpg" },
      { title: "青苹果仿拍构图教程", type: "image", url: "/images/photography-2.jpg" },
      { title: "毕业封神照", type: "image", url: "/images/photography-3.jpg" },
      { title: "杨超越写真复刻", type: "image", url: "/images/photography-4.jpg" },
      { title: "田园少女写真", type: "image", url: "/images/photography-5.jpg" },
      { title: "日系胶片人像", type: "image", url: "/images/photography-6.jpg" },
      { title: "户外清新写真", type: "image", url: "/images/photography-8.jpg" },
      { title: "杨超越写真复刻", type: "image", url: "/images/photo-ycy-replica.jpg" },
    ],
  },
  {
    id: "xiaohongshu-entertainment",
    name: "小红书影视娱乐账号",
    handle: "一个水罐",
    platform: "小红书",
    dateRange: "2024.04 – 2025.06",
    role: "内容策划与运营 · 影视垂类",
    summary: "输出原创内容38篇，累计浏览量40w+，赞藏1.1w+，策划\"文学学生水平下降一万倍\"系列、\"诺贝尔文学奖换人\"等爆款选题，总结出强共鸣标题与利他性教程结合的爆款公式，账号互动率提升76%。",
    highlights: [
      { value: "40W+", label: "累计浏览量", accent: "coral" },
      { value: "4K+", label: "单篇最高点赞", accent: "sunny" },
      { value: "+76%", label: "互动率提升", accent: "mint" },
      { value: "爆款公式", label: "标题+教程", accent: "lavender" },
    ],
    details: [
      {
        title: "内容策划与爆款产出",
        content: "运营影视垂类账号，输出原创内容，策划\"文学学生水平下降一万倍\"系列、\"诺贝尔文学奖换人\"等爆款选题，单篇最高点赞4177，总结出强共鸣标题与利他性教程结合的爆款公式，账号互动率提升76%。",
      },
      {
        title: "用户增长与运营",
        content: "执行账号日常运营策略，通过用户画像分析与博主对标，采用\"教程+成片\"模式提升转化，策划粉丝互动活动。",
      },
      {
        title: "数据分析",
        content: "以周为维度监控账号核心数据并进行复盘，通过数据驱动内容优化与策略调整。",
      },
    ],
    placeholderText: "小红书影视",
    coverImage: "/images/account-drama-cover.jpg",
    works: [
      { title: "账号主页-一个水罐", type: "image", url: "/images/xhs-home.jpg" },
      { title: "文学学生爆款笔记", type: "image", url: "/images/xhs-literature-student.jpg" },
      { title: "诺奖换人爆款笔记", type: "image", url: "/images/xhs-nobel-prize.jpg" },
    ],
  },
];

function SummaryCard({ title, value, highlightNumber }: { title: string; value: string; highlightNumber?: boolean }) {
  const renderValue = () => {
    if (!highlightNumber) {
      return value;
    }
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (match) {
      return (
        <>
          <span style={{ color: "#3182CE" }}>{match[1]}</span>
          <span style={{ color: "#2C3E50" }}>{match[2]}</span>
        </>
      );
    }
    return value;
  };

  return (
    <div
      className="rounded-xl p-6 shadow-lg"
      style={{
        background: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="text-center text-3xl font-bold"
        style={{ color: "#2C3E50" }}
      >
        {renderValue()}
      </div>
      <div
        className="mt-2 text-center text-sm"
        style={{ color: "#A0AEC0" }}
      >
        {title}
      </div>
    </div>
  );
}

function AccountCard({ account, onClick }: { account: Account; onClick: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageError = () => {
    console.warn(`封面图加载失败: ${account.coverImage}`);
    setImageLoaded(false);
  };

  return (
    <div
      className="cursor-pointer rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
      onClick={onClick}
    >
      {account.coverImage && imageLoaded ? (
        <img
          src={account.coverImage}
          alt={account.name}
          className="w-full object-cover"
          style={{
            height: "200px",
            maxHeight: "200px",
          }}
          onError={handleImageError}
        />
      ) : (
        <div
          className="flex items-center justify-center text-xl font-bold"
          style={{
            height: "200px",
            background: "#F7F9FC",
            color: "#4A5568",
          }}
        >
          {account.placeholderText}
        </div>
      )}
      <div className="p-4">
        <h3
          className="text-lg font-bold"
          style={{ color: "#2C3E50" }}
        >
          {account.name}
          <span
            className="ml-2 text-sm font-normal"
            style={{ color: "#FF6B6B" }}
          >
            @{account.handle}
          </span>
        </h3>
        <p
          className="mt-1 text-xs"
          style={{ color: "#A0AEC0" }}
        >
          {account.summary.length > 60 ? account.summary.slice(0, 60) + "..." : account.summary}
        </p>
      </div>
    </div>
  );
}

const ACCENT_COLORS: Record<string, { bg: string; text: string }> = {
  coral: { bg: "#FFF0F0", text: "#FF6B6B" },
  mint: { bg: "#E8F8F1", text: "#38B27A" },
  sunny: { bg: "#FFF8E6", text: "#E6A23C" },
  lavender: { bg: "#F0EEFF", text: "#7A6FE0" },
};

function HighlightCard({ highlight }: { highlight: Highlight }) {
  const colors = ACCENT_COLORS[highlight.accent || "coral"];
  return (
    <div
      className="rounded-2xl px-4 py-4 text-center transition-all hover:-translate-y-0.5"
      style={{
        background: colors.bg,
        border: `2px solid ${colors.bg}`,
      }}
    >
      <div
        className="text-2xl font-extrabold"
        style={{ color: colors.text, fontFamily: "Inter, system-ui, sans-serif" }}
      >
        {highlight.value}
      </div>
      <div
        className="mt-1 text-xs font-medium"
        style={{ color: "#4A5568" }}
      >
        {highlight.label}
      </div>
    </div>
  );
}

function AccountModal({ account, isOpen, onClose }: { account: Account | null; isOpen: boolean; onClose: () => void }) {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const works = account?.works ?? [];
  const goToIndex = (idx: number) => {
    if (works.length === 0) return;
    const next = ((idx % works.length) + works.length) % works.length;
    setSelectedIndex(next);
    setSelectedWork(works[next]);
  };

  const handleImageError = (index: number, url: string) => {
    console.warn(`图片加载失败: ${url}`);
    setImageErrors((prev) => new Set(prev).add(index));
  };

  if (!account || !isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="w-full max-w-3xl my-4 md:my-8 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            background: "#FFFDF8",
            animation: "modal-fade-in 0.25s ease-out",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              className="absolute right-3 top-3 md:right-6 md:top-6 z-10 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md transition-colors hover:bg-white hover:text-gray-800"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            {/* 顶部作品图片区（参考图片顶部拼贴风格） */}
            <div
              className="w-full px-4 pt-6 pb-2 md:px-6 md:pt-8"
              style={{ background: "linear-gradient(180deg, #FFF6E8 0%, #FFFDF8 100%)" }}
            >
              <div className="grid grid-cols-3 gap-2">
                {account.works.slice(0, 3).map((work, index) => (
                  <div
                    key={index}
                    className={`rounded-xl overflow-hidden shadow-md ${index === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"}`}
                    style={{ border: "3px solid #FFFFFF" }}
                  >
                    {work.type === "image" ? (
                      imageErrors.has(index) ? (
                        <div
                          className="h-full w-full flex items-center justify-center text-gray-400 text-xs"
                          style={{ background: "#F0EDE4" }}
                        >
                          {work.title}
                        </div>
                      ) : (
                        <img
                          src={work.url}
                          alt={work.title}
                          className="h-full w-full object-cover"
                          onError={() => handleImageError(index, work.url)}
                        />
                      )
                    ) : (
                      <div className="relative h-full w-full">
                        <img
                          src={work.url.replace(".mp4", ".jpg")}
                          alt={work.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/400x300.png?text=Video";
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <svg className="h-10 w-10 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {account.works.length > 3 && (
                  <div
                    className="aspect-square rounded-xl overflow-hidden shadow-md flex items-center justify-center text-sm font-bold"
                    style={{
                      background: "#F0EDE4",
                      color: "#7A6A52",
                      border: "3px solid #FFFFFF",
                    }}
                  >
                    +{account.works.length - 3}
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-4 md:px-8 md:py-6">
              {/* 标签 */}
              <div className="mb-3 flex flex-wrap gap-2">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "#FFE8E0",
                    color: "#E87A5F",
                  }}
                >
                  {account.platform}账号 · {account.role.split("·")[0].trim()}
                </span>
              </div>

              {/* 时间 & 角色 */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <span
                  className="text-sm font-medium"
                  style={{ color: "#8B7355", fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {account.dateRange}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "#A48C6A" }}
                >
                  {account.role}
                </span>
              </div>

              {/* 账号名称 */}
              <h2
                className="text-2xl font-bold md:text-4xl"
                style={{
                  color: "#2B2216",
                  fontFamily: '"Noto Serif SC", "Noto Serif", serif',
                  letterSpacing: "-0.01em",
                  overflowWrap: "break-word",
                }}
              >
                {account.name}
                <span
                  className="ml-2 text-base font-normal md:text-xl"
                  style={{ color: "#C0523A" }}
                >
                  @{account.handle}
                </span>
              </h2>

              {/* 一句话总结 */}
              <p
                className="mt-3 text-base leading-relaxed"
                style={{ color: "#5A4A35", lineHeight: "1.75" }}
              >
                {account.summary}
              </p>

              {/* 数据亮点卡片（参考图片中的四格卡片） */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {account.highlights.map((h, i) => (
                  <HighlightCard key={i} highlight={h} />
                ))}
              </div>

              {/* 详细条目 */}
              <div className="mt-8 space-y-5">
                {account.details.map((detail, idx) => (
                  <div key={idx}>
                    <div
                      className="flex items-center gap-2 mb-2"
                    >
                      <span
                        className="inline-block w-1 h-4 rounded-full"
                        style={{ background: "#FF6B6B" }}
                      />
                      <h3
                        className="font-bold text-base md:text-lg"
                        style={{ color: "#2B2216" }}
                      >
                        {detail.title}
                      </h3>
                    </div>
                    <p
                      className="pl-3 text-sm leading-relaxed overflow-hidden"
                      style={{
                        color: "#5A4A35",
                        lineHeight: "1.9",
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {detail.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* 作品 gallery */}
              {account.works.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="inline-block w-1 h-4 rounded-full"
                      style={{ background: "#FF6B6B" }}
                    />
                    <h3
                      className="font-bold text-base md:text-lg"
                      style={{ color: "#2B2216" }}
                    >
                      作品展示
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {account.works.map((work, index) => {
                      const accentPalette = [
                        { bg: "linear-gradient(135deg,#FFE5D9 0%,#FFCAD4 100%)", fg: "#9A3B49" },
                        { bg: "linear-gradient(135deg,#D8F3DC 0%,#B7E4C7 100%)", fg: "#2D6A4F" },
                        { bg: "linear-gradient(135deg,#FFF3B0 0%,#FFDF8C 100%)", fg: "#7A5A00" },
                        { bg: "linear-gradient(135deg,#E0E7FF 0%,#C7D2FE 100%)", fg: "#4338CA" },
                        { bg: "linear-gradient(135deg,#FCE7F3 0%,#FBCFE8 100%)", fg: "#9D174D" },
                        { bg: "linear-gradient(135deg,#CCFBF1 0%,#99F6E4 100%)", fg: "#115E59" },
                      ];
                      const palette = accentPalette[index % accentPalette.length];
                      const encodedTitle = encodeURIComponent(work.title);
                      const fallbackUrl = `https://via.placeholder.com/400x320?bg=${encodeURIComponent(
                        "#F5F1E8"
                      )}&fg=${encodeURIComponent("#5A4A35")}&text=${encodedTitle}`;
                      return (
                        <div
                          key={index}
                          className="cursor-pointer group rounded-xl overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                          onClick={() => {
                            setSelectedIndex(index);
                            setSelectedWork(work);
                          }}
                        >
                          {work.type === "image" ? (
                            imageErrors.has(index) ? (
                              <div
                                className="h-28 sm:h-36 w-full flex flex-col items-center justify-center px-2 text-center font-bold"
                                style={{ background: palette.bg, color: palette.fg }}
                              >
                                <div
                                  className="text-xs leading-tight"
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {work.title}
                                </div>
                                <div className="mt-2 text-[10px] opacity-70">作品预览</div>
                              </div>
                            ) : (
                              <img
                                src={work.url}
                                alt={work.title}
                                className="h-28 sm:h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  handleImageError(index, work.url);
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = fallbackUrl;
                                }}
                              />
                            )
                          ) : (
                            <div className="relative h-28 sm:h-36 w-full">
                              <img
                                src={work.url.replace(".mp4", ".jpg")}
                                alt={work.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src =
                                    "https://via.placeholder.com/400x225/2B2216/FFFFFF?text=%F0%9F%8E%AC+Video";
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                <svg className="h-9 w-9 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 底部装饰链接 */}
              <div className="mt-10 pt-4 border-t border-amber-100 flex items-center justify-center gap-2">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#C0523A" }}
                >
                  ✨
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#C0523A" }}
                >
                  以上为账号运营案例
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#C0523A" }}
                >
                  ✨
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedWork && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 overflow-y-auto"
          onClick={() => { setSelectedWork(null); setSelectedIndex(-1); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") goToIndex(selectedIndex - 1);
            if (e.key === "ArrowRight") goToIndex(selectedIndex + 1);
            if (e.key === "Escape") { setSelectedWork(null); setSelectedIndex(-1); }
          }}
          tabIndex={0}
          style={{
            animation: "lightbox-fade-in 0.2s ease-out",
          }}
        >
          <button
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={() => { setSelectedWork(null); setSelectedIndex(-1); }}
          >
            <X size={24} />
          </button>
          {works.length > 1 && (
            <button
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); goToIndex(selectedIndex - 1); }}
            >
              <ChevronLeft size={28} />
            </button>
          )}
          {works.length > 1 && (
            <button
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); goToIndex(selectedIndex + 1); }}
            >
              <ChevronRight size={28} />
            </button>
          )}
          <div
            className="my-8 flex w-full max-w-none items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedWork.type === "image" ? (
              <img
                src={selectedWork.url}
                alt={selectedWork.title}
                className="h-auto w-auto max-h-[90dvh] max-w-[92vw] object-contain rounded-2xl shadow-2xl"
              />
            ) : (
              <video
                src={selectedWork.url}
                controls
                autoPlay
                className="max-h-[90dvh] w-auto max-w-[92vw] object-contain"
                style={{ borderRadius: "12px" }}
              />
            )}
          </div>
          {works.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {selectedIndex + 1} / {works.length}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes modal-fade-in {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes lightbox-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default function AccountSection() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10">
      <h1
        className="text-4xl font-bold"
        style={{
          color: "#2C3E50",
          marginBottom: "24px",
        }}
      >
        帐号运营
      </h1>

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <SummaryCard title="总浏览量" value="60w+" highlightNumber />
        <SummaryCard title="点赞收藏数" value="1.5w+" />
        <SummaryCard title="运营账号数" value="3个" />
      </div>

      <div className="mt-16 flex items-baseline gap-2">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "#2C3E50" }}
        >
          运营账号
        </h2>
        <span className="text-xs text-gray-400">（点击卡片了解详情）</span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {ACCOUNTS.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onClick={() => handleAccountClick(account)}
          />
        ))}
      </div>

      <AccountModal
        account={selectedAccount}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
