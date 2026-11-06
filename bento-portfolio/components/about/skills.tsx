import type { ReactNode } from "react";
import { focus, toolkit } from "@/lib/portfolio-content";

const SKILLS = [
  "Machine Learning & Deep Learning",
  "LLM Fine-Tuning & LoRA",
  "Computer Vision & Autoencoders",
  "Anomaly Detection",
  "Statistical Analysis & Forecasting",
  "Python, PyTorch & Scikit-learn",
  "Next.js, React & TypeScript",
  "Native Apps (macOS & Windows)",
  "Interface Design & Prototyping",
  "SQL & Data Pipelines",
];

export function Skills(): ReactNode {
  return (
    <section id="focus" className="flex flex-col gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        What I do
      </h3>
      <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-4 dark:bg-foreground/5">
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2">
        {focus.map(([name, description]) => <div key={name} className="rounded-xl border border-foreground/10 p-3">
          <dt className="font-semibold">{name}</dt>
          <dd className="mt-1 text-sm text-foreground/70">{description}</dd>
        </div>)}
      </dl>
      <div className="grid gap-3 sm:grid-cols-2">
        {toolkit.map(({ title, items }) => <div key={title} className="rounded-xl border border-foreground/10 p-3">
          <h4 className="mb-2 text-sm font-semibold">{title}</h4>
          <ul className="flex flex-wrap gap-2">{items.map(([name, icon]) => <li key={name}
            className="flex items-center gap-1.5 rounded-md bg-foreground/5 px-2 py-1 text-xs">
            <img src={icon} alt="" width={17} height={17} />{name}
          </li>)}</ul>
        </div>)}
      </div>
    </section>
  );
}
