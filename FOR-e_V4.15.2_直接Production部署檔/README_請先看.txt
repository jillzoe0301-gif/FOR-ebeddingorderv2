FOR-e 寢具訂購 V4.15.2 直接 Production 部署包

操作方式：
1. 將 ZIP 上傳到 Codespaces 專案根目錄。
2. 執行：

rm -rf 'FOR-e_V4.15.2_直接Production部署檔'
mkdir -p 'FOR-e_V4.15.2_直接Production部署檔'
unzip -o 'FOR-e_V4.15.2_直接Production部署包.zip' -d 'FOR-e_V4.15.2_直接Production部署檔'
cd 'FOR-e_V4.15.2_直接Production部署檔'
chmod +x '部署_V4.15.2_Production.sh'
./部署_V4.15.2_Production.sh

本部署不依賴 GitHub build patch，會將完整 V4.15.2 來源直接送到
Vercel 專案 for-ebeddingorderv2 的 Production。
