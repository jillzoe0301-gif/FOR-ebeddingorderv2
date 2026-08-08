FOR-e 寢具訂購系統 V4.18.6
GitHub 手動覆蓋更新包

本版內容：
1. 會計對帳的訂購單 / 雇主 / 工人欄位稍微縮窄。
2. 欄內文字仍維持不換行。
3. 腳踏車品項與金額改為無外框純文字顯示。
4. 其他欄位寬度、字級及顯示方式維持 V4.18.5 不變。
5. 保留既有資料與 Supabase 共用邏輯。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.6.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.6_GitHub_Manual_Update.zip'
git add -A
git commit -m "Update V4.18.6 accounting order column width"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.6
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
