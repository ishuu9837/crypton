import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { Certifications } from "@/components/portfolio/certifications";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-24 sm:pt-36">
        <PolaroidStrip />
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">Y Eswar</span>.
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                A <strong className="font-semibold text-foreground">data scientist, researcher, and AI/ML engineer</strong> based in Hyderabad, India. Currently pursuing an <strong className="font-semibold text-foreground">M.Tech in Data Science at GITAM University</strong>, I bring a strong foundation in Python, PyTorch, statistics, and creative development.
              </p>
              <p>
                My work spans <strong className="font-semibold text-foreground">applied machine learning</strong> (deep autoencoders, LMS anomaly detection, film recommendation systems, and LoRA LLM fine-tuning), <strong className="font-semibold text-foreground">computer vision</strong> (few-shot histopathology classification and perceptual autoencoders), and <strong className="font-semibold text-foreground">native tools</strong> like <strong className="font-semibold text-foreground">Miracle</strong> (a privacy-first file converter built with Swift and C#).
              </p>
              <p>
                I thrive at the intersection of <strong className="font-semibold text-foreground">rigorous research and intuitive interfaces</strong>—turning complex models and data pipelines into reliable, calm, and performant tools.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <Certifications />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
