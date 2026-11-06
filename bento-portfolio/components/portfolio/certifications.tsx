"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { certifications } from "@/lib/portfolio-content";
import { Board, BoardPiece } from "./board";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto w-full max-w-275 px-6 py-12 sm:px-10" aria-labelledby="certifications-title">
      <h2 className="mb-5 font-serif text-3xl" id="certifications-title">Certifications</h2>
      <Board name="certifications">{bounds => (
        <div className="certification-grid">
          {certifications.map(({ title, issuer, result, url, preview }) => (
            <BoardPiece key={title} board="certifications" bounds={bounds} label={title} className="certification-card">
              <Image src={"/media/certifications/" + preview} alt={title + " credential preview"}
                width={360} height={240} draggable={false} />
              <div><h3 className="font-semibold">{title}</h3><p className="text-sm text-foreground/65">{issuer}{result ? " · " + result : ""}</p></div>
              <a className="portfolio-button" href={url} aria-label={"View credential for " + title}>
                View credential <ArrowUpRight size={13} />
              </a>
            </BoardPiece>
          ))}
        </div>
      )}</Board>
    </section>
  );
}
