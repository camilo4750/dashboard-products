import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../Modules/Products/pages/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
