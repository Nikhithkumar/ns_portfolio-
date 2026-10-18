import { useEffect, useMemo } from "react";
import { getProfile } from "./data/profiles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { About, Skills } from "./components/AboutSkills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  // /?profile=<slug> selects a profile from src/data/profiles.ts
  const profile = useMemo(() => getProfile(new URLSearchParams(window.location.search).get("profile")), []);
  useEffect(() => { document.title = profile.seoTitle; }, [profile]);

  return (
    <>
      <Navbar profile={profile} />
      <main className="mx-auto flex max-w-[1240px] flex-col gap-4 px-3 py-4 sm:px-6">
        <Hero profile={profile} />
        <div className="grid gap-4 lg:grid-cols-2">
          <About profile={profile} />
          <Skills profile={profile} />
        </div>
        <Services profile={profile} />
        <Projects profile={profile} />
        <Experience profile={profile} />
        <Testimonials profile={profile} />
        <Contact profile={profile} />
        <Footer profile={profile} />
      </main>
    </>
  );
}
