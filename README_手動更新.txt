FOR-e 寢具訂購系統 V4.18.3
GitHub 手動覆蓋更新包

本版內容：
1. 寢具訂購縮小勾選欄，新增部門 / 海外，放大雇主及工人姓名。
2. 訂購紀錄拆分入境日與國籍，縮窄部門 / 承辦並加寬品項欄。
3. 三個主要清單的文字統一靠左對齊。
4. 會計對帳狀況、對帳人、請款日依批次只顯示一次。
5. 對帳金額移至購買品項前，購買品項改為無外框純文字。
6. 會計對帳海外承辦改為部門 / 承辦，放在操作欄前。
7. 保留 V4.18.2 既有資料與 Supabase 共用邏輯。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.3.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.3_GitHub_Manual_Update.zip'
git add index.html package.json package-lock.json CHANGELOG_V4.18.3.md
git commit -m "Update V4.18.3 order record and accounting layout"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.3
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
