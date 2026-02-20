import type { RouteRecordRaw } from 'vue-router'

export const productRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'products',
    component: () => import('../pages/Products.vue'),
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('../pages/Product.vue'),
  },
]