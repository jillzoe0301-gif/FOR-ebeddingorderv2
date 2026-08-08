FOR-e 寢具訂購系統 V4.18.4
GitHub 手動覆蓋更新包

本版內容：
1. 會計對帳加寬訂購單 / 雇主 / 工人欄位，並與支付對象保留間距。
2. 對帳金額改用醒目金黃色顯示。
3. 所有主要分頁的訂購項目取消外框。
4. 拿庫存以綠色文字、退貨以紅色文字清楚區分。
5. 支付對象只顯示工人、仲介、雇主。
6. 保留 V4.18.3 既有資料與 Supabase 共用邏輯。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.4.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.4_GitHub_Manual_Update.zip'
git add index.html package.json package-lock.json CHANGELOG_V4.18.4.md
git commit -m "Update V4.18.4 accounting items and payment display"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.4
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
