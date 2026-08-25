import { useState } from "react";

interface Project {
  id: string;
  name: string;
  time: string;
  role: string;
  award?: string;
  nature?: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    id: "yadi",
    name: "雅迪校园星推官",
    time: "2024年",
    role: "星推官 / 内容策划",
    award: "河南赛区第2名",
    description: "在一个月内为雅迪品牌策划宣传推广方向，围绕社会热点及产品特质，打造具有'活人感'的深度图文种草帖。目标用户为18-35岁年轻女性，通过强共鸣标题与真实场景结合，激发互动与购买意向。最终作品累计播放量5w+，获得河南赛区第2名。",
  },
  {
    id: "yishuyijian",
    name: "一书一荐读",
    time: "2023-2024年",
    role: "核心成员 / 阅读推广人",
    nature: "郑州大学校园重点阅读推广项目",
    description: "参与策划并执行'一书一荐读'校园阅读推广活动，负责撰写书籍推荐语与深度书评，通过线上线下结合的方式引导阅读。组织读书分享会10余场，累计推荐优质书目30余本，活动覆盖学生超500人次。有效提升了校园阅读氛围，获得师生好评。",
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
                时间：{selectedProject.time}
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
                角色：{selectedProject.role}
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
                    className="text-sm"
                    style={{ color: "#FF6B6B" }}
                  >
                    获奖：{selectedProject.award}
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
                    style={{ color: "#666" }}
                  >
                    {selectedProject.nature}
                  </span>
                </>
              )}
            </div>

            <p
              className="mt-6 leading-relaxed"
              style={{ color: "#333", fontSize: "15px", lineHeight: "1.8" }}
            >
              {selectedProject.description}
            </p>
          </div>
        </div>
      </div>

      {/* 移动端：上下堆叠 */}
      <div className="md:hidden">
        <div className="flex gap-2 mb-4">
          {PROJECTS.map((project) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <button
                key={project.id}
                className="flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
                style={{
                  background: isSelected ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                  color: isSelected ? "#FF6B6B" : "#4A5568",
                  fontWeight: isSelected ? 600 : 500,
                  borderLeft: isSelected ? "3px solid #FF6B6B" : "3px solid transparent",
                }}
                onClick={() => handleProjectChange(project)}
              >
                {project.name}
              </button>
            );
          })}
        </div>

        <div
          className="rounded-2xl p-6 transition-all duration-200"
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
            <span
              style={{ color: "#666" }}
            >
              {selectedProject.time}
            </span>
            <span
              style={{ color: "#666" }}
            >
              |
            </span>
            <span
              style={{ color: "#666" }}
            >
              {selectedProject.role}
            </span>
            {selectedProject.award && (
              <>
                <span
                  style={{ color: "#666" }}
                >
                  |
                </span>
                <span
                  style={{ color: "#FF6B6B" }}
                >
                  {selectedProject.award}
                </span>
              </>
            )}
            {selectedProject.nature && (
              <>
                <span
                  style={{ color: "#666" }}
                >
                  |
                </span>
                <span
                  style={{ color: "#666" }}
                >
                  {selectedProject.nature}
                </span>
              </>
            )}
          </div>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "#333", fontSize: "14px", lineHeight: "1.8" }}
          >
            {selectedProject.description}
          </p>
        </div>
      </div>
    </div>
  );
}
