FOR-e 寢具訂購系統 V4.18.11
GitHub 手動覆蓋更新包

本版內容：
1. 修正下載訂購單後 PNG 預覽沒有自動開啟的問題。
2. 點擊下載時先建立預覽頁，避免產圖完成後遭瀏覽器攔截。
3. 同一工人姓名在訂購單上只顯示一次，訂購明細仍完整保留。
4. 保留既有資料與 Supabase 共用邏輯。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.11.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.11_GitHub_Manual_Update.zip'
npm ci
npm run build
git add -A
git commit -m "Update V4.18.11 order preview and duplicate worker names"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.11
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
