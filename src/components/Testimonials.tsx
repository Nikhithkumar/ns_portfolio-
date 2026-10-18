import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Profile } from "../types";
import { Section } from "./ui";

export default function Testimonials({ profile }: { profile: Profile }) {
  const t = profile.testimonials;

  return (
    <Section id="testimonials" index="06" label={t.label}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {t.items.map((it, i) => (
          <motion.figure key={`${it.name}-${i}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/[0.025] p-5">
            <div>
              <Quote size={20} className="text-gold" fill="currentColor" />
              <p className="mt-3 text-[13px] font-medium uppercase tracking-[0.12em] text-gold/90">{it.name}</p>
              <blockquote className="mt-3 text-sm leading-relaxed text-white/75">{it.quote}</blockquote>
            </div>
            {it.title && <p className="mt-4 text-xs text-white/60">{it.title}</p>}
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
