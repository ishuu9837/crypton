import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
const root=new URL('../',import.meta.url).pathname;
const blocked=/histopath|few[ -]shot|cross[ -]domain|meta[ -]learning|limited labelled|fewer examples/i;
function files(path){return readdirSync(path,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(path,e.name)):[join(path,e.name)]);}
test('public pages and artwork metadata contain only the general professional summary',()=>{
 for(const f of [...files(join(root,'app')),...files(join(root,'public/scrapbook/design'))])
  if(/\.(tsx?|json|svg)$/.test(f))assert.ok(!blocked.test(readFileSync(f,'utf8')),f);
});
test('the resume download containing research details is no longer served',()=>{
 assert.equal(existsSync(join(root,'public/personal/Y.ESWAR.pdf')),false);
});
