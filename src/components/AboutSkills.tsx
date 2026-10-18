import { motion } from "framer-motion";
import {
  Activity, Boxes, Braces, Cloud, Code2, Database, FlaskConical, GitBranch, HardDrive,
  KeyRound, Layers3, Server, Smartphone, Timer, Workflow, Zap,
} from "lucide-react";
import { CheckCircle2, Download, Heart, Sparkles } from "lucide-react";
import type { Profile } from "../types";
import { Highlight, Section } from "./ui";

const POINT_ICONS = [Sparkles, CheckCircle2, Zap];

function getSkillIcon(name: string) {
  if (name === "React.js" || name === "React Native") return Smartphone;
  if (name === "C#") return Braces;
  if (["JavaScript", "TypeScript", ".NET Core", "ASP.NET Core Web API", "Node.js", "Express.js", "REST APIs"].includes(name)) return Code2;
  if (["Redux Toolkit", "Zustand", "TanStack Query", "Tailwind CSS"].includes(name)) return Layers3;
  if (name === "Microservices" || name === "Docker") return Boxes;
  if (name === "Entity Framework Core" || ["SQL Server", "PostgreSQL", "MongoDB", "Firebase"].includes(name)) return Database;
  if (name === "Azure Service Bus" || name === "Azure Logic Apps") return Workflow;
  if (name === "Azure Functions") return Zap;
  if (name === "Azure Key Vault") return KeyRound;
  if (name === "Azure Blob Storage") return HardDrive;
  if (name === "Application Insights") return Activity;
  if (name === "Azure DevOps" || name === "CI/CD" || name === "Git") return GitBranch;
  if (name === "xUnit") return FlaskConical;
  if (name === "Hangfire") return Timer;
  if (name.startsWith("Azure")) return Cloud;
  return Server;
}

export function About({ profile }: { profile: Profile }) {
  const a = profile.about;
  const hasResume = Boolean(a.cvUrl && a.cvUrl !== "#");

  return (
    <Section id="about" index="01" label={a.label} className="h-full">
      <div className="max-w-4xl">
        <h3 className="text-2xl font-medium leading-snug text-white sm:text-3xl">{a.headingPlain} <Highlight>{a.headingHighlight}</Highlight></h3>
        <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-white/75 sm:text-base">{a.paragraph}</p>
        <ul className="mt-5 space-y-3">
          {a.points.map((p, i) => { const Icon = POINT_ICONS[i % POINT_ICONS.length]; return (
              <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-white/85 sm:text-[15px]"><Icon size={17} className="mt-0.5 shrink-0 text-gold" />{p}</li>
            ); })}
        </ul>
        {hasResume ? (
          <a href={a.cvUrl} download className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-white/90 transition hover:border-gold/60 hover:text-gold">
            {a.cvLabel} <Download size={15} />
          </a>
        ) : (
          <button type="button" disabled className="mt-6 inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-white/60 opacity-60">
            {a.cvLabel} <Download size={15} />
          </button>
        )}
      </div>
    </Section>
  );
}

export function Skills({ profile }: { profile: Profile }) {
  const s = profile.skills;
  return (
    <Section id="skills" index="02" label={s.label} className="h-full">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {s.items.map((sk, i) => (
          <motion.div key={sk.name} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} whileHover={{ y: -4 }}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] transition hover:border-gold/50 hover:shadow-gold">
            {(() => { const Icon = getSkillIcon(sk.name); return <Icon size={28} strokeWidth={1.7} aria-hidden="true" className="text-gold sm:h-8 sm:w-8" />; })()}
            <span className="px-1 text-center text-[11px] leading-tight text-white/75 sm:text-xs">{sk.name}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/60"><Heart size={11} className="text-gold" fill="currentColor" />{s.footnote}</span>
      </div>
    </Section>
  );
}
