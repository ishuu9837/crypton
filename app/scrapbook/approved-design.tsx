'use client';
import artwork from '../../public/scrapbook/design/manifest.json';
import { Draggable, type Positions } from './draggable';
import type { MutableRefObject, CSSProperties } from 'react';
import { projects } from './content';
type Props={positions:MutableRefObject<Positions>;replica?:boolean;onDrag?:(active:boolean)=>void};
const titles=['Hi, I’m Eswar.','Data Scientist. Researcher. AI/ML Engineer.','Data & intelligence.','Code & creation.','Research & case studies.','From inquiry to application.','Miracle','Telex','Inside the projects.','Methods & implementation.','Academic roots. Applied work.','A question worth working on?'];
function Piece({piece,surface,positions,replica,onDrag}:{piece:typeof artwork.cover.assets[number];surface:typeof artwork.cover}&Props){
  const link=piece.label.includes('HarkPro')?'https://hark-artifacts-demo.vercel.app':projects.find(p=>piece.label.endsWith(' / '+p.name))?.url;
  return <div className="sb-approved-piece" style={{left:`${piece.x/surface.width*100}%`,top:`${piece.y/surface.height*100}%`,width:`${piece.width/surface.width*100}%`,height:`${piece.height/surface.height*100}%`,'--sticker-x':`${positions.current[piece.id]?.x||0}px`,'--sticker-y':`${positions.current[piece.id]?.y||0}px`} as CSSProperties}>
    <Draggable id={piece.id} label={piece.label} positions={positions} replica={replica} onDrag={onDrag} className="sb-approved-drag"><img src={piece.src} alt="" draggable="false" width={piece.width} height={piece.height}/></Draggable>
    {link&&!replica&&<a className="sb-approved-link" href={link} target="_blank" rel="noreferrer" aria-label={`Explore ${piece.label}`}>↗</a>}
  </div>;
}
export function ApprovedPage({number,...props}:{number:number}&Props){
  const surface=artwork.pages[number];
  return <article className={`sb-page sb-approved-page sb-approved-page-${number}`} data-page={number} aria-label={titles[number]}>
    <img className="sb-approved-paper" src={surface.src} alt="" draggable="false" width={surface.width} height={surface.height}/>
    <div className="sb-reader-copy"><h2>{titles[number]}</h2><p>{surface.text}</p></div>
    {surface.assets.map(piece=><Piece key={piece.id} piece={piece} surface={surface} {...props}/>)}
    {number===6&&!props.replica&&<a className="sb-approved-region" style={{left:'5.3%',top:'64.5%',width:'82.4%',height:'22%'}} href="https://github.com/ishuu9837/Miracle/releases" target="_blank" rel="noreferrer" aria-label="Explore Miracle releases"/>}
    {number===7&&!props.replica&&<a className="sb-approved-region" style={{left:'7.6%',top:'64.5%',width:'82.4%',height:'22%'}} href="https://telex-website-tau.vercel.app" target="_blank" rel="noreferrer" aria-label="Explore Telex"/>}
    {number===11&&!props.replica&&<nav className="sb-approved-social" aria-label="Contact links"><a href="mailto:founder@ishuu.me">Email</a><a href="https://github.com/ishuu9837" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/eswar854/" target="_blank" rel="noreferrer">LinkedIn</a><a href="/resume/" target="_blank" rel="noreferrer">Résumé</a></nav>}
  </article>;
}
export function ApprovedCover(props:Props){
  const surface=artwork.cover;
  return <><img className="sb-approved-paper" src={surface.src} alt="Burgundy scrapbook cover" draggable="false" width={surface.width} height={surface.height}/>{surface.assets.map(piece=><Piece key={piece.id} piece={piece} surface={surface} {...props}/>)}</>;
}
