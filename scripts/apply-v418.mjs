import fs from 'node:fs';

const target = new URL('../index.html', import.meta.url);
let html = fs.readFileSync(target, 'utf8');

if (html.includes('<title>FOR-e寢具訂購 V4.18</title>')) {
  console.log('V4.18 top navigation already applied.');
  process.exit(0);
}
if (!html.includes('<title>FOR-e寢具訂購 V4.17.1</title>')) {
  throw new Error('V4.18 expects the V4.17.1 generated source.');
}

function replaceOnce(oldText, newText, label) {
  if (!html.includes(oldText)) throw new Error(`V4.18 missing ${label}`);
  html = html.replace(oldText, newText);
}

replaceOnce('<title>FOR-e寢具訂購 V4.17.1</title>', '<title>FOR-e寢具訂購 V4.18</title>', 'title');
replaceOnce('V4.17.1 Supabase 公開共用版', 'V4.18 Supabase 公開共用版', 'version badge');

replaceOnce(
  '    .app{display:flex;min-height:100vh;width:100%;max-width:100%;overflow-x:hidden}',
  '    .app{display:block;min-height:100vh;width:100%;max-width:100%;overflow-x:hidden}',
  'app layout'
);
replaceOnce(
  '    .sidebar{width:238px;background:rgba(47,39,32,.94);border-right:1px solid var(--line);padding:20px 14px;position:sticky;top:0;height:100vh;overflow:auto;backdrop-filter:blur(8px)}',
  '    .app-header{position:sticky;top:0;z-index:12;background:rgba(47,39,32,.96);border-bottom:1px solid var(--line);backdrop-filter:blur(12px);box-shadow:0 8px 24px rgba(20,14,10,.2)}\n    .brandbar{min-height:66px;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:8px 24px}',
  'sidebar css'
);
replaceOnce(
  '    .brand{display:flex;align-items:center;gap:11px;margin:4px 5px 20px;color:#fff2e0;min-width:0}',
  '    .brand{display:flex;align-items:center;gap:10px;color:#fff2e0;min-width:0}',
  'brand css'
);
replaceOnce(
  '    .brand img{width:54px;height:54px;flex:0 0 54px;border-radius:14px;object-fit:cover;object-position:center;border:0;box-shadow:0 8px 20px rgba(22,16,12,.28);background:transparent}',
  '    .brand img{width:46px;height:46px;flex:0 0 46px;border-radius:12px;object-fit:cover;object-position:center;border:0;box-shadow:0 6px 16px rgba(22,16,12,.25);background:transparent}',
  'brand image css'
);
replaceOnce(
  '    .brand strong{display:block;font-size:18px;font-weight:900;letter-spacing:.25px;line-height:1.25;white-space:nowrap}',
  '    .brand strong{display:block;font-size:17px;font-weight:900;letter-spacing:.2px;line-height:1.2;white-space:nowrap}',
  'brand title css'
);
replaceOnce(
  '    .brand small{display:block;font-size:11px;color:var(--muted);font-weight:500;margin-top:4px;line-height:1.35}',
  '    .brand small{display:block;font-size:10px;color:var(--muted);font-weight:500;margin-top:3px;line-height:1.3;white-space:nowrap}',
  'brand version css'
);
replaceOnce(
  '    .nav button{width:100%;text-align:left;margin:5px 0;border:1px solid transparent;border-radius:14px;padding:12px 13px;background:transparent;box-shadow:none;color:#ddcfbd}',
  '    .top-nav-wrap{border-top:1px solid rgba(90,76,64,.72);overflow:hidden}\n    .nav{display:flex;align-items:stretch;gap:4px;overflow-x:auto;overflow-y:hidden;padding:0 20px;scrollbar-width:thin;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}\n    .nav button{flex:0 0 auto;position:relative;border:0;border-radius:0;padding:13px 16px 12px;background:transparent;box-shadow:none;color:#d9cbbb;font-size:14px;font-weight:750;text-align:center;white-space:nowrap}',
  'navigation css'
);
replaceOnce(
  '    .nav button.active{background:linear-gradient(180deg,#c49767,#8b613f);color:#211813;border-color:#ddb789;font-weight:900}',
  '    .nav button:hover{background:rgba(196,151,103,.09);color:#fff1df}\n    .nav button.active{background:rgba(196,151,103,.14);color:#ffd6a4;font-weight:900}\n    .nav button.active::after{content:"";position:absolute;left:14px;right:14px;bottom:0;height:3px;border-radius:999px 999px 0 0;background:#d6a66f}',
  'active navigation css'
);
replaceOnce(
  '    .main{flex:1;min-width:0;max-width:100%;overflow-x:hidden}',
  '    .main{min-width:0;width:100%;max-width:100%;overflow-x:hidden}',
  'main css'
);
replaceOnce(
  '    .topbar{height:68px;background:rgba(52,44,37,.9);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:5;backdrop-filter:blur(10px)}',
  '    .topbar{display:none}',
  'topbar css'
);
replaceOnce('.sidebar{width:210px}', '.brandbar{padding-left:18px;padding-right:18px}.nav{padding-left:14px;padding-right:14px}', 'tablet css');
replaceOnce(
  '.app{display:block}.sidebar{position:relative;width:100%;height:auto;border-right:0;border-bottom:1px solid var(--line)}.brand{justify-content:center}.nav{display:grid;grid-template-columns:repeat(2,1fr);gap:4px}.topbar{position:relative;top:auto}',
  '.brandbar{min-height:58px;padding:7px 14px;gap:10px}.brand img{width:40px;height:40px;flex-basis:40px}.brand strong{font-size:15px}.brand small{font-size:9px}.rolebar{font-size:11px;gap:6px}.version-badge{padding:5px 8px;font-size:10px}.nav{padding:0 8px;gap:0}.nav button{padding:12px 13px 11px;font-size:13px}.nav button.active::after{left:11px;right:11px}',
  'mobile css'
);
replaceOnce('@media print{.sidebar,.topbar,.toolbar,.no-print{display:none!important}', '@media print{.app-header,.topbar,.toolbar,.no-print{display:none!important}', 'print css');

const renderStart = html.indexOf("  $('#app').innerHTML = `", html.indexOf('function render(){'));
const renderEnd = html.indexOf("  $all('[data-page]')", renderStart);
if (renderStart < 0 || renderEnd < 0) throw new Error('V4.18 render shell not found');
const shell = `  $('#app').innerHTML = \`\n    <div class="app">\n      <header class="app-header">\n        <div class="brandbar">\n          <div class="brand"><img src="/brand-logo-v4103.png" alt="FOR-e 寢具訂購系統 LOGO"><div class="brand-copy"><strong>FOR-e 寢具訂購</strong><small>V4.18 Supabase 公開共用版</small></div></div>\n          <div class="rolebar">\n            <span class="sync-dot" id="syncDot"></span><span class="sync-label" id="syncLabel">已同步</span>\n            <span class="version-badge">免登入｜全部功能</span>\n          </div>\n        </div>\n        <div class="top-nav-wrap">\n          <nav class="nav" aria-label="功能切換">\n            \${visiblePages.map(p=>\`<button class="\${p.id===state.currentPage?'active':''}" data-page="\${p.id}" aria-current="\${p.id===state.currentPage?'page':'false'}">\${p.label}</button>\`).join('')}\n          </nav>\n        </div>\n      </header>\n      <main class="main">\n        <section class="content" id="content"></section>\n      </main>\n    </div>\`;\n`;
html = html.slice(0, renderStart) + shell + html.slice(renderEnd);

replaceOnce(
  "  $all('[data-page]').forEach(btn=>btn.addEventListener('click',()=>{state.currentPage=btn.dataset.page;save();render();}));\n  renderPage();",
  "  $all('[data-page]').forEach(btn=>btn.addEventListener('click',()=>{state.currentPage=btn.dataset.page;save();render();}));\n  const activeNav=$('[data-page].active'); if(activeNav) requestAnimationFrame(()=>activeNav.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'}));\n  renderPage();",
  'navigation binding'
);

const notesMarker = 'const versionNotes = [\n';
if (!html.includes("version:'V4.18'")) {
  replaceOnce(
    notesMarker,
    notesMarker + "  {version:'V4.18', date:'2026/08/08', title:'左側功能改為上方文字切換', items:['取消左側功能欄，所有功能改至頁面上方以純文字分頁切換','目前功能以底線與淡色背景標示，不使用 ICON','桌機橫向排列，窄螢幕可左右滑動切換，不擠成多列','保留原有各頁功能、搜尋、資料與列印邏輯']},\n",
    'version notes'
  );
}

fs.writeFileSync(target, html, 'utf8');
console.log('Applied FOR-e V4.18 top text navigation.');
