import { PrismaClient } from '@prisma/client'

/**
 * Prisma client instance with database URL
 */
const prisma = new PrismaClient({
  datasources: {
    db: {
      url:'mysql://root:root@todolist-db:3306/todolist',
    },
  },
})

export default prisma
