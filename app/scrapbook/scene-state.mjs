export const clamp = value => Math.min(1, Math.max(0, value));
// Each leaf has a resting interval before and after its turn. Native scrolling
// remains uninterrupted; there is no automatic scroll snap pulling it backward.
export function pageState(position, frames) {
  const page=Math.max(0,position-4);
  const index=Math.min(frames-1,Math.floor(page+.2+1e-9));
  return {index,fraction:index===frames-1?0:clamp((page-index-.2)/.6)};
}
export function scrollUnits(frames){return 2.5+(frames-1+.35)*.85;}
export function scrollFraction(position,frames){
  const value=Math.max(0,Math.min(4+frames-1+.35,position));
  return (value<=4?value/4*2.5:2.5+(value-4)*.85)/scrollUnits(frames);
}
export function boundedDelta(delta, min, max) {
  // Oversized paper should still move predictably instead of jumping on touch.
  return min > max ? 0 : Math.max(min, Math.min(delta, max));
}
export function layoutPosition(position, fromSingle, toSingle) {
  if(position < 4 || fromSingle === toSingle) return position;
  const leaf = Math.round(position - 4) * (fromSingle ? 1 : 2);
  return 4 + (toSingle ? leaf : Math.floor(leaf / 2));
}
export function floatingLayout(f, x, y, pageWidth, viewportWidth, viewportHeight) {
  const scale=Math.min(pageWidth/f.pageWidth,(viewportWidth-8)/f.width,(viewportHeight-8)/f.height);
  const width=f.width*scale,height=f.height*scale;
  return {
    left:Math.max(4,Math.min((f.left+x)/(f.viewportWidth||viewportWidth)*viewportWidth,viewportWidth-width-4)),
    top:Math.max(4,Math.min((f.top+y)/(f.viewportHeight||viewportHeight)*viewportHeight,viewportHeight-height-4)),
    width,height,pageWidth:f.pageWidth*scale,viewportWidth,viewportHeight
  };
}
export function paperOffset(open,height){return (1-clamp(open))*height*.78;}
export function stageLayout(width,height,single){
 const availableHeight=Math.max(1,height)*.85;
 const bookRatio=single?692/806:1384/806;
 const bookWidth=Math.min(single?520:1190,width*(single?.9:.86),availableHeight*bookRatio);
 const paperWidth=Math.min(650,width*(single?.89:.78),availableHeight*.78);
 return {bookWidth,bookHeight:bookWidth/bookRatio,paperWidth,paperHeight:paperWidth/.78};
}
