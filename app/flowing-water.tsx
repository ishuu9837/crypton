'use client';
import { useEffect, useRef } from 'react';

// Animate the real island texture only inside its three waterfalls and river.
// The raster remains underneath as a fallback when WebGL is unavailable.
export default function FlowingWater({ paused }: { paused: boolean }) {
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas||paused)return;
    const gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});if(!gl)return;
    const vertex='attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}';
    const fragment=`precision mediump float;
      varying vec2 uv; uniform sampler2D image; uniform vec2 viewport; uniform float time;
      float region(vec2 p,vec2 c,vec2 r){vec2 d=(p-c)/r;return 1.-smoothstep(.65,1.,dot(d,d));}
      void main(){
        float imageRatio=1.405; float ratio=viewport.x/viewport.y;
        vec2 p=vec2(uv.x,1.-uv.y);
        if(ratio>imageRatio)p.y=(p.y-.5)*imageRatio/ratio+.5;else p.x=(p.x-.5)*ratio/imageRatio+.5;
        float mask=max(region(p,vec2(.482,.785),vec2(.016,.08)),region(p,vec2(.626,.746),vec2(.017,.075)));
        mask=max(mask,region(p,vec2(.779,.592),vec2(.017,.06)));
        mask=max(mask,region(p,vec2(.640,.875),vec2(.065,.035)));
        vec2 flow=vec2(sin(p.y*240.-time*4.2)*.0006,cos(p.x*290.+p.y*90.-time*5.)*.0005)*mask;
        vec3 color=texture2D(image,p+flow).rgb;
        color+=vec3(.008,.01,.012)*mask*sin(p.y*310.-time*7.);
        gl_FragColor=vec4(color,1.);
      }`;
    const shader=(type:number,source:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,source);gl.compileShader(s);return s;};
    const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment);const program=gl.createProgram()!;gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS)){gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);return;}
    gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    const viewport=gl.getUniformLocation(program,'viewport'),time=gl.getUniformLocation(program,'time');let frame=0,last=0,visible=true,ready=false,disposed=false;
    const draw=(now:number)=>{frame=requestAnimationFrame(draw);if(!ready||!visible||document.hidden||now-last<33)return;last=now;const w=Math.round(canvas.clientWidth),h=Math.round(canvas.clientHeight);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}gl.uniform2f(viewport,w,h);gl.uniform1f(time,now/1000);gl.drawArrays(gl.TRIANGLES,0,6);canvas.style.opacity='1';};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(canvas);
    const img=new Image();img.onload=()=>{if(disposed)return;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,img);ready=true;frame=requestAnimationFrame(draw);};img.src='/assets/idea-island.webp';
    return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();canvas.style.opacity='0';gl.deleteTexture(texture);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);};
  },[paused]);
  return <canvas ref={ref} className="flowing-water" aria-hidden="true"/>;
}
