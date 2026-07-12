# FOR-e 寢具訂購系統 V4.5

架構：Vite + Supabase Database / Realtime + GitHub + Vercel。

本版不使用登入、帳號或角色權限。開啟正式網址後直接進入系統，所有人都能使用全部功能並共用同一份 Supabase 資料。

## 上線順序

1. Supabase 建立 Project。
2. 在 SQL Editor 執行 `supabase/001_bedding_order_system.sql`。
3. 複製 `.env.example` 為 `.env.local`，填入 Supabase URL 與 anon key。
4. 本機執行 `npm install`、`npm run dev` 測試。
5. 將專案檔案推送到 GitHub。
6. Vercel 匯入 GitHub Repository，加入環境變數後 Deploy。

完整操作請看 `上線步驟.md`。

## 重要提醒

本版沒有登入及權限控管，任何取得正式網址的人都能查看、修改、刪除系統資料。請勿將網址公開，並定期在「資料設定」下載 JSON 備份。
