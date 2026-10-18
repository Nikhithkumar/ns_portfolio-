import { motion } from "framer-motion";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { ICONS, SOCIAL_ICONS } from "../lib/icons";
import { useCountUp } from "../hooks/useCountUp";
import type { Profile, Stat } from "../types";
import { cardCls, fadeUp, Highlight } from "./ui";

function StatItem({ stat }: { stat: Stat }) {
  const numericValue = typeof stat.value === "number" ? stat.value : 0;
  const { ref, value } = useCountUp(numericValue);
  const Icon = ICONS[stat.icon];
  const isNumeric = typeof stat.value === "number";

  return (
    <div className="flex flex-col items-center gap-1 px-3 py-1 text-center sm:px-5">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-gold" />
        <span className="text-xl font-normal text-white sm:text-2xl">
          {isNumeric ? <><span ref={ref}>{value}</span>{stat.suffix}</> : stat.value}
        </span>
      </div>
      {stat.label && <span className="text-xs text-white/65 sm:text-[13px]">{stat.label}</span>}
    </div>
  );
}

export default function Hero({ profile }: { profile: Profile }) {
  const h = profile.hero;
  return (
    <section id="home" className={`${cardCls} relative overflow-hidden`}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="grid items-center gap-8 px-5 pb-6 pt-8 sm:px-10 sm:pt-12 lg:grid-cols-2 lg:pb-0">
        <motion.div initial="hidden" animate="show" className="relative z-10 lg:pb-24">
          <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/85">
            <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" /></span>
            {h.badge}
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="mt-6 text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl">
            {h.titleLead}<br />{h.titlePlain} <Highlight>{h.titleHighlight}</Highlight>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-[17px]">{h.subtitle}</motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-7 flex flex-wrap gap-3">
            <a href="#projects" className="group flex items-center gap-2 rounded-lg bg-gradient-to-b from-gold-soft to-gold px-5 py-2.5 text-sm font-medium text-black shadow-gold transition hover:brightness-110">
              {h.primaryCta} <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#contact" className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-white/90 transition hover:border-gold/60">
              {h.secondaryCta} <LayoutGrid size={13} className="text-gold" />
            </a>
          </motion.div>
          <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span>{h.followLabel}</span>
            <div className="flex gap-2">
              {h.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.type];
                return <a key={s.type} href={s.url} target="_blank" rel="noreferrer" aria-label={s.type} className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-white/80 transition hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"><Icon size={14} /></a>;
              })}
            </div>
          </motion.div>
        </motion.div>

        <div className="relative flex min-h-[320px] items-end justify-center lg:min-h-[480px]">
          <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-[60%] animate-spinSlow rounded-full border border-gold/60 shadow-gold sm:h-[340px] sm:w-[340px]">
            <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-gold shadow-gold" />
          </div>
          <motion.img initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} src={h.image} alt="Portrait" loading="eager"
            className="relative z-10 h-[300px] w-[260px] animate-float rounded-t-[140px] object-cover object-top [mask-image:linear-gradient(to_bottom,black_75%,transparent)] sm:h-[400px] sm:w-[330px]" />
          <div className="absolute bottom-0 right-0 z-20 hidden rounded-2xl border border-white/10 bg-ink/70 p-3 backdrop-blur-md lg:block lg:translate-y-6">
            <div className="flex divide-x divide-white/10">{h.stats.map((s) => <StatItem key={s.label} stat={s} />)}</div>
          </div>
        </div>
      </div>
      <div className="mx-5 mb-6 rounded-2xl border border-white/10 bg-white/[0.02] p-3 lg:hidden">
        <div className="flex justify-around divide-x divide-white/10">{h.stats.map((s) => <StatItem key={s.label} stat={s} />)}</div>
      </div>
    </section>
  );
}
