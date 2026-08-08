FOR-e 寢具訂購系統 V4.18.12
GitHub 手動覆蓋更新包

本版內容：
1. 寢具訂購的「入境日／國籍」欄縮為文字外多約兩個字寬。
2. 寢具訂購的「訂購日」欄縮為日期文字外多約兩個字寬。
3. 其他欄位、訂購單與下載預覽功能維持不變。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把下列檔案覆蓋到 GitHub 專案根目錄：
   - index.html
   - package.json
   - package-lock.json
   - CHANGELOG_V4.18.12.md
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.12_GitHub_Manual_Update.zip'
npm ci
npm run build
git add -A
git commit -m "Update V4.18.12 bedding order date column widths"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.12
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
