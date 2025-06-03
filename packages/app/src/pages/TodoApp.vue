<template>
  <div class="todo-app">
    <h1>Todo 应用111</h1>
    
    <div class="add-todo">
      <n-input v-model:value="newTodo" placeholder="输入新任务..." @keyup.enter="addTodo" />
      <n-button type="primary" @click="addTodo">添加</n-button>
    </div>
    
    <div v-if="loading" class="loading">
      <n-spin size="medium" />
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <n-list v-else-if="todos.length > 0" bordered>
      <n-list-item v-for="todo in todos" :key="todo.id">
        <div class="todo-item">
          <n-checkbox :checked="todo.completed" @update:checked="updateTodoStatus(todo.id, $event)">
            <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
          </n-checkbox>
          <n-button type="error" size="small" @click="deleteTodo(todo.id)">删除</n-button>
        </div>
      </n-list-item>
    </n-list>
    
    <div v-else class="empty-list">
      暂无任务，请添加新任务
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()
const todos = ref([])
const newTodo = ref('')
const loading = ref(false)
const error = ref('')

// 获取所有Todo
const fetchTodos = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch('/api/todos')
    const data = await response.json()
    if (data.error) throw new Error(data.error)
    todos.value = data
  } catch (err) {
    error.value = '加载任务失败: ' + err.message
  } finally {
    loading.value = false
  }
}

// 添加新Todo
const addTodo = async () => {
  if (!newTodo.value.trim()) {
    message.warning('任务标题不能为空')
    return
  }
  
  loading.value = true
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo.value.trim() })
    })
    const data = await response.json()
    if (data.error) throw new Error(data.error)
    
    todos.value = [data, ...todos.value]
    newTodo.value = ''
    message.success('任务添加成功')
  } catch (err) {
    message.error('添加任务失败: ' + err.message)
  } finally {
    loading.value = false
  }
}

// 更新Todo状态
const updateTodoStatus = async (id, completed) => {
  const todo = todos.value.find(t => t.id === id)
  if (!todo) return
  
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: todo.title,
        completed 
      })
    })
    const data = await response.json()
    if (data.error) throw new Error(data.error)
    
    todo.completed = completed
    message.success('任务状态已更新')
  } catch (err) {
    message.error('更新任务失败: ' + err.message)
    // 回滚UI状态
    todo.completed = !completed
  }
}

// 删除Todo
const deleteTodo = async (id) => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    if (data.error) throw new Error(data.error)
    
    todos.value = todos.value.filter(todo => todo.id !== id)
    message.success('任务已删除')
  } catch (err) {
    message.error('删除任务失败: ' + err.message)
  }
}

onMounted(fetchTodos)
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.add-todo {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.loading, .error, .empty-list {
  text-align: center;
  margin: 20px 0;
}

.error {
  color: #f00;
}
</style> 