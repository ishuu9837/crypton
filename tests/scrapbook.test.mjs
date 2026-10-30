import test from 'node:test';
import assert from 'node:assert/strict';
import {pageState,boundedDelta} from '../app/scrapbook/scene-state.mjs';
test('intro and final hold never turn outside the book',()=>{
  assert.deepEqual(pageState(1.2,6),{index:0,fraction:0});
  assert.deepEqual(pageState(9.35,6),{index:5,fraction:0});
  assert.deepEqual(pageState(10.35,7),{index:6,fraction:0});
  assert.deepEqual(pageState(17.35,14),{index:13,fraction:0});
});
test('pixel-rounded navigation settles on every desktop and mobile page',()=>{
  for(const count of [7,14])for(let i=0;i<count;i++)for(const error of [-.005,0,.005])
    assert.deepEqual(pageState(4+i+error,count),{index:i,fraction:0});
});
test('reverse scroll retraces the same physical leaf',()=>{
  const forward=[4,4.2,4.5,4.8,5].map(p=>pageState(p,6));
  assert.deepEqual([5,4.8,4.5,4.2,4].map(p=>pageState(p,6)),forward.toReversed());
  assert.deepEqual(pageState(4.5,6),{index:0,fraction:.5});
});

test('sticker movement remains inside each page at every edge',()=>{
  assert.equal(boundedDelta(36,-80,150),36);
  assert.equal(boundedDelta(300,-80,150),150);
  assert.equal(boundedDelta(-300,-80,150),-80);
  assert.equal(boundedDelta(0,-80,150),0);
  assert.equal(boundedDelta(30,4,-4),0);
});

test('phone and laptop layout changes preserve the currently read leaf',async()=>{
 const {layoutPosition}=await import('../app/scrapbook/scene-state.mjs');
 assert.equal(layoutPosition(7,false,true),10);
 assert.equal(layoutPosition(10,true,false),7);
 assert.equal(layoutPosition(11,true,false),7);
 assert.equal(layoutPosition(2,false,true),2);
 assert.equal(layoutPosition(7,true,true),7);
});

test('floating photos stay reachable after rotating or resizing a phone',async()=>{
 const {floatingLayout}=await import('../app/scrapbook/scene-state.mjs');
 const f={left:900,top:500,width:240,height:300,pageWidth:600,viewportWidth:1400,viewportHeight:900};
 const next=floatingLayout(f,100,100,340,390,720);
 assert.ok(next.left>=4&&next.top>=4);
 assert.ok(next.left+next.width<=386);
 assert.ok(next.top+next.height<=716);
 const landscape=floatingLayout(next,0,0,180,844,390);
 assert.ok(landscape.top+landscape.height<=386);
});

test('unfolding keeps the paper bottom fixed above the prompt',async()=>{
 const {paperOffset}=await import('../app/scrapbook/scene-state.mjs');
 for(const height of [240,420,650])for(const open of [0,.1,.4,.75,1]){
  const bottom=paperOffset(open,height)+(.22+.78*open)*height;
  assert.ok(Math.abs(bottom-height)<1e-8);
 }
});
test('native page turns have stable resting intervals without scroll snapping',()=>{
 for(const position of [4,4.1,4.19])assert.deepEqual(pageState(position,7),{index:0,fraction:0});
 for(const position of [4.81,4.95,5,5.1])assert.deepEqual(pageState(position,7),{index:1,fraction:0});
 assert.ok(pageState(4.6,7).fraction>pageState(4.4,7).fraction);
});
test('chapter navigation matches the shorter intro and reading timeline',async()=>{
 const {scrollFraction,scrollUnits}=await import('../app/scrapbook/scene-state.mjs');
 for(const frames of [7,14]){
  assert.equal(scrollFraction(0,frames),0);
  assert.equal(scrollFraction(4+frames-1+.35,frames),1);
  assert.ok(Math.abs(scrollFraction(4,frames)*scrollUnits(frames)-2.5)<1e-8);
  for(let page=0;page<frames;page++)assert.ok(Math.abs(scrollFraction(4+page,frames)*scrollUnits(frames)-(2.5+page*.85))<1e-8);
 }
});
