import { ArrowRight } from "lucide-react";
import { ICONS } from "../lib/icons";
import type { Profile } from "../types";
import { Reveal, Section } from "./ui";

export default function Services({ profile }: { profile: Profile }) {
  const s = profile.services;
  return (
    <Section id="services" index="03" label={s.label}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((it, i) => { const Icon = ICONS[it.icon]; return (
          <Reveal key={it.title} i={i} whileHover={{ y: -5 }} className="group rounded-xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-gold/50 hover:shadow-gold">
            <div className="flex items-center gap-3">
              <span className="rounded-lg border border-gold/30 bg-gold/10 p-2 text-gold"><Icon size={18} /></span>
              <h3 className="text-[15px] font-medium text-white">{it.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{it.description}</p>
            <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-gold">{s.cta} <ArrowRight size={14} className="transition group-hover:translate-x-1" /></a>
          </Reveal>
        ); })}
      </div>
    </Section>
  );
}
