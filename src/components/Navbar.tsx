import { AnimatePresence, motion } from "framer-motion";
import { Menu, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Profile } from "../types";

const LINKS = [["Home", "home"], ["About", "about"], ["Skills", "skills"], ["Services", "services"], ["Projects", "projects"], ["Experience", "experience"], ["Testimonials", "testimonials"], ["Contact", "contact"]] as const;

export function Logo({ brand }: { brand: Profile["brand"] }) {
  return (
    <a href="#home" className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md border border-gold/70 text-sm font-semibold text-gold" aria-hidden="true">
        {brand.first.charAt(0).toUpperCase()}
      </span>
      <span className="text-sm font-semibold tracking-wide text-white">{brand.first}<span className="font-light text-white/80">{brand.last}</span></span>
    </a>
  );
}

export default function Navbar({ profile }: { profile: Profile }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach(([, id]) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-3 sm:px-6">
        <Logo brand={profile.brand} />
        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map(([name, id]) => (
            <a key={id} href={`#${id}`} className={`relative text-sm font-normal transition-colors hover:text-gold ${active === id ? "text-gold" : "text-white/70"}`}>
              {name}
              {active === id && <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/90 transition hover:border-gold/60 hover:text-gold lg:flex">
          {profile.navCta} <Send size={13} className="text-gold" />
        </a>
        <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="rounded-lg border border-white/10 p-2 text-white/80 lg:hidden">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/5 bg-ink lg:hidden">
            <div className="flex flex-col px-6 py-3">
              {LINKS.map(([name, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={`py-2.5 text-sm ${active === id ? "text-gold" : "text-white/70"}`}>{name}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-gold py-2.5 text-center text-sm font-medium text-black">{profile.navCta}</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
