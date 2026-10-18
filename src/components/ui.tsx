import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const } }),
};

export function Reveal({ children, i = 0, className = "", ...rest }: { children: ReactNode; i?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

export const cardCls = "rounded-2xl border border-white/10 bg-gradient-to-br from-[#14120d] to-[#0b0a08] shadow-[inset_0_1px_0_rgba(255,255,255,.04)]";

export function Section({ id, index, label, children, className = "", action }: { id?: string; index: string; label: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <Reveal id={id} className={`${cardCls} p-5 sm:p-6 ${className}`}>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs font-normal text-gold/85">{index}</span>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-gold">{label}</h2>
        </div>
        {action}
      </div>
      {children}
    </Reveal>
  );
}

export const Highlight = ({ children }: { children: ReactNode }) => <span className="text-gold">{children}</span>;
