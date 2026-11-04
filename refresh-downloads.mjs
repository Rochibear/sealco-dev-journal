import {writeFile} from 'node:fs/promises';
import {RELEASE_API,downloadStats} from './download-stats.mjs';
const response=await fetch(RELEASE_API,{headers:{Accept:'application/vnd.github+json','User-Agent':'SealFans-download-count'},signal:AbortSignal.timeout(15000)});
if(!response.ok)throw Error('GitHub下載統計 HTTP '+response.status);
const stats=downloadStats(await response.json());
await writeFile(new URL('./download-counts.json',import.meta.url),JSON.stringify(stats,null,2)+'\n');
console.log(JSON.stringify(stats));
