import fs from 'node:fs';
import zlib from 'node:zlib';

const target = new URL('../index.html', import.meta.url);
const patchFile = new URL('./v415.diff.gz.b64', import.meta.url);
const encoded = fs.readFileSync(patchFile, 'utf8').trim();
const diff = zlib.gunzipSync(Buffer.from(encoded, 'base64')).toString('utf8').replace(/\r\n/g, '\n');
const original = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');

function applyUnifiedDiff(source, patch) {
  const sourceLines = source.split('\n');
  const patchLines = patch.split('\n');
  const output = [];
  let sourceIndex = 0;
  let i = 0;
  while (i < patchLines.length) {
    const line = patchLines[i];
    if (line.startsWith('--- ') || line.startsWith('+++ ') || line === '') { i++; continue; }
    if (!line.startsWith('@@ ')) throw new Error(`Unexpected diff line: ${line}`);
    const match = line.match(/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
    if (!match) throw new Error(`Invalid hunk header: ${line}`);
    const oldStart = Number(match[1]) - 1;
    while (sourceIndex < oldStart) output.push(sourceLines[sourceIndex++]);
    i++;
    while (i < patchLines.length && !patchLines[i].startsWith('@@ ')) {
      const hunkLine = patchLines[i];
      if (hunkLine.startsWith('--- ') || hunkLine.startsWith('+++ ')) break;
      if (hunkLine === '\\ No newline at end of file') { i++; continue; }
      if (hunkLine === '' && i === patchLines.length - 1) { i++; break; }
      const marker = hunkLine[0];
      const text = hunkLine.slice(1);
      if (marker === ' ') {
        if (sourceLines[sourceIndex] !== text) throw new Error(`Context mismatch at source line ${sourceIndex + 1}`);
        output.push(sourceLines[sourceIndex++]);
      } else if (marker === '-') {
        if (sourceLines[sourceIndex] !== text) throw new Error(`Removal mismatch at source line ${sourceIndex + 1}`);
        sourceIndex++;
      } else if (marker === '+') {
        output.push(text);
      } else {
        throw new Error(`Invalid hunk line: ${hunkLine}`);
      }
      i++;
    }
  }
  while (sourceIndex < sourceLines.length) output.push(sourceLines[sourceIndex++]);
  return output.join('\n');
}

if (original.includes('<title>FOR-e寢具訂購 V4.15</title>')) {
  console.log('V4.15 already applied.');
} else {
  const updated = applyUnifiedDiff(original, diff);
  fs.writeFileSync(target, updated, 'utf8');
  console.log('Applied FOR-e V4.15 settings, translation, and bicycle delivery update.');
}
