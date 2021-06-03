## 簡介 Brief Introduction
可新增並管理喜愛的餐廳清單，將珍藏的餐廳一次列出，方便自己或分享給親友搜尋查找。


## 功能說明 Functions 
- 首頁列表呈現餐廳照片、名稱、餐廳種類和評分，並有RWD響應式設計，友善不同裝置瀏覽。
- 點擊單一餐廳照片可查看詳細資訊，包含：餐廳種類、地址(點擊箭頭圖示，會外跳連結展開Google Map)、電話、餐廳簡單介紹和照片。
- 使用者可以透過搜尋欄，查找餐廳名稱或餐廳種類的關鍵字，若搜尋查無關鍵字，會出現提示訊息。若未輸入搜尋條件，會出現提示訊息。
- 使用者可以新增、瀏覽、修改及刪除餐廳資料；餐廳類型以下拉選擇，減少輸入欄位：評分設定為1~5分(至小數點第一位)。
- 新增或編輯餐廳資料時，若有必填資料未填，將跳出提醒且無法送出表單。


## 環境建置與需求 Prerequisites
- 開發環境 Visual Studio Code v1.56.2
- 執行環境 Node.js v10.15.0
- 框架 Express.js v4.17.1
- 模板引擎 Express-handlebars v5.3.2
- 實用套件 Nodemon v2.0.7
- 資料庫操作 Mongoose v5.12.12


## 安裝與執行步驟 Installation and Execution
1.在本機電腦備妥欲存放的資料夾，在該資料夾開啟 Terminal執行clone複製指令
```
git clone https://github.com/dbw-studio/AC-S3-A4.git
```

2.進入專案資料夾
```
cd AC-S3-A4
```

3.安裝套件
```
npm i -y
```

4.啟動伺服器執行
```
npm run dev
```

5.當Terminal出現提示 `Server is listening localhost:3000`，表示伺服器已啟動，請用瀏覽器開啟 http://localhost:3000 ，即可開始使用程式

6.若要快速套入種子資料可執行
```
npm run seed
```
