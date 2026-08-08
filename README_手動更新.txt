FOR-e 寢具訂購系統 V4.18.1
GitHub 手動覆蓋更新包

本版內容：
1. 寢具訂購：訂購單號／雇主／工人合併同一欄。
2. 訂購紀錄：訂購單號／雇主／工人合併同一欄。
3. 會計對帳：訂購單號／雇主／工人合併同一欄。
4. 表格欄寬依內容自動調整，不再平均硬切。
5. 日期、金額、支付對象、對帳人、操作等短欄位自動縮窄。
6. 品項與狀態欄保留較寬空間，文字可正常換行。
7. 保留 V4.18 上方純文字功能切換。
8. 保留 V4.17.1 搜尋欄修正。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.1.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.1_GitHub_Manual_Update.zip'
git add index.html package.json package-lock.json CHANGELOG_V4.18.1.md
git commit -m "Update V4.18.1 adaptive table layout"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.1
build = vite build

注意：
這包是完整原始碼，不需要 scripts/apply-v4181.mjs，
也不需要 v4181.diff.gz.b64。
