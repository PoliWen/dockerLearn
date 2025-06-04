## 引言
在软件开发中，环境配置和部署问题常常令人头疼,本地运行正常的程序，部署到测试或生产环境时却频频出错。手动配置环境耗时费力，且易因版本不一致导致故障。Docker 应运而生，通过容器化技术将应用程序及其依赖打包为标准化的“集装箱”，实现“一次打包，处处运行”。就像物流行业的集装箱革命，Docker 通过标准化和自动化，让软件部署变得高效、简单，可靠。

## 什么是Docker？
Docker 是一个开源的容器化平台，用于构建、运行和分享应用程序。通过虚拟化**容器**技术实现<font style="color:rgb(64, 64, 64);">将应用程序及其依赖项（代码、依赖库，运行时、配置等）打包为一个标准化、轻量级、可移植的容器中</font>,确保在不同环境中快速部署和运行。Docker 的核心价值在于它让应用与底层操作系统解耦，确保"一次打包，处处运行"。

### 解决的问题：环境不一致性
以一个全栈应用（Vue3前端、Node.js后端、MySQL数据库）为例，本地开发正常，但部署时常因版本不匹配或依赖缺失出错。Docker 通过将应用及其环境打包为镜像，消除了这些问题。无论在本地、测试还是生产环境，只需运行镜像即可快速启动应用，免去繁琐配置。

### Docker 与操作系统的关系
Docker 运行在 Docker 引擎之上，引擎就像一个统一的"集装箱码头"，可以安装在 macOS、Windows 或 Linux 上。在这个码头上，Docker 容器（集装箱）彼此隔离运行，共享主机的操作系统内核，而无需依赖特定的操作系统环境。这意味着你只需维护 Docker 引擎，容器内的应用就能在任何支持 Docker 的系统上运行。

![](https://cdn.nlark.com/yuque/0/2025/png/2192012/1748773811995-bc256641-c6ae-4ed8-abbe-1cddd259ebd0.png)

### 虚拟机 vs. 容器
虚拟机（VM）和 Docker 容器的区别可以用一个类比来理解：  

+ **虚拟机**：像一栋独立的别墅，包含自己的水电系统（操作系统）、家具（应用程序）和所有生活必需品。它功能齐全，但建造和维护成本高，占用大量空间（内存和磁盘）。一台物理服务器可能只能运行几个虚拟机。  
+ **Docker 容器**：像一间精简的模块化公寓，共享小区的水电系统（主机内核），只带必要的生活用品（应用和最小化依赖）。它轻便、启动快、资源占用少，一台服务器可以运行上百个容器。  
例如，一个虚拟机可能需要 4GB 内存来运行一个操作系统和应用，而一个 Docker 容器可能只需几百 MB，因为它直接利用主机的内核。这种高效性让 Docker 成为现代开发的首选.

下表通过日常生活的类比，直观对比虚拟机和Docker容器的主要差别：

| 对比项 | 虚拟机 | Docker容器 |
| --- | --- | --- |
| **资源占用** | 高 | 低 |
| **启动时间** | 分钟级 | 秒级 |
| **隔离级别** | 完全隔离 | 进程级隔离 |
| **系统依赖** | 包含完整操作系统 | 共享主机内核 |
| **磁盘占用** | GB级（数十GB） | MB级（通常<1GB） |
| **应用部署** | 需配置完整环境 | "一次构建，到处运行" |
| **维护成本** | 高（需维护OS） | 低（只关注应用） |
| **适用场景** | 需要完整OS隔离的环境 | 微服务、DevOps、CI/CD |


## Docker的核心概念
要掌握 Docker，需了解以下四个基础概念：

1. **镜像（Image）**：只读模板，包含应用及其依赖的快照。类比：菜谱，记录应用所需的“食材”和“步骤”。
2. **容器（Container）**：镜像的运行实例。类比：根据菜谱做出的菜品，可多次实例化且相互隔离。
3. **Dockerfile**：构建Docker镜像的指令文件。类比：菜谱的书面版本，指导 Docker 打包应用。
4. **Docker Hub**：公共镜像仓库，用于分享和获取镜像。类比：开源菜谱平台，供用户上传或下载镜像。

类比总结：镜像像编程中的类，容器是类的实例，Dockerfile 是类的定义代码，Docker Hub 是分享类的平台。

可以用以下图来表示他们之间的关系

![](https://cdn.nlark.com/yuque/0/2025/png/2192012/1748775518126-1e14d8be-a59b-4364-a1ba-45152795da60.png)

## Docker的安装
+ **macOS**：从 Docker 官网下载并安装 Docker Desktop。
+ **Windows**：先安装 WSL2 和 Ubuntu 子系统，再安装 Docker Desktop.
+ **Linux**：使用包管理器安装（如 `sudo apt install docker.io`）。  
安装完成后，运行 `docker --version` 验证安装成功，输出类似 `Docker version 27.0.3`.

## 快速上手：Docker基本操作
让我们通过一个简单的Hello Docker应用来体验Docker的基本操作流程：

### 1. 创建一个简单的Node.js应用
项目结构如下：

```plain
HelloDocker/
├── index.js         # 应用代码
├── package.json     # 项目依赖
├── Dockerfile       # Docker构建文件
└── .dockerignore    # 排除文件
```

**index.js** - 一个简单的Express服务器：

```javascript
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Docker');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

**package.json** - 定义项目依赖：

```json
{
  "name": "hello-docker",
  "version": "1.0.0",
  "description": "Simple Express app for Docker demo",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### 2. 编写 Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

这个Dockerfile告诉Docker：

+ 使用Node.js 18 Alpine版本作为基础镜像
+ 在容器内创建/app工作目录
+ 复制package.json文件并安装依赖
+ 复制所有其他文件
+ 暴露3000端口
+ 使用npm start命令启动应用

同时，需要创建一个.dockerignore文件，排除不必要的文件：

```plain
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
```

**.dockerignore的作用**：

+ 类似于.gitignore，它告诉Docker在构建过程中应该忽略哪些文件和目录
+ 提高构建效率：排除node_modules等大型目录，加快COPY操作速度
+ 减小镜像体积：避免将不必要的文件（如开发工具、日志、版本控制文件）打包到镜像中
+ 提高安全性：防止敏感信息（如.env文件、密钥）被意外包含在镜像中

在这个例子中，排除node_modules是因为会在容器内重新安装依赖，排除Dockerfile和.git等文件是因为它们对运行应用没有帮助，只会增加镜像大小。

### 3. 构建Docker镜像
在项目目录下运行以下命令构建镜像：

```bash
docker build -t hello-docker .
```

如果提示网络原因构建失败，可以先执行 docker pull node:18-alpine 将基础镜像拉取到本地之后在执行build命令

+ `-t hello-docker`：为镜像指定名称和标签
+ `.`：指定Dockerfile所在的当前目录

构建完成后，可以使用以下命令查看镜像：

```bash
docker images
```

### 4. 运行Docker容器
使用以下命令运行容器：

```bash
docker run -d -p 3000:3000 --name hello-app hello-docker
```

+ `-d`：后台运行容器
+ `-p 3000:3000`：将主机的3000端口映射到容器的3000端口
+ `--name hello-app`：为容器指定名称
+ `hello-docker`：使用的镜像名称

现在，打开浏览器访问`http://localhost:3000`，你应该能看到"Hello Docker"消息。

### 5. 管理Docker容器
常用的容器管理命令：

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括已停止的）
docker ps -a

# 停止容器
docker stop hello-app

# 启动已停止的容器
docker start hello-app

# 删除容器（需先停止）
docker rm hello-app
```

### 6. 发布镜像到Docker Hub
首先，登录到Docker Hub：

```bash
docker login
```

为镜像添加标签（使用你的Docker Hub用户名）：

```bash
docker tag hello-docker your-username/hello-docker:1.0
```

推送镜像到Docker Hub：

```bash
docker push your-username/hello-docker:1.0
```

现在，任何人都可以通过以下命令拉取并运行你的镜像：

```bash
docker pull your-username/hello-docker:1.0
docker run -d -p 3000:3000 --name hello-docker your-username/hello-docker:1.0
```

这个简单的例子展示了Docker的基本工作流程：编写应用 → 创建Dockerfile → 构建镜像 → 运行容器 → 发布镜像。接下来，我们将探索更复杂的应用场景。

## 综合案例:多个容器如何组合使用
假设你正在开发一个todolist 应用：前端使用 **Vue3**，后端使用 **Node.js 的 Nitro 框架**，数据库使用 **MySQL**，通过 **Prisma** 进行数据库操作。我们将通过 Docker 构建和运行这个全栈应用.

### 项目结构
项目目录如下：

```plain
todolist-app/
├── packages/
│   ├── app/                # 前端 Vue3 应用
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── TodoApp.vue
│   │   ├── package.json
│   │   ├── Dockerfile
│   ├── server/            # 后端 Nitro 应用
│   │   ├── app/
│   │   │   ├── prisma/
│   │   │   │   ├── schema.prisma
│   │   │   ├── routes/
│   │   │   │   ├── todos.ts
│   │   │   │   ├── todos/
│   │   │   │   │   ├── [id].ts
│   │   ├── package.json
│   │   ├── Dockerfile
├── docker-compose.yml
```

### 数据库：MySQL
#### 单独部署MySQL数据库
首先，让我们拉取MySQL官方镜像并创建一个独立的容器：

```bash
#### 创建docker网络
docker network create todolist-network

# 拉取MySQL镜像
docker pull mysql:8

```

#### 创建MySQL容器
docker run --name todolist-db -d --network todolist-network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=todolist -p 3306:3306 -v todolist-db-data:/var/lib/mysql mysql:8

这个命令的参数说明：

+ `--name todolist-db`：容器名称
+ `-d`：后台运行
+ `--network todolist-network` 指定容器之间的通信网络
+ `-e MYSQL_ROOT_PASSWORD=root`：设置root用户密码
+ `-e MYSQL_DATABASE=todolist`：自动创建数据库
+ `-p 3306:3306`：将容器的3306端口映射到主机
+ `-v todolist-db-data:/var/lib/mysql`：创建数据卷，确保数据持久化

数据库容器创建之后我们可以使用dbeaver等数据库管理工具登录查看数据

### 后端：Nitro + Prisma + MySQL
#### 1. 配置Prisma连接到MySQL
```plain
# packages/server/app/prisma/.env
DATABASE_URL="mysql://root:root@localhost:3306/todolist"
```

#### 2.创建Prisma 模型
在 `packages/server/app/prisma/schema.prisma` 中定义Todo模型：

```plain
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("todos")
}
```

#### 3.Nitro 实现后端API
在 `packages/server/app/routes` 目录中实现了Todo应用的RESTful API：

+ `todos.ts`：处理集合级别的操作
    - `GET /api/todos`：获取所有Todo列表，按创建时间降序排序
    - `POST /api/todos`：创建新的Todo项目，要求提供title字段
+ `todos/[id].ts`：处理单个资源的操作
    - `GET /api/todos/:id`：获取指定ID的Todo详情
    - `PUT /api/todos/:id`：更新指定Todo的标题或完成状态
    - `DELETE /api/todos/:id`：删除指定的Todo项目

#### 4.编写后端 Dockerfile
```dockerfile
FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY app/prisma ./app/prisma

RUN pnpm install

COPY . .

RUN pnpm run generate-prisma

EXPOSE 3001

CMD ["npx", "nitro", "dev", "--host", "--port", "3001"]
```

#### 5.构建后端镜像并运行容器
```bash
# 构建后端镜像
docker build -t todolist-server ./packages/server

# 运行后端容器
docker run --name todolist-server -d --network todolist-network -p 3001:3001 -v ./packages/server:/app todolist-server

# 进入容器执行Prisma迁移
docker exec -it todolist-server sh -c "npx prisma db push --schema=./app/prisma/schema.prisma"
```

### 前端：Vue3
#### 1.Vue3 前端应用
一个简单的Todo列表界面，使用Vue3框架构建，通过API与后端交互。

![](https://cdn.nlark.com/yuque/0/2025/png/2192012/1748950164011-de9696f5-018c-49cf-be73-6376ea148008.png)

#### 2.编写Dockerfile
```dockerfile
FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"] 
```

3. **构建前端镜像并启动容器**

```bash
# 构建前端镜像
docker build -t todolist-app ./packages/app

# 运行前端容器
docker run --name todolist-app -d --network todolist-network -p 5173:5173 -v ./packages/app:/app todolist-app
```

-v参数的作用是：  
实现容器和主机之间的数据共享,支持开发时的热更新,格式为：-v 主机路径:容器路径 或 -v 卷名:容器路径

至此，已经单独部署了三个容器：

1. `todolist-db` - MySQL数据库
2. `todolist-server` - Node.js后端API
3. `todolist-app` - Vue3前端应用

虽然这种方式可行，但存在几个明显的问题：

+ 需要手动管理多个容器
+ 容器之间的通信需要手动配置
+ 启动顺序需要人工控制（数据库→后端→前端）

这正是Docker Compose能够解决的问题，下面学习如何使用它。

### Docker Compose 简介
Docker Compose 是一个工具，用于定义和运行多容器Docker应用。使用YAML文件配置应用的服务，然后通过一个命令，就可以创建并启动所有服务。

比如这个todolist应用，需要三个容器：数据库容器，后端容器，前端容器（提供用户界面）没有Docker Compose时，需要手动启动每个容器、设置网络连接、确保它们按正确顺序启动。有了Docker Compose，只需一个`docker-compose up`命令，三个容器就会按照配置自动启动并相互连接。

### Docker Compose 编排
在 `docker-compose.yml` 中整合前端、后端和数据库：

```yaml
version: '3'

services:
  # 数据库服务
  db:
    image: mysql:8
    container_name: todolist-db
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: todolist
    ports:
      - "3306:3306"
    volumes:
      - db-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p$$MYSQL_ROOT_PASSWORD"]
      interval: 5s
      timeout: 5s
      retries: 20

  # 后端服务
  server:
    image: todolist-server
    build: 
      context: ./packages/server
    container_name: todolist-server
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=mysql://root:root@db:3306/todolist
    volumes:
      - ./packages/server:/app
      - /app/node_modules
    depends_on:
      db:
        condition: service_healthy
    command: >
      sh -c "
        pnpm run generate-prisma &&
        npx prisma db push --schema=./app/prisma/schema.prisma &&
        npx nitro dev --host --port 3001
      "

  # 前端服务
  app:
    image: todolist-app
    build:
      context: ./packages/app
    container_name: todolist-app
    ports:
      - "5173:5173"
    volumes:
      - ./packages/app:/app
      - /app/node_modules
    depends_on:
      - server
    command: ["pnpm", "run", "dev", "--host"]

volumes:
  db-data:

networks:
  default:
    name: todolist-network
    external: true 
```

### 运行应用
1. 运行 Docker Compose：

```bash
docker-compose up -d
```

2. 初始化 Prisma 数据库：

```bash
docker-compose exec backend npx prisma migrate dev --name init
```

3. 访问 `http://localhost:5173`，即可看到todolist应用

### 构建镜像
```bash
docker-compose build
```

## 容器数据卷
容器是临时的，停止并删除后，其内部数据会丢失。数据卷就像一个"外部保险箱"，将数据存储在主机上，确保持久化。  
类比：容器内的存储就像浏览器的sessionStorage，关闭页面（停止容器）后数据就会消失；而数据卷就像localStorage，即使关闭浏览器（删除容器）数据依然保存在本地。  
在上面的 `docker-compose.yml` 中，`db-data:/var/lib/mysql` 是一个数据卷，将 MySQL 数据存储在主机，防止容器删除后数据丢失。  
**示例命令**：

```bash
docker run -d -v my-data:/var/lib/mysql mysql:8
```

使用 `docker volume ls` 查看主机上的数据卷，`docker volume rm <volume_name>` 删除无用卷.

## Docker网络原理
Docker容器通过虚拟网络相互通信，类似于一个小型局域网：

+ 基本原理：每个容器就像一台独立电脑，通过Docker创建的网络相互连接
+ 桥接网络：默认网络类型，允许容器间互相通信
+ 容器通信：容器可以通过服务名直接访问其他容器（如db、server）
+ 端口映射：-p 5173:5173将宿主机端口连接到容器端口，让外部可以访问容器服务
+ 实际应用：前端容器可通过server:3001访问后端API，后端容器可通过db:3306访问数据库  
Docker Compose会自动创建这些网络连接，无需手动配置IP地址。  
用 `docker network ls` 查看网络列表，`docker network inspect <network_name>` 检查网络配置.

## Docker Compose & Kubernetes
### 什么是Kubernetes？
Kubernetes（常简称为K8s）是一个开源的容器编排平台，由Google开发并在2014年开源。它的名字源自希腊语，意为"舵手"或"飞行员"，正如其名，Kubernetes的主要目标是自动化容器化应用的部署、扩展和管理。如果说Docker让我们能够标准化地打包和运行单个应用，那么Kubernetes则让我们能够协调和管理成百上千个容器化应用，特别是在大规模生产环境中。

Kubernetes提供了许多核心功能：

+ **自动扩展**：根据流量或资源使用情况自动增加或减少容器实例数量
+ **自我修复**：自动替换失败的容器，重启不健康的容器
+ **负载均衡**：自动分发网络流量，确保应用稳定运行
+ **滚动更新**：逐步更新应用，无需停机
+ **存储编排**：自动挂载存储系统，如本地存储、公共云提供商等

### Docker Compose vs Kubernetes
+ **Docker Compose**：适合本地开发和小型部署，管理多容器应用。  
类比：像一个小型活动策划者，协调几个容器（如前端、后端、数据库）.  
示例：上面的 `docker-compose.yml` 管理了任务管理应用的三个服务，自动处理网络和依赖.
+ **Kubernetes**：适合大规模生产环境，管理容器集群.  
类比：像一个大型物流公司，调度数百个集装箱（容器），提供自动扩展、负载均衡和故障恢复.

Kubernetes 需要额外安装（如 Minikube），初学者可以先掌握 Docker Compose.

## 常见问题与解决方案
1. **磁盘空间不足**：用 `docker system prune` 清理未使用的容器、镜像和网络.
2. **端口冲突**：检查主机端口（5173、3000）是否被占用，可更改映射端口（如 `-p 5174:5173`）.
3. **数据库连接失败**：确保 `DATABASE_URL` 正确，MySQL 容器已启动（`docker ps` 检查）.
4. **Prisma 迁移失败**：检查 MySQL 容器状态和 `schema.prisma` 配置.

遇到问题时，先用 `docker logs <container_id>` 查看日志，定位错误原因.

## 最佳实践与误区
1. **最佳实践**：
    - 使用轻量镜像（如 `node:18-alpine`）减少资源占用.
    - 在 Dockerfile 中清理临时文件（如缓存），优化镜像大小.
    - 使用 `.dockerignore` 忽略不必要的文件（如 `node_modules`）.
    - 为生产环境构建多阶段 Dockerfile：

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist .
CMD ["node", "index.js"]
```

为什么分阶段构建Dockerfile，在多阶段Dockerfile中，最终生成的镜像只包含最后一个阶段的内容，这样能够大大减少镜像的体积

2. **常见误区**：
    - 误区：认为容器是永久存储。不使用数据卷会导致数据丢失.
    - 误区：直接在生产环境使用开发镜像。生产环境需优化镜像并设置资源限制（如 `docker run --memory="512m"`）.

Docker容器是临时性的，容器内的文件系统是非持久化的。当容器被删除时（例如使用docker rm命令），容器内部存储的所有数据也会被删除，应该使用Docker的数据卷（Volumes）来持久化存储重要数据

因为开发镜像通常包含调试工具、完整源代码和其他在生产环境中不必要的组件，这会导致镜像体积过大、存在潜在安全风险，并且资源使用效率低下

## 总结
Docker 像现代物流的"集装箱革命"，通过标准化的镜像和容器技术彻底变革了软件交付流程。它的核心优势在于环境一致性（消除"在我机器上能运行"的问题）、资源高效利用（比虚拟机更轻量）、快速部署能力（秒级启动容器）以及良好的隔离性（应用互不干扰）。从开发、测试到生产环境，Docker确保应用在任何地方都以相同方式运行，大幅降低了环境配置成本和部署风险。无论是单体应用还是复杂的分布式系统，Docker都简化了应用的构建、打包和部署流程，成为现代DevOps实践和云原生架构的重要基石。

