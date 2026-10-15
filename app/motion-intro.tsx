'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export default function MotionIntro() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const replay = () => setOpen(true);
    window.addEventListener('replay-intro', replay);
    try { if (!sessionStorage.getItem('eswar-intro-seen') && !matchMedia('(prefers-reduced-motion: reduce)').matches) { setOpen(true); sessionStorage.setItem('eswar-intro-seen','1'); } } catch {}
    return () => window.removeEventListener('replay-intro', replay);
  }, []);
  useEffect(() => { if(!open)return; const timer=setTimeout(()=>setOpen(false), reduced?100:2100); return ()=>clearTimeout(timer); },[open,reduced]);
  return <AnimatePresence>{open&&<motion.div className="motion-intro" initial={{opacity:1}} exit={{y:'-100%'}} transition={{duration:reduced?0:.65,ease:[.76,0,.24,1]}} role="dialog" aria-modal="true" aria-label="Y Eswar introduction" onKeyDown={e=>{if(e.key==='Escape')setOpen(false);if(e.key==='Tab')e.preventDefault();}}>
    <div className="intro-type">{'Y ESWAR'.split('').map((letter,i)=><motion.span key={i} initial={{y:'110%',opacity:0}} animate={{y:0,opacity:1}} transition={{delay:reduced?0:i*.065,duration:.65,ease:[.22,1,.36,1]}}>{letter===' '?'\u00a0':letter}</motion.span>)}</div>
    <motion.p initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.6}}>DATA. CODE. CURIOSITY.</motion.p>
    <motion.div className="intro-progress" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.6,ease:'easeInOut'}}/>
    <button autoFocus onClick={()=>setOpen(false)}>Skip intro</button>
  </motion.div>}</AnimatePresence>;
}
