import {readFile,writeFile} from 'node:fs/promises';
const input=process.argv.indexOf('--file');if(input<0||!process.argv[input+1])throw Error('用法：node add-entry.mjs --file <公開文章JSON路徑>');
const post=JSON.parse((await readFile(process.argv[input+1],'utf8')).replace(/^\uFEFF/,''));
if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id||'')||!post.title||!post.summary||!Array.isArray(post.sections))throw Error('需要id、title、summary、sections');
const file=new URL('./posts.json',import.meta.url),posts=JSON.parse(await readFile(file,'utf8'));
if(posts.some(p=>p.id===post.id))throw Error('文章ID已存在，請直接編輯posts.json更新原文');
post.date??=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Taipei'}).format(new Date());post.category??='製作手記';post.status??='更新紀錄';post.reading??=2;post.featured=true;
posts.forEach(p=>p.featured=false);posts.unshift(post);await writeFile(file,JSON.stringify(posts,null,2)+'\n');await import('./build.mjs');
