FOR-e 寢具訂購系統 V4.18.9
GitHub 手動覆蓋更新包

本版內容：
1. 寢具訂購與訂購紀錄的「目前狀況」表頭及內容同步固定為文字寬度。
2. 修正固定版面下欄位仍被剩餘空間拉寬的問題。
3. 保留 V4.18.8 既有金額分類色彩、欄位順序、品項及退貨顯示邏輯。
4. 保留既有資料與 Supabase 共用邏輯。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.9.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.9_GitHub_Manual_Update.zip'
npm ci
npm run build
git add -A
git commit -m "Update V4.18.9 current status column width"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.9
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
