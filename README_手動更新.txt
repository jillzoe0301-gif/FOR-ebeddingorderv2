FOR-e 寢具訂購系統 V4.18.13
GitHub 手動覆蓋更新包

本版內容：
1. 不同工人的訂購品項不一致時，各品項下方顯示實際購買工人姓名。
2. 工人訂購內容相同時維持原本簡潔版面，不重複標示姓名。
3. 列印版、下載 PNG 與腳踏車訂購單同步套用。

手動更新方式：
A. 將 ZIP 解壓縮。
B. 把檔案覆蓋到 GitHub 專案根目錄。
C. Commit changes。
D. GitHub main 更新後，由 Vercel 自動部署即可。

如果使用 Codespaces，可執行：

cd /workspaces/FOR-ebeddingorderv2
unzip -o 'FOR-e_Bedding_Order_V4.18.13_GitHub_Manual_Update.zip'
npm ci
npm run build
git add -A
git commit -m "Update V4.18.13 worker names by ordered item"
git pull --rebase origin main
git push origin main

正確版本：
package.json = 4.18.13
build = vite build

注意：
這包是完整原始碼，可直接覆蓋更新。
