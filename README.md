# 货车司机信息管理系统开发文档

## 项目简介

本系统是一个基于 Web 的货车司机信息管理平台，用于管理和维护货车司机的基本信息、停车场分配、微信联系方式、APP账号等数据。系统采用前后端分离架构，提供了安全的用户认证、数据导入导出、自动备份等功能。

## 技术架构

### 前端技术栈
- 框架：React 18
- UI组件：Ant Design 5.x
- 构建工具：Vite
- 路由：React Router 6
- 状态管理：React Context
- HTTP客户端：Axios
- Excel处理：XLSX

### 后端技术栈
- 运行环境：Node.js 18
- Web框架：Express
- 数据库：SQLite
- 认证：JWT
- 日志：Winston

### 部署环境
- 容器化：Docker + Docker Compose
- Web服务器：Nginx
- 数据持久化：Docker Volumes
- 自动备份：Alpine Linux

## 项目结构

```bash
project/
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── api/            # API接口
│   │   ├── components/     # 组件
│   │   ├── pages/         # 页面
│   │   ├── context/       # 上下文
│   │   └── utils/         # 工具函数
│   ├── Dockerfile         # 前端Docker配置
│   └── nginx.conf         # Nginx配置
│
├── backend/                # 后端项目
│   ├── src/
│   │   ├── config/        # 配置文件
│   │   ├── controllers/   # 控制器
│   │   ├── middleware/    # 中间件
│   │   ├── routes/        # 路由
│   │   └── utils/         # 工具函数
│   └── Dockerfile         # 后端Docker配置
│
├── data/                   # 数据文件
├── logs/                   # 日志文件
├── backups/               # 备份文件
└── docker-compose.yml     # Docker编排配置
```

## 快速开始

### 环境要求
- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+ (开发环境)
- NPM 8+ (开发环境)

### 部署步骤

1. 克隆项目
```bash
git clone https://github.com/Baozhi888/truck-driver-management.git
cd truck-driver-management
```

2. 创建必要目录
```bash
mkdir -p data logs backups
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，设置必要的环境变量
```

4. 构建和启动服务
```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d
```

### 开发环境设置

1. 前端开发
```bash
cd frontend
npm install
npm run dev
```

2. 后端开发
```bash
cd backend
npm install
npm run dev
```

## 系统功能

### 用户认证
- 管理员登录/登出
- JWT token认证
- 会话管理

### 司机信息管理
- 基本信息维护
- 停车场分配
- 联系方式管理
- APP账号管理
- 开票信息记录

### 数据导入导出
- Excel文件导入
- Excel文件导出
- 数据格式校验

### 系统管理
- 自动数据备份
- 日志记录
- 健康监控

## 运维管理

### 日常维护
```bash
# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 手动备份
make backup
```

### 数据备份
- 自动备份：系统每天自动备份数据库
- 备份保留：默认保留最近7天的备份
- 备份位置：./backups目录

### 监控告警
- 服务健康检查
- 容器状态监控
- 日志异常告警

## 开发指南

### 代码规范
- 使用ESLint进行代码检查
- 遵循React最佳实践
- 使用统一的代码格式化配置

### 提交规范
```bash
# 代码检查
npm run lint

# 运行测试
npm run test
```

### 分支管理
- main: 主分支，用于生产环境
- develop: 开发分支，用于功能开发
- feature/*: 功能分支，用于新功能开发
- hotfix/*: 修复分支，用于紧急bug修复

## 常见问题

### 1. 启动失败
检查：
- Docker服务是否正常运行
- 端口是否被占用
- 环境变量是否正确配置

### 2. 无法登录
检查：
- 数据库是否正确初始化
- 默认管理员账号是否创建
- JWT密钥是否正确配置

### 3. 数据丢失
解决：
- 检查备份文件
- 恢复最近的备份
- 检查数据库权限

## 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 基本功能实现
- Docker部署支持

## 技术支持

如遇问题，请：
1. 查看项目文档
2. 检查错误日志
3. 提交Issue
4. 联系技术支持团队

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 发起 Pull Request

## 团队成员

- 产品经理：xxx
- 前端开发：xxx
- 后端开发：xxx
- 运维支持：xxx

## 致谢

感谢以下开源项目：
- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)
