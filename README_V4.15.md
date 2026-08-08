FOR-e 寢具訂購系統 V4.15 GitHub 更新包

更新內容：
1. 停用品項於資料設定預設隱藏，但不影響既有訂單與歷史資料。
2. 四國簽收單依品項名稱翻譯，補齊 T 型衣櫥。
3. 品項設定可維護印尼、泰國、菲律賓英文、越南文翻譯。
4. 腳踏車訂購單縮小廠商資訊、放大送貨資訊。
5. 腳踏車送達日期時間、收貨人及送貨地址可另行填寫；留白則沿用一般訂單。

手動更新：
將本資料夾中的檔案覆蓋到 GitHub 專案根目錄後執行：

git add index.html package.json package-lock.json CHANGELOG_V4.15.md
git commit -m "Add inactive item hiding translations and bicycle delivery V4.15"
git pull --rebase origin main
git push origin main

目前正式 GitHub / Vercel 已由系統直接更新，以上指令僅供備份或重新部署。
