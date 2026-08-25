import NavBar from "@/components/NavBar";
import VideoIntro from "@/components/VideoIntro";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import AccountSection from "@/pages/AccountPage";
import ProjectSection from "@/pages/ProjectPage";
import ExperienceSection from "@/pages/ExperiencePage";
import SkillsSection from "@/pages/SkillsPage";
import { useScrollPassed } from "@/hooks/useScrollPassed";

export default function Home() {
  const navDeep = useScrollPassed(window.innerHeight * 0.8);

  return (
    <>
      <NavBar visible deep={navDeep} />
      <main className="relative">
        {/* 首屏 - 定格画面 */}
        <div className="relative h-screen w-full overflow-hidden">
          <VideoIntro />
        </div>

        {/* 关于我 */}
        <AboutSection />

        {/* 账号运营 */}
        <section
          id="account"
          className="relative w-full scroll-mt-20 py-16 md:py-24"
          style={{ background: "#F7F9FC" }}
        >
          <AccountSection />
        </section>

        {/* 项目 */}
        <section
          id="project"
          className="relative w-full scroll-mt-20 py-16 md:py-24"
          style={{ background: "#FFFFFF" }}
        >
          <ProjectSection />
        </section>

        {/* 个人经历 */}
        <section
          id="experience"
          className="relative w-full scroll-mt-20 py-16 md:py-24"
          style={{ background: "#F7F9FC" }}
        >
          <ExperienceSection />
        </section>

        {/* 技能 */}
        <section
          id="skills"
          className="relative w-full scroll-mt-20 py-16 md:py-24"
          style={{ background: "#FFFFFF" }}
        >
          <SkillsSection />
        </section>

        {/* 联系方式 */}
        <div className="relative h-screen w-full overflow-hidden">
          <ContactSection />
        </div>
      </main>
    </>
  );
}
