import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
const read=name=>readFile(new URL('./dist/'+name,import.meta.url),'utf8');
const feed=JSON.parse(await read('feed.json'));
assert.equal(feed.version,'https://jsonfeed.org/version/1.1');assert.ok(feed.items.length>0);
const ids=new Set();for(const item of feed.items){assert.ok(!ids.has(item.id));ids.add(item.id);assert.equal(new URL(item.url).origin,new URL(feed.home_page_url).origin);const base=new URL(feed.home_page_url).pathname.replace(/\/$/,'');const path=new URL(item.url).pathname.slice(base.length);await access(new URL('./dist'+path,import.meta.url));assert.ok(item.content_html);}
const home=await read('index.html');assert.ok(home.includes('id="copy-rss"'));assert.ok(home.includes('type="application/rss+xml"'));assert.ok(home.includes('id="search"'));assert.ok(!home.includes('type="email"'));assert.ok(!/E:\\|C:\\Users|trycloudflare\.com|player-token/.test(home));
for(const name of ['index.html','style.css','app.js','rss.xml','feed.json','privacy.html','sitemap.xml','favicon.svg'])assert.ok((await read(name)).length>0);
console.log(JSON.stringify({validated:true,articles:feed.items.length,rss:true,jsonFeed:true,privatePaths:false}));

let sectionImages=0;for(const item of feed.items){assert.ok(!/trycloudflare\.com|player-token/.test(item.content_html));for(const match of item.content_html.matchAll(/<img[^>]+src="([^"]+)"/g)){const url=new URL(match[1]);assert.ok(url.href.startsWith(feed.home_page_url+'/images/'));await access(new URL('./dist/'+url.href.slice(feed.home_page_url.length+1),import.meta.url));sectionImages++;}}console.log(JSON.stringify({sectionImages,allPresent:true}));
