# 使用官方的 Node.js 鏡像作為基礎鏡像
FROM node:20.10.0

# 將 app 目錄中的所有文件覆制到工作目錄
COPY ./app /usr/src/app

# 設置工作目錄
WORKDIR /usr/src/app

# 安裝項目依賴
RUN npm install

ENV NODE_ENV=development

# RUN npx sequelize db:migrate --migrations-path /usr/src/app/migrations

# RUN npx sequelize db:seed:all --seeders-path /usr/src/app/seeders

# 暴露應用程序所使用的端口
EXPOSE 3000
