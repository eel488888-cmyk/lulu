import { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const SUB_PAGES = [
  { path: "/account", label: "账号运营" },
  { path: "/project", label: "项目" },
  { path: "/experience", label: "个人经历" },
  { path: "/skills", label: "技能" },
];

interface NavBarProps {
  visible?: boolean;
  deep?: boolean;
}

export default function NavBar({ visible = true, deep = true }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const go = (target: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      const scrollTarget = target === "top" ? "about" : target;
      navigate("/", { state: { scrollTo: scrollTarget } });
      return;
    }
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubPageNav = () => {
    setOpen(false);
    sessionStorage.setItem("skipCatVideo", "true");
  };

  const isSubPage = SUB_PAGES.some((page) => location.pathname === page.path);

  if (!visible) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 anim-slide-down transition-colors duration-500",
        deep
          ? "bg-black/10 backdrop-blur-xl"
          : "bg-white/5 backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-1.5 md:px-8 md:py-2">
        <button
          onClick={() => go("top")}
          className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-serif text-xl font-extrabold tracking-wide text-white transition-colors"
        >
          <span className="text-gradient-coral">王鹭芳</span>
          <span className="ml-2 hidden text-sm font-medium opacity-80 sm:inline">
            Portfolio
          </span>
        </button>

        {/* 桌面导航 */}
        <ul className="hidden items-center gap-5 md:flex">
          {isSubPage ? (
            SUB_PAGES.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={handleSubPageNav}
                  className={({ isActive }) =>
                    cn(
                      "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] relative rounded-full px-4 py-1 text-sm font-medium transition-all",
                      isActive
                        ? "text-coral-500 underline"
                        : "text-white/90 hover:bg-white/15 hover:text-white",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))
          ) : (
            NAV_ITEMS.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => go(item.target)}
                  className={cn(
                    "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] relative rounded-full px-4 py-1 text-sm font-medium transition-all",
                    "text-white/90 hover:bg-white/15 hover:text-white",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))
          )}
        </ul>

        {/* 移动端汉堡按钮 */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="切换菜单"
          className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] rounded-lg p-1.5 text-white transition-colors hover:bg-white/15 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      <div
        className={cn(
          "overflow-hidden bg-black/15 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-3">
          {isSubPage ? (
            SUB_PAGES.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={handleSubPageNav}
                  className={({ isActive }) =>
                    cn(
                      "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] w-full rounded-lg px-4 py-2.5 text-left text-base font-medium transition-colors",
                      isActive
                        ? "text-coral-500"
                        : "text-white/90 hover:bg-white/10",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))
          ) : (
            NAV_ITEMS.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => go(item.target)}
                  className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] w-full rounded-lg px-4 py-2.5 text-left text-base font-medium text-white/90 transition-colors hover:bg-white/10"
                >
                  {item.label}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </header>
  );
}
