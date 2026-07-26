import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Instagram,
  MessageCircle,
  Download,
  Check,
  Copy,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useClipboard } from "@/hooks/useClipboard";
import { CONTACT } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Instagram, label: "小红书", href: "#" },
  { icon: MessageCircle, label: "微信", href: "#" },
  { icon: Mail, label: "邮箱", href: `mailto:${CONTACT.email}` },
];

export default function ContactSection() {
  const { copiedKey, copy } = useClipboard();
  const [downloading, setDownloading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    window.setTimeout(() => setDownloading(false), 1500);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.warn("联系我背景图加载失败");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        height: "100%",
        backgroundImage: imageLoaded ? `url('/images/bg-contact.jpg')` : undefined,
        backgroundSize: imageLoaded ? "cover" : undefined,
        backgroundPosition: imageLoaded ? "center center" : undefined,
        backgroundAttachment: imageLoaded ? "fixed" : undefined,
        backgroundColor: imageLoaded ? undefined : "#F7F9FC",
      }}
    >
      {!imageLoaded && (
        <img
          src="/images/bg-contact.jpg"
          alt=""
          className="hidden"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <span className="inline-block rounded-full bg-white/60 px-4 py-1.5 text-sm font-semibold text-coral">
            Contact · 联系方式
          </span>
          <h2 className="mt-6 font-serif text-3xl font-bold text-white md:text-4xl">
            一起把好点子变成作品吧
          </h2>
          <p className="mt-3 text-white/80">
            欢迎合作、交流或只是打个招呼 👋
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => copy(CONTACT.email, "email")}
              className="group flex items-center justify-center gap-3 rounded-2xl border border-white/70 bg-white/20 backdrop-blur-md px-5 py-5 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card hover:bg-white/30"
            >
              <Mail size={20} className="text-coral" />
              <span className="font-round text-sm font-semibold md:text-base">
                {CONTACT.email}
              </span>
              {copiedKey === "email" ? (
                <Check size={16} className="text-mint" />
              ) : (
                <Copy
                  size={16}
                  className="text-white/50 transition-colors group-hover:text-coral"
                />
              )}
            </button>

            <button
              onClick={() => copy(CONTACT.phone, "phone")}
              className="group flex items-center justify-center gap-3 rounded-2xl border border-white/70 bg-white/20 backdrop-blur-md px-5 py-5 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card hover:bg-white/30"
            >
              <Phone size={20} className="text-coral" />
              <span className="font-round text-sm font-semibold md:text-base">
                {CONTACT.phone}
              </span>
              {copiedKey === "phone" ? (
                <Check size={16} className="text-mint" />
              ) : (
                <Copy
                  size={16}
                  className="text-white/50 transition-colors group-hover:text-coral"
                />
              )}
            </button>
          </div>
        </Reveal>

        {copiedKey && (
          <div className="anim-toast fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-charcoal/90 px-5 py-2.5 text-sm font-medium text-white shadow-xl">
            ✓ 已复制到剪贴板
          </div>
        )}

        <Reveal delay={160}>
          <div className="mt-6 text-xs md:text-sm text-white/70">
            📍 中国 · 上海
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-8 flex items-center justify-center gap-5">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="social-icon flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white shadow-soft transition-all hover:-translate-y-1 hover:bg-white/30"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-10">
            <button
              onClick={handleDownload}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-round text-base font-semibold text-white shadow-[0_10px_30px_rgba(255,107,122,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(255,107,122,0.55)]",
                "bg-gradient-to-r from-coral to-[#ff9a6c]",
              )}
            >
              <Download size={18} />
              {downloading ? "准备中…" : "下载简历 PDF"}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
