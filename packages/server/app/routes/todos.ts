import prisma from '../prisma'

// 获取所有Todo
export default defineEventHandler(async (event) => {
  const method = event.method
  console.log(`Handling ${method} request to /todos`)
  
  // 获取所有Todo
  if (method === 'GET') {
    try {
      console.log('Fetching todos from database...')
      const todos = await prisma.todo.findMany({
        orderBy: { createdAt: 'desc' }
      })
      console.log('Fetched todos:', todos)
      return todos
    } catch (error) {
      console.error('获取Todo时发生错误:', error)
      return { 
        error: '获取Todo失败',
        details: error instanceof Error ? error.message : String(error)
      }
    }
  }
  
  // 创建新Todo
  if (method === 'POST') {
    try {
      const body = await readBody(event)
      console.log('Creating new todo:', body)
      if (!body.title) {
        return { error: 'Title是必填项' }
      }
      
      const todo = await prisma.todo.create({
        data: {
          title: body.title,
          completed: body.completed || false
        }
      })
      console.log('Created todo:', todo)
      return todo
    } catch (error) {
      console.error('创建Todo时发生错误:', error)
      return { 
        error: '创建Todo失败',
        details: error instanceof Error ? error.message : String(error)
      }
    }
  }
}) 