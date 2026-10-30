export const clamp = value => Math.min(1, Math.max(0, value));
// Native scroll is quantized to physical pixels. Snap near each resting spread
// so a chapter button cannot leave its last leaf fractionally open.
export function pageState(position, frames) {
  let page = Math.max(0, position - 4);
  if (Math.abs(page - Math.round(page)) < .012) page = Math.round(page);
  const index = Math.min(frames - 1, Math.floor(page));
  return { index, fraction: index === frames - 1 ? 0 : page - index };
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
