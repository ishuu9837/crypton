import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const manifest=JSON.parse(readFileSync(new URL('../public/scrapbook/design/manifest.json',import.meta.url),'utf8'));
const publicRoot=new URL('../public',import.meta.url).pathname;
test('all twelve approved pages and their movable pieces are present',()=>{
 assert.equal(manifest.pages.length,12);
 for(const page of [manifest.cover,...manifest.pages]){
  assert.ok(existsSync(publicRoot+page.src));
  for(const asset of page.assets){
   assert.ok(existsSync(publicRoot+asset.src),asset.label);
   assert.ok(asset.x>=0&&asset.y>=0,asset.label);
   assert.ok(asset.x+asset.width<=page.width,asset.label);
   assert.ok(asset.y+asset.height<=page.height,asset.label);
  }
 }
});
test('the approved research arrangement has two left and three right study cards',()=>{
 assert.equal(manifest.pages[4].assets.length,2);
 assert.equal(manifest.pages[5].assets.length,3);
 assert.deepEqual([...manifest.pages[4].assets,...manifest.pages[5].assets].map(a=>a.label),[
  '01 / Professional summary','02 / EduSentinel','03 / Smart Energy Grid','04 / Real-Time Face Detection','05 / HarkPro / Artifacts design'
 ]);
 for(const page of manifest.pages.slice(4,6))for(const card of page.assets)assert.ok(card.y+card.height<754,'study card must clear the printed footer');
});
test('all thirty skill stickies remain individually movable',()=>{
 const skills=manifest.pages.slice(2,4).flatMap(p=>p.assets);
 assert.equal(skills.length,30);assert.equal(new Set(skills.map(a=>a.id)).size,30);
 assert.ok(skills.every(a=>a.label.endsWith('skill sticky')));
});
test('project cards retain the three-per-page approved arrangement',()=>{
 for(const page of manifest.pages.slice(8,10)){
  assert.equal(page.assets.length,3);
  const cards=page.assets.toSorted((a,b)=>a.y-b.y);
  for(let i=1;i<cards.length;i++)assert.ok(cards[i].y+14>=cards[i-1].y+cards[i-1].height-14);
 }
});
