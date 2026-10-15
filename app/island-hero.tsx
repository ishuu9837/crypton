'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import FlowingWater from './flowing-water';
import { ArrowRight, ArrowDown, Microscope, Code2, UserRound, Mail, Hand, Plus, Minus, Maximize2, Play, Pause } from 'lucide-react';

export default function IslandHero({ reduced }: { reduced: boolean }) {
  const [paused, setPaused] = useState(false);
  const [view, setView] = useState({ x: 0, y: 0, zoom: 1 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);
  const bound = (n: number) => Math.max(-90, Math.min(90, n));
  const reset = () => setView({ x: 0, y: 0, zoom: 1 });
  function zoom(delta: number) { setView(v => ({ ...v, zoom: Math.max(1, Math.min(1.35, v.zoom + delta)) })); }
  return <section className="island-hero" aria-labelledby="hero-title">
    <div className="island-stage" tabIndex={0} role="region" aria-label="Explore the idea island. Drag to pan, or use arrow keys. Use the controls to zoom or reset."
      onPointerDown={e => { if (e.button !== 0 || (e.target as HTMLElement).closest('a,button')) return; drag.current = { x:e.clientX, y:e.clientY, startX:view.x, startY:view.y }; e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); }}
      onPointerMove={e => { if (!drag.current) return; const d=drag.current; setView(v => ({ ...v, x:bound(d.startX + e.clientX-d.x), y:bound(d.startY + e.clientY-d.y) })); }}
      onPointerUp={() => { drag.current=null; setDragging(false); }} onPointerCancel={() => { drag.current=null; setDragging(false); }}
      onKeyDown={e => { if(e.target!==e.currentTarget)return; const deltas:Record<string,[number,number]>={ArrowLeft:[-20,0],ArrowRight:[20,0],ArrowUp:[0,-20],ArrowDown:[0,20]}; if(deltas[e.key]){e.preventDefault();const [x,y]=deltas[e.key];setView(v=>({...v,x:bound(v.x+x),y:bound(v.y+y)}));}else if(e.key==='Home'){e.preventDefault();reset();} }}>
      <motion.div className={`island-world ${dragging?'is-dragging':''}`} animate={{x:view.x,y:view.y,scale:view.zoom}} transition={{duration:dragging||reduced?0:.35,ease:'easeOut'}}>
        <picture><source type="image/avif" srcSet="/assets/idea-island.avif"/><img className="island-image" src="/assets/idea-island.webp" width="1440" height="1024" alt="A floating island with a glass research greenhouse, glowing computational lab, solar station, bridges and waterfalls" fetchPriority="high" draggable={false}/></picture><FlowingWater paused={paused||reduced}/><img className={`drifting-clouds ${paused||reduced?"motion-paused":""}`} src="/assets/island-clouds.webp" width="1024" height="512" alt="" aria-hidden="true" draggable={false}/>
        <a className="island-portrait" href="#profile" aria-label="Meet Y Eswar"><img src="/assets/eswar-formal-480.avif" width="80" height="80" alt="Y Eswar" draggable={false}/></a>
        <a className="landmark landmark-profile" href="#profile"><UserRound size={20}/><span>Profile</span></a>
        <a className="landmark landmark-projects" href="#projects"><Code2 size={20}/><span>Projects</span></a>
        <a className="landmark landmark-research" href="#research"><Microscope size={19}/><span>Research & publications</span></a>
      <a className="landmark landmark-contact" href="#contact"><Mail size={19}/><span>Contact</span></a></motion.div>
    </div>
    <div className="island-intro"><h1 id="hero-title">A little curiosity.<br/><em>A world of possibilities.</em></h1><p>I’m Y Eswar. I build things with data, code<br className="desktop-break"/> and a curious mind.</p><a className="island-cta" href="#projects">Explore my work <ArrowRight size={22}/></a><span className="island-role">DATA SCIENTIST / ML ENGINEER / RESEARCHER</span></div>
    <div className="island-bottom"><span className="explore-hint"><Hand size={22}/> <span>Drag to explore <span aria-hidden="true">·</span> Click a landmark</span></span><div className="island-controls" aria-label="Island view controls"><button onClick={()=>zoom(-.1)} aria-label="Zoom out" disabled={view.zoom<=1}><Minus size={17}/></button><button onClick={()=>zoom(.1)} aria-label="Zoom in" disabled={view.zoom>=1.35}><Plus size={17}/></button><button onClick={reset} aria-label="Reset island view"><Maximize2 size={16}/></button><button onClick={()=>setPaused(p=>!p)} aria-label={paused?"Resume scenery animation":"Pause scenery animation"} aria-pressed={paused}>{paused?<Play size={16}/>:<Pause size={16}/>}</button></div><button className="replay-intro" onClick={()=>window.dispatchEvent(new Event("replay-intro"))}>Replay intro <Play size={13}/></button><a href="#projects" className="prefer-scroll">Prefer scrolling? <ArrowDown size={17}/></a></div>
  </section>;
}
