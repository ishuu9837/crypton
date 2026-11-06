"use client";

import {
  ArrowRight,
  Bot,
  ExternalLink,
  LayoutPanelTop,
  X,
  Film,
  Github,
  Palette,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";
import { projects } from "@/lib/portfolio-content";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
  linkLabel?: string | undefined;
  liveUrl?: string | undefined;
  repoUrl?: string | undefined;
};

const icons = [Film, Bot, LayoutPanelTop, Sparkles, LayoutPanelTop, LayoutPanelTop, Rocket, Sparkles, Zap, Bot, Palette];
const PROJECTS: Project[] = projects.map((project, index) => ({
  id: project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  icon: icons[index] ?? LayoutPanelTop,
  iconLabel: project.name,
  title: project.overview,
  description: project.detail,
  meta: project.stack,
  imageRatio: 1.6,
  image: project.image,
  imageAlt: project.name + (project.illustration ? " illustration" : " website preview"),
  liveUrl: project.linkLabel === "View source" ? undefined : project.url,
  repoUrl: project.linkLabel === "View source" ? project.url : undefined,
  linkLabel: project.linkLabel,
}));

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;
  const [selected, setSelected] = useState<Project>();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  function openProject(project: Project, button: HTMLButtonElement) {
    trigger.current = button;
    setSelected(project);
    dialog.current?.showModal();
  }

  return (
    <section id="projects" className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              Featured work
            </h2>
            <p className="max-w-[34ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Machine learning models, native tools, and interactive applications I&rsquo;ve designed, trained, and built.
            </p>
          </FadeIn>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={button => openProject(project, button)} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="portfolio-button focus-ring group h-11 rounded-xl px-5"
            >
              View all {PROJECTS.length} projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-details-title"
        onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
        onClose={() => { setSelected(undefined); trigger.current?.focus({ preventScroll: true }); }}>
        {selected && <article>
          <header className="flex items-start justify-between gap-4">
            <h3 id="project-details-title" className="font-serif text-3xl tracking-tight">{selected.iconLabel}</h3>
            <button type="button" className="portfolio-button" aria-label="Close project details" autoFocus onClick={() => dialog.current?.close()}><X size={18} /></button>
          </header>
          <Image src={selected.image} alt={selected.imageAlt} width={960} height={600} className="project-detail-image" />
          <h4 className="text-lg font-semibold">{selected.title}</h4>
          <p className="text-foreground/75">{selected.description}</p>
          <p className="text-sm text-foreground/60">{selected.meta}</p>
          {selected.liveUrl && <a className="portfolio-button" href={selected.liveUrl} target="_blank" rel="noreferrer">
            {selected.linkLabel || "Visit website"} <ExternalLink size={15} />
          </a>}
          {selected.repoUrl && <a className="portfolio-button" href={selected.repoUrl} target="_blank" rel="noreferrer">
            View source <Github size={15} />
          </a>}
        </article>}
      </dialog>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (button: HTMLButtonElement) => void;
}): ReactNode {
  const Icon = project.icon;
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="h-full"
    >
      <article className="project-card flex h-full flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5 shadow-sm">
        <header className="flex items-center justify-between px-1 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground">
              {project.iconLabel}
            </span>
          </div>

        </header>

        <button type="button" className="focus-ring text-left" aria-haspopup="dialog"
          aria-label={`View project details for ${project.iconLabel}`} onClick={event => onOpen(event.currentTarget)}>
          <span className="project-card__image ring-foreground/5 relative block w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
            style={{ aspectRatio: project.imageRatio }}>
            <span className="project-card__image-inner block">
              <Image src={project.image} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" priority={index < 2} />
            </span>
          </span>
          <span className="portfolio-button project-details-label">Project details <ArrowRight size={13} /></span>
        </button>

        <div className="flex flex-col gap-2 px-1 pb-1">
          <h3 className="text-[19px] font-medium leading-[1.25] tracking-tight text-foreground sm:text-[21px]">
            {project.title}
          </h3>
        </div>

        <p className="px-1 pb-2 text-[12px] font-medium tracking-tight text-foreground/50">
          {project.meta}
        </p>
      </article>
    </FadeIn>
  );
}
