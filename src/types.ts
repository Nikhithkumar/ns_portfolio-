export type IconKey = "award" | "folder" | "smile" | "code" | "pen" | "api" | "gauge" | "mail" | "phone" | "pin" | "clock";
export type SocialType = "github" | "linkedin" | "medium" | "x" | "instagram";

export interface Stat { icon: IconKey; value: number | string; suffix?: string; label: string }
export interface Social { type: SocialType; url: string }
export interface Skill { name: string }
export interface Service { icon: IconKey; title: string; description: string }
export interface Project { title: string; description: string; image: string; tags: string[]; link: string; details?: string }
export interface Job {
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}
export interface Testimonial { quote: string; name: string; title: string; avatar: string; rating: number }
export interface ContactItem { icon: IconKey; label: string; value: string }

export interface Profile {
  slug: string;
  brand: { first: string; last: string };
  seoTitle: string;
  navCta: string;
  hero: {
    badge: string; titleLead: string; titlePlain: string; titleHighlight: string; subtitle: string;
    primaryCta: string; secondaryCta: string; followLabel: string; image: string;
    stats: Stat[]; socials: Social[];
  };
  about: {
    label: string; signature: string; headingPlain: string; headingHighlight: string;
    paragraph: string; points: string[]; cvLabel: string; cvUrl: string;
  };
  skills: { label: string; items: Skill[]; footnote: string };
  services: { label: string; items: Service[]; cta: string };
  projects: { label: string; viewAll: string; items: Project[] };
  experience: { label: string; items: Job[] };
  testimonials: { label: string; items: Testimonial[] };
  contact: {
    label: string; headingPlain: string; headingHighlight: string; subtext: string; submitLabel: string;
    items: ContactItem[]; successMessage: string;
  };
  footer: { copyright: string; privacy: string; terms: string };
}
