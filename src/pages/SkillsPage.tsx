import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";

interface SkillCard {
  icon: string;
  title: string;
  items: { name: string; level?: string }[];
}

const SKILL_CARDS: SkillCard[] = [
  {
    icon: "🗣️",
    title: "语言与证书",
    items: [
      { name: "英语六级 CET-6", level: "熟练" },
      { name: "普通话二级甲等", level: "掌握" },
      { name: "研究生一等奖学金", level: "" },
    ],
  },
  {
    icon: "🤖",
    title: "AI工具",
    items: [
      { name: "Midjourney", level: "熟练" },
      { name: "GPTs", level: "熟练" },
      { name: "Kling", level: "掌握" },
      { name: "Nanobanana", level: "掌握" },
      { name: "Codex", level: "掌握" },
      { name: "Trae", level: "掌握" },
    ],
  },
  {
    icon: "🛠️",
    title: "专业工具与能力",
    items: [
      { name: "内容策划与文案撰写", level: "熟练" },
      { name: "视频剪辑：剪映、PR", level: "掌握" },
      { name: "图像处理：Photoshop、Lightroom、Procreate", level: "掌握" },
      { name: "数据分析：Excel（透视表）", level: "掌握" },
      { name: "运营能力：小红书/抖音账号运营、爆款拆解、用户增长", level: "熟练" },
    ],
  },
];

function SkillCardComponent({ card }: { card: SkillCard }) {
  return (
    <div
      className="rounded-xl p-6 transition-all duration-200 hover:-translate-y-1"
      style={{
        background: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="text-3xl mb-4">{card.icon}</div>
      <h3
        className="text-lg font-bold"
        style={{ color: "#2C3E50" }}
      >
        {card.title}
      </h3>
      <ul className="mt-4 space-y-3">
        {card.items.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <span
              className="text-sm"
              style={{ color: "#4A5568" }}
            >
              {item.name}
            </span>
            {item.level && (
              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  background: "#E8F5E9",
                  color: "#2E7D32",
                }}
              >
                {item.level}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <>
      <NavBar visible />
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/bg-skills.png")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundColor: "#F7F9FC",
        }}
      />
      <main
        className="relative min-h-screen p-5 md:p-10 z-10"
      >
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-3xl font-semibold"
            style={{
              color: "#2C3E50",
              marginTop: "100px",
              marginBottom: "40px",
            }}
          >
            技能与证书
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CARDS.map((card, index) => (
              <SkillCardComponent key={index} card={card} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/"
              state={{ scrollTo: "about" }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] px-7 py-3.5 font-round text-base font-semibold text-white shadow-[0_10px_30px_rgba(255,107,107,0.3)] transition-all hover:-translate-y-0.5"
            >
              返回首页
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
