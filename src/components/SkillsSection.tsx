import { useInView } from "@/hooks/useInView";
import { SKILLS } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

function SkillBar({
  name,
  percent,
  index,
}: {
  name: string;
  percent: number;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-round text-base font-semibold text-charcoal md:text-lg">
          {name}
        </span>
        <span className="font-serif text-sm font-bold text-coral">
          {percent}%
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-fog">
        <div
          className={cn(
            "bar-fill h-full rounded-full bg-gradient-to-r from-coral via-[#ff9a6c] to-sunny",
            inView && "in-view",
          )}
          style={{
            width: inView ? `${percent}%` : "0%",
            transitionDelay: `${index * 120}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-gradient-to-b from-cream to-[#f3eef0] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="anim-float-slow pointer-events-none absolute -left-10 bottom-10 text-7xl opacity-15">
        💡
      </div>

      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <span className="inline-block rounded-full bg-coral/10 px-4 py-1.5 text-sm font-semibold text-coral">
            Skills · 技能
          </span>
          <h2 className="mt-6 font-serif text-3xl font-bold text-charcoal md:text-4xl">
            💡 技能
          </h2>
          <p className="mt-3 text-charcoal/60">
            内容创作 × AI 工具，把每一个灵感落地成作品。
          </p>
        </Reveal>

        <div className="mt-12 space-y-7">
          {SKILLS.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              percent={skill.percent}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
