## 引言
你是否曾为应用程序的部署和环境配置而头疼？是否经常在本地开发时运行得好好的程序，到了测试环境却报错，测试环境没问题，部署到生产环境又出故障。你可能还遇到过这样的情景：按照冗长的配置文档一步步操作，却卡在某个步骤，耗费一整天甚至更久也无法解决。Docker 应运而生，完美解决这些问题！  
就像 Docker 的 logo——一只背着集装箱的小鲸鱼，Docker 将你的应用程序及其运行所需的完整环境（包括代码、依赖库、运行时和配置）打包成一个个标准化的"集装箱"（容器）。这只小鲸鱼可以轻松把集装箱运送到任何需要的地方(开发者的电脑、测试服务器、生产环境)，打开后，应用立刻运行，无需担心环境差异。就像物流行业的集装箱革命，Docker 通过标准化和自动化，让软件部署变得高效、简单，可靠。

## 什么是Docker？
Docker 是一个开源的容器化平台，用于构建、运行和分享应用程序。通过虚拟化**容器**技术实现<font style="color:rgb(64, 64, 64);">将应用程序及其依赖项（代码、依赖库，运行时、配置等）打包为一个标准化、轻量级、可移植的容器中</font>。达到在任何不同服务器中<font style="color:rgb(64, 64, 64);">快速构建、部署和运行应用程序的目的。</font>Docker 的核心价值在于它让应用与底层操作系统解耦，确保"一次打包，处处运行"。

### 解决的问题：环境一致性
以一个实际场景为例：你的团队开发了一个任务管理应用，前端使用 Vue3，后端使用 Node.js 的 Nitro 框架，数据库使用 MySQL，通过 Prisma 管理数据库操作。在本地开发时，一切正常。但部署到测试服务器或生产服务器时，问题来了：MySQL 版本不匹配、Node.js 环境配置缺失，pnpm包管理器版本不一致，或者依赖库版本冲突。传统方式需要运维人员在每个环境手动安装和配置 MySQL、Node.js ，pnpm包管理器等，耗时且易出错。  
Docker 解决这个问题的方法是：将应用及其运行环境打包成一个 **Docker 镜像**，就像把所有食材和厨具装进一个集装箱。无论在测试环境还是生产环境，只需运行这个镜像，应用就能以完全一致的方式启动，免去繁琐的环境配置，彻底避免因环境差异导致的故障。

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
|-------|-------|-----------|
| **资源占用** | 高 | 低 |
| **启动时间** | 分钟级 | 秒级 |
| **隔离级别** | 完全隔离 | 进程级隔离 |
| **系统依赖** | 包含完整操作系统 | 共享主机内核 |
| **磁盘占用** | GB级（数十GB） | MB级（通常<1GB） |
| **应用部署** | 需配置完整环境 | "一次构建，到处运行" |
| **维护成本** | 高（需维护OS） | 低（只关注应用） |
| **适用场景** | 需要完整OS隔离的环境 | 微服务、DevOps、CI/CD |

## Docker的核心概念
要掌握 Docker，需了解以下三个基础概念：

1. **Docker 镜像（Image）**  
镜像是一个只读模板，包含应用程序及其依赖的快照。把它想象成一份详细的菜谱，记录了做一道菜（应用）所需的食材（依赖）和步骤（配置）。你可以根据菜谱反复做出相同的菜，但菜谱本身不会改变。  
示例：一个 Node.js应用程序镜像包含 Node.js 运行时和相关依赖。
2. **Docker 容器（Container）**  
容器是镜像的运行实例。基于同一份菜谱（镜像），你可以做出多盘菜（容器），每盘菜可以独立调整口味（配置）。容器之间相互隔离，互不干扰。  
示例：你可以用 Node.js 镜像运行多个容器，一个提供 API 服务，一个运行 Web 应用。
3. **Dockerfile**  
Dockerfile 是一个文本文件，包含构建镜像的指令。就像菜谱的书面版本，告诉 Docker："先安装 Node.js，再复制代码，最后运行启动命令。"  
示例：一个 Dockerfile 可以描述如何安装 Vue3 应用的依赖并启动开发服务器.

### Docker Hub：分享与获取镜像
Docker Hub 是一个公共镜像仓库，就像一个开源的菜谱分享平台。任何人都可以通过 `docker pull` 命令从 Docker Hub 下载现成的镜像（如 MySQL、Node.js），通过 `docker run` 命令将其实例化为容器。你也可以通过 Dockerfile 构建自己的镜像，用 `docker build` 命令生成，并通过 `docker push` 命令上传到 Docker Hub，供他人使用.  
类比理解：镜像像编程中的类，容器是类的实例化对象。你可以创建自己的类（镜像）分享给别人，也可以直接使用别人提供的类.

可以用以下图来表示他们之间的关系

![](https://cdn.nlark.com/yuque/0/2025/png/2192012/1748775518126-1e14d8be-a59b-4364-a1ba-45152795da60.png)

## Docker的安装
+ **macOS**：直接从 Docker 官网下载 Docker Desktop 并安装.
+ **Windows**：先安装 WSL2 和 Ubuntu 子系统，再安装 Docker Desktop.
+ **Linux**：通过包管理器安装 Docker（例如 `apt install docker.io`）.  
安装完成后，运行 `docker --version` 验证安装成功，输出类似 `Docker version 27.0.3`.

## 快速上手：Docker基本操作
让我们通过一个简单的Hello Docker应用来体验Docker的基本操作流程：

### 1. 创建一个简单的Node.js应用

首先，我们创建一个简单的Express应用。项目结构如下：

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

### 2. 创建Dockerfile

Dockerfile是构建Docker镜像的指令文件：

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
- 使用Node.js 18 Alpine版本作为基础镜像
- 在容器内创建/app工作目录
- 先复制package.json文件并安装依赖
- 再复制所有其他文件
- 暴露3000端口
- 使用npm start命令启动应用

同时，我们创建一个.dockerignore文件，排除不必要的文件：

```
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
```

**.dockerignore文件的作用**：
- 类似于.gitignore，它告诉Docker在构建过程中应该忽略哪些文件和目录
- 提高构建效率：排除node_modules等大型目录，加快COPY操作速度
- 减小镜像体积：避免将不必要的文件（如开发工具、日志、版本控制文件）打包到镜像中
- 提高安全性：防止敏感信息（如.env文件、密钥）被意外包含在镜像中
- 避免缓存失效：排除经常变化但对应用运行不重要的文件，提高Docker缓存利用率

在我们的例子中，排除node_modules是因为我们会在容器内重新安装依赖，而排除Dockerfile和.git等文件是因为它们对运行应用没有帮助，只会增加镜像大小。

### 3. 构建Docker镜像

在项目目录下运行以下命令构建镜像：

```bash
docker build -t hello-docker .
```
如果提示网络原因构建失败，可以先执行 docker pull node:18-alpine 将基础镜像拉取到本地之后在执行build命令

- `-t hello-docker`：为镜像指定名称和标签
- `.`：指定Dockerfile所在的当前目录

构建完成后，可以使用以下命令查看镜像：

```bash
docker images
```

### 4. 运行Docker容器

使用以下命令运行容器：

```bash
docker run -d -p 3000:3000 --name hello-app hello-docker
```

- `-d`：后台运行容器
- `-p 3000:3000`：将主机的3000端口映射到容器的3000端口
- `--name hello-app`：为容器指定名称
- `hello-docker`：使用的镜像名称

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
docker run -d -p 3000:3000 your-username/hello-docker:1.0
```

这个简单的例子展示了Docker的基本工作流程：编写应用 → 创建Dockerfile → 构建镜像 → 运行容器 → 发布镜像。接下来，我们将探索更复杂的应用场景。

## 构建自定义镜像
假设你正在开发一个任务 management 应用：前端使用 **Vue3**，后端使用 **Node.js 的 Nitro 框架**，数据库使用 **MySQL**，通过 **Prisma** 管理数据库操作。我们将通过 Docker 构建和运行这个全栈应用.

### 项目结构
项目目录如下：

```plain
my-task-app/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   ├── package.json
│   │   ├── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.vue
│   ├── package.json
│   ├── Dockerfile
├── docker-compose.yml
```

### 后端：Nitro + Prisma + MySQL
1. **Prisma 模型**  
在 `backend/prisma/schema.prisma` 中定义任务模型：

```plain
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

2. **Nitro 后端**  
在 `backend/src/index.ts` 中实现任务管理 API，增加错误处理：

```typescript
import { defineNitroConfig } from 'nitropack/config'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineNitroConfig({
  routes: {
    "/api/tasks": {
      get: async () => {
        try {
          return await prisma.task.findMany();
        } catch (error) {
          return { error: "Failed to fetch tasks" };
        }
      },
      post: async (event) => {
        try {
          const body = await readBody(event);
          if (!body.title) {
            return { error: "Title is required" };
          }
          return await prisma.task.create({
            data: {
              title: body.title,
              completed: body.completed || false,
            },
          });
        } catch (error) {
          return { error: "Failed to create task" };
        }
      },
    }
  }
});
```

3. **后端 Dockerfile**  
在 `backend/Dockerfile` 中：

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

类比：这个 Dockerfile 就像一份后端菜谱，告诉 Docker 如何准备 Nitro 服务：安装 Node.js（食材），复制代码（配料），生成 Prisma 客户端（预处理），启动服务（烹饪）.

4. **后端 package.json**  

```json
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "npx nitropack dev"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "nitropack": "^2.8.0"
  },
  "devDependencies": {
    "prisma": "^5.7.0"
  }
}
```

### 前端：Vue3
1. **Vue3 应用**  
在 `frontend/src/App.vue` 中实现任务列表页面，增加错误提示：

```vue
<template>
  <div>
    <h1>任务列表</h1>

    <input v-model="newTask" placeholder="输入新任务" @keyup.enter="addTask" />
    <p v-if="error" style="color: red">{{ error }}</p>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} - {{ task.completed ? "已完成" : "未完成" }}
      </li>

    </ul>

  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
const tasks = ref([]);
const newTask = ref("");
const error = ref("");

const fetchTasks = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/tasks");
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    tasks.value = data;
    error.value = "";
  } catch (err) {
    error.value = "无法加载任务列表";
  }
};

const addTask = async () => {
  if (!newTask.value) {
    error.value = "任务标题不能为空";
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask.value }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    newTask.value = "";
    error.value = "";
    await fetchTasks();
  } catch (err) {
    error.value = "添加任务失败";
  }
};

onMounted(fetchTasks);
</script>

```

2. **前端 Dockerfile**  
在 `frontend/Dockerfile` 中：

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

类比：前端 Dockerfile 像一份 Vue3 应用的菜谱，准备运行环境，安装依赖，启动 Vite 服务器.

3. **前端 package.json**  

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### 数据库：MySQL
数据库是我们全栈应用的第三个组件。让我们先单独运行MySQL容器，然后在后面的章节中，我们将学习如何使用Docker Compose将所有组件整合在一起。

#### 单独部署MySQL数据库
首先，让我们拉取MySQL官方镜像并创建一个独立的容器：

```bash
# 拉取MySQL镜像
docker pull mysql:8

# 创建MySQL容器
docker run --name task-db -d \
  -e MYSQL_ROOT_PASSWORD=example \
  -e MYSQL_DATABASE=tasks \
  -p 3306:3306 \
  -v task-db-data:/var/lib/mysql \
  mysql:8

# 检查容器是否正常运行
docker ps
```

这个命令的参数说明：
- `--name task-db`：容器名称，方便后续引用
- `-d`：后台运行
- `-e MYSQL_ROOT_PASSWORD=example`：设置root用户密码
- `-e MYSQL_DATABASE=tasks`：自动创建数据库
- `-p 3306:3306`：将容器的3306端口映射到主机
- `-v task-db-data:/var/lib/mysql`：创建数据卷，确保数据持久化

#### 连接到数据库
现在我们可以连接到运行中的MySQL容器：

```bash
# 使用MySQL客户端
docker exec -it task-db mysql -uroot -pexample

# 在MySQL客户端中验证数据库
mysql> SHOW DATABASES;
mysql> USE tasks;
mysql> EXIT;
```

#### 后端连接到MySQL
接下来，需要修改我们的后端应用以连接到这个MySQL容器。在`backend`目录中，创建或修改`.env`文件：

```
# backend/.env
DATABASE_URL=mysql://root:example@localhost:3306/tasks
```

然后运行后端容器，并确保它能连接到数据库：

```bash
# 构建后端镜像
docker build -t task-backend ./backend

# 运行后端容器
docker run --name task-backend -d \
  -p 3000:3000 \
  --env-file ./backend/.env \
  -v ./backend:/app \
  task-backend

# 进入容器执行Prisma迁移
docker exec -it task-backend sh -c "npx prisma migrate dev --name init"
```

#### 前端连接到后端API
最后，确保前端容器可以连接到后端API：

```bash
# 构建前端镜像
docker build -t task-frontend ./frontend

# 运行前端容器
docker run --name task-frontend -d \
  -p 5173:5173 \
  -v ./frontend:/app \
  task-frontend
```

至此，我们已经单独部署了三个容器：
1. `task-db` - MySQL数据库
2. `task-backend` - Node.js后端API
3. `task-frontend` - Vue3前端应用

虽然这种方式可行，但存在几个明显的问题：
- 需要手动管理多个容器
- 容器之间的通信需要手动配置
- 启动顺序需要人工控制（数据库→后端→前端）

这正是Docker Compose能够解决的问题，我们将在下一节中学习如何使用它。

### Docker Compose 简介
想象你正在准备一场晚宴，需要协调多道菜品同时上桌。如果每道菜都需要单独下厨令、单独记录烹饪步骤，会非常繁琐且容易出错。Docker Compose 就像一份完整的宴会菜单和流程表，让你只需一个指令，就能协调多个Docker容器（多道菜品）一起工作。

Docker Compose 是一个工具，用于定义和运行多容器Docker应用。使用YAML文件配置应用的服务，然后通过一个命令，就可以创建并启动所有服务。它解决了"我的应用需要数据库、后端API和前端界面，如何让它们协同工作"的问题。

比如我们的任务管理应用，需要三个容器：
- 数据库容器（存储数据）
- 后端容器（处理业务逻辑）
- 前端容器（提供用户界面）

没有Docker Compose时，你需要手动启动每个容器、设置网络连接、确保它们按正确顺序启动。有了Docker Compose，只需一个`docker-compose up`命令，三个容器就会按照配置自动启动并相互连接。

### Docker Compose 编排
在 `docker-compose.yml` 中整合前端、后端和数据库：

```yaml
version: '3'
services:
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
    depends_on:
      - backend
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://root:example@db:3306/tasks
    volumes:
      - ./backend:/app
    depends_on:
      - db
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: tasks
    volumes:
      - db-data:/var/lib/mysql
volumes:
  db-data:
```

Docker Compose 就好像一个宴会策划书，安排前端、后端、数据库三个"厨师"如何协作，指定端口、环境变量和依赖关系.

### 运行应用
1. 运行 Docker Compose：

```bash
docker-compose up -d
```

2. 初始化 Prisma 数据库：

```bash
docker-compose exec backend npx prisma migrate dev --name init
```

3. 访问 `http://localhost:5173`，即可看到任务管理页面，支持添加和查看任务.  
**初学者提示**：如果页面未加载，检查容器状态（`docker ps`），确保所有服务（frontend、backend、db）都在运行.

### 构建和推送镜像
1. 构建镜像：

```bash
docker-compose build
```

2. （可选）推送镜像到 Docker Hub：

```bash
docker tag my-task-app-frontend <your-dockerhub-username>/my-task-app-frontend
docker tag my-task-app-backend <your-dockerhub-username>/my-task-app-backend
docker push <your-dockerhub-username>/my-task-app-frontend
docker push <your-dockerhub-username>/my-task-app-backend
```

**初学者提示**：推送镜像前需登录 Docker Hub（`docker login`）并确保镜像名称唯一.

## 容器数据卷
容器是临时的，停止并删除后，其内部数据会丢失。数据卷就像一个"外部保险箱"，将数据存储在主机上，确保持久化。  
类比：容器内的存储就像浏览器的sessionStorage，关闭页面（停止容器）后数据就会消失；而数据卷就像localStorage，即使关闭浏览器（删除容器）数据依然保存在本地。 
在上面的 `docker-compose.yml` 中，`db-data:/var/lib/mysql` 是一个数据卷，将 MySQL 数据存储在主机，防止容器删除后数据丢失。  
**示例命令**：

```bash
docker run -d -v my-data:/var/lib/mysql mysql:8
```

**初学者提示**：使用 `docker volume ls` 查看主机上的数据卷，`docker volume rm <volume_name>` 删除无用卷.

## Docker网络原理
Docker 容器通过虚拟网络通信，就像公寓楼内的住户通过内部电话系统（Docker 网络）交流。默认使用**桥接网络**，容器之间通过服务名（如 `db`）访问，Docker Compose 自动创建网络并管理连接。  
类比：Docker网络就像一个微型互联网系统，其中每个容器就像一台独立的计算机。桥接网络类似于局域网路由器，允许容器之间互相通信；端口映射（如 `-p 5173:5173`）则像是设置端口转发规则，将外部网络的请求正确导向内部特定的服务。Docker的DNS服务则相当于内部域名解析系统，让容器可以通过名称而非IP地址相互访问。  
**示例**：在 `docker-compose.yml` 中，`frontend` 通过 `backend:3000` 访问后端 API，`backend` 通过 `db:3306` 访问 MySQL，全部由 Docker 网络自动解析。  
**初学者提示**：用 `docker network ls` 查看网络列表，`docker network inspect <network_name>` 检查网络配置.

## Docker Compose & Kubernetes

### 什么是Kubernetes？
Kubernetes（常简称为K8s）是一个开源的容器编排平台，由Google开发并在2014年开源。它的名字源自希腊语，意为"舵手"或"飞行员"，正如其名，Kubernetes的主要目标是自动化容器化应用的部署、扩展和管理。如果说Docker让我们能够标准化地打包和运行单个应用，那么Kubernetes则让我们能够协调和管理成百上千个容器化应用，特别是在大规模生产环境中。

Kubernetes提供了许多核心功能：
- **自动扩展**：根据流量或资源使用情况自动增加或减少容器实例数量
- **自我修复**：自动替换失败的容器，重启不健康的容器
- **负载均衡**：自动分发网络流量，确保应用稳定运行
- **滚动更新**：逐步更新应用，无需停机
- **存储编排**：自动挂载存储系统，如本地存储、公共云提供商等

### Docker Compose vs Kubernetes
+ **Docker Compose**：适合本地开发和小型部署，管理多容器应用。  
类比：像一个小型活动策划者，协调几个容器（如前端、后端、数据库）.  
示例：上面的 `docker-compose.yml` 管理了任务管理应用的三个服务，自动处理网络和依赖.
+ **Kubernetes**：适合大规模生产环境，管理容器集群.  
类比：像一个大型物流公司，调度数百个集装箱（容器），提供自动扩展、负载均衡和故障恢复.  

**初学者提示**：Kubernetes 需要额外安装（如 Minikube），建议先掌握 Docker Compose.

## 常见问题与解决方案
1. **磁盘空间不足**：用 `docker system prune` 清理未使用的容器、镜像和网络.
2. **端口冲突**：检查主机端口（5173、3000）是否被占用，可更改映射端口（如 `-p 5174:5173`）.
3. **数据库连接失败**：确保 `DATABASE_URL` 正确，MySQL 容器已启动（`docker ps` 检查）.
4. **Prisma 迁移失败**：检查 MySQL 容器状态和 `schema.prisma` 配置.  
**初学者提示**：遇到问题时，先用 `docker logs <container_id>` 查看日志，定位错误原因.

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

