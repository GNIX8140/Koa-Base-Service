# 基于Koa的服务端基础框架

---

##### Version: 1.0.0
##### Author: XING
##### Date: 2023.07.11

---

### 配置修改

> /src/config/develop.js -> 开发环境配置 \
> /src/config/product.js -> 部署环境配置 

---

### 服务启动

> npm run dev -> develop环境 由nodemon提供热重载 \
> npm run serve -> product环境 正式服务

---

### 数据库

> Redis 数据库 \
> MariaDB 数据库 \
> MongoDB 数据库 \
> Memcahced 数据库

---

### 中间件

> Authorization -> API拦截器 \
> ResponseModel -> 响应消息体 \
> ResponseTime -> 接口响应Log \
> ResponseError -> 响应错误处理

---

### 处理工具

> SSL -> SSL密钥配置 \
> IP -> 设备当前内网IP \
> Init -> 系统初始化检测

---