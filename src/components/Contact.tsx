import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { ICONS } from "../lib/icons";
import type { Profile } from "../types";
import { Highlight, Section } from "./ui";

type Values = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
const EMPTY: Values = { name: "", email: "", subject: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name (min 2 characters).";
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Subject must be at least 3 characters.";
  if (v.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

export default function Contact({ profile }: { profile: Profile }) {
  const c = profile.contact;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next); setSent(false);
    if (touched[e.target.name as keyof Values]) setErrors(validate(next));
  };
  const onBlur = (k: keyof Values) => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validate(values)); };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs); setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400)); // replace with your API call / EmailJS / Formspree
    setLoading(false); setSent(true); setValues(EMPTY); setTouched({}); setErrors({});
  };

  const field = (k: keyof Values) => `w-full rounded-lg border bg-white/[0.03] px-3.5 py-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-gold/70 focus:bg-white/[0.05] disabled:opacity-50 ${touched[k] && errors[k] ? "border-red-500/70" : "border-white/10"}`;
  const Err = ({ k }: { k: keyof Values }) => touched[k] && errors[k] ? <p role="alert" className="mt-1 text-xs text-red-400">{errors[k]}</p> : null;

  return (
    <Section id="contact" index="07" label={c.label}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr_1fr]">
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-medium leading-snug text-white">{c.headingPlain} <Highlight>{c.headingHighlight}</Highlight></h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{c.subtext}</p>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div><input name="name" aria-label="Your Name" placeholder="Your Name" value={values.name} onChange={onChange} onBlur={() => onBlur("name")} disabled={loading} className={field("name")} /><Err k="name" /></div>
            <div><input name="email" type="email" aria-label="Your Email" placeholder="Your Email" value={values.email} onChange={onChange} onBlur={() => onBlur("email")} disabled={loading} className={field("email")} /><Err k="email" /></div>
          </div>
          <div><input name="subject" aria-label="Subject" placeholder="Subject" value={values.subject} onChange={onChange} onBlur={() => onBlur("subject")} disabled={loading} className={field("subject")} /><Err k="subject" /></div>
          <div><textarea name="message" aria-label="Your Message" placeholder="Your Message" rows={5} value={values.message} onChange={onChange} onBlur={() => onBlur("message")} disabled={loading} className={`${field("message")} resize-none`} /><Err k="message" /></div>
          <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-gold-soft to-gold px-5 py-2.5 text-sm font-medium text-black shadow-gold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <>{c.submitLabel} <Send size={13} /></>}
          </button>
          <AnimatePresence>
            {sent && <motion.p role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-emerald-400"><CheckCircle2 size={16} />{c.successMessage}</motion.p>}
          </AnimatePresence>
        </form>

        <ul className="space-y-5 border-white/10 lg:border-l lg:pl-6">
          {c.items.map((it) => { const Icon = ICONS[it.icon]; return (
            <li key={it.label} className="flex items-center gap-3">
              <span className="rounded-lg border border-gold/30 bg-gold/10 p-2 text-gold"><Icon size={15} /></span>
              <div><p className="text-sm font-medium text-white">{it.label}</p><p className="text-[13px] text-white/65">{it.value}</p></div>
            </li>
          ); })}
        </ul>
      </div>
    </Section>
  );
}
