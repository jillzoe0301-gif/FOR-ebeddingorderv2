# FOR-e 寢具訂購系統 V4.5｜Supabase、GitHub、Vercel 上線步驟

## 本版使用方式

- 不需要登入。
- 不需要建立帳號。
- 不需要設定管理員、海外或會計角色。
- 開啟 Vercel 正式網址後，直接進入系統。
- 所有人共用同一份 Supabase 資料，全部功能皆可使用。

> 注意：任何取得網址的人都能查看、修改及刪除資料。正式網址請只提供給公司內部使用，並定期下載 JSON 備份。

---

## 一、建立 Supabase

### 1. 建立 Project

登入 Supabase，建立新 Project。建議名稱：

```text
for-e-bedding-order
```

資料庫密碼請自行保存，不要放入 GitHub。

### 2. 執行 SQL

進入：

```text
SQL Editor → New query
```

開啟專案內：

```text
supabase/001_bedding_order_system.sql
```

完整複製 SQL 內容，貼入 SQL Editor，按 `Run`。

成功後會建立：

- `app_state` 共用資料表
- 匿名公開讀取規則
- `save_bedding_state` 共用寫入 RPC
- revision 版本衝突保護
- Realtime 即時同步

若先前已執行 V4.4 登入版 SQL，也可以直接執行本版 SQL：

- 原本 `app_state` 資料會保留。
- `profiles`、登入 Trigger 與角色權限會被移除。
- 不需要刪除 Supabase Project 重來。

### 3. 不需要設定 Authentication

本版不使用 Supabase Authentication，因此以下步驟全部不需要：

```text
Authentication → Users
建立帳號
建立管理員
設定 profiles
設定角色
設定 Site URL / Redirect URLs
```

### 4. 取得環境變數

在 Supabase 專案的 API 設定頁取得：

```text
Project URL
anon public key
```

本專案環境變數名稱：

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

不要把 `service_role` key 放入前端、GitHub 或 Vercel。

---

## 二、本機測試

解壓縮正式包後，開啟 Mac 終端機。

輸入：

```bash
cd 
```

`cd` 後面空一格，把專案資料夾拖入終端機，再按 Enter。

建立本機環境變數：

```bash
cp .env.example .env.local
```

打開 `.env.local`，填入：

```text
VITE_SUPABASE_URL=https://你的專案編號.supabase.co
VITE_SUPABASE_ANON_KEY=你的anon-public-key
```

執行：

```bash
npm install
npm run dev
```

瀏覽器開啟終端機顯示的網址，例如：

```text
http://localhost:5173
```

畫面會直接進入系統，不會出現登入頁。

---

## 三、建立 GitHub Repository

在 GitHub 建立新 Repository，建議名稱：

```text
for-e-bedding-order
```

請上傳解壓縮後的專案檔案，不要直接上傳 ZIP。

`.gitignore` 已排除：

```text
.env.local
node_modules
dist
.vercel
```

在專案資料夾執行：

```bash
git init
git add .
git commit -m "FOR-e bedding order V4.5 public Supabase production"
git branch -M main
git remote add origin https://github.com/你的GitHub帳號/for-e-bedding-order.git
git push -u origin main
```

若 Repository 已經存在，請不要重複執行 `git init` 與 `git remote add origin`，直接使用：

```bash
git add .
git commit -m "Update to V4.5 no login public Supabase"
git push
```

---

## 四、Vercel 部署

1. 登入 Vercel。
2. 選擇 `Add New → Project`。
3. 匯入 GitHub Repository：`for-e-bedding-order`。
4. 設定：

```text
Framework Preset：Vite
Build Command：npm run build
Output Directory：dist
Install Command：npm install
```

5. 加入環境變數：

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

環境建議勾選：

```text
Production
Preview
Development
```

6. 按 `Deploy`。

部署完成後，直接開啟 Vercel 網址即可進入系統，不需要登入。

---

## 五、搬移 V4.3 或舊版資料

在舊版系統：

```text
資料設定 → 下載備份 JSON
```

到新的 V4.5 正式網址：

```text
資料設定 → 還原 JSON
```

選擇舊版 JSON。匯入後會同步到 Supabase，其他開啟系統的人員也會看到同一份資料。

---

## 六、之後每次更新

修改完成後，在專案資料夾執行：

```bash
git add .
git commit -m "更新內容說明"
git push
```

GitHub 更新後，Vercel 會自動重新部署。

---

## 七、正式使用提醒

因為本版沒有登入及權限：

- 任何取得網址的人都能進入。
- 所有人都能修改資料設定。
- 所有人都能刪除或清空資料。
- 無法辨識實際是哪一位同仁操作。
- 異動紀錄只會顯示「共用網址」。

建議：

- Vercel 網址只在公司內部傳遞。
- 不要放在公開網站或社群。
- 每週或重大修改前下載 JSON 備份。
