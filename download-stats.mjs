export const RELEASE_API='https://api.github.com/repos/Rochibear/sealco-dev-journal/releases?per_page=100';
export function downloadStats(release,checkedAt=new Date().toISOString()){
 const records=(Array.isArray(release)?release:[release]).flatMap(r=>r.assets||[]).filter(a=>/^(?:SealCo-Windows-x64-\d+\.exe|SealCo-Portable-\d+-r\d+\.zip|Fan-made-SealOffline-Windows-x64-\d+\.exe|Fan-made-SealOffline-Portable-\d+\.zip)$/.test(a.name));
 if(!records.length||records.some(a=>!Number.isSafeInteger(a.download_count)||a.download_count<0))throw Error('下載資料尚未完整');
 const assets=[{name:'Windows EXE',count:records.filter(a=>a.name.endsWith('.exe')).reduce((n,a)=>n+a.download_count,0)},{name:'Windows ZIP',count:records.filter(a=>a.name.endsWith('.zip')).reduce((n,a)=>n+a.download_count,0)}];
 return {checkedAt,source:'GitHub Release',assets,total:assets.reduce((n,a)=>n+a.count,0)};
}
