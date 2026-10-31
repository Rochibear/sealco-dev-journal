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
