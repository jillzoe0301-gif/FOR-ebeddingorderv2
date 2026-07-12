# V4.5.1 Vercel npm 安裝修正

本次只修正部署設定，不變更系統功能與 Supabase 資料。

## 修正內容

- 將 `package-lock.json` 中的套件來源改為 npm 官方 registry。
- 新增 `.npmrc`，固定使用 `https://registry.npmjs.org/`。
- Vercel 安裝指令改為 `npm ci --no-audit --no-fund`。
- 固定 Node.js 22 與 npm 10。

## 更新 GitHub

將本資料夾內的全部檔案覆蓋到原 GitHub 專案後，在終端機執行：

```bash
git add .
git commit -m "Fix Vercel npm install registry V4.5.1"
git push
```

Vercel 會自動重新部署。

## 正常紀錄

部署時應顯示：

```text
Running "install" command: `npm ci --no-audit --no-fund`...
added ... packages
Running "npm run build"
✓ built
```
