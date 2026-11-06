import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, Moon, RotateCcw, Sparkles, Sun, Twitter, Volume2, VolumeX, X, Zap } from "lucide-react";
import { Intro, shouldShowIntro } from "./Intro";
import type { IntroPlayer } from "./Intro";
import { Board, BoardPiece } from "./Board";
import { certifications, email, gallery, github, instagram, linkedin, projects, researchCases, toolkit, twitter } from "./content";
import type { Project } from "./content";

const easing = [0.25, 0.1, 0.25, 1] as const;
const nav = [["Projects", "#projects"], ["Research", "#research"], ["Skills", "#toolkit"], ["Gallery", "#gallery"], ["Contact", "#contact"]];
type Theme = "dark" | "light";

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
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <motion.header className="hero-header" {...entrance(0, -12)}>
        <a className="site-name" href="#home" aria-label="ishuu.me home">ishuu.me</a>
        <div className="hero-bar">
          <nav className="hero-nav" aria-label="Primary">
            {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="header-controls">
            <button className="white-button icon-button" type="button" onClick={onSoundChange}
              aria-label="Replay sound" aria-pressed={sound} title={sound ? "Replay sound on" : "Replay sound off"}>
              {sound ? <Volume2 size={17} aria-hidden="true" /> : <VolumeX size={17} aria-hidden="true" />}
            </button>
            <button className="white-button icon-button" type="button" onClick={onThemeChange}
              aria-label={"Switch to " + nextTheme + " mode"} title={"Switch to " + nextTheme + " mode"}>
              {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>
            <button className="white-button icon-button" type="button" onClick={onReplay} aria-label="Replay intro" title="Replay intro">
              <RotateCcw size={17} aria-hidden="true" />
            </button>
            <details className="mobile-menu" onKeyDown={event => {
              if (event.key === "Escape" && event.currentTarget.open) {
                event.currentTarget.open = false;
                event.currentTarget.querySelector("summary")?.focus();
              }
            }}>
              <summary className="white-button icon-button" aria-label="Navigation menu"><Menu size={19} aria-hidden="true" /></summary>
              <nav aria-label="Mobile primary" onClick={event => {
                if (event.target instanceof Element && event.target.closest("a")) {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }
              }}>
                {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
              </nav>
            </details>
          </div>
        </div>
      </motion.header>
      <About />
    </section>
  );
}

function AboutPreview({ name, children }: { name: string; children: ReactNode }) {
  const project = projects.find(item => item.name === name) ?? researchCases.find(item => item.name === name);
  const id = useId();
  const anchor = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<"hover" | "focus" | "pinned" | null>(null);
  const [offset, setOffset] = useState(0);
  const [above, setAbove] = useState(false);
  const open = mode !== null;

  useEffect(() => {
    if (!open) return;
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !anchor.current?.contains(event.target)) setMode(null);
    }
    function dismissWithEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (anchor.current?.contains(document.activeElement)) trigger.current?.focus();
      setMode(null);
    }
    function placePreview() {
      const rect = anchor.current?.getBoundingClientRect();
      if (!rect) return;
      const viewport = document.documentElement.clientWidth;
      const halfWidth = Math.min(148, (viewport - 32) / 2);
      const middle = (rect.left + rect.right) / 2;
      const center = Math.max(halfWidth + 16, Math.min(viewport - halfWidth - 16, middle));
      setOffset(center - middle);
      setAbove(rect.bottom > window.innerHeight - 270 && rect.top > 270);
    }
    placePreview();
    window.addEventListener("pointerdown", dismissOutside);
    window.addEventListener("keydown", dismissWithEscape);
    window.addEventListener("resize", placePreview);
    return () => {
      window.removeEventListener("pointerdown", dismissOutside);
      window.removeEventListener("keydown", dismissWithEscape);
      window.removeEventListener("resize", placePreview);
    };
  }, [open]);

  if (!project) return children;
  return (
    <span className="about-preview" ref={anchor}
      onPointerEnter={event => { if (event.pointerType === "mouse") setMode(current => current ?? "hover"); }}
      onPointerLeave={() => setMode(current => current === "hover" ? null : current)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMode(null); }}>
      <button type="button" ref={trigger} aria-expanded={open} aria-controls={id}
        onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setMode("focus"); }}
        onClick={() => setMode(current => current === "pinned" ? null : "pinned")}>
        {children}
      </button>
      <span id={id} hidden={!open} className="about-popover" data-above={above}
        style={{ left: `calc(50% + ${offset}px)` }}>
        <a href={project.url ?? project.repo ?? "#projects"} className="about-popover-card">
          {project.image && <img src={project.image} alt="" width={272} height={153} loading="lazy" decoding="async" />}
          <span className="about-popover-title">{project.name} <ArrowUpRight size={15} aria-hidden="true" /></span>
          <span className="about-popover-note">{project.overview}</span>
        </a>
      </span>
    </span>
  );
}

function About() {
  return (
    <div id="about" className="about-section">
      <div className="about-intro">
        <h1 id="hero-heading">Hii, I'm Y ESWAR</h1>
        <p className="about-tagline">You can call me <strong>ISH</strong>.</p>
      </div>
      <div className="about-center" id="focus">
        <p className="micro about-kicker">Data science &amp; applied AI <span>· Hyderabad, India</span></p>
        <h2>I build <em>AI tools</em> for real problems.</h2>
        <p>I'm an <strong>AI/ML engineer</strong> pursuing an M.Tech in Data Science at GITAM University. I build with AI agents, language models, deep learning, and computer vision, taking ideas from a first experiment toward useful, working tools.</p>
        <p>My work ranges from <AboutPreview name="EduSentinel">EduSentinel</AboutPreview>, which uses anomaly detection to surface unusual learning patterns, to{" "}
          <AboutPreview name="MRS by Letterboxd">film recommendations</AboutPreview> shaped by language, year, and genre. I also explore{" "}
          <AboutPreview name="Smart Energy Grid">energy forecasting</AboutPreview> and, in my current research,{
          " "}<AboutPreview name="Few-Shot Medical Image Classification">few-shot medical imaging</AboutPreview>—learning from a small set of labelled examples.
        </p>
        <p>Alongside machine learning, I'm building practical desktop tools: <AboutPreview name="Miracle Website">Miracle</AboutPreview> brings image, video, audio, and document conversion to your computer, while{" "}
          <AboutPreview name="Telex Website">Telex</AboutPreview> is a Mac teleprompter for comfortable script reading.</p>
        <p className="about-hint">Hover or tap an underline to preview my work.</p>
      </div>
      <img className="about-portrait" src="/media/ish-at-work-cutout.png"
        alt="Illustration of Y Eswar working at his laptop" width={1254} height={1254} decoding="async" />
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: {
  project: Project; index: number; onOpen: (trigger: HTMLButtonElement) => void;
}) {
  const frame = useRef<HTMLSpanElement>(null);
  const visible = useInView(frame);

  return (
    <article className="project-card">
      <button className="project-preview" type="button" aria-haspopup="dialog"
        aria-label={"View project details for " + project.name} onClick={event => onOpen(event.currentTarget)}>
        <span className="project-preview-frame" ref={frame} data-playing={project.illustration ? undefined : visible}>
          <span className="project-preview-window"><img src={project.image} alt="" loading="lazy" decoding="async" /></span>
        </span>
        <span className="project-card-meta">
          <span className="project-note">{project.category.split(" / ")[0]}</span>
          <span className="project-stamp micro">EXP. {String(index + 1).padStart(3, "0")}</span>
          <span className="preview-action">Project details <ArrowRight size={13} aria-hidden="true" /></span>
        </span>
      </button>
      <div className="project-card-copy">
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <div className="project-links">
            {project.repo && <a className="project-link project-repo" href={project.repo} target="_blank" rel="noopener noreferrer"
              aria-label={project.name + " on GitHub"} title="GitHub repository"><Github size={15} aria-hidden="true" /></a>}
            {project.url && <a className="project-link project-live" href={project.url} target="_blank" rel="noopener noreferrer"
              aria-label={project.name + " live site"}>Live <ArrowUpRight size={12} aria-hidden="true" /></a>}
          </div>
        </div>
        <p className="project-summary">{project.overview}</p>
        <p className="project-stack micro"><span>Made with</span> {project.stack}</p>
      </div>
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
            {(selected.url || selected.repo) && <a className="white-button" href={selected.url ?? selected.repo} target="_blank" rel="noopener noreferrer">
              {selected.linkLabel ?? (selected.url ? "Visit website" : "View source")} <ArrowUpRight size={16} aria-hidden="true" />
            </a>}
          </div>
        </article>}
      </dialog>
    </section>
  );
}

function Research() {
  return (
    <section className="profile-section research-section" id="research" aria-labelledby="research-title">
      <div className="board-card">
        <div className="profile-heading">
          <span className="micro">Studies &amp; experiments</span>
          <h2 id="research-title">Research and Case Studies</h2>
        </div>
        <div className="research-grid">
          {researchCases.map(({ name, category, overview, url, repo, current }) => (
            <article className="research-card" key={name} data-current={current || undefined}>
              <div className="research-meta">
                {current && <span className="micro research-current">Current research</span>}
                <p className="micro">{category}</p>
              </div>
              <h3>{name}</h3>
              <p>{overview}</p>
              <div className="project-links">
                {repo && <a className="project-link" href={repo} aria-label={name + " on GitHub"}><Github size={15} aria-hidden="true" /> GitHub</a>}
                {url && <a className="project-link" href={url} aria-label={name + " live site"}>Live <ArrowUpRight size={13} aria-hidden="true" /></a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const skillPages = [
  { title: "Data & intelligence", groups: [0, 1, 2, 3, 8] },
  { title: "Code & creation", groups: [4, 5, 6, 7] },
];

function Toolkit() {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <section className="profile-section" id="toolkit" aria-labelledby="toolkit-title">
      <article className="project-card board-card">
        <div className="profile-heading"><span className="micro">05 / Tools I use</span><h2 id="toolkit-title">Skills</h2></div>
        <label className="skills-filter">
          <span className="micro">Skill category</span>
          <select value={activeGroup} onChange={event => setActiveGroup(Number(event.currentTarget.value))}>
            {toolkit.map(({ title }, index) => <option key={title} value={index}>{title}</option>)}
          </select>
        </label>
        <Board name="skills">{bounds => (
          <div className="skill-spread">
            {skillPages.map(({ title, groups }) => (
              <div key={title} className="skill-page" data-active={groups.includes(activeGroup)}>
                <h3>{title}</h3>
                {groups.map(index => {
                  const { title: group, items } = toolkit[index];
                  return <div key={group} className="skill-group" data-active={index === activeGroup}>
                    <h4>{String(index + 1).padStart(2, "0")} / {group}</h4>
                    <div className="skill-pieces">
                      {items.map(([tool, icon], i) => <BoardPiece key={tool} board="skills" bounds={bounds} label={tool} className={"skill-piece swatch-" + ((index + i) % 5)}>
                        <img src={icon} alt="" draggable={false} loading="lazy" /><span>{tool}</span>
                      </BoardPiece>)}
                    </div>
                  </div>;
                })}
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

function Contact() {
  return (
    <footer id="contact" className="profile-section contact-section" aria-labelledby="contact-title">
      <div className="contact-card">
        <div className="contact-copy">
          <div className="contact-message">
            <span className="micro contact-status">Open to research &amp; collaborations</span>
            <h2 id="contact-title">Let’s <span>connect!!</span></h2>
            <p>I’m open to research, data science and AI/ML roles, and collaborations.</p>
            <div className="contact-actions">
              <a className="white-button" href={"mailto:" + email}><Mail size={16} aria-hidden="true" /> Email me</a>
              <a className="white-button" href="/resume.html">See my CV <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="contact-drink">
            <Sparkles className="drink-sparkles" size={30} aria-hidden="true" />
            <Zap className="drink-zap" size={23} aria-hidden="true" />
            <img src="/media/diet-coke-cutout.png" alt="Silver Diet Coke can" width={466} height={700} loading="lazy" decoding="async" />
          </figure>
        </div>
        <div className="contact-footer">
          <span className="micro">Y Eswar · Hyderabad, India</span>
          <div className="contact-links">
            <a href={github}><Github size={17} aria-hidden="true" /> GitHub</a>
            <a href={linkedin}><Linkedin size={17} aria-hidden="true" /> LinkedIn</a>
            <a href={instagram}><Instagram size={17} aria-hidden="true" /> Instagram</a>
            <a href={twitter}><Twitter size={17} aria-hidden="true" /> X / Twitter</a>
          </div>
        </div>
        <img className="contact-landscape" src="/media/contact-landscape.webp" alt="" loading="lazy" decoding="async" />
      </div>
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
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "dark" ? "#0b0b0c" : "#f1ecdf");
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
        <Projects />
        <Research />
        <Toolkit />
        <Certifications />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
