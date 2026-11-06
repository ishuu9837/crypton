import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MapPin, Play, Volume2, VolumeX, X } from "lucide-react";
import { Intro, shouldShowIntro } from "./Intro";
import type { IntroPlayer } from "./Intro";
import { Board, BoardPiece } from "./Board";
import { PortfolioNav } from "./PortfolioNav";
import { ShaderFlow } from "./ShaderFlow";
import { about, certifications, email, focus, gallery, github, linkedin, previews, projects, toolkit } from "./content";
import type { Project } from "./content";

const easing = [0.25, 0.1, 0.25, 1] as const;
const sectionLinks = [["Skills", "#toolkit"], ["Gallery", "#gallery"], ["Contact", "#contact"]];
type Theme = "dark" | "light";

function ContactButton({ href = "#contact" }: { href?: string }) {
  return <a className="contact-button" href={href}>Contact me <ArrowUpRight aria-hidden="true" size={17} /></a>;
}

function Reveal({ children, className, delay = 0, x = 0, y = 30 }: {
  children: ReactNode; className?: string; delay?: number; x?: number; y?: number;
}) {
  const reduced = useReducedMotion();
  return <motion.div className={className}
    initial={reduced ? false : { opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "50px" }}
    transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : delay, ease: easing }}>
    {children}
  </motion.div>;
}

function Hero({ theme, onThemeChange, sound, onSoundChange, onReplay }: {
  theme: Theme; onThemeChange: () => void; sound: boolean; onSoundChange: () => void; onReplay: () => void;
}) {
  const reduced = useReducedMotion();
  const entrance = (delay: number, y: number) => ({
    initial: reduced ? false as const : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : .65, delay: reduced ? 0 : delay, ease: easing },
  });

  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-flow" aria-hidden="true">
        <ShaderFlow className="hero-flow-canvas" brightness={3} iterations={10} flowSpeed={[0, .1]} fadeRx={5} />
      </div>
      <PortfolioNav theme={theme} onThemeChange={onThemeChange} />
      <motion.header className="hero-header" {...entrance(0, -12)}>
        <a className="site-name" href="#home" aria-label="ishuu.me home">ishuu.me</a>
        <nav className="hero-nav" aria-label="Portfolio sections">
          {sectionLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-controls">
          <button className="white-button header-replay" type="button" onClick={onReplay} aria-label="Replay intro">
            <Play size={15} aria-hidden="true" /> Replay
          </button>
          <button className="white-button icon-button" type="button" onClick={onSoundChange}
            aria-label="Replay sound" aria-pressed={sound} title={sound ? "Replay sound on" : "Replay sound off"}>
            {sound ? <Volume2 size={17} aria-hidden="true" /> : <VolumeX size={17} aria-hidden="true" />}
          </button>
        </div>
      </motion.header>
      <div className="hero-layout">
        <motion.div className="hero-copy" {...entrance(.12, 19)}>
          <p className="hero-eyebrow"><span /> Data science &amp; applied AI</p>
          <h1 id="hero-heading">Hi, I’m<br />{" "}Eswar<span>.</span></h1>
          <p className="hero-introduction">I work with data, train models, and build apps for the things I wish were easier.</p>
          <div className="hero-actions">
            <a className="hero-work" href="#projects">See my work <ArrowDown size={16} aria-hidden="true" /></a>
            <a className="hero-about" href="#about">About me <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </motion.div>
        <motion.figure className="hero-photo" {...entrance(.24, 22)}>
          <div className="portrait-field">
            <div className="portrait-position">
              <img className="portrait-img" src="/media/eswar-portrait.jpg" alt="Portrait of Y Eswar" width={818} height={804} />
            </div>
          </div>
          <figcaption><span>Y ESWAR</span><span><MapPin size={14} aria-hidden="true" /> Hyderabad, India</span></figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

const rows = [
  previews,
  [previews[2], previews[4], previews[1], previews[3], previews[0]],
];

function Marquee() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const right = useTransform(scrollYProgress, [0, 1], [-620, -150]);
  const left = useTransform(scrollYProgress, [0, 1], [-100, -610]);
  const reduced = useReducedMotion();
  return (
    <section className="marquee" ref={section} aria-label="Project previews">
      <div className="marquee-label"><span>01 / PROJECT INDEX</span><a href="#projects">Selected work <ArrowDown size={14} aria-hidden="true" /></a></div>
      {rows.map((row, index) => (
        <motion.div key={index} className="marquee-row" style={{ x: reduced ? 0 : index === 0 ? right : left }}>
          {[...row, ...row, ...row].map((project, i) => (
            <img key={i} src={project.image} alt={i < row.length && index === 0 ? project.name : ""}
              width={420} height={270} loading="lazy" decoding="async" />
          ))}
        </motion.div>
      ))}
    </section>
  );
}

function Letter({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total * .82;
  const opacity = useTransform(progress, [start, start + .17], [.25, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

function AboutText() {
  const target = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ["start 0.85", "end 0.27"] });
  const reduced = useReducedMotion();
  let index = 0;
  return (
    <p className="about-copy" ref={target}>
      {reduced ? about : <>
        <span className="sr-only">{about}</span>
        <span aria-hidden="true">
          {about.split(" ").map((word, wordIndex) => (
            <span className="about-word" key={wordIndex}>{[...word].map((char) => (
              <Letter key={index} char={char} index={index++} total={about.length} progress={scrollYProgress} />
            ))}{" "}</span>
          ))}
        </span>
      </>}
    </p>
  );
}

const decorations = [
  { name: "moon", x: -80, delay: .1 },
  { name: "form", x: -80, delay: .25 },
  { name: "lego", x: 80, delay: .15 },
  { name: "group", x: 80, delay: .3 },
];

function About() {
  return (
    <section id="about" className="about-section">
      {decorations.map(({ name, x, delay }) => (
        <Reveal key={name} className={"decoration decoration-" + name} x={x} y={0} delay={delay}>
          <img src={"/media/" + name + ".png"} alt="" loading="lazy" decoding="async" />
        </Reveal>
      ))}
      <div className="about-center">
        <span className="micro">02 / INTRODUCTION</span>
        <Reveal><h2 className="hero-heading section-heading">About me</h2></Reveal>
        <AboutText />
        <Reveal delay={.15}><ContactButton /></Reveal>
      </div>
    </section>
  );
}

function Focus() {
  return (
    <section id="focus" className="focus-section">
      <span className="micro">03 / WHAT I DO</span>
      <Reveal><h2 className="section-heading">Focus</h2></Reveal>
      <div className="focus-list">
        {focus.map(([name, description], i) => (
          <Reveal className="focus-row" key={name} delay={i * .08}>
            <span className="big-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div><h3>{name}</h3><p>{description}</p></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onOpen }: {
  project: Project; index: number; onOpen: (trigger: HTMLButtonElement) => void;
}) {
  return (
    <article className="project-card">
      <div className="project-header">
        <span className="big-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div><p className="micro">{project.category}</p><h3>{project.name}</h3></div>
      </div>
      <button className="project-preview" type="button" aria-haspopup="dialog"
        aria-label={"View project details for " + project.name} onClick={event => onOpen(event.currentTarget)}>
        <img src={project.image} alt="" loading="lazy" decoding="async" />
        <span className="preview-action">Project details <ArrowRight size={17} aria-hidden="true" /></span>
      </button>
      <p className="project-summary">{project.overview}</p>
    </article>
  );
}

function Projects() {
  const [selected, setSelected] = useState<Project>();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);

  return (
    <section id="projects" className="projects-section">
      <span className="micro">04 / SELECTED WORK</span>
      <Reveal><h2 className="hero-heading section-heading">Projects</h2></Reveal>
      <div className="project-index">{projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} onOpen={button => {
          trigger.current = button;
          setSelected(project);
        }} />
      ))}</div>
      <dialog className="project-dialog" ref={dialog} aria-labelledby="project-dialog-title"
        onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
        onClose={() => { setSelected(undefined); trigger.current?.focus({ preventScroll: true }); }}>
        {selected && <article>
          <header className="project-dialog-header">
            <div><p className="micro">{selected.category}</p><h3 id="project-dialog-title">{selected.name}</h3></div>
            <button type="button" className="white-button icon-button" aria-label="Close project details" autoFocus
              onClick={() => dialog.current?.close()}><X size={19} aria-hidden="true" /></button>
          </header>
          <img src={selected.image} alt={selected.name + (selected.illustration ? " illustration" : " website screenshot")} />
          <div className="project-dialog-copy">
            <h4>{selected.overview}</h4>
            <p>{selected.detail}</p>
            <p className="micro">{selected.stack}</p>
            {selected.url && <a className="white-button" href={selected.url} target="_blank" rel="noopener noreferrer">
              {selected.linkLabel || "Visit website"} <ArrowUpRight size={16} aria-hidden="true" />
            </a>}
          </div>
        </article>}
      </dialog>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="profile-section" id="toolkit" aria-labelledby="toolkit-title">
      <article className="project-card board-card">
        <div className="profile-heading"><span className="micro">05 / Tools I use</span><h2 id="toolkit-title">Skills</h2></div>
        <Board name="skills">{bounds => (
          <div className="skill-spread">
            {["Data & intelligence", "Code & creation"].map((title, page) => (
              <div key={title} className="skill-page">
                <h3>{title}</h3>
                {(page === 0 ? toolkit.slice(0, 4) : toolkit.slice(4)).map(({ title: group, items }, index) => (
                  <div key={group} className="skill-group">
                    <h4>{String(page * 4 + index + 1).padStart(2, "0")} / {group}</h4>
                    <div className="skill-pieces">
                      {items.map(([tool, icon], i) => <BoardPiece key={tool} board="skills" bounds={bounds} label={tool} className={"skill-piece swatch-" + ((index + i) % 5)}>
                        <img src={icon} alt="" draggable={false} loading="lazy" /><span>{tool}</span>
                      </BoardPiece>)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}</Board>
      </article>
    </section>
  );
}

function Certifications() {
  return (
    <section className="profile-section" id="certifications" aria-labelledby="certifications-title">
      <article className="project-card board-card">
        <div className="profile-heading"><span className="micro">06 / Credentials</span><h2 id="certifications-title">Certifications</h2></div>
        <Board name="certifications">{bounds => (
          <div className="certification-grid">
            {certifications.map(({ title, issuer, result, url, preview }) => (
              <BoardPiece key={title} board="certifications" bounds={bounds} label={title} className="certification-card">
                <div className="cert-preview">
                  <img src={"/media/certifications/" + preview} alt={title + (preview.endsWith(".png") ? " badge" : " certificate")}
                    loading="lazy" draggable={false} />
                </div>
                <div className="certification-detail"><h3>{title}</h3><p>{issuer}{result ? " · " + result : ""}</p></div>
                <a className="white-button" href={url} aria-label={"View credential for " + title}>View credential <ArrowUpRight size={15} aria-hidden="true" /></a>
              </BoardPiece>
            ))}
          </div>
        )}</Board>
      </article>
    </section>
  );
}

function Gallery() {
  return (
    <section className="profile-section" id="gallery" aria-labelledby="gallery-title">
      <article className="project-card board-card">
        <div className="profile-heading"><span className="micro">07 / Away from the desk</span><h2 id="gallery-title">Gallery</h2></div>
        <Board name="gallery">{bounds => (
          <div className="gallery-board">
            {gallery.map(({ file, title, alt, cutout }) => <BoardPiece key={file} board="gallery" bounds={bounds} label={title}
              className={cutout ? "photo-piece photo-cutout" : "photo-piece"}>
              <figure>
                <img src={"/media/gallery/" + file} alt={alt} loading="lazy" decoding="async" draggable={false} />
                <figcaption>{title}</figcaption>
              </figure>
            </BoardPiece>)}
          </div>
        )}</Board>
      </article>
    </section>
  );
}

function Contact({ onReplay }: { onReplay: () => void }) {
  return (
    <footer id="contact" className="profile-section contact-section" aria-labelledby="contact-title">
      <div className="contact-card">
        <div>
          <span className="micro">08 / Contact</span>
          <h2 id="contact-title">Let’s talk.</h2>
          <p>I’m open to research, data science and AI/ML roles, and collaborations.</p>
        </div>
        <div className="contact-details">
          <a className="contact-email" href={"mailto:" + email}><Mail size={19} aria-hidden="true" /> {email} <ArrowUpRight size={16} aria-hidden="true" /></a>
          <div className="contact-links">
            <a href={github}><Github size={16} aria-hidden="true" /> GitHub</a>
            <a href={linkedin}><Linkedin size={16} aria-hidden="true" /> LinkedIn</a>
            <a href="/resume.html">Résumé <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="contact-footer"><span>Y Eswar · Hyderabad, India</span><button className="white-button" type="button" onClick={onReplay}><Play size={15} aria-hidden="true" /> Replay intro</button></div>
      <p className="site-credit">MADE BY I⚡️H</p>
    </footer>
  );
}

export function App() {
  const [autoplay] = useState(shouldShowIntro);
  const [entered, setEntered] = useState(!autoplay);
  const [sound, setSound] = useState(false);
  const player = useRef<IntroPlayer>(null);

  function replay() { player.current?.play(sound); }
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === "light" ? "light" : "dark");

  useEffect(() => {
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "dark" ? "#000000" : "#f7f7f7");
    try { localStorage.setItem("eswar-theme", nextTheme); } catch {}
  }

  const finish = useCallback(() => {
    setEntered(true);
    requestAnimationFrame(() => document.getElementById("main")?.focus({ preventScroll: true }));
  }, []);

  return (
    <>
      <a className="skip-content" href="#main">Skip to content</a>
      <Intro ref={player} autoplay={autoplay} onFinish={finish} />
      <main className="site" id="main" tabIndex={-1}>
        {entered ? <Hero theme={theme} onThemeChange={toggleTheme} sound={sound} onSoundChange={() => setSound(v => !v)} onReplay={replay} /> : <div className="hero-reserve" aria-hidden="true" />}
        <Marquee />
        <About />
        <Focus />
        <Projects />
        <Toolkit />
        <Certifications />
        <Gallery />
        <Contact onReplay={replay} />
      </main>
    </>
  );
}
