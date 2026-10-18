import { Award, FolderCheck, Smile, Code2, PenTool, Package, Gauge, Mail, Phone, MapPin, Clock, Github, Linkedin, BookOpenText, X, Instagram, type LucideIcon } from "lucide-react";
import type { IconKey, SocialType } from "../types";

export const ICONS: Record<IconKey, LucideIcon> = {
  award: Award, folder: FolderCheck, smile: Smile, code: Code2, pen: PenTool, api: Package,
  gauge: Gauge, mail: Mail, phone: Phone, pin: MapPin, clock: Clock,
};
export const SOCIAL_ICONS: Record<SocialType, LucideIcon> = {
  github: Github, linkedin: Linkedin, medium: BookOpenText, x: X, instagram: Instagram,
};
