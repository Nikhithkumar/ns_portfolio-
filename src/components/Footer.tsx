import { ArrowUp } from "lucide-react";
import type { Profile } from "../types";
import { Logo } from "./Navbar";
import { cardCls } from "./ui";

export default function Footer({ profile }: { profile: Profile }) {
  const f = profile.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${cardCls} flex flex-col items-center justify-between gap-4 px-6 py-5 text-[13px] text-white/60 md:flex-row`}>
      <Logo brand={profile.brand} />
      <p>© {currentYear} {profile.brand.first} {profile.brand.last}. {f.copyright}</p>
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-gold">{f.privacy}</a>
        <a href="#" className="hover:text-gold">{f.terms}</a>
        <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="rounded-full border border-gold/40 p-2 text-gold transition hover:bg-gold hover:text-black"><ArrowUp size={14} /></button>
      </div>
    </footer>
  );
}
