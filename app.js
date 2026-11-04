const cards=[...document.querySelectorAll('.post-row')];
let selected='全部';
const input=document.querySelector('#search');
function filter(){const q=(input?.value||'').trim().toLocaleLowerCase();let count=0;for(const card of cards){const visible=(selected==='全部'||card.dataset.category===selected)&&card.textContent.toLocaleLowerCase().includes(q);card.hidden=!visible;if(visible)count++;}const empty=document.querySelector('#empty');if(empty)empty.hidden=count>0;}
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{selected=button.textContent;document.querySelectorAll('.filter').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});filter();}));
input?.addEventListener('input',filter);
let toastTimer;
function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,5000);}
document.querySelector('#copy-rss')?.addEventListener('click',async()=>{const url=document.querySelector('link[type="application/rss+xml"]').href;try{await navigator.clipboard.writeText(url);toast('RSS 訂閱網址已複製');}catch{toast('請點「開啟 RSS」後複製網址，加入你的閱讀器。');}});
const current=document.body.dataset.latest;
async function checkUpdates(){if(!current||document.hidden)return;try{const response=await fetch(document.querySelector('link[type="application/feed+json"]').href,{cache:'no-store'});if(!response.ok)return;const feed=await response.json();if(feed.items?.[0]?.id&&feed.items[0].id!==current){const notice=document.querySelector('#new-posts');if(notice)notice.hidden=false;}}catch{ /* Reading remains available while offline. */ }}
document.querySelector('#new-posts')?.addEventListener('click',()=>location.reload());
setInterval(checkUpdates,300000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)void checkUpdates();});

const classData={
 swordsman:{name:'劍士',en:'SWORDSMAN',lead:'讓每一劍，接上下一劍。',description:'以左、中、右鍵串起連續技，近身追擊，將十二段連擊化為終結一擊。',image:'combat-sword.png',tags:['近身戰鬥','十二段連技','格擋反擊']},
 mage:{name:'法師',en:'MAGE',lead:'冰封戰線，以烈火終結。',description:'蓄力寒冰瀑布、鎖定隕石落點，用冰火技能掌握怪群。詠唱與閃避之間，每次選擇都很重要。',image:'combat-ice.png',tags:['冰火魔法','蓄力施法','範圍控制']},
 priest:{name:'祭司',en:'PRIEST',lead:'有人向前，你就守住希望。',description:'在魔王攻勢中為隊友恢復血量，以祝福支援戰線；也能用神聖之力參與進攻。',image:'combat-priest.png',tags:['全場治療','攻防祝福','神聖攻擊']}
};
const classTabs=[...document.querySelectorAll('[data-class]')];
function selectClass(button){const d=classData[button.dataset.class];if(!d)return;for(const tab of classTabs){const selected=tab===button;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;}document.querySelector('#class-panel').setAttribute('aria-labelledby',button.id);for(const [id,value] of [['class-name',d.name],['class-en',d.en],['class-lead',d.lead],['class-description',d.description]])document.getElementById(id).textContent=value;const image=document.getElementById('class-image');image.src=image.src.replace(/[^/]+$/,d.image);image.alt=d.name+'實機戰鬥';document.getElementById('class-tags').replaceChildren(...d.tags.map(t=>{const el=document.createElement('span');el.textContent=t;return el;}));}
classTabs.forEach((button,i)=>{button.addEventListener('click',()=>selectClass(button));button.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%classTabs.length;else if(e.key==='ArrowLeft')next=(i+classTabs.length-1)%classTabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=classTabs.length-1;if(next!==undefined){e.preventDefault();classTabs[next].focus();selectClass(classTabs[next]);}});});

// GitHub records completed asset requests, rather than local button clicks.
if(document.querySelector('#download-total')){
 const {RELEASE_API,downloadStats}=await import('./download-stats.js');
 const render=(s,live)=>{document.querySelector('#download-total').textContent='累計下載 '+s.total.toLocaleString('zh-TW')+' 次';document.querySelector('#download-detail').textContent='EXE '+s.assets[0].count+' 次 · ZIP '+s.assets[1].count+' 次 · '+(live?'GitHub即時資料':'最近成功讀取')+' '+new Date(s.checkedAt).toLocaleString('zh-TW')+'（含重複下載，非玩家人數）';};
 try{const r=await fetch(new URL('./download-counts.json',import.meta.url));if(r.ok)render(await r.json(),false);}catch{}
 try{const r=await fetch(RELEASE_API,{headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error();render(downloadStats(await r.json()),true);}catch{if(document.querySelector('#download-total').textContent==='讀取下載次數…')document.querySelector('#download-total').textContent='下載統計暫時無法讀取';}
}
