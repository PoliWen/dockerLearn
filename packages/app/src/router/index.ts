import { createRouter, createWebHistory } from 'vue-router'
import TodoApp from '~/pages/TodoApp.vue'

export const routes = [
  {
    path: '/',
    name: 'todo',
    component: TodoApp
  }
]

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

