'use client';
import {useLayoutEffect,useEffect,useRef,useState,type ReactNode,type CSSProperties,type PointerEvent} from 'react';
import {createPortal,flushSync} from 'react-dom';
import {boundedDelta,floatingLayout} from './scene-state.mjs';
type Floating={left:number;top:number;width:number;height:number;pageWidth:number;viewportWidth:number;viewportHeight:number};
export type Positions=Record<string,{x:number;y:number;floating?:Floating}>;
type Props={id:string;label:string;children:ReactNode;positions:React.MutableRefObject<Positions>;replica?:boolean;className?:string;style?:CSSProperties;onDrag?:(active:boolean)=>void};
export function Draggable({id,label,children,positions,replica=false,className='',style,onDrag}:Props){
 const ref=useRef<HTMLDivElement>(null),placeholder=useRef<HTMLDivElement>(null),session=useRef<{pointer:number;x:number;y:number}|null>(null),callback=useRef(onDrag);
 callback.current=onDrag;
 const [active,setActive]=useState(false),[floating,setFloating]=useState<Floating|null>(null);
 useLayoutEffect(()=>{
  const p=positions.current[id];
  if(!replica&&p?.floating){
   const pw=ref.current?.closest('[data-page]')?.getBoundingClientRect().width||p.floating.pageWidth;
   const f=floatingLayout(p.floating,p.x,p.y,pw,innerWidth,innerHeight);
   positions.current[id]={x:0,y:0,floating:f};setFloating(f);
  }
 },[id,replica,positions]);
 useEffect(()=>{
  if(!floating)return;
  const resize=()=>{
   const p=positions.current[id];if(!p?.floating)return;
   const pw=placeholder.current?.closest('[data-page]')?.getBoundingClientRect().width||p.floating.pageWidth;
   const f=floatingLayout(p.floating,p.x,p.y,pw,innerWidth,innerHeight);
   positions.current[id]={x:0,y:0,floating:f};setFloating(f);
   if(session.current){const pointer=session.current.pointer;session.current=null;setActive(false);callback.current?.(false);if(ref.current?.hasPointerCapture(pointer))ref.current.releasePointerCapture(pointer);}
  };
  window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize);
 },[floating,id,positions]);
 useEffect(()=>()=>{if(session.current)callback.current?.(false);},[]);
 const lift=()=>{
  if(floating)return floating;
  const el=ref.current;if(!el)return null;
  const r=el.getBoundingClientRect(),page=el.closest('[data-page]')?.getBoundingClientRect();
  const width=el.offsetWidth,height=el.offsetHeight;
  const old=positions.current[id]||{x:0,y:0};
  const f={left:r.left+r.width/2-width/2-old.x,top:r.top+r.height/2-height/2-old.y,width,height,pageWidth:page?.width||width,viewportWidth:innerWidth,viewportHeight:innerHeight};
  positions.current[id]={...old,floating:f};
  flushSync(()=>setFloating(f));
  return f;
 };
 const apply=(x:number,y:number)=>{
  positions.current[id]={...positions.current[id],x,y};
  if(ref.current)ref.current.style.transform=`translate3d(${x}px,${y}px,0)`;
 };
 const move=(dx:number,dy:number)=>{
  const el=ref.current;if(!el)return;
  const r=el.getBoundingClientRect(),old=positions.current[id]||{x:0,y:0};
  // The viewport is the workspace: both book pages and the surrounding desk.
  apply(old.x+boundedDelta(dx,4-r.left,innerWidth-r.right-4),old.y+boundedDelta(dy,4-r.top,innerHeight-r.bottom-4));
 };
 const finish=(e:PointerEvent<HTMLDivElement>)=>{
  if(!session.current||session.current.pointer!==e.pointerId)return;
  session.current=null;setActive(false);callback.current?.(false);
  if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
 };
 const pos=positions.current[id]||{x:0,y:0};
 const item=<div ref={ref} data-sticker-id={id} className={`sb-draggable ${active?'is-dragging':''} ${floating?'sb-floating-item':''} ${className}`} style={{...style,...(floating?{position:'fixed',left:floating.left,top:floating.top,right:'auto',bottom:'auto',width:floating.width,height:floating.height,margin:0}:{}),transform:`translate3d(${pos.x}px,${pos.y}px,0)`}} role={replica?undefined:'button'} tabIndex={replica?-1:0} aria-label={`${label}. Drag anywhere across the open book or desk. Arrow keys move; Home returns it to its original position.`} onDragStart={e=>e.preventDefault()} onClick={e=>e.stopPropagation()} onKeyDown={e=>{
  if(replica)return;
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key)){
   e.preventDefault();e.stopPropagation();
   if(e.key==='Home'){positions.current[id]={x:0,y:0};flushSync(()=>setFloating(null));if(ref.current){ref.current.style.transform='translate3d(0,0,0)';ref.current.focus({preventScroll:true});}return;}
   lift();ref.current?.focus({preventScroll:true});const d=e.shiftKey?20:8;
   move(e.key==='ArrowLeft'?-d:e.key==='ArrowRight'?d:0,e.key==='ArrowUp'?-d:e.key==='ArrowDown'?d:0);
  }
 }} onPointerDown={e=>{
  if(replica||e.button!==0)return;e.preventDefault();e.stopPropagation();
  lift();session.current={pointer:e.pointerId,x:e.clientX,y:e.clientY};
  ref.current?.setPointerCapture(e.pointerId);setActive(true);callback.current?.(true);
 }} onPointerMove={e=>{const s=session.current;if(!s||s.pointer!==e.pointerId)return;e.preventDefault();e.stopPropagation();move(e.clientX-s.x,e.clientY-s.y);s.x=e.clientX;s.y=e.clientY;}}
 onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish}>{children}</div>;
 if(!floating||replica)return item;
 return <><div ref={placeholder} aria-hidden className={`sb-drag-placeholder sb-draggable ${className}`} style={{...style,width:floating.width,height:floating.height,visibility:'hidden',pointerEvents:'none'}}/>{createPortal(<div className="sb-float-layer" style={{width:floating.pageWidth}}>{item}</div>,document.body)}</>;
}
