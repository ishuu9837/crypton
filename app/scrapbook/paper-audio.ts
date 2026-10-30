export class PaperAudio {
  private context: AudioContext | null = null;
  enabled = false;
  async unlock() { this.context ??= new AudioContext(); await this.context.resume(); this.enabled=true; }
  turn(reverse=false) {
    const ctx=this.context;if(!this.enabled || !ctx || ctx.state!=='running')return;
    const length=Math.floor(ctx.sampleRate*.44), buffer=ctx.createBuffer(1,length,ctx.sampleRate), data=buffer.getChannelData(0);
    for(let i=0;i<length;i++){const p=i/length;data[i]=(Math.random()*2-1)*Math.sin(Math.PI*p)*(.6+.4*Math.sin(p*38));}
    const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();source.buffer=buffer;source.playbackRate.value=reverse?.88:1;
    filter.type='bandpass';filter.frequency.value=1400;filter.Q.value=.6;gain.gain.value=.22;
    source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);source.start();source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
  }
  close(){this.context?.close();this.context=null;}
}
