"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const key = "eswar-oled-intro-seen";

export function shouldShowIntro() {
  const params = new URLSearchParams(location.search);
  if (params.get("skip") === "1" || location.hash || matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (params.get("intro") === "1") return true;
  try { return sessionStorage.getItem(key) !== "1"; } catch { return true; }
}

export type IntroPlayer = { play: (withSound: boolean) => void };

export const Intro = forwardRef<IntroPlayer, { autoplay: boolean; onFinish: () => void }>(
  function Intro({ autoplay, onFinish }, ref) {
    const dialog = useRef<HTMLDialogElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const timer = useRef<number | undefined>(undefined);
    const run = useRef(0);
    const [muted, setMuted] = useState(true);

    const finish = useCallback(() => {
      if (!dialog.current?.open) return;
      run.current++;
      window.clearTimeout(timer.current);
      try { sessionStorage.setItem(key, "1"); } catch {}
      video.current?.pause();
      dialog.current.close();
      onFinish();
    }, [onFinish]);

    const play = useCallback((withSound: boolean) => {
      const film = video.current!;
      const element = dialog.current!;
      if (!element.open) element.showModal();
      film.currentTime = 0;
      film.muted = !withSound;
      setMuted(film.muted);
      const attempt = ++run.current;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(finish, 9500);
      film.play().catch(() => {
        if (attempt !== run.current) return;
        if (!film.muted) {
          film.muted = true;
          setMuted(true);
          film.play().catch(() => { if (attempt === run.current) finish(); });
        } else {
          finish();
        }
      });
    }, [finish]);

    useImperativeHandle(ref, () => ({ play }), [play]);
    useEffect(() => {
      if (autoplay) play(false);
      return () => window.clearTimeout(timer.current);
    }, [autoplay, play]);

    function toggleSound() {
      const film = video.current!;
      film.muted = !film.muted;
      setMuted(film.muted);
    }

    return (
      <dialog ref={dialog} className="gate" aria-label="Portfolio introduction"
        onCancel={event => { event.preventDefault(); finish(); }}>
        <video ref={video} src="/media/intro-oled.mp4" preload={autoplay ? "auto" : "none"} playsInline aria-hidden="true"
          onEnded={finish} onError={finish} />
        <div className="gate-actions">
          <button className="gate-sound" type="button" onClick={toggleSound} aria-label={muted ? "Unmute intro" : "Mute intro"}>
            {muted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
          </button>
          <button className="gate-skip" type="button" onClick={finish} autoFocus>Skip intro <span aria-hidden="true">↗</span></button>
        </div>
      </dialog>
    );
  }
);
