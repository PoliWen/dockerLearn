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