import { createRouter, createWebHistory } from 'vue-router'
import { productRoutes } from '../Modules/Products/router'

const router = createRouter({
  history: createWebHistory(),
  routes: [...productRoutes],
})

export default router