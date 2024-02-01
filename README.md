# alphacamp-express-restaurant-list

Alphacamp 【指標作業】打造餐廳清單

## 「餐廳清單」的基本功能

* 使用者可以在首頁看到所有餐廳與它們的簡單資料
    1. 餐廳照片
    2. 餐廳名稱
    3. 餐廳分類
    4. 餐廳評分

* 使用者可以再點進去看餐廳的詳細資訊
    1. 類別
    2. 地址
    3. 電話
    4. 描述
    5. 圖片

* 使用者可以透過搜尋餐廳名稱來找到特定的餐廳
* 使用者可以透過搜尋餐廳類別來找到特定的餐廳
* 使用者可以新增一家餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳
* 使用者可以選擇餐廳排序規則

## 運行專案

### 1. 取得專案(首次執行才需要)

透過 HTTPS 取得專案

```
$ git clone https://github.com/j32u4ukh/alphacamp-express-restaurant-list.git
```

### 2. 安裝依賴套件(首次執行才需要)

確保當前路徑為專案資料夾下，指令將安裝 package-lock.json 內的套件

```
npm install
```

### 3. VS code 設置環境變數
```
$env:NODE_ENV="development"
```

`dev` 使用 nodemon 來執行專案，修改程式碼之後無須重啟程式，重新整理網頁即可。


### 4. 設置 .env

複製一份 .env.example，命名為 .env，填入自己的參數

```
SESSION_SECRET=XXX
FACEBOOK_CLIENT_ID=XXX
FACEBOOK_CLIENT_SECRET=XXX
FACEBOOK_CALLBACK_URL=http://localhost:3000/oauth2/redirect/facebook
```

### 5. 生成資料庫表格(首次執行才需要)

須確保資料庫 alphacamp 存在

```
npx sequelize db:migrate
```

### 6. 寫入資料庫初始數據(首次執行才需要)

```
npx sequelize db:seed:all
```

### 7. 專案啟動

```
npm run dev
```

## 依賴 npm 套件

### 資料庫相關
```
mysql2@3.2.0
sequelize@6.30.0
sequelize-cli@6.6.0
```

### 登入驗證相關

```
bcryptjs@2.4.3 // 加密密碼
passport@0.6.0
passport-facebook@3.0.0
passport-local@1.0.0
```

### 其他

```
connect-flash@0.1.1
dotenv@16.0.3
express@4.18.2
express-handlebars@7.1.2
express-session@1.17.3
method-override@3.0.0
nodemon@3.0.2
```

## sequelize-cli

### sequelize-cli 初始設置

在 Sequelize CLI 裡，已經把初始化時需要的設定寫成 sequelize init 腳本了，我們可以直接執行指令。這裡因為指令集安裝在工具目錄下，需要先使用 npx 指令來找到路徑，再呼叫 sequelize init：

```
npx sequelize init
```

指令執行後，請仔細看一下系統訊息，它就是自動幫你開了一些空的資料夾和檔案。

### 建立表格

這個指令會同時生成 migrations 和 models 當中的檔案，新建表格時可以使用這個。

```
npx sequelize model:generate --name User --attributes name:string,email:string,password:string
```

### Migration

```
npx sequelize migration:generate --name migrationName
```

* up： `npx sequelize db:migrate`
* down： `npx sequelize db:migrate:undo`

### Seed

建立 Seed 檔案: `npx sequelize seed:generate --name initial-data`

執行 Seeder: `npx sequelize db:seed:all`

撤銷 Seeder: `npx sequelize db:seed:undo`