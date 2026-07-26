import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import VideoIntro from "@/components/VideoIntro";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { useScrollPassed } from "@/hooks/useScrollPassed";

type Stage = "cat" | "main" | "stopped" | "clip";

export default function Home() {
  const [skipIntro] = useState(
    () => sessionStorage.getItem("visited") === "true" || sessionStorage.getItem("skipCatVideo") === "true",
  );
  const [stage, setStage] = useState<Stage>(skipIntro ? "stopped" : "cat");
  const location = useLocation();
  const navDeep = useScrollPassed(window.innerHeight * 0.8);

  const handleStageChange = useCallback((s: Stage) => setStage(s), []);

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const hasExplicitTarget = !!state?.scrollTo;
    const target = state?.scrollTo ?? (skipIntro ? "about" : undefined);
    if (!target) return;

    const behavior: ScrollBehavior = hasExplicitTarget ? "smooth" : "auto";
    const t = window.setTimeout(() => {
      if (target === "top") {
        window.scrollTo({ top: 0, behavior });
        return;
      }
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior, block: "start" });
    }, 400);
    return () => window.clearTimeout(t);
  }, [location.state, skipIntro]);

  useEffect(() => {
    sessionStorage.removeItem("skipCatVideo");
  }, []);

  return (
    <>
      <NavBar
        visible={skipIntro || stage !== "cat"}
        deep={navDeep || skipIntro || stage !== "cat"}
      />
      <main
        className="relative"
        style={{ height: "300vh" }}
      >
        <section
          className="relative h-screen w-full overflow-hidden"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <VideoIntro onStageChange={handleStageChange} skipIntro={skipIntro} />
        </section>
        <section
          className="relative h-screen w-full overflow-hidden"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
        >
          <AboutSection />
        </section>
        <section
          className="relative h-screen w-full overflow-hidden"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 3,
          }}
        >
          <ContactSection />
        </section>
      </main>
    </>
  );
}
