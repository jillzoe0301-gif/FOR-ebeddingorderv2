import fs from 'node:fs';

const path = new URL('../index.html', import.meta.url);
let html = fs.readFileSync(path, 'utf8');

if (html.includes('V4.13.6') && html.includes('__FOR_E_V4136_BICYCLE_DIRECT_FIX__')) {
  console.log('V4.13.6 patch already applied.');
  process.exit(0);
}

html = html
  .replaceAll('FOR-e寢具訂購 V4.13.4', 'FOR-e寢具訂購 V4.13.6')
  .replaceAll('V4.13.4 Supabase 公開共用版', 'V4.13.6 Supabase 公開共用版')
  .replace('目前版本 V4.13.4｜單鍵下載與一鍵列印全部', '目前版本 V4.13.6｜腳踏車獨立訂購單直接修正版')
  .replace(
    'V4.13.4 下載訂購單恢復為單一按鈕，會依訂單內容分別產出獨立寢具單與獨立腳踏車單；一鍵列印會直接依序列印寢具單、腳踏車單及四國語言綜合簽收單。',
    'V4.13.6 直接修正腳踏車品項辨識與多人訂單資料來源；下載同一個 ZIP 內含獨立寢具訂購單與獨立腳踏車訂購單，一鍵列印則固定分頁列印寢具單、腳踏車單及四國語言綜合簽收單。'
  );

const note = "  {version:'V4.13.6', date:'2026/07/29', title:'腳踏車獨立訂購單資料辨識直接修正', items:['修正多人訂單的腳踏車數量儲存在 workerGroups 時，系統只讀取 order.items 而判定沒有腳踏車的問題','腳踏車辨識同時讀取工人明細與訂單彙總資料，並相容腳踏車、自行車及 BIKE 代碼','下載訂購單維持單一按鈕；同時有寢具與腳踏車時下載 ZIP，內含兩張獨立 PNG','一鍵列印強制寢具訂購單、腳踏車訂購單、四國語言綜合簽收單各自獨立分頁']},\n";
html = html.replace('const versionNotes = [\n', `const versionNotes = [\n${note}`);

html = html.replace(
  '.print-page:last-of-type{page-break-after:auto!important;break-after:auto!important}\n    .bike-page{page-break-before:always!important;break-before:page!important;page-break-inside:avoid!important;break-inside:avoid-page!important}\n    .bike-page:first-of-type{page-break-before:auto!important;break-before:auto!important}',
  '.print-page:last-of-type{page-break-after:auto!important;break-after:auto!important}\n    .print-page + .print-page{page-break-before:always!important;break-before:page!important}\n    .bike-page{page-break-before:always!important;break-before:page!important;page-break-after:always!important;break-after:page!important;page-break-inside:avoid!important;break-inside:avoid-page!important}'
);
html = html.replace(
  '.bike-page{page-break-before:always!important;break-before:page!important}.bike-page:first-of-type{page-break-before:auto!important;break-before:auto!important}.receipt-page',
  '.print-page + .print-page{page-break-before:always!important;break-before:page!important}.bike-page{page-break-before:always!important;break-before:page!important;page-break-after:always!important;break-after:page!important}.receipt-page'
);

const runtimeFix = String.raw`
// __FOR_E_V4136_BICYCLE_DIRECT_FIX__
const __forEV4136OriginalIsBicycleItem = isBicycleItem;
isBicycleItem = function(itemOrCode) {
  const item = itemIdentity(itemOrCode);
  const code = String(item.code || '').trim().toUpperCase();
  const name = String(item.name || '').replace(/\s+/g, '');
  return __forEV4136OriginalIsBicycleItem(itemOrCode)
    || code === 'BIKE'
    || code.includes('BIKE')
    || name.includes('腳踏車')
    || name.includes('自行車');
};

function __forEV4136PositiveBikeLines(lines) {
  return orderedLines(lines || []).filter(line => isBicycleItem(line.code) && supplierQty(line) > 0);
}
function __forEV4136WorkerBikeLines(order) {
  if (!Array.isArray(order?.workerGroups) || !order.workerGroups.length) return [];
  return orderWorkerGroups(order).flatMap(group => __forEV4136PositiveBikeLines(group.items || []));
}
function __forEV4136RootBikeLines(order) {
  return __forEV4136PositiveBikeLines(order?.items || []);
}
function __forEV4136EffectiveBikeLines(order) {
  const workerLines = __forEV4136WorkerBikeLines(order);
  return workerLines.length ? workerLines : __forEV4136RootBikeLines(order);
}

bicycleSupplierQty = function(order) {
  return __forEV4136EffectiveBikeLines(order).reduce((sum, line) => sum + supplierQty(line), 0);
};
hasBicycleOrder = function(order) {
  return bicycleSupplierQty(order) > 0 || bicycleOrderWorkerRows(order).length > 0;
};
bicycleOrderUnitPrice = function(order) {
  const line = __forEV4136EffectiveBikeLines(order)[0];
  return line ? itemVendorPrice(line.code) : itemVendorPrice('BIKE');
};
orderBicycleAmount = function(order) {
  const workerLines = (Array.isArray(order?.workerGroups) && order.workerGroups.length)
    ? orderWorkerGroups(order).flatMap(group => orderedLines(group.items || []).filter(line => isBicycleItem(line.code) && lineQty(line) > 0))
    : [];
  const lines = workerLines.length ? workerLines : orderedLines(order?.items || []).filter(line => isBicycleItem(line.code) && lineQty(line) > 0);
  return lines.reduce((sum, line) => sum + lineAmount(line), 0);
};

const __forEV4136OriginalDownloadOrderImage = downloadOrderImage;
const __forEV4136CrcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c >>> 0;
  }
  return table;
})();
function __forEV4136Crc32(bytes) {
  let crc = 0xffffffff;
  for (const b of bytes) crc = __forEV4136CrcTable[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function __forEV4136DosDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  return {
    time: ((date.getHours() & 31) << 11) | ((date.getMinutes() & 63) << 5) | (Math.floor(date.getSeconds() / 2) & 31),
    day: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  };
}
function __forEV4136Concat(parts) {
  const out = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let offset = 0;
  for (const part of parts) { out.set(part, offset); offset += part.length; }
  return out;
}
async function __forEV4136CreateZip(entries) {
  const encoder = new TextEncoder();
  const locals = [], centrals = [];
  let localOffset = 0;
  const { time, day } = __forEV4136DosDateTime();
  for (const entry of entries) {
    const name = encoder.encode(entry.name);
    const data = new Uint8Array(await entry.blob.arrayBuffer());
    const crc = __forEV4136Crc32(data);
    const local = new Uint8Array(30 + name.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true); lv.setUint16(4, 20, true); lv.setUint16(6, 0x0800, true);
    lv.setUint16(8, 0, true); lv.setUint16(10, time, true); lv.setUint16(12, day, true);
    lv.setUint32(14, crc, true); lv.setUint32(18, data.length, true); lv.setUint32(22, data.length, true);
    lv.setUint16(26, name.length, true); lv.setUint16(28, 0, true); local.set(name, 30);
    locals.push(local, data);
    const central = new Uint8Array(46 + name.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true); cv.setUint16(10, 0, true); cv.setUint16(12, time, true); cv.setUint16(14, day, true);
    cv.setUint32(16, crc, true); cv.setUint32(20, data.length, true); cv.setUint32(24, data.length, true);
    cv.setUint16(28, name.length, true); cv.setUint16(30, 0, true); cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true); cv.setUint16(36, 0, true); cv.setUint32(38, 0, true); cv.setUint32(42, localOffset, true);
    central.set(name, 46); centrals.push(central);
    localOffset += local.length + data.length;
  }
  const centralBytes = __forEV4136Concat(centrals);
  const end = new Uint8Array(22), ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true); ev.setUint16(4, 0, true); ev.setUint16(6, 0, true);
  ev.setUint16(8, entries.length, true); ev.setUint16(10, entries.length, true);
  ev.setUint32(12, centralBytes.length, true); ev.setUint32(16, localOffset, true); ev.setUint16(20, 0, true);
  return new Blob([...locals, centralBytes, end], { type: 'application/zip' });
}
function __forEV4136CanvasBlob(canvas) {
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('圖片轉換失敗')), 'image/png'));
}
function __forEV4136Download(name, blob) {
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
downloadOrderImage = async function(orderId) {
  const order = state.orders.find(item => item.id === orderId);
  if (!order) return;
  const captured = [];
  const originalTrigger = triggerCanvasDownload;
  triggerCanvasDownload = (canvas, fileName) => captured.push({ canvas, name: fileName });
  try {
    __forEV4136OriginalDownloadOrderImage(orderId);
  } finally {
    triggerCanvasDownload = originalTrigger;
  }
  if (!captured.length) return toast('沒有可下載的訂購單');
  try {
    const files = [];
    for (const item of captured) files.push({ name: item.name, blob: await __forEV4136CanvasBlob(item.canvas) });
    if (files.length === 1) {
      __forEV4136Download(files[0].name, files[0].blob);
    } else {
      const zip = await __forEV4136CreateZip(files);
      __forEV4136Download(orderDownloadFileName(order) + '_訂購單_寢具與腳踏車.zip', zip);
      toast('已下載 ZIP：寢具訂購單與腳踏車訂購單各自獨立');
    }
  } catch (error) {
    console.error(error);
    toast('訂購單下載失敗，請重新操作');
  }
};
`;

html = html.replace(/<\/script>\s*<\/body>/, `${runtimeFix}\n</script>\n</body>`);
fs.writeFileSync(path, html, 'utf8');
console.log('Applied V4.13.6 direct bicycle detection and separate order fix.');
