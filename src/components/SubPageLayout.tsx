import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import NavBar from "@/components/NavBar";

interface SubPageLayoutProps {
  emoji: string;
  title: string;
}

export default function SubPageLayout({ emoji, title }: SubPageLayoutProps) {
  return (
    <>
      <NavBar visible deep />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cream px-5 py-24">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="anim-float-slow pointer-events-none absolute left-10 top-24 text-7xl opacity-20">
          {emoji}
        </div>
        <div className="anim-float-slow pointer-events-none absolute bottom-16 right-12 text-6xl opacity-20">
          🚧
        </div>

        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-6xl shadow-card">
            {emoji}
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal md:text-4xl">
            {title}
          </h1>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-coral/10 px-5 py-2.5 text-base font-medium text-coral">
            <Construction size={18} />
            内容即将上线
          </div>
          <p className="mt-4 max-w-md text-charcoal/55">
            内容正在精心打磨中，敬请期待。先回首页看看更多精彩吧～
          </p>

          <Link
            to="/"
            state={{ scrollTo: "about" }}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-[#ff9a6c] px-7 py-3.5 font-round text-base font-semibold text-white shadow-[0_10px_30px_rgba(255,107,122,0.4)] transition-all hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} />
            返回首页
          </Link>
        </div>
      </main>
    </>
  );
}
