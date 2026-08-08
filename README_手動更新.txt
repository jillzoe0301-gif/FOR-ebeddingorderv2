FOR-e 寢具訂購系統 V4.18.10
GitHub 手動覆蓋更新包

本版內容：
1. 一鍵列印改為每位工人各自一張簽收單。
2. 每張簽收單只顯示該工人的資料、品項、金額與簽名欄。
3. 下載寢具或腳踏車訂購單後，自動開啟 PNG 圖片預覽。
4. 保留既有資料與 Supabase 共用邏輯。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.10.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.10_GitHub_Manual_Update.zip'
npm ci
npm run build
git add -A
git commit -m "Update V4.18.10 worker receipts and download preview"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.10
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
