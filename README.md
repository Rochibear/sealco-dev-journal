# SealCo 開發手記

公開遊戲開發日誌，僅含文章與自製SVG概念圖，不含遊戲資產。

## 更新

編輯 posts.json，一天一篇；圖片放 images/。執行 node build.mjs、node validate.mjs。
推送 main 後 GitHub Actions 自動建置並發布網站與RSS。

## 初次部署

GitHub 儲存庫 Settings → Pages → Build and deployment → Source 選 GitHub Actions。
工作流依官方 configure-pages 輸出決定網站基底網址，支援專案子目錄。
預定網址：https://rochibear.github.io/sealco-dev-journal/
RSS：https://rochibear.github.io/sealco-dev-journal/rss.xml
上述網址要在正式部署成功後才可使用。

沒有電子郵件蒐集功能，目前只提供RSS。
