"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { gallery } from "@/lib/portfolio-content";
import { Board, BoardPiece } from "@/components/portfolio/board";

const rotations = [-8, 6, -4, 7, -6, 5];
const ease = [0.22, 1, 0.36, 1] as const;

export function PolaroidStrip() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="gallery" className="mx-auto w-full max-w-275 px-6 sm:px-10" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="mb-5 font-serif text-3xl">Gallery</h2>
      <Board name="gallery">{bounds => (
        <div className="polaroid-grid">
          {gallery.map((photo, index) => (
            <BoardPiece key={photo.file} board="gallery" bounds={bounds} label={photo.title} className="photo-piece">
              <motion.figure style={{ rotate: `${(rotations[index] ?? 0) / 2}deg` }} className={photo.cutout ? "polaroid-cutout" : "polaroid-card"}
                initial={reducedMotion ? false : { opacity: 0, y: -30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : .65, delay: reducedMotion ? 0 : index * .06, ease }}>
                <div className="polaroid-image">
                  <Image src={`/media/gallery/${photo.file}`} alt={photo.alt} fill sizes="(min-width: 640px) 30vw, 48vw" draggable={false} />
                </div>
                <figcaption>{photo.title}</figcaption>
              </motion.figure>
            </BoardPiece>
          ))}
        </div>
      )}</Board>
    </section>
  );
}
