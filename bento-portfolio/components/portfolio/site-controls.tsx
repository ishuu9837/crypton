"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Intro, shouldShowIntro, type IntroPlayer } from "./intro";

export function SiteControls() {
  const player = useRef<IntroPlayer>(null);
  const [sound, setSound] = useState(false);
  const pathname = usePathname();

  const finish = useCallback(() => {
    delete document.documentElement.dataset.introPending;
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      if (["#about", "#toolkit", "#gallery", "#certifications", "#focus"].includes(location.hash)) {
        location.replace("/about/" + (location.hash === "#about" ? "" : location.hash));
        return;
      }
      if (shouldShowIntro()) {
        player.current?.play(false);
        return;
      }
    }
    finish();
  }, [finish]);

  return (
    <>
      <Intro ref={player} autoplay={false} onFinish={finish} />
      <header className="portfolio-utility">
        <Link href="/" className="portfolio-wordmark">ishuu.me</Link>
        <nav aria-label="Portfolio sections">
          <Link href="/about/#toolkit">Skills</Link>
          <Link href="/about/#gallery">Gallery</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div>
          <button className="portfolio-button" type="button" onClick={() => player.current?.play(sound)} aria-label="Replay intro">
            <Play size={14} aria-hidden="true" /> Replay
          </button>
          <button className="portfolio-button" type="button" onClick={() => setSound(v => !v)}
            aria-label="Replay sound" aria-pressed={sound}>
            {sound ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
          </button>
        </div>
      </header>
      {pathname === "/" && <span id="home" />}
    </>
  );
}
