import { useState } from "react";

interface ProjectHighlight {
  title: string;
  items: string[];
}

interface ProjectWork {
  title: string;
  url: string;
}

interface Project {
  id: string;
  name: string;
  time: string;
  role: string;
  award?: string;
  nature?: string;
  description: string;
  highlights?: ProjectHighlight[];
  works?: ProjectWork[];
}

const PROJECTS: Project[] = [
  {
    id: "yadi",
    name: "雅迪校园星推官",
    time: "2024年",
    role: "星推官 / 内容策划",
    award: "河南赛区第2名",
    description:
      '在一个月内为雅迪品牌策划宣传推广方向，围绕社会热点及产品特质，打造具有"活人感"的深度图文种草帖。目标用户为18-35岁年轻女性，通过强共鸣标题与真实场景结合，激发互动与购买意向。最终作品累计播放量5w+，获得河南赛区第2名。',
  },
  {
    id: "yishuyijian",
    name: "一书一荐读",
    time: "2023-2024年",
    role: "核心成员 / 阅读推广人",
    nature: "郑州大学校园重点阅读推广项目",
    description:
      '参与策划并执行"一书一荐读"校园阅读推广活动，负责撰写书籍推荐语与深度书评，通过线上线下结合的方式引导阅读。组织读书分享会10余场，累计推荐优质书目30余本，活动覆盖学生超500人次。有效提升了校园阅读氛围，获得师生好评。',
  },
  {
    id: "collage-photo-skill",
    name: "拼贴照片平面色块转绘 Skill",
    time: "2026年",
    role: "作者 / AI视觉探索",
    nature: "AI图像工作流 · 个人可复用 Skill 资产",
    description:
      '围绕"普通人如何用AI把普通照片做成有个人风格的插画"这一具体问题，沉淀出一套可复用的 AI 拼贴照片创作 Skill。该 Skill 把普通生活方式照片转译为克制留白、平面色块风格的大片级插画，完整定义了核心降维原则、穿框带形契约、作品层级、质量门禁和修改策略，并内置了素材参考图库和提示词模板。处理过泳池、篮球场、雪地、草地人群、海滩行李、林间倒影等 50+ 场景，形成了可重复的个人化 AI 视觉表达能力。',
    highlights: [
      {
        title: "核心降维与工作流",
        items: [
          '以"最少充分图像"为第一原则，天空/地面/水体同色族合并为一块主色场，背景重要性不通过则整块替换为主题氛围色，最大色场占比 55%-80%。',
          "建立9步标准化入稿流程：主体不变量登记→4类元素（叙事/结构/冗余/噪声）筛选→背景重要性测试→最小线索校验→间接阴影与运动痕迹→穿框带形→统一编排→质量门禁→带版本号存档。",
          '穿框带形双工约束：每块非主色场必须同时承担至少2个任务（识景+平衡+节奏/尺度），避免为了装饰机械加一条色带。',
        ],
      },
      {
        title: "质量门禁与产出成果",
        items: [
          "自建 34 条 Yes/No 质量门禁：动作和干湿状态一致、主几何源自场景、同色相材质统一、倒影最小化、阴影统一光源、结构破形不拆骨架等。",
          "60+ 实际产出案例：泳池辽阔构图 13 版迭代、草地七人圆环 6 版迭代、雪地奔跑 3 版光影修正、篮球场 4 版结构统一、海滩行李时尚几何大片 2 版。",
          "形成可交付 Skill 包：含 SKILL.md（规范正文）、assets/（前后对比参考图）、references/（风格规范+提示词模板）、可被 Codex 直接加载执行。",
        ],
      },
    ],
    works: [
      { title: "泳池平面色块风格", url: "/images/collage-skill-泳池平面色块风格-v2.png" },
      { title: "泳池直角色块构图", url: "/images/collage-skill-泳池岸边辽阔构图-v12-直角色块.png" },
      { title: "篮球场平面色块", url: "/images/collage-skill-篮球场平面色块转绘-v4-篮球投影.png" },
      { title: "草地七人圆环", url: "/images/collage-skill-草地七人圆环平面色块转绘-v3-统一绿色与树影.png" },
      { title: "雪原双人跳跃", url: "/images/collage-skill-雪原双人跳跃平面色块转绘-v1.png" },
      { title: "海滩行李几何大片", url: "/images/collage-skill-海滩行李-时尚杂志几何大片-v2.png" },
    ],
  },
  {
    id: "ai-account-workflow",
    name: "抖音AI账号 Codex 运营工作流搭建",
    time: "2026.07 – 至今",
    role: "总管 / 内容 / 数据复盘 全流程搭建",
    nature: "Codex Agent 工作流 · 真实发布验证",
    description:
      '围绕"非技术背景普通人通过真实AI项目求职和建立作品集"的成长型IP定位，使用Codex多智能体搭建了从热点监听到内容创作、数据复盘的完整闭环运营台。包含定位文档、3条Agent规则、统一工作流（收件→候选→确认→创作→发布→6/12/24/72小时数据提醒→复盘→反馈）、内容交接台账和正式数据库，已实际发布C002/C003/C004三条视频，累计10W+播放、2000+互动、70+涨粉，并在C004中验证了"可见作品+过程冲突"的早期分发信号。',
    highlights: [
      {
        title: "工作流与Agent体系",
        items: [
          '9状态统一流转：收件 → 候选 → 已确认 → 创作中 → 待确认 → 最终确定 → 已发布 → 待复盘 → 已复盘，唯一审批规则为用户口头"确认"，无自动进入创作环节。',
          "3角色分工：热点选题（多平台热点每日3-5候选推送，含事实来源、用户关系、可验证问题）、内容创作（脚本/封面/标题/素材清单，先证后写）、我的复盘数据库（6/12/24/72h数据录入+事实-假设-规则四层复盘）。",
          "10条管理边界：热点不得打断当前主线、自动化只有汇报权无审批权、单条结果不升级为永久运营规则、24h复盘只汇报总管避免噪声广播、72h结案给出2-3条互斥方向等。",
        ],
      },
      {
        title: "真实发布与数据验证",
        items: [
          'C003《如果诗词可以被看见》：29秒斗笠落字+琵琶互动，24h 1456播放、72h 1514播放，验证"可见成品比纯人物宣言更能证明成长"假设成立（H003 中低置信）。',
          'C004《30分钟做出来≠30分钟学会》：73.5h 近7W播放、1599赞、1774收藏、42涨粉，验证"轻传播+收藏型+方法冲突"的选题模型能拿到推荐扩量，同时暴露高收藏≠高关注的转化缺口（H005）。',
          '方法沉淀：下一条"仅改变一个关键变量"制度，C004后下一步只新增"明确的后续价值承诺"加入关注钩子，其余画面/时长/信息密度保持，隔离归因。',
        ],
      },
    ],
  },
];

export default function ProjectSection() {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleProjectChange = (project: Project) => {
    if (project.id === selectedProject.id) return;
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsAnimating(false);
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10">
      <h1
        className="text-3xl font-semibold"
        style={{
          color: "#2C3E50",
          marginBottom: "40px",
        }}
      >
        项目
      </h1>

      {/* 桌面端：左右两栏 */}
      <div className="hidden md:flex gap-8">
        {/* 左栏：项目列表 */}
        <div className="w-[30%]">
          <div className="space-y-6">
            {PROJECTS.map((project) => {
              const isSelected = selectedProject.id === project.id;
              return (
                <div
                  key={project.id}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handleProjectChange(project)}
                  style={{
                    paddingLeft: "8px",
                    borderLeft: "3px solid",
                    borderLeftColor: isSelected ? "#FF6B6B" : "transparent",
                  }}
                >
                  <span
                    className="text-lg font-medium block py-1"
                    style={{
                      color: isSelected ? "#FF6B6B" : "#2C3E50",
                      fontWeight: isSelected ? 600 : 500,
                      fontSize: "18px",
                    }}
                  >
                    {project.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右栏：项目详情卡片 */}
        <div className="w-[70%]">
          <div
            className="rounded-2xl p-8 transition-all duration-200"
            style={{
              background: "#FFFFFF",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "translateX(20px)" : "translateX(0)",
            }}
          >
            <h2
              className="text-2xl font-bold"
              style={{ color: "#1A1A1A", fontSize: "28px" }}
            >
              {selectedProject.name}
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              <span
                className="text-sm"
                style={{ color: "#666" }}
              >
                {selectedProject.time}
              </span>
              <span
                className="text-sm"
                style={{ color: "#666" }}
              >
                |
              </span>
              <span
                className="text-sm"
                style={{ color: "#666" }}
              >
                {selectedProject.role}
              </span>
              {selectedProject.award && (
                <>
                  <span
                    className="text-sm"
                    style={{ color: "#666" }}
                  >
                    |
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#FF6B6B" }}
                  >
                    {selectedProject.award}
                  </span>
                </>
              )}
              {selectedProject.nature && (
                <>
                  <span
                    className="text-sm"
                    style={{ color: "#666" }}
                  >
                    |
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "#888" }}
                  >
                    {selectedProject.nature}
                  </span>
                </>
              )}
            </div>

            <p
              className="mt-6 leading-relaxed"
              style={{ color: "#333", fontSize: "15px", lineHeight: "1.9" }}
            >
              {selectedProject.description}
            </p>

            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="mt-8 space-y-6">
                {selectedProject.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-5"
                    style={{
                      background: "linear-gradient(135deg, #FFF9F6 0%, #FFFFFF 100%)",
                      border: "1px solid #F0E6E0",
                    }}
                  >
                    <h3
                      className="font-semibold mb-3"
                      style={{ color: "#FF6B6B", fontSize: "16px" }}
                    >
                      {hl.title}
                    </h3>
                    <ul className="space-y-2">
                      {hl.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[14px]"
                          style={{ color: "#444", lineHeight: "1.85" }}
                        >
                          <span
                            className="mt-2 flex-none rounded-full"
                            style={{
                              width: "6px",
                              height: "6px",
                              background: "#FF9A9A",
                            }}
                          />
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {selectedProject.works && selectedProject.works.length > 0 && (
              <div className="mt-8">
                <h3
                  className="font-semibold mb-4"
                  style={{ color: "#1A1A1A", fontSize: "16px" }}
                >
                  作品展示
                </h3>
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns:
                      selectedProject.works.length === 1
                        ? "1fr"
                        : selectedProject.works.length === 2
                        ? "repeat(2, 1fr)"
                        : "repeat(3, 1fr)",
                  }}
                >
                  {selectedProject.works.map((work, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-xl cursor-pointer"
                      style={{
                        aspectRatio: "4 / 3",
                        border: "1px solid #EFEFEF",
                        background: "#FAFAFA",
                      }}
                    >
                      <img
                        src={work.url}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                        }}
                      >
                        <span
                          className="text-[12px] font-medium"
                          style={{ color: "#FFFFFF" }}
                        >
                          {work.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 移动端：先选项目，再显示详情 */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-5 px-5">
          {PROJECTS.map((project) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => handleProjectChange(project)}
                className="flex-none px-4 py-2 rounded-full text-[14px] font-medium transition-all"
                style={{
                  background: isSelected ? "#FF6B6B" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "#2C3E50",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  border: isSelected ? "none" : "1px solid #EEE",
                }}
              >
                {project.name}
              </button>
            );
          })}
        </div>

        <div
          className="rounded-2xl p-6 mt-5 transition-all duration-200"
          style={{
            background: "#FFFFFF",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            opacity: isAnimating ? 0 : 1,
          }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: "#1A1A1A" }}
          >
            {selectedProject.name}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span style={{ color: "#666" }}>{selectedProject.time}</span>
            <span style={{ color: "#666" }}>|</span>
            <span style={{ color: "#666" }}>{selectedProject.role}</span>
            {selectedProject.award && (
              <>
                <span style={{ color: "#666" }}>|</span>
                <span style={{ color: "#FF6B6B" }}>{selectedProject.award}</span>
              </>
            )}
            {selectedProject.nature && (
              <>
                <span style={{ color: "#666" }}>|</span>
                <span style={{ color: "#666" }}>{selectedProject.nature}</span>
              </>
            )}
          </div>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "#333", fontSize: "14px", lineHeight: "1.8" }}
          >
            {selectedProject.description}
          </p>

          {selectedProject.highlights && selectedProject.highlights.length > 0 && (
            <div className="mt-6 space-y-4">
              {selectedProject.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-4"
                  style={{
                    background: "linear-gradient(135deg, #FFF9F6 0%, #FFFFFF 100%)",
                    border: "1px solid #F0E6E0",
                  }}
                >
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: "#FF6B6B", fontSize: "14px" }}
                  >
                    {hl.title}
                  </h3>
                  <ul className="space-y-2">
                    {hl.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[13px]"
                        style={{ color: "#444", lineHeight: "1.8" }}
                      >
                        <span
                          className="mt-2 flex-none rounded-full"
                          style={{ width: "5px", height: "5px", background: "#FF9A9A" }}
                        />
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {selectedProject.works && selectedProject.works.length > 0 && (
            <div className="mt-6">
              <h3
                className="font-semibold mb-3"
                style={{ color: "#1A1A1A", fontSize: "15px" }}
              >
                作品展示
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedProject.works.map((work, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl"
                    style={{
                      aspectRatio: "4 / 3",
                      border: "1px solid #EFEFEF",
                      background: "#FAFAFA",
                    }}
                  >
                    <img
                      src={work.url}
                      alt={work.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
