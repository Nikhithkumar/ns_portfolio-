import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Profile, Project } from "../types";
import { Reveal, Section } from "./ui";

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={project.title}>
      <motion.div initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.96 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#100f0b]">
        <div className="relative">
          <img src={project.image} alt={project.title} className="h-56 w-full object-cover" />
          <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white hover:text-gold"><X size={16} /></button>
        </div>
        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">{project.tags.map((t) => <span key={t} className="rounded bg-gold/10 px-2 py-0.5 text-[10px] text-gold">{t}</span>)}</div>
          <h3 className="text-lg font-medium text-white">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{project.details ?? project.description}</p>
          <a href={project.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-black">Visit project <ExternalLink size={14} /></a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ profile }: { profile: Profile }) {
  const p = profile.projects;
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <Section id="projects" index="04" label={p.label} action={<a href="#projects" className="text-[11px] text-white/60 transition hover:text-gold">{p.viewAll} →</a>}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {p.items.map((pr, i) => (
          <Reveal key={pr.title} i={i} whileHover={{ y: -5 }} className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] transition hover:border-gold/50 hover:shadow-gold">
            <button onClick={() => setSelected(pr)} className="block w-full overflow-hidden text-left" aria-label={`Open ${pr.title}`}>
              <img src={pr.image} alt={pr.title} loading="lazy" className="h-40 w-full object-cover transition duration-700 group-hover:scale-105" />
            </button>
            <div className="p-4">
              <p className="text-xs leading-relaxed text-gold/90">{pr.tags.join(" • ")}</p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-medium text-white">{pr.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/65">{pr.description}</p>
                </div>
                <a href={pr.link} target="_blank" rel="noreferrer" aria-label={`Visit ${pr.title}`} className="shrink-0 rounded-lg border border-white/10 p-2 text-white/70 transition hover:border-gold/60 hover:text-gold"><ExternalLink size={13} /></a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>{selected && <Modal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </Section>
  );
}
