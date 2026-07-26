import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  as?: "div" | "section" | "li" | "span";
}

/**
 * 滚动进入视口时淡入上浮的包装组件。
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "in-view", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
