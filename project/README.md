# 货车司机信息管理系统

一个基于 React、Node.js 和 SQLite 构建的综合性货车司机信息管理系统。

## 🚀 系统功能

- 🔐 安全的管理员登录系统
- 👥 司机信息管理与维护
- 📍 停车场位置分类管理
- 📊 Excel 数据导入导出
- 🔄 实时数据更新
- 📱 响应式界面设计
- 🔒 基于角色的访问控制
- 💾 自动备份系统

## 🏗️ 技术架构

### 前端
- React（用户界面框架）
- Ant Design（UI 组件库）
- Vite（构建工具）
- Axios（HTTP 客户端）
- XLSX（Excel 处理）

### 后端
- Node.js（运行环境）
- Express（Web 框架）
- SQLite（数据库）
- JWT（身份认证）
- Winston（日志系统）

### 基础设施
- Docker（容器化）
- Nginx（Web 服务器）
- Docker Compose（容器编排）

## 🛠️ 环境要求

- Docker 和 Docker Compose
- Node.js >= 18（开发环境）
- Make（可选，用于执行 Makefile 命令）

## 🚀 快速开始

### 使用 Docker 部署

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/truck-driver-management.git
cd truck-driver-management
```

2. 初始化开发环境：
```bash
make init-dev
```

3. 配置环境变量：
```bash
# 编辑 .env 文件，设置相关配置
vi .env
```

4. 构建并启动容器：
```bash
make build
make up
```

5. 访问系统：
- 前端界面：http://localhost
- 后端接口：http://localhost/api

### 默认登录信息
```
用户名：admin
密码：admin123
```
⚠️ 在生产环境中必须修改默认密码！

## 📁 项目结构

```
.
├── frontend/                # 前端应用
│   ├── src/
│   │   ├── api/            # API 接口封装
│   │   ├── components/     # 可复用组件
│   │   ├── pages/         # 页面组件
│   │   └── utils/         # 工具函数
│   └── Dockerfile
│
├── backend/                # 后端应用
│   ├── src/
│   │   ├── config/        # 配置文件
│   │   ├── controllers/   # 控制器
│   │   ├── middleware/    # 中间件
│   │   ├── routes/        # 路由定义
│   │   └── utils/         # 工具函数
│   └── Dockerfile
│
├── data/                   # 数据库文件
├── logs/                   # 应用日志
├── backups/               # 数据备份
└── docker-compose.yml     # Docker 编排配置
```

## 🛠️ 开发指南

### 启动开发环境
```bash
# 前端开发服务器
cd frontend
npm install
npm run dev

# 后端开发服务器
cd backend
npm install
npm run dev
```

### 运行测试
```bash
make test
```

### 代码检查
```bash
make lint
```

## 🔧 可用的 Make 命令

```bash
make build      # 构建 Docker 镜像
make up         # 启动容器
make down       # 停止容器
make logs       # 查看日志
make restart    # 重启容器
make clean      # 清理所有数据
make backup     # 创建数据库备份
make test       # 运行测试
make lint       # 运行代码检查
make monitor    # 监控容器状态
make init-dev   # 初始化开发环境
```

## 💾 数据备份与恢复

### 自动备份
系统每天自动创建备份，保留最近 7 天的备份文件。

### 手动备份
```bash
make backup
```

### 备份位置
备份文件存储在 `backups/` 目录下。

## 🔐 安全特性

- JWT 身份认证
- 密码加密存储
- 请求频率限制
- CORS 跨域保护
- SQL 注入防护
- XSS 攻击防护
- 请求数据验证
- 安全 HTTP 头部

## 🔍 监控和日志

### 日志文件
- 应用日志：`logs/combined.log`
- 错误日志：`logs/error.log`

### 健康检查
- 前端：http://localhost/health
- 后端：http://localhost:3000/health

## 🚀 部署指南

### 生产环境部署检查清单

1. 更新环境变量：
   - 设置安全的 JWT_SECRET
   - 配置正确的 CORS_ORIGIN
   - 设置生产环境数据库路径

2. 安全措施：
   - 修改默认管理员密码
   - 配置 SSL/TLS
   - 设置防火墙规则

3. 配置备份策略：
   - 设置备份保留期限
   - 配置备份存储位置
   - 测试备份恢复功能

### 环境变量说明

```env
# 必需变量
NODE_ENV=production
JWT_SECRET=your-secure-secret
CORS_ORIGIN=https://your-domain.com

# 可选变量
PORT=3000
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## 📊 API 接口说明

### 认证接口
```
POST /api/auth/login    # 登录
POST /api/auth/logout   # 登出
```

### 司机管理接口
```
GET    /api/drivers        # 获取司机列表
POST   /api/drivers        # 创建新司机
PUT    /api/drivers/:id    # 更新司机信息
DELETE /api/drivers/:id    # 删除司机
POST   /api/drivers/batch-delete  # 批量删除
```

## 🔧 系统维护

### 日常维护
1. 定期检查日志文件
2. 监控系统资源使用
3. 验证备份完整性
4. 更新安全补丁

### 故障处理
1. 检查容器状态：`make monitor`
2. 查看错误日志：`make logs`
3. 重启服务：`make restart`
4. 备份数据：`make backup`

## 📝 常见问题解答

### Q: 如何重置管理员密码？
A: 可以通过数据库直接更新，或使用管理员工具重置。

### Q: 数据库备份在哪里？
A: 备份文件存储在 `backups/` 目录，按日期命名。

### Q: 如何导入大量司机数据？
A: 可以使用系统的 Excel 导入功能，或通过 API 批量导入。

## 🤝 如何贡献

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📞 技术支持

如需帮助，请：
1. 查看项目文档
2. 提交 Issue
3. 联系技术支持团队

## 📜 开源协议

本项目采用 MIT 协议 - 详见 [LICENSE](LICENSE) 文件。

## ✨ 致谢

感谢以下开源项目：
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Ant Design](https://ant.design/)
- [Docker](https://docs.docker.com/)
