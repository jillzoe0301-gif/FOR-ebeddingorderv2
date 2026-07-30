import fs from 'node:fs';

const target = new URL('../index.html', import.meta.url);
let html = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');

if (html.includes('<title>FOR-e寢具訂購 V4.15.2</title>')) {
  console.log('V4.15.2 already applied.');
  process.exit(0);
}

function replaceRequired(from, to, label) {
  if (!html.includes(from)) throw new Error(`V4.15.2 patch missing pattern: ${label}`);
  html = html.replace(from, to);
}

replaceRequired('<title>FOR-e寢具訂購 V4.15.1</title>', '<title>FOR-e寢具訂購 V4.15.2</title>', 'title');
replaceRequired('V4.15.1 Supabase 公開共用版', 'V4.15.2 Supabase 公開共用版', 'sidebar version');
replaceRequired('目前版本 V4.15｜品項隱藏、四國翻譯與腳踏車送貨資訊', '目前版本 V4.15.2｜腳踏車地址格線與列印空白頁修正', 'version heading');
replaceRequired('V4.15 停用品項預設隱藏且不影響歷史訂單；四國簽收單改依品項名稱翻譯，腳踏車訂購單可另行設定送達時間、收貨人與送貨地址。', 'V4.15.2 修正腳踏車廠商地址超出格線，並移除一鍵列印中重複換頁造成的空白頁。', 'version summary');
replaceRequired('V4.15 Supabase 公開共用正式版', 'V4.15.2 Supabase 公開共用正式版', 'config version');

const note = "  {version:'V4.15.2', date:'2026/07/30', title:'腳踏車廠商地址格線與列印空白頁修正', items:['廠商地址欄位增加高度並改為欄內自動換行，下載圖片與列印版皆不再超出格線','一鍵列印移除腳踏車頁重複的強制換頁規則，避免寢具單與腳踏車單之間產生空白頁','合併列印時取消腳踏車單內層 A4 最小高度，避免頁面高度重複計算','列印順序維持寢具訂購單、腳踏車訂購單、四國語言綜合簽收單']},\n";
replaceRequired('const versionNotes = [\n', `const versionNotes = [\n${note}`, 'version notes');

replaceRequired(
  '<tr><td colspan="3"><span class="label">廠商地址</span><span class="value">${esc(BICYCLE_VENDOR.address)}</span></td></tr>',
  '<tr class="bike-vendor-address"><td colspan="3"><span class="label">廠商地址</span><span class="value">${esc(BICYCLE_VENDOR.address)}</span></td></tr>',
  'vendor address row'
);

replaceRequired(
  '.bike-print-wrap .bike-vendor .value{font-size:8.5px;font-weight:700}.bike-print-wrap .bike-delivery-hero',
  '.bike-print-wrap .bike-vendor .value{font-size:8.5px;font-weight:700}.bike-print-wrap .bike-vendor-address td{height:11mm;padding:4px 6px;vertical-align:middle;overflow:hidden}.bike-print-wrap .bike-vendor-address .label{display:inline;font-size:7px;margin:0 4px 0 0}.bike-print-wrap .bike-vendor-address .value{display:inline;font-size:8.5px;line-height:1.25;white-space:normal!important;word-break:break-all!important;overflow-wrap:anywhere!important}.bike-print-wrap .bike-delivery-hero',
  'vendor address css'
);

replaceRequired(
`    .page-sequence{text-align:right;font-size:9px;color:#666;margin:0 0 2mm}.print-page{display:block;width:190mm;max-width:190mm;min-height:277mm;margin:0 auto;page-break-inside:avoid!important;break-inside:avoid-page!important;page-break-after:always!important;break-after:page!important;clear:both}
    .print-page:last-of-type{page-break-after:auto!important;break-after:auto!important}
    .print-page + .print-page{page-break-before:always!important;break-before:page!important}
    .bike-page{page-break-before:always!important;break-before:page!important;page-break-after:always!important;break-after:page!important;page-break-inside:avoid!important;break-inside:avoid-page!important}
    .bike-page .bike-print-wrap{width:100%;max-width:100%;min-height:277mm;margin:0 auto;page-break-inside:avoid!important;break-inside:avoid-page!important}`,
`    .page-sequence{text-align:right;font-size:9px;color:#666;margin:0 0 2mm}.print-page{display:block;width:190mm;max-width:190mm;margin:0 auto;page-break-inside:avoid!important;break-inside:avoid-page!important;page-break-after:always!important;break-after:page!important;clear:both}
    .print-page:last-child{page-break-after:auto!important;break-after:auto!important}
    .bike-page{page-break-inside:avoid!important;break-inside:avoid-page!important}
    .bike-page .bike-print-wrap{width:100%;max-width:100%;min-height:0!important;margin:0 auto;page-break-inside:avoid!important;break-inside:avoid-page!important}`,
  'combined print page rules'
);

replaceRequired(
  '    @media print{button{display:none}html,body{margin:0;padding:0}.print-page{width:190mm;max-width:190mm;min-height:277mm;margin:0 auto;padding:0;box-shadow:none}.print-page + .print-page{page-break-before:always!important;break-before:page!important}.bike-page{page-break-before:always!important;break-before:page!important;page-break-after:always!important;break-after:page!important}.receipt-page{width:190mm;max-width:190mm;min-height:277mm;margin:0 auto}}',
  '    @media print{button,.page-sequence{display:none}html,body{margin:0;padding:0}.print-page{width:190mm;max-width:190mm;min-height:0;margin:0 auto;padding:0;box-shadow:none;page-break-before:auto!important;break-before:auto!important}.print-page:not(:last-child){page-break-after:always!important;break-after:page!important}.print-page:last-child{page-break-after:auto!important;break-after:auto!important}.bike-page .bike-print-wrap{min-height:0!important}.receipt-page{width:190mm;max-width:190mm;min-height:0;margin:0 auto}}',
  'print media rules'
);

replaceRequired('const rowH=66, height=900+rows.length*rowH;', 'const rowH=66, height=930+rows.length*rowH;', 'canvas height');
replaceRequired("  drawInfoBoxFull(ctx,margin,y,usable,44,'廠商地址',BICYCLE_VENDOR.address,14); y+=56;", "  drawInfoBoxFull(ctx,margin,y,usable,66,'廠商地址',BICYCLE_VENDOR.address,13); y+=74;", 'canvas vendor address');

fs.writeFileSync(target, html, 'utf8');
console.log('Applied FOR-e V4.15.2 print fixes.');
