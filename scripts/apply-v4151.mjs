import fs from 'node:fs';

const target = new URL('../index.html', import.meta.url);
let html = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');

if (html.includes('<title>FOR-e寢具訂購 V4.15.1</title>')) {
  console.log('V4.15.1 already applied.');
  process.exit(0);
}

html = html
  .replaceAll('<title>FOR-e寢具訂購 V4.15</title>', '<title>FOR-e寢具訂購 V4.15.1</title>')
  .replaceAll('V4.15 Supabase 公開共用版', 'V4.15.1 Supabase 公開共用版')
  .replaceAll('目前版本 V4.15｜停用品項、四國翻譯與腳踏車送貨設定', '目前版本 V4.15.1｜腳踏車訂購單版面修正')
  .replaceAll(
    'V4.15 停用品項於資料設定預設隱藏但保留歷史訂單；四國簽收單改依品項名稱取得翻譯並補齊 T 型衣櫥；腳踏車訂購單縮小廠商資訊、放大送貨資訊，且可另外設定送達時間、收貨聯絡人與送貨地址。',
    'V4.15.1 修正腳踏車訂購單格線與文字溢出；送貨地址與送達時間對調；品項表格移除工人資料並放大品名欄；客戶名稱、訂購工人、國籍與入境日整合在同一資訊欄。'
  );

const versionNote = "  {version:'V4.15.1', date:'2026/07/30', title:'腳踏車訂購單格線與資訊欄位修正', items:['表格採固定欄寬與完整換行，所有內容固定於格線內','品名欄放大，品名與規格分欄清楚顯示','送貨地址移到送貨資訊上方，送達時間移至下方與收貨聯絡人並列','品項表格移除工人姓名、國籍與入境日，改依腳踏車品項彙總數量','客戶名稱、訂購工人、國籍與入境日整合在同一個資訊欄位']},\n";
html = html.replace('const versionNotes = [\n', `const versionNotes = [\n${versionNote}`);

html = html.replace(
  "function bicycleOrderUnitPrice(order){ return bicycleOrderWorkerRows(order)[0]?.unitPrice || itemVendorPrice('BIKE1'); }",
`function bicycleOrderItemRows(order){
  const map=new Map();
  bicycleOrderWorkerRows(order).forEach(row=>{
    const key=[row.code,row.itemName,row.spec,row.unit,row.unitPrice].join('｜');
    if(!map.has(key)) map.set(key,{code:row.code,itemName:row.itemName,spec:row.spec,unit:row.unit||'台',qty:0,unitPrice:num(row.unitPrice),notes:[]});
    const target=map.get(key);
    target.qty+=num(row.qty);
    if(row.note && !target.notes.includes(row.note)) target.notes.push(row.note);
  });
  return Array.from(map.values()).map(row=>Object.assign(row,{note:row.notes.join(' / ')}));
}
function bicycleOrderSummaryText(order){
  return \`客戶名稱：\${order?.employer||''}\\n訂購工人：\${workerFullDisplay(order)}　國籍：\${nationalityDisplay(order)}　入境日：\${entryDateDisplay(order)}\`;
}
function bicycleOrderUnitPrice(order){ return bicycleOrderWorkerRows(order)[0]?.unitPrice || itemVendorPrice('BIKE1'); }`
);

const pageFunction = `function bicyclePurchaseOrderPageHTML(o){
  const rows=bicycleOrderItemRows(o);
  if(!rows.length) return '';
  const totalQty=rows.reduce((sum,r)=>sum+num(r.qty),0);
  const totalAmount=rows.reduce((sum,r)=>sum+num(r.qty)*num(r.unitPrice),0);
  const rowHTML=rows.map((r,idx)=>\`<tr><td>\${idx+1}</td><td class="bike-name-cell"><b>\${esc(r.itemName||'')}</b></td><td class="bike-spec-cell">\${esc(r.spec||'')}</td><td>\${esc(r.unit||'台')}</td><td>\${num(r.qty)}</td><td>\${money(r.unitPrice)}</td><td>\${money(num(r.qty)*num(r.unitPrice))}</td><td>\${esc(r.note||'')}</td></tr>\`).join('');
  const densityClass=rows.length>10?' bike-ultra-compact':(rows.length>6?' bike-compact':'');
  const meta=\`<b>客戶名稱：</b>\${esc(o.employer||'')}　｜　<b>訂購工人：</b>\${esc(workerFullDisplay(o))}　｜　<b>國籍：</b>\${esc(nationalityDisplay(o))}　｜　<b>入境日：</b>\${esc(entryDateDisplay(o))}\`;
  return \`<div class="bike-print-wrap\${densityClass}"><h1>\${esc(o.companyTitle||'公司別')}腳踏車訂購單</h1>
    <table class="bike-vendor"><tr><td><span class="label">廠商</span><span class="value">\${esc(BICYCLE_VENDOR.companyName)}</span></td><td><span class="label">統編</span><span class="value">\${esc(BICYCLE_VENDOR.taxId)}</span></td><td><span class="label">聯絡人／電話</span><span class="value">\${esc(BICYCLE_VENDOR.contactPerson)}　\${esc(BICYCLE_VENDOR.phone)}</span></td></tr><tr><td colspan="3"><span class="label">廠商地址</span><span class="value">\${esc(BICYCLE_VENDOR.address)}</span></td></tr></table>
    <table class="secondary"><tr><td><span class="label">原訂購單號</span>\${esc(o.orderNo||'')}</td><td><span class="label">公司別</span>\${esc(o.companyTitle||'')}</td><td><span class="label">發票開立抬頭</span>\${esc(orderInvoiceTitle(o)||'')}</td><td><span class="label">部門</span>\${esc(o.dept||'')}</td><td><span class="label">承辦</span>\${esc(o.staff||'')}</td></tr></table>
    <table class="bike-delivery-hero"><tr><td colspan="2" class="bike-address-main"><span class="label">送貨地址</span><span class="value">\${esc(bicycleDeliveryAddress(o)||'')}</span></td></tr><tr><td><span class="label">收貨聯絡人</span><span class="value">\${esc(bicycleDeliveryContact(o)||'')}</span></td><td><span class="label">送達時間</span><span class="value">\${esc(formatBicycleDeliveryDeadline(o)||'未填寫')}</span></td></tr></table>
    <table class="info bike-order-meta"><tr><td>\${meta}</td></tr></table>
    <table class="bike-items"><colgroup><col style="width:6%"><col style="width:30%"><col style="width:20%"><col style="width:7%"><col style="width:8%"><col style="width:10%"><col style="width:10%"><col style="width:9%"></colgroup><thead><tr><th>項次</th><th>品名</th><th>規格</th><th>單位</th><th>數量</th><th>單價</th><th>小計</th><th>備註</th></tr></thead><tbody>\${rowHTML}<tr class="bike-total-row"><td colspan="4">合計</td><td><b>\${totalQty}</b></td><td></td><td><b>\${money(totalAmount)}</b></td><td></td></tr></tbody></table>
    <table class="note-box"><tr><td><span class="label">訂單備註</span><span class="value">\${esc(o.note||'')}</span></td></tr></table>
    <table class="no-border"><tr><td class="sign">____________________<br>營管主管</td><td class="sign">____________________<br>營管承辦</td><td class="sign">____________________<br>海外承辦</td></tr></table></div>\`;
}
`;
html = html.replace(/function bicyclePurchaseOrderPageHTML\(o\)\{[\s\S]*?\n\}\nfunction bicyclePurchaseOrderCSS\(\)\{/, `${pageFunction}function bicyclePurchaseOrderCSS(){`);

const cssFunction = `function bicyclePurchaseOrderCSS(){ return \`
  .bike-print-wrap{width:190mm;max-width:100%;min-height:277mm;margin:0 auto;text-align:center;font-family:"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif;color:#111;background:#fff}
  .bike-print-wrap h1{margin:0 0 7px;font-size:23px;letter-spacing:.05em}.bike-print-wrap table{width:100%;border-collapse:collapse;margin-bottom:7px;table-layout:fixed}.bike-print-wrap th,.bike-print-wrap td{border:1px solid #222;padding:5px;font-size:10.5px;vertical-align:middle;text-align:center;line-height:1.3;white-space:normal!important;word-break:break-word!important;overflow-wrap:anywhere!important;overflow:hidden}.bike-print-wrap th{background:#f1ede8}.bike-print-wrap .secondary td{font-size:10px;font-weight:700}.bike-print-wrap .label{display:block;font-size:9px;color:#555;font-weight:700;margin-bottom:2px}.bike-print-wrap .value{display:block;font-size:12px;font-weight:800;line-height:1.3;white-space:normal!important;word-break:break-word!important;overflow-wrap:anywhere!important}.bike-print-wrap .bike-vendor{border:1px solid #444}.bike-print-wrap .bike-vendor td{padding:2px 4px;font-size:8px}.bike-print-wrap .bike-vendor .label{font-size:7px;margin-bottom:0}.bike-print-wrap .bike-vendor .value{font-size:8.5px;font-weight:700}.bike-print-wrap .bike-delivery-hero{border:3px solid #111;margin:5px 0 8px}.bike-print-wrap .bike-delivery-hero td{padding:8px 9px}.bike-print-wrap .bike-delivery-hero .label{font-size:11px}.bike-print-wrap .bike-delivery-hero .value{font-size:17px;line-height:1.35}.bike-print-wrap .bike-delivery-hero .bike-address-main{padding:11px 12px}.bike-print-wrap .bike-delivery-hero .bike-address-main .value{font-size:19px}.bike-print-wrap .bike-order-meta td{padding:8px 10px;font-size:11px;font-weight:700;line-height:1.55;text-align:left}.bike-print-wrap .bike-items th{font-size:9.5px}.bike-print-wrap .bike-items td{font-size:10px}.bike-print-wrap .bike-items .bike-name-cell{font-size:11.5px;line-height:1.35}.bike-print-wrap .bike-items .bike-spec-cell{font-size:9.5px;line-height:1.35}.bike-print-wrap .bike-total-row td{background:#faf4ed}.bike-print-wrap .note-box .value{min-height:28px}.bike-print-wrap .sign{height:55px;vertical-align:bottom}.bike-print-wrap .no-border td{border:0}.bike-print-wrap.bike-compact th,.bike-print-wrap.bike-compact td{padding:3px 4px;font-size:9px}.bike-print-wrap.bike-compact h1{font-size:20px;margin-bottom:4px}.bike-print-wrap.bike-compact table{margin-bottom:4px}.bike-print-wrap.bike-compact .sign{height:42px}.bike-print-wrap.bike-ultra-compact th,.bike-print-wrap.bike-ultra-compact td{padding:2px 3px;font-size:8px;line-height:1.15}.bike-print-wrap.bike-ultra-compact h1{font-size:18px;margin-bottom:3px}.bike-print-wrap.bike-ultra-compact table{margin-bottom:3px}.bike-print-wrap.bike-ultra-compact .label{font-size:7.5px}.bike-print-wrap.bike-ultra-compact .value{font-size:9px}.bike-print-wrap.bike-compact .bike-delivery-hero .label{font-size:9px}.bike-print-wrap.bike-compact .bike-delivery-hero .value{font-size:15px}.bike-print-wrap.bike-ultra-compact .bike-delivery-hero .label{font-size:8px}.bike-print-wrap.bike-ultra-compact .bike-delivery-hero .value{font-size:13px}.bike-print-wrap.bike-ultra-compact .sign{height:34px}\`; }
`;
html = html.replace(/function bicyclePurchaseOrderCSS\(\)\{[\s\S]*?\nfunction bicyclePurchaseOrderHTML\(o\)\{/, `${cssFunction}function bicyclePurchaseOrderHTML(o){`);

const downloadFunction = `function downloadBicycleOrderImage(o){
  const rows=bicycleOrderItemRows(o); if(!rows.length) return;
  const width=1400, margin=70, usable=width-margin*2;
  const rowH=66, height=900+rows.length*rowH;
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);ctx.strokeStyle='#111';ctx.fillStyle='#111';ctx.lineWidth=2;ctx.textAlign='center';
  ctx.font='bold 38px Noto Sans TC, Microsoft JhengHei, Arial';ctx.fillText(\`\${o.companyTitle||'公司別'}腳踏車訂購單\`,width/2,55);
  let y=82;
  drawInfoBoxFull(ctx,margin,y,usable*0.42,50,'腳踏車廠商',BICYCLE_VENDOR.companyName,15);
  drawInfoBoxFull(ctx,margin+usable*0.42,y,usable*0.18,50,'統一編號',BICYCLE_VENDOR.taxId,15);
  drawInfoBoxFull(ctx,margin+usable*0.60,y,usable*0.40,50,'聯絡人／電話',\`\${BICYCLE_VENDOR.contactPerson}　\${BICYCLE_VENDOR.phone}\`,14); y+=50;
  drawInfoBoxFull(ctx,margin,y,usable,44,'廠商地址',BICYCLE_VENDOR.address,14); y+=56;
  const smallW=usable/5;
  [['原訂購單號',o.orderNo],['公司別',o.companyTitle],['發票開立抬頭',orderInvoiceTitle(o)],['部門',o.dept],['承辦',o.staff]].forEach((pair,i)=>drawSmallInfo(ctx,margin+i*smallW,y,smallW,58,pair[0],pair[1])); y+=70;
  drawInfoBoxFull(ctx,margin,y,usable,96,'送貨地址',bicycleDeliveryAddress(o)||'',26); y+=96;
  drawInfoBoxFull(ctx,margin,y,usable*0.40,86,'收貨聯絡人',bicycleDeliveryContact(o)||'',23);
  drawInfoBoxFull(ctx,margin+usable*0.40,y,usable*0.60,86,'送達時間',formatBicycleDeliveryDeadline(o)||'未填寫',24); y+=98;
  drawInfoBoxFull(ctx,margin,y,usable,112,'客戶名稱／訂購工人／國籍／入境日',bicycleOrderSummaryText(o),18); y+=124;
  const widths=[70,340,250,85,95,130,150,140];
  const headers=['項次','品名','規格','單位','數量','單價','小計','備註'];
  let cx=margin;ctx.font='bold 17px Noto Sans TC, Arial';headers.forEach((h,i)=>{ctx.strokeRect(cx,y,widths[i],42);drawCenteredWrap(ctx,h,cx+4,y+27,widths[i]-8,17,1);cx+=widths[i];});y+=42;
  ctx.font='17px Noto Sans TC, Arial';
  rows.forEach((r,idx)=>{cx=margin;const vals=[String(idx+1),r.itemName||'',r.spec||'',r.unit||'台',String(num(r.qty)),money(r.unitPrice),money(num(r.qty)*num(r.unitPrice)),r.note||''];vals.forEach((v,i)=>{ctx.strokeRect(cx,y,widths[i],rowH);ctx.font=i===1?'bold 19px Noto Sans TC, Arial':'17px Noto Sans TC, Arial';drawCenteredWrapFull(ctx,v,cx+7,y,widths[i]-14,rowH,i===1?21:18);cx+=widths[i];});y+=rowH;});
  const totalQty=rows.reduce((sum,r)=>sum+num(r.qty),0);const totalAmount=rows.reduce((sum,r)=>sum+num(r.qty)*num(r.unitPrice),0);cx=margin;const totalVals=['','','','合計',String(totalQty),'',money(totalAmount),''];totalVals.forEach((v,i)=>{ctx.strokeRect(cx,y,widths[i],52);ctx.font=i===3||i===4||i===6?'bold 18px Noto Sans TC, Arial':'17px Noto Sans TC, Arial';drawCenteredWrapFull(ctx,v,cx+5,y,widths[i]-10,52,19);cx+=widths[i];});y+=70;
  drawInfoBoxFull(ctx,margin,y,usable,72,'訂單備註',o.note||'',19);y+=115;
  ctx.font='20px Noto Sans TC, Arial';['營管主管','營管承辦','海外承辦'].forEach((label,i)=>{const sx=250+i*430;ctx.beginPath();ctx.moveTo(sx-145,y);ctx.lineTo(sx+145,y);ctx.stroke();ctx.fillText(label,sx,y+34);});
  const contentH=Math.min(canvas.height,y+70);const output=document.createElement('canvas');output.width=canvas.width;output.height=contentH;const out=output.getContext('2d');out.fillStyle='#fff';out.fillRect(0,0,output.width,output.height);out.drawImage(canvas,0,0,canvas.width,contentH,0,0,canvas.width,contentH);
  triggerCanvasDownload(output,orderDownloadFileName(o)+'_腳踏車訂購單.png');
}
`;
html = html.replace(/function downloadBicycleOrderImage\(o\)\{[\s\S]*?\n\}\nfunction downloadBicycleOrderImageById\(orderId\)\{/, `${downloadFunction}function downloadBicycleOrderImageById(orderId){`);

if (!html.includes('function bicycleOrderItemRows(order)') || !html.includes('class="info bike-order-meta"')) {
  throw new Error('V4.15.1 patch failed: expected bicycle layout markers are missing.');
}

fs.writeFileSync(target, html, 'utf8');
console.log('Applied FOR-e V4.15.1 bicycle order layout fix.');