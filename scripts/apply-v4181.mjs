import fs from 'node:fs';
import zlib from 'node:zlib';

const target = new URL('../index.html', import.meta.url);
const patchFile = new URL('./v4181.diff.gz.b64', import.meta.url);
const encoded = fs.readFileSync(patchFile, 'utf8').trim();
const diff = zlib.gunzipSync(Buffer.from(encoded, 'base64')).toString('utf8').replace(/\r\n/g, '\n');
const original = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');

function applyUnifiedDiff(source, patch){
  const sourceLines=source.split('\n');
  const patchLines=patch.split('\n');
  const output=[];
  let sourceIndex=0;
  let i=0;
  while(i<patchLines.length){
    const line=patchLines[i];
    if(!line.startsWith('@@')){ i++; continue; }
    const match=line.match(/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
    if(!match) throw new Error(`Invalid patch hunk: ${line}`);
    const oldStart=Number(match[1])-1;
    while(sourceIndex<oldStart) output.push(sourceLines[sourceIndex++]);
    i++;
    while(i<patchLines.length && !patchLines[i].startsWith('@@')){
      const patchLine=patchLines[i];
      if(patchLine.startsWith(' ')){
        const expected=patchLine.slice(1);
        if(sourceLines[sourceIndex]!==expected) throw new Error(`Patch context mismatch at line ${sourceIndex+1}`);
        output.push(sourceLines[sourceIndex++]);
      }else if(patchLine.startsWith('-')){
        const expected=patchLine.slice(1);
        if(sourceLines[sourceIndex]!==expected) throw new Error(`Patch removal mismatch at line ${sourceIndex+1}`);
        sourceIndex++;
      }else if(patchLine.startsWith('+')){
        output.push(patchLine.slice(1));
      }else if(patchLine.startsWith('\\ No newline')){
      }else if(patchLine===''){
      }
      i++;
    }
  }
  while(sourceIndex<sourceLines.length) output.push(sourceLines[sourceIndex++]);
  return output.join('\n');
}

if(original.includes('<title>FOR-e寢具訂購 V4.18.1</title>')){
  console.log('V4.18.1 already applied.');
}else{
  const updated=applyUnifiedDiff(original,diff);
  if(!updated.includes('<title>FOR-e寢具訂購 V4.18.1</title>')) throw new Error('V4.18.1 patch did not produce expected version');
  fs.writeFileSync(target,updated,'utf8');
  console.log('Applied FOR-e V4.18.1 adaptive table layout patch.');
}
