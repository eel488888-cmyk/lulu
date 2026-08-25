import { useState } from "react";
import { X } from "lucide-react";

interface WorkItem {
  title: string;
  type: "image" | "video";
  url: string;
}

interface Account {
  id: string;
  name: string;
  platform: string;
  description: string;
  placeholderText: string;
  coverImage?: string;
  works: WorkItem[];
}

const ACCOUNTS: Account[] = [
  {
    id: "xiaohongshu-photo",
    name: "小红书摄影账号",
    platform: "小红书",
    description: "摄影作品分享，累计赞藏 ***",
    placeholderText: "小红书摄影",
    coverImage: "/images/account-photo-cover.jpg",
    works: [
      { title: "摄影作品1", type: "image", url: "/images/photography-1.jpg" },
      { title: "摄影作品2", type: "image", url: "/images/photography-2.jpg" },
      { title: "摄影作品3", type: "image", url: "/images/photography-3.jpg" },
      { title: "摄影作品4", type: "image", url: "/images/photography-4.jpg" },
      { title: "摄影作品5", type: "image", url: "/images/photography-5.jpg" },
      { title: "摄影作品6", type: "image", url: "/images/photography-6.jpg" },
      { title: "摄影作品7", type: "image", url: "/images/photography-7.jpg" },
      { title: "摄影作品8", type: "image", url: "/images/photography-8.jpg" },
    ],
  },
  {
    id: "xiaohongshu-entertainment",
    name: "小红书影视娱乐账号",
    platform: "小红书",
    description: "影视剪辑与推荐，浏览量 ***",
    placeholderText: "小红书影视",
    coverImage: "/images/account-drama-cover.jpg",
    works: [
      { title: "作品1", type: "image", url: "https://via.placeholder.com/400x400.png?text=影视作品1" },
      { title: "作品2", type: "image", url: "https://via.placeholder.com/400x400.png?text=影视作品2" },
    ],
  },
  {
    id: "douyin-ai",
    name: "抖音AI账号",
    platform: "抖音",
    description: "AI生成内容，成绩***",
    placeholderText: "抖音AI",
    coverImage: "/images/douyin-cover.jpg",
    works: [
      { title: "内容图片1", type: "image", url: "/images/douyin-img-1.jpg" },
      { title: "内容图片2", type: "image", url: "/images/douyin-img-2.jpg" },
      { title: "内容视频1", type: "video", url: "/images/douyin-video-1.mp4" },
      { title: "内容视频2", type: "video", url: "/images/douyin-video-2.mp4" },
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
        </h3>
        <p
          className="mt-1 text-xs"
          style={{ color: "#A0AEC0" }}
        >
          {account.description}
        </p>
      </div>
    </div>
  );
}

function AccountModal({ account, isOpen, onClose }: { account: Account | null; isOpen: boolean; onClose: () => void }) {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (index: number, url: string) => {
    console.warn(`图片加载失败: ${url}`);
    setImageErrors((prev) => new Set(prev).add(index));
  };

  if (!account || !isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl"
          style={{
            background: "#FFFFFF",
            animation: "modal-fade-in 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              className="fixed right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <div className="p-6 pt-14">
              <h2
                className="text-2xl font-bold"
                style={{ color: "#2C3E50" }}
              >
                {account.name}
              </h2>
              <p
                className="mt-2 text-sm"
                style={{ color: "#A0AEC0" }}
              >
                {account.platform} · {account.description}
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {account.works.map((work, index) => (
                  <div
                    key={index}
                    className="cursor-pointer group rounded-lg overflow-hidden shadow-md"
                    onClick={() => setSelectedWork(work)}
                  >
                    {work.type === "image" ? (
                      imageErrors.has(index) ? (
                        <div
                          className="h-32 sm:h-40 w-full flex items-center justify-center text-gray-400"
                          style={{ background: "#F7F9FC" }}
                        >
                          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      ) : (
                        <img
                          src={work.url}
                          alt={work.title}
                          className="h-32 sm:h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={() => handleImageError(index, work.url)}
                        />
                      )
                    ) : (
                      <div className="relative h-32 sm:h-40 w-full">
                        <img
                          src={work.url.replace(".mp4", ".jpg")}
                          alt={work.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            console.warn(`视频封面加载失败: ${work.url}`);
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/400x225.png?text=Video";
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedWork && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedWork(null)}
          style={{
            animation: "lightbox-fade-in 0.2s ease-out",
          }}
        >
          <button
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={() => setSelectedWork(null)}
          >
            <X size={24} />
          </button>
          <div
            className="max-h-[90vh] max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedWork.type === "image" ? (
              <img
                src={selectedWork.url}
                alt={selectedWork.title}
                className="max-h-[90vh] w-full object-contain"
                style={{ maxWidth: "90vw" }}
              />
            ) : (
              <video
                src={selectedWork.url}
                controls
                autoPlay
                className="max-h-[90vh] w-full object-contain"
                style={{ borderRadius: "8px", maxWidth: "90vw" }}
              />
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes modal-fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes lightbox-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
        <SummaryCard title="总浏览量/点击" value="50w+" highlightNumber />
        <SummaryCard title="点赞数" value="1.1w" />
        <SummaryCard title="互动数" value="800+" />
      </div>

      <h2
        className="mt-16 text-2xl font-semibold"
        style={{ color: "#2C3E50" }}
      >
        运营账号
      </h2>

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
