'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { BookPage } from './pages';
import { type Positions } from './draggable';
import { ApprovedCover } from './approved-design';
import { PaperAudio } from './paper-audio';
import { chapters } from './content';
import { pageState, layoutPosition, scrollUnits, scrollFraction, stageLayout } from './scene-state.mjs';
import './scrapbook.css';
export default function ScrapbookExperience(){
  const root=useRef<HTMLDivElement>(null),scene=useRef<HTMLDivElement>(null),stageArea=useRef<HTMLDivElement>(null),book=useRef<HTMLDivElement>(null),cover=useRef<HTMLDivElement>(null),flipper=useRef<HTMLDivElement>(null),positions=useRef<Positions>({}),audio=useRef<PaperAudio|null>(null),dragging=useRef(false),progress=useRef(3),go=useRef<(v:number,instant?:boolean)=>void>(()=>{});
  const snapTrigger=useRef<ScrollTrigger|null>(null),previousLayout=useRef<boolean|null>(null);
  const [mobile,setMobile]=useState(false),[reduced,setReduced]=useState(false),[frame,setFrame]=useState(0),[opened,setOpened]=useState(false),[sound,setSound]=useState(false),[reset,setReset]=useState(0),[ready,setReady]=useState(false);
  const frames=mobile?14:7,pageFrame=Math.min(frame,frames-1),chapter=mobile?Math.floor(pageFrame/2):pageFrame;
  useEffect(()=>{const small=matchMedia('(max-width: 700px), (max-width: 950px) and (pointer: coarse)'),motion=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{setMobile(small.matches);setReduced(motion.matches);};update();small.addEventListener('change',update);motion.addEventListener('change',update);audio.current=new PaperAudio();setReady(true);return()=>{small.removeEventListener('change',update);motion.removeEventListener('change',update);audio.current?.close();};},[]);
  useEffect(()=>{
    if(!ready)return;
    gsap.registerPlugin(ScrollTrigger);
    const oldLayout=previousLayout.current;
    const resizedTarget=oldLayout!==null&&oldLayout!==mobile?layoutPosition(progress.current,oldLayout,mobile):null;
    previousLayout.current=mobile;
    const total=4+frames-1+.35;let current=-1,last=3,lastTurn='' ;
    const ctx=gsap.context(()=>{
      const measure=()=>{
        const area=stageArea.current!.getBoundingClientRect();
        const size=stageLayout(area.width,area.height,mobile);
        // Explicit dimensions avoid WebKit's percentage-height/intrinsic SVG cycle.
        gsap.set(book.current,{width:size.bookWidth,height:size.bookHeight,xPercent:-50,yPercent:-50});
        gsap.set(book.current,{x:0,y:0,scale:1,rotation:0,opacity:1,visibility:'visible'});
      };
      measure();
      const proxy={value:3};
      const render=()=>{
        if(dragging.current)return;
        const v=proxy.value;progress.current=v;
        const stage=scene.current!;
        const opening=Math.min(1,Math.max(0,(v-3)/.8));
        setOpened(previous=>previous===(opening===1)?previous:opening===1);
        const width=book.current!.offsetWidth;
        gsap.set(book.current,{x:(mobile?width*.0195:-width*.24025)*(1-opening)});
        gsap.set(cover.current,{rotationY:reduced?0:-180*opening,opacity:1-Math.min(1,Math.max(0,(opening-.85)/.15)),visibility:opening===1?'hidden':'visible'});
        gsap.set(book.current!.querySelector('.sb-approved-binding'),{opacity:mobile?0:opening});
        gsap.set(book.current!.querySelector('.sb-book-inner'),{opacity:opening});
        const {index,fraction}=pageState(v,frames);
        if(current!==index){current=index;setFrame(index);}
        const turning=fraction>.002;
        stage.style.setProperty('--book-open',String(opening));
        stage.style.setProperty('--turn',String(fraction));stage.style.setProperty('--reading','1');
        stage.dataset.turning=turning?'true':'false';
        if(flipper.current){
          gsap.set(flipper.current,{rotationY:reduced?0:-180*fraction,opacity:turning?(reduced?1-fraction:1):0,visibility:turning?'visible':'hidden'});
          gsap.set(flipper.current.querySelector('.sb-flip-front'),{visibility:turning&&(reduced||fraction<.5)?'visible':'hidden'});
          gsap.set(flipper.current.querySelector('.sb-flip-back'),{visibility:turning&&!reduced&&fraction>=.5?'visible':'hidden'});
        }
        const direction=v>=last?'forward':'back';
        if(v>=4&&Math.abs(v-last)>.0001&&turning){const key=`${index}-${direction}`;if(lastTurn!==key){audio.current?.turn(direction==='back');lastTurn=key;}}
        if(!turning)lastTurn='';last=v;
      };
      const tween=gsap.timeline({scrollTrigger:{trigger:root.current,start:'top top',end:'bottom bottom',scrub:reduced?true:.18,invalidateOnRefresh:true,onRefresh:()=>{measure();render();}}})
        .fromTo(proxy,{value:3},{value:4,duration:.9,ease:'none',onUpdate:render})
        .fromTo(proxy,{value:4},{value:total,duration:(frames-1+.35)*.85,ease:'none',immediateRender:false,onUpdate:render});
      snapTrigger.current=tween.scrollTrigger;
      go.current=(value,instant=false)=>{const height=root.current!.offsetHeight-innerHeight;window.scrollTo({top:root.current!.offsetTop+scrollFraction(value,frames)*height,behavior:reduced||instant?'instant':'smooth'});};
      if(resizedTarget!==null&&resizedTarget>=4)go.current(resizedTarget,true);
      render();
    },root);
    const blockWheel=(e:WheelEvent)=>{if(dragging.current)e.preventDefault();};
    const key=(e:KeyboardEvent)=>{if((e.target as HTMLElement).closest('a,button,[role="button"],input,textarea'))return;if(['ArrowRight','PageDown','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go.current(progress.current<4?4:4+Math.min(frames-1,Math.max(0,Math.round(progress.current-4)+(e.key==='ArrowRight'||e.key==='PageDown'?1:-1))));}};
    window.addEventListener('wheel',blockWheel,{passive:false});window.addEventListener('keydown',key);
    return()=>{ctx.revert();window.removeEventListener('wheel',blockWheel);window.removeEventListener('keydown',key);};
  },[ready,mobile,reduced,frames]);
  const drag=(active:boolean)=>{dragging.current=active;if(active)snapTrigger.current?.getTween(true)?.kill();};
  const unlock=async()=>{if(sound){audio.current!.enabled=false;setSound(false);}else{try{await audio.current?.unlock();setSound(true);audio.current?.turn();}catch{setSound(false);}}};
  const pages=(index:number,replica=false)=>mobile?<BookPage number={index} positions={positions} replica={replica} onDrag={drag}/>:<><BookPage number={index*2} positions={positions} replica={replica} onDrag={drag}/><BookPage number={index*2+1} positions={positions} replica={replica} onDrag={drag}/></>;
  return <main className="scrapbook-experience" ref={root} style={{height:`${(1+scrollUnits(frames))*100}svh`}}>
    <a className="sb-skip" href="#book-controls" onClick={e=>{e.preventDefault();go.current(4);}}>Skip to portfolio</a>
    <div className="sb-scene" ref={scene} data-phase={opened?'book':'cover'} data-layout={mobile?'single':'spread'} data-design-revision="cover-10">
      <header className="sb-topbar"><a href="/" className="sb-wordmark">ishuu.me</a><div className="sb-top-actions"><button onClick={()=>setReduced(!reduced)} aria-pressed={reduced}>{reduced?'Motion: quiet':'Motion: full'}</button><button onClick={unlock} aria-label={sound?'Mute page sounds':'Enable page sounds'} aria-pressed={sound}>{sound?<Volume2 size={15}/>:<VolumeX size={15}/>}<span>{sound?'Sound on':'Enable sound'}</span></button></div></header>
      <div className="sb-stage" ref={stageArea}>
      <div className="sb-book-world" ref={book} aria-label="Interactive portfolio scrapbook">
        <img className="sb-approved-binding" src="/scrapbook/design/book-frame.svg" alt="" draggable="false"/>
        <nav className="sb-edge-tabs" aria-label="Scrapbook tabs">{chapters.map((title,i)=><button key={title} style={{top:`${(78+i*105)/806*100}%`}} aria-current={chapter===i?'page':undefined} onClick={()=>go.current(4+i*(mobile?2:1))}>{title}</button>)}</nav>
        
        <div className="sb-book-inner" inert={!opened} key={`${mobile}-${reset}`}>
          <div className="sb-spread sb-base">{pages(pageFrame)}</div>
          {pageFrame<frames-1&&<div className="sb-spread sb-reveal" aria-hidden="true" inert><BookPage number={mobile?pageFrame+1:(pageFrame+1)*2+1} positions={positions} replica/></div>}
          {pageFrame<frames-1&&<div className="sb-flipper" ref={flipper} aria-hidden="true" inert><div className="sb-flip-front"><BookPage number={mobile?pageFrame:pageFrame*2+1} positions={positions} replica/></div><div className="sb-flip-back"><BookPage number={mobile?pageFrame+1:(pageFrame+1)*2} positions={positions} replica/></div></div>}
        </div>
        <div className="sb-cover sb-approved-cover" ref={cover} data-page="cover"><ApprovedCover positions={positions} onDrag={drag}/></div>
      </div>
      </div>
      <div className="sb-controls" id="book-controls"><div className="sb-intro-hint" hidden={opened}><button className="sb-open-book" onClick={()=>go.current(4)}>Open my scrapbook ↗</button><p>Scroll to open</p></div><div className="sb-book-controls" hidden={!opened}><div className="sb-navigation"><button aria-label="Previous page" disabled={pageFrame===0} onClick={()=>go.current(4+pageFrame-1)}><ArrowLeft size={18}/></button><span aria-live="polite">{String(pageFrame+1).padStart(2,'0')} <i>/ {String(frames).padStart(2,'0')}</i></span><button aria-label="Next page" disabled={pageFrame===frames-1} onClick={()=>go.current(4+pageFrame+1)}><ArrowRight size={18}/></button><button className="sb-reset" onClick={()=>{positions.current={};setReset(v=>v+1);}} title="Reset all sticker positions" aria-label="Reset sticker positions"><RotateCcw size={14}/></button></div></div>
      </div><span className="sb-desk-caption">Scroll to turn · Drag the little things · Make yourself at home.</span>
    </div>
    <noscript><div className="sb-noscript"><h1>Y Eswar — Data Scientist, Researcher & AI/ML Engineer</h1><p>This interactive book uses JavaScript. You can also read my résumé and project notes.</p><a href="/resume/">Read résumé →</a><a href="/research/">Explore research →</a></div></noscript>
  </main>;
}
