import { motion } from "framer-motion";
import { Building2, Cloud, Database, Smartphone } from "lucide-react";
import type { Profile } from "../types";
import { Reveal, Section } from "./ui";

const COMPANY_ICONS = [Cloud, Smartphone, Smartphone, Database];

export default function Experience({ profile }: { profile: Profile }) {
  const e = profile.experience;
  return (
    <Section id="experience" index="05" label={e.label}>
      <div className="relative">
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} style={{ originX: 0 }}
          className="absolute left-0 right-0 top-[5px] hidden h-px bg-gradient-to-r from-gold/80 via-gold/40 to-gold/80 lg:block" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {e.items.map((j, i) => (
            <Reveal key={j.role + j.company} i={i} className="relative min-w-0 border-l border-gold/30 pl-5 lg:border-0 lg:pl-0 lg:pt-6">
              <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-gold shadow-gold lg:left-0 lg:top-0" />
              <div className="flex min-w-0 gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-gold">
                  {(() => { const Icon = COMPANY_ICONS[i] ?? Building2; return <Icon size={18} aria-hidden="true" />; })()}
                </span>
                <div className="min-w-0">
                  <h3 className="break-words text-[15px] font-medium text-white">{j.company}</h3>
                  <p className="mt-1 break-words text-[13px] text-white/70">{j.role}</p>
                  <p className="mt-1 break-words text-xs text-gold/90">{j.period}</p>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-white/70">{j.description}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-white/70 marker:text-gold/80">
                {j.responsibilities.map((responsibility) => <li key={responsibility} className="break-words">{responsibility}</li>)}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {j.technologies.map((technology) => (
                  <span key={technology} className="max-w-full break-words rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] leading-tight text-white/70">{technology}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
