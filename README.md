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


## 環境初始化

### 取得專案

透過 HTTPS 取得專案

```
$ git clone https://github.com/j32u4ukh/alphacamp-express-restaurant-list.git
```

## 運行專案

### VS code 設置環境變數
```
$env:NODE_ENV="development"
```

`dev` 使用 nodemon 來執行專案，修改程式碼之後無須重啟程式，重新整理網頁即可。

```
$ npm run dev
```

### 安裝 npm 套件

#### 安裝 package-lock.json 內的套件
```
$ cd alphacamp-express-restaurant-list
$ npm install
```

#### 開發時安裝

```
connect-flash@0.1.1
dotenv@16.0.3
express@4.18.2
express-handlebars@7.1.2
express-session@1.17.3
method-override@3.0.0
mysql2@3.2.0
nodemon@3.0.2
sequelize@6.30.0
sequelize-cli@6.6.0
```
