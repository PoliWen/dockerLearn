# Docker Todo 应用示例

这是一个简单的Todo应用，用于演示Docker的使用。应用包括：

- 前端：使用Vue3开发
- 后端：使用Nitro框架开发的API
- 数据库：MySQL

## 项目结构

```
.
├── docker-compose.yml     # Docker Compose配置
├── packages
│   ├── app                # 前端代码
│   │   ├── Dockerfile     # 前端Docker配置
│   │   └── ...
│   └── server             # 后端代码
│       ├── Dockerfile     # 后端Docker配置
│       └── ...
```

## 使用Docker运行应用

1. 启动应用

```bash
docker-compose up -d
```

2. 访问应用

打开浏览器，访问 http://localhost:5173

## 应用功能

- 添加新任务
- 标记任务为已完成/未完成
- 删除任务

## 关闭应用

```bash
docker-compose down
```

## 清理数据

```bash
docker-compose down -v
```
