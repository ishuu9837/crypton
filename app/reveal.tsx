'use client';
import { useEffect } from 'react';
export default function Reveal(){useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const targets=document.querySelectorAll('.reveal,.tl-era');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-lit','revealed');observer.unobserve(entry.target)}})},{threshold:.12});targets.forEach(t=>observer.observe(t));return()=>observer.disconnect()},[]);return null}
