import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";

interface ExperienceItem {
  id: string;
  time: string;
  title: string;
  institution: string;
  details: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "master",
    time: "2023.09 - 2026.06",
    title: "文艺学硕士",
    institution: "郑州大学",
    details: ["GPA: 4.14/4.5 (专业排名 3/11)", "获研究生一等奖学金", "获雅迪校园星推官二等奖"],
  },
  {
    id: "student-council",
    time: "2024.06 - 2025.06",
    title: "研究生会副主席",
    institution: "文学院",
    details: ["策划并执行20余场活动，参与率达70%，获校级\"优秀组织\"", "跨团队沟通、统筹资源，优化流程提升效率"],
  },
  {
    id: "wenlv",
    time: "2023.04 - 2023.06",
    title: "文编",
    institution: "河南省文旅厅《破茧成蝶》编辑部",
    details: ["主导3期杂志选题策划，毕业季主题杂志销量环比提升20%", "运营官方读者社群500人，收集反馈优化内容", "深入研究目标读者心理与兴趣"],
  },
  {
    id: "ximalaya",
    time: "2023.01 - 2023.03",
    title: "文案策划",
    institution: "上海喜马拉雅科技有限公司（儿童IP\"好奇心出发\"）",
    details: ["创作科普脚本20+篇，全部转化为音频，节目累计播放量2000w+", "将知识点融入故事，研究2-7岁儿童语言习惯与家长需求", "参与制作的内容成为IP核心资产"],
  },
  {
    id: "liaison",
    time: "2020.10 - 2021.03",
    title: "行政助理",
    institution: "郑州大学对外联络办公室",
    details: ["统筹校友返校周活动，满意率达99%", "建立信息传达SOP，优化期刊出版周期，缩短15%"],
  },
  {
    id: "bachelor",
    time: "2019.09 - 2023.06",
    title: "汉语言文学本科",
    institution: "郑州大学",
    details: ["系统学习文学理论、文艺美学、写作", "奠定扎实的文字与审美基础"],
  },
];

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* 左侧/右侧卡片 */}
      <div
        className={`w-full md:w-[45%] rounded-xl p-5 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${isLeft ? "md:text-right md:mr-8" : "md:text-left md:ml-8"}`}
        style={{
          background: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          transform: isVisible ? "translateY(0)" : `translateY(20px)`,
          transition: "all 0.5s ease-out",
        }}
      >
        <div
          className="text-lg font-bold"
          style={{ color: "#2C3E50" }}
        >
          {item.title}
        </div>
        <div
          className="mt-1 text-sm"
          style={{ color: "#FF6B6B" }}
        >
          {item.institution}
        </div>
        <div
          className="mt-3 text-sm font-medium"
          style={{ color: "#A0AEC0" }}
        >
          {item.time}
        </div>
        <ul className="mt-3 space-y-2">
          {item.details.map((detail, idx) => (
            <li
              key={idx}
              className="text-sm"
              style={{ color: "#4A5568" }}
            >
              • {detail}
            </li>
          ))}
        </ul>
      </div>

      {/* 中央节点 */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FF6B6B] border-4 border-[#F7F9FC] z-10" />

      {/* 竖线 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#E2E8F0] z-0" />
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <>
      <NavBar visible />
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/bg-experience.png")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundColor: "#F7F9FC",
        }}
      />
      <main
        className="relative min-h-screen p-5 md:p-10 z-10"
      >
        <div className="max-w-5xl mx-auto">
          <h1
            className="text-3xl font-semibold"
            style={{
              color: "#2C3E50",
              marginTop: "100px",
              marginBottom: "60px",
            }}
          >
            个人经历
          </h1>

          {/* 时间线 */}
          <div className="relative">
            {EXPERIENCES.map((item, index) => (
              <div key={item.id} className="relative mb-8 last:mb-0">
                <TimelineItem item={item} index={index} />
              </div>
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
