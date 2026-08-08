FOR-e 寢具訂購系統 V4.18.5
GitHub 手動覆蓋更新包

本版內容：
1. 所有分頁表格改為滿版顯示。
2. 會計對帳加寬訂購單 / 雇主 / 工人欄位，且文字不換行。
3. 購買品項、拿庫存、退貨入庫、加買四欄統一寬度。
4. 會計指定欄位文字放大 2pt。
5. 拿庫存只顯示綠色品項及數量。
6. 全數退貨改為品項刪除線，後方顯示退貨數量。
7. 退貨工人、品項、數量取消外框。
8. 保留 V4.18.4 既有資料與 Supabase 共用邏輯。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.5.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.5_GitHub_Manual_Update.zip'
git add -A
git commit -m "Update V4.18.5 full-width tables and return display"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.5
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
