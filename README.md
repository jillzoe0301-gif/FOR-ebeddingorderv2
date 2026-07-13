# FOR-e 寢具訂購系統 V4.9.1

Supabase 公開共用免登入版，使用 GitHub 版本控管並由 Vercel 自動部署。

## V4.9.1 更新內容

1. 網站分頁、我的最愛及手機主畫面圖示更換為指定的深棕色 Order 圖。
2. 系統左上角 LOGO 同步更換。
3. 使用版本化圖示檔名，避免部署後仍顯示舊快取。
4. 其餘訂購、收貨聯絡人、資料設定、庫存與對帳功能維持 V4.9。

## 架構

- 前端：Vite 單頁應用程式
- 資料庫：Supabase
- 程式碼：GitHub
- 部署：Vercel
- 登入／權限：無，開啟網址直接使用

## 環境變數

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

不得將 Supabase service role key 放在前端或 GitHub。

## 更新既有版本

- 不需要重新建立 Supabase Project。
- 不需要重新執行 SQL。
- 不需要修改 Vercel 環境變數。
- 將更新包解壓縮後覆蓋 GitHub Repository 根目錄並推送即可。
