# 服务器部署指南

## 部署方案对比

| 方案 | 功能 | 适用场景 | 部署难度 |
|------|------|---------|---------|
| **静态部署** | 仅展示功能 | 只需要展示网站 | ⭐ 简单 |
| **完整部署** | 展示+后台编辑+图片上传 | 需要后台管理功能 | ⭐⭐ 中等 |

---

## 方案一：静态部署（推荐）

### 1. 服务器环境准备

```bash
# 安装 Nginx
sudo apt update
sudo apt install nginx -y

# 启动 Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. 上传构建文件

将 `frontend/dist` 目录上传到服务器：

```bash
# 使用 scp 上传（在本地执行）
scp -r frontend/dist/* user@your-server:/var/www/shenma/

# 或使用 rsync（推荐）
rsync -avz frontend/dist/ user@your-server:/var/www/shenma/
```

### 3. 配置 Nginx

创建 Nginx 配置文件：

```bash
sudo nano /etc/nginx/sites-available/shenma
```

写入以下内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或IP

    root /var/www/shenma;
    index index.html;

    # SPA 路由重定向
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # 图片缓存
    location /uploads/ {
        expires 7d;
        add_header Cache-Control "public";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
```

启用配置：

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/shenma /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

### 4. 配置 HTTPS（可选但推荐）

使用 Certbot 安装免费 SSL 证书：

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

---

## 方案二：完整部署（带后端）

### 1. 服务器环境准备

```bash
# 更新系统
sudo apt update

# 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# 安装 Nginx
sudo apt install nginx -y

# 安装 PM2（进程管理器）
sudo npm install -g pm2
```

### 2. 上传项目文件

上传整个 `release/nq-deploy` 目录：

```bash
# 使用 rsync 上传
rsync -avz release/nq-deploy/ user@your-server:/var/www/shenma-app/
```

### 3. 安装后端依赖并启动

```bash
# 进入后端目录
cd /var/www/shenma-app/backend

# 安装依赖
npm install

# 使用 PM2 启动后端
pm2 start server.js --name "shenma-api"

# 保存 PM2 配置
pm2 save

# 设置开机自启
pm2 startup
```

### 4. 配置 Nginx 反向代理

创建 Nginx 配置：

```bash
sudo nano /etc/nginx/sites-available/shenma
```

写入以下内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/shenma-app/frontend;
    index index.html;

    # 前端静态文件
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 反向代理
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # 上传文件代理
    location /uploads/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
    }

    # 静态资源缓存
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 1000;
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/shenma /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. 配置 HTTPS

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## 常用运维命令

### PM2 相关

```bash
# 查看进程状态
pm2 status

# 查看日志
pm2 logs shenma-api

# 重启服务
pm2 restart shenma-api

# 停止服务
pm2 stop shenma-api

# 监控
pm2 monit
```

### Nginx 相关

```bash
# 测试配置
sudo nginx -t

# 重载配置
sudo systemctl reload nginx

# 查看状态
sudo systemctl status nginx

# 查看日志
sudo tail -f /var/log/nginx/error.log
```

### 更新网站

```bash
# 静态部署更新
rsync -avz frontend/dist/ user@your-server:/var/www/shenma/

# 完整部署更新
rsync -avz release/nq-deploy/frontend/ user@your-server:/var/www/shenma-app/frontend/
pm2 restart shenma-api
```

---

## 目录结构

### 静态部署

```
/var/www/shenma/
├── index.html
├── assets/
│   ├── index-xxx.js
│   └── index-xxx.css
├── uploads/
│   └── xxx.jpg
├── content.json
├── _redirects
└── _routes.json
```

### 完整部署

```
/var/www/shenma-app/
├── frontend/
│   ├── index.html
│   ├── assets/
│   └── uploads/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
```

---

## 安全建议

1. **配置防火墙**
   ```bash
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 22
   sudo ufw enable
   ```

2. **限制上传大小**（在 Nginx 配置中添加）
   ```nginx
   client_max_body_size 50M;
   ```

3. **定期备份**
   ```bash
   # 备份 uploads 和 content.json
   tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/shenma-app/frontend/public/uploads /var/www/shenma-app/frontend/public/content.json
   ```

---

## 常见问题

### Q: 页面刷新显示 404？
A: 确保 Nginx 配置了 `try_files $uri $uri/ /index.html;`

### Q: 图片上传失败？
A: 检查 `/uploads` 目录权限：`chmod 755 /var/www/shenma-app/frontend/public/uploads`

### Q: API 请求失败？
A: 检查后端是否运行：`pm2 status`，检查 Nginx 反向代理配置

### Q: 内存不足？
A: 使用静态部署方案，或增加服务器内存