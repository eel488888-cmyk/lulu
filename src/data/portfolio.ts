export interface SkillItem {
  name: string;
  percent: number;
}

export interface PortfolioCard {
  emoji: string;
  title: string;
  desc: string;
  route: string;
  accent: string; // 卡片左侧色条
}

/** 导航项配置 */
export const NAV_ITEMS = [
  { label: "首页", target: "top" },
  { label: "关于我", target: "about" },
  { label: "账号运营", target: "account" },
  { label: "项目", target: "project" },
  { label: "个人经历", target: "experience" },
  { label: "技能", target: "skills" },
  { label: "联系方式", target: "contact" },
] as const;

/** 擅长标签 */
export const STRENGTHS = ["策划", "创意", "内容运营", "文案"];

/** 工具标签 */
export const TOOLS = ["Midjourney", "GPTs", "Kling", "Nanobanana", "Codex", "Trae"];

/** 跳转卡片 */
export const CARDS: PortfolioCard[] = [
  {
    emoji: "📱",
    title: "账号运营",
    desc: "小红书摄影账号、小红书影视娱乐账号、抖音AI账号（AI账号成绩***）",
    route: "/account",
    accent: "#FF6B7A",
  },
  {
    emoji: "🎯",
    title: "项目",
    desc: "雅迪校园星推官（***成绩）、一书一荐读（校园重点项目）",
    route: "/project",
    accent: "#7FD8BE",
  },
  {
    emoji: "💼",
    title: "实习经历",
    desc: "省文旅厅编辑策划、喜马拉雅文案策划等",
    route: "/internship",
    accent: "#FFD166",
  },
  {
    emoji: "🎓",
    title: "校园经历",
    desc: "研究生会副主席，校友会学生助理等",
    route: "/campus",
    accent: "#9AA7FF",
  },
];

/** 技能进度条 */
export const SKILLS: SkillItem[] = [
  { name: "文案撰写与脚本创作", percent: 95 },
  { name: "内容策划与选题", percent: 90 },
  { name: "爆款拆解与数据分析", percent: 85 },
  { name: "AI工具使用", percent: 80 },
  { name: "视频剪辑与制图", percent: 75 },
];

/** 联系方式 */
export const CONTACT = {
  email: "wanglufanglf@163.com",
  phone: "18748518127",
  location: "中国 · 河南",
};
