#!/usr/bin/env bash
set -euo pipefail

PROJECT="for-ebeddingorderv2"
SCOPE="jillzoe0301-gifs-projects"

cd "$(dirname "$0")"

echo "=================================================="
echo "FOR-e 寢具訂購 V4.15.2 Production 直接部署"
echo "=================================================="

echo
echo "[1/6] 驗證正式來源檔"
grep -q '<title>FOR-e寢具訂購 V4.15.2</title>' index.html
grep -q '"version": "4.15.2"' package.json
grep -q '"version": "4.15.2"' package-lock.json
grep -q "腳踏車廠商地址格線與列印空白頁修正" index.html
echo "來源檔確認：V4.15.2"

echo
echo "[2/6] 確認 Vercel 登入"
if ! npx --yes vercel@latest whoami --scope "$SCOPE" >/dev/null 2>&1; then
  echo "請依畫面登入 Vercel。"
  npx --yes vercel@latest login
fi

echo
echo "[3/6] 重新連結正確的 Vercel 專案"
rm -rf .vercel
npx --yes vercel@latest link \
  --yes \
  --project "$PROJECT" \
  --scope "$SCOPE"

echo
echo "[4/6] 拉取 Production 設定與環境變數"
npx --yes vercel@latest pull \
  --yes \
  --environment=production \
  --scope "$SCOPE"

echo
echo "[5/6] 強制建立全新 Production Deployment"
DEPLOY_OUTPUT="$(
  npx --yes vercel@latest deploy \
    --prod \
    --force \
    --yes \
    --scope "$SCOPE" 2>&1 | tee /dev/stderr
)"

DEPLOY_URL="$(printf '%s\n' "$DEPLOY_OUTPUT" | grep -Eo 'https://[^ ]+\.vercel\.app' | tail -n 1 || true)"

echo
echo "[6/6] 完成"
if [[ -n "$DEPLOY_URL" ]]; then
  echo "新部署網址：$DEPLOY_URL"
else
  echo "部署已送出。請到 Vercel 的 Deployments 查看最新一筆 Production。"
fi

echo
echo "請確認最新 Deployment 的 Source 版本為 V4.15.2。"
echo "正式網址開啟後使用 Ctrl+F5 或 Command+Shift+R 強制重新整理。"
