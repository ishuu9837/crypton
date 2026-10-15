'use client';
import {useState} from 'react';
const images=['9d46b4d538d552c3d163c4cb412bbaf3.jpg','67db26921569188161bef8003f7d18f8.jpg','3fe447608fb4e42691b7f0269adf3911.jpg','1252d12d71549a70feafc0868521a7b0.jpg'];
export default function HeroGallery(){const [index,setIndex]=useState(0);return <section className="landscape section-line personal-gallery"><button onClick={()=>setIndex(i=>(i+1)%images.length)} aria-label={`Show next image. Image ${index+1} of ${images.length}`}><img className={index===1?'':'rotate-scenery'} key={index} src={'/personal/gallery/'+images[index]} width="1200" height="800" alt={`Selected artwork ${index+1} of ${images.length}`} fetchPriority={index===0?'high':'auto'}/></button></section>}
