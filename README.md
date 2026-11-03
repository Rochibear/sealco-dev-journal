# SealCo 遊戲官網與開發手記

這是獨立官網來源庫，包含遊戲介紹、公開文章、經檢查的實機宣傳影片與截圖。單機測試包依使用者2026-11-03最新授權放在GitHub Releases，不把原始SPAK、遊戲模型、貼圖、音效或私人測試配置提交到本來源庫。

- Windows完整執行包：GitHub Releases的2026.11.03 Alpha；含離線執行所需檔案。
- Mac Apple Silicon DMG：尚需在Mac完成封裝，官網如實標示製作中。
- 網頁多人版：封測中，即將開放；不公開私人測試網址與邀請碼。

## 內容與建置

- `posts.json`：文章唯一來源，最新文章置頂。`status`必須區分開發中、程式驗證與實戰驗收。
- `site.json`：網站名稱與公開網址。
- `build.mjs`：產生首頁、文章HTML、RSS、JSON Feed、sitemap與靜態檔案。
- `add-entry.mjs --file <文章JSON>`：加入一篇文章並重新建置；不可重複使用ID。
- `validate.mjs`：檢查文章連結、訂閱入口與常見私人路徑。

在本目錄執行 `node build.mjs`、`node validate.mjs`、`node preview.mjs`，本機預覽為 `http://127.0.0.1:8770/`。不用安裝依賴。

## 發布與持續更新

Sites專案識別碼在`.openai/hosting.json`。只從本目錄的獨立Git來源庫發布，不得從遊戲工作區根目錄打包或推送。

每次完成遊戲更新，由Codex整理一篇公開日誌或修訂原文、建置、檢查，然後依Sites技能推送、保存版本與部署。RSS與JSON Feed跟著同一版本更新；閱讀器以文章URL為固定ID，避免更新原文變成重複訂閱。

正式網站不直接存取本機DEVLOG。只改本機檔案還不會更新公開網站，必須完成發布。這項流程已加入工作區AGENTS.md。

## 訂閱

目前提供`/rss.xml`與`/feed.json`，不收集電子郵件地址。電子郵件寄送、確認訂閱與退訂功能待使用者日後指定服務再接入。

10/24～10/29採每日彙整，images/只放自製示意圖；legacy-posts.json保留舊URL對應。

