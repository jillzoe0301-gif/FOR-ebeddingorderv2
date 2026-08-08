FOR-e 寢具訂購系統 V4.18.2
GitHub 手動覆蓋更新包

本版內容：
1. 訂購單編號改為次要資訊，不再過度醒目。
2. 訂購單客戶名稱與工人名稱使用相同字級。
3. 寢具訂購、訂購紀錄與會計對帳表格改為頁面寬度內顯示。
4. 購買品項允許換行，不再因長內容撐寬表格。
5. 會計對帳的海外承辦移至倒數第二欄、操作按鈕之前。
6. 保留 V4.18.1 合併欄位與既有 Supabase 資料邏輯。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.2.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.2_GitHub_Manual_Update.zip'
git add index.html package.json package-lock.json CHANGELOG_V4.18.2.md
git commit -m "Update V4.18.2 table and accounting layout"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.2
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
