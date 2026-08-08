FOR-e 寢具訂購系統 V4.18.8
GitHub 手動覆蓋更新包

本版內容：
1. 寢具訂購與訂購紀錄的「目前狀況」欄位依狀態文字貼合寬度。
2. 訂購總金額維持醒目金黃色粗體。
3. 金額下方「寢具及用品」改為藍色，「腳踏車」改為綠色。
4. 保留 V4.18.7 既有欄位順序、品項及退貨顯示邏輯。
5. 保留既有資料與 Supabase 共用邏輯。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.8.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.8_GitHub_Manual_Update.zip'
npm ci
npm run build
git add -A
git commit -m "Update V4.18.8 status width and amount colors"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.8
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
