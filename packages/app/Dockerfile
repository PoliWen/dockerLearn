FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
RUN pnpm install

COPY . .

EXPOSE 5173

# 添加--host参数使得容器外可访问
CMD ["pnpm", "run", "dev", "--host"] 