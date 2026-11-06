"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { motion, useMotionValue } from "motion/react";
import { RotateCcw } from "lucide-react";
import { DottedPattern } from "@/components/ui/dotted-pattern";

export function Board({ children, name }: {
  children: (bounds: RefObject<HTMLDivElement | null>) => ReactNode;
  name: string;
}) {
  const bounds = useRef<HTMLDivElement>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const board = bounds.current!;
    let width = board.clientWidth;
    const observer = new ResizeObserver(() => {
      if (board.clientWidth === width) return;
      width = board.clientWidth;
      setVersion(v => v + 1);
    });
    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="board-toolbar">
        <p id={name + "-hint"}>Drag the pieces or focus one and use the arrow keys.</p>
        <button className="portfolio-button" type="button" onClick={() => setVersion(v => v + 1)}>
          <RotateCcw size={14} aria-hidden="true" /> Reset layout
        </button>
      </div>
      <div className="dot-board" ref={bounds}>
        <DottedPattern size={18} className="pointer-events-none absolute inset-0" />
        <div key={version}>{children(bounds)}</div>
      </div>
    </>
  );
}

export function BoardPiece({ bounds, label, board, className, children }: {
  bounds: RefObject<HTMLDivElement | null>;
  label: string;
  board: string;
  className: string;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [raised, setRaised] = useState(false);
  const drag = useRef<{ pointer: number; x: number; y: number; clientX: number; clientY: number } | undefined>(undefined);

  function move(element: HTMLElement, nextX: number, nextY: number) {
    const board = bounds.current;
    if (!board) return;
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = element;
    const edge = 5;
    x.set(Math.max(edge - offsetLeft, Math.min(board.clientWidth - offsetLeft - offsetWidth - edge, nextX)));
    y.set(Math.max(edge - offsetTop, Math.min(board.clientHeight - offsetTop - offsetHeight - edge, nextY)));
  }

  return (
    <motion.div className={"board-piece " + className} style={{ x, y, zIndex: raised ? 2 : 0 }}
      tabIndex={0} role="group" aria-label={label} aria-describedby={board + "-hint"}
      onPointerDown={event => {
        if (event.button !== 0 || drag.current) return;
        if (event.target instanceof Element && event.target.closest("a, button")) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { pointer: event.pointerId, x: x.get(), y: y.get(), clientX: event.clientX, clientY: event.clientY };
        setRaised(true);
      }}
      onPointerMove={event => {
        const start = drag.current;
        if (start?.pointer !== event.pointerId) return;
        move(event.currentTarget, start.x + event.clientX - start.clientX, start.y + event.clientY - start.clientY);
      }}
      onLostPointerCapture={() => { drag.current = undefined; setRaised(false); }}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        const direction = ({ ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] } as const)[event.key as "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown"];
        if (!direction || !bounds.current) return;
        event.preventDefault();
        move(event.currentTarget, x.get() + direction[0] * 16, y.get() + direction[1] * 16);
      }}>
      {children}
    </motion.div>
  );
}
