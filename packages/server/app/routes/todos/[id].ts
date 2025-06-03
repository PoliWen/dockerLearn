import { PrismaClient } from '@prisma/client'

// 创建Prisma客户端实例
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const method = event.method
  
  if (isNaN(id)) {
    return { error: '无效的ID' }
  }
  
  // 更新Todo
  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      const todo = await prisma.todo.update({
        where: { id },
        data: {
          title: body.title,
          completed: body.completed
        }
      })
      return todo
    } catch (error) {
      return { error: '更新Todo失败' }
    }
  }
  
  // 删除Todo
  if (method === 'DELETE') {
    try {
      await prisma.todo.delete({
        where: { id }
      })
      return { success: true }
    } catch (error) {
      return { error: '删除Todo失败' }
    }
  }
  
  // 获取单个Todo
  if (method === 'GET') {
    try {
      const todo = await prisma.todo.findUnique({
        where: { id }
      })
      if (!todo) {
        return { error: 'Todo不存在' }
      }
      return todo
    } catch (error) {
      return { error: '获取Todo失败' }
    }
  }
}) 