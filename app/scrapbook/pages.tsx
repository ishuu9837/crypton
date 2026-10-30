'use client';
import { Draggable, type Positions } from './draggable';
import { ApprovedPage } from './approved-design';
import type { MutableRefObject, ReactNode } from 'react';
type Props = { number: number; positions: MutableRefObject<Positions>; replica?: boolean; onDrag?: (active:boolean)=>void };
export function BookPage({number,positions,replica,onDrag}:Props) {
  if(number<12)return <ApprovedPage number={number} positions={positions} replica={replica} onDrag={onDrag}/>;
  const sticker=(id:string,label:string,content:ReactNode,cls='')=><Draggable key={id} id={`${number}-${id}`} label={label} positions={positions} replica={replica} onDrag={onDrag} className={cls}>{content}</Draggable>;
  const heading=(eyebrow:string,title:ReactNode)=><header className="sb-page-heading"><span className="sb-eyebrow">{eyebrow}</span><h2>{title}</h2></header>;
  return <article className={`sb-page sb-page-${number}`} data-page={number}>
    {number===12&&<>{heading('07 / FOR MY HAPPINESS',<>Life between<br/><em>the pages.</em></>)}
      <div className="sb-memory-collage">
        {sticker('city','Eswar overlooking the city',<figure className="sb-polaroid"><img src="/scrapbook/photos/city.webp" alt="Eswar looking out over the city and lake" draggable="false"/><figcaption>a different perspective.</figcaption></figure>,'sb-memory sb-memory-city')}
        {sticker('ride','Eswar on a ride',<figure className="sb-polaroid"><img src="/scrapbook/photos/ride.webp" alt="Eswar wearing a motorcycle helmet" draggable="false"/><figcaption>take the long way home.</figcaption></figure>,'sb-memory sb-memory-ride')}
      </div><p className="sb-memory-caption">Not everything needs a reason.<br/>Some things are just for happiness.</p></>}
    {number===13&&<>{heading('HAPPINESS / KEEP THESE CLOSE',<>My kind<br/><em>of good days.</em></>)}
      <div className="sb-memory-collage">
        {sticker('red-shirt','Eswar portrait memory',<figure className="sb-polaroid"><img src="/scrapbook/photos/red-shirt.webp" alt="Eswar in a burgundy shirt" draggable="false"/><figcaption>little moments.</figcaption></figure>,'sb-memory sb-memory-red')}
        {sticker('out-and-about','Eswar out and about',<figure className="sb-polaroid"><img src="/scrapbook/photos/out-and-about.webp" alt="Eswar in a checked shirt" draggable="false"/><figcaption>out & about.</figcaption></figure>,'sb-memory sb-memory-out')}
        {sticker('graduation','Eswar graduation cutout',<img className="sb-graduation-cutout" src="/scrapbook/photos/graduation.webp" alt="Eswar at his Parul University graduation" draggable="false"/>,'sb-graduation-sticker')}
        {sticker('escalade','Cadillac Escalade-V photo sticker',<figure className="sb-car-photo"><img src="/scrapbook/stickers/escalade-v.webp" alt="Red Cadillac Escalade-V photographed on a city street" draggable="false"/><figcaption>CADILLAC ESCALADE-V</figcaption></figure>,'sb-car-sticker')}
        {sticker('happy-note','Just for happiness note',<span className="sb-cutout">collected, just because. ♡</span>,'sb-happy-note')}
      </div></>}
    <footer className="sb-page-number"><span>Y ESWAR / FIELD NOTES</span><span>{String(number+1).padStart(2,'0')}</span></footer>
  </article>;
}
