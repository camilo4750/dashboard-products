<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { Product } from '../types/Product'
import SkeletonProduct from '../components/SkeletonProduct.vue'
import CardProduct from '../components/CardProduct.vue'

const categories = ref<string[]>([])
const selectedCategory = ref<string | null>(null)

const products = ref<Product[]>([])
const loading = ref<boolean>(true)
const total = ref<number>(0)

const currentPage = ref<number>(0)
const pageSize = ref<number>(10)

const fetchCategories = async (): Promise<void> => {
  try {
    const { data } = await axios.get<string[]>('https://dummyjson.com/products/category-list')
    categories.value = data
  } catch (e: unknown) {
    console.error(e)
  }
}

const fetchProducts = async (): Promise<void> => {
  loading.value = true
  try {
    const skip = currentPage.value
    const limit = pageSize.value
    const category = selectedCategory.value

    let url: string
    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    }

    const { data } = await axios.get<{ products: Product[]; total: number }>(url)
    products.value = data.products
    total.value = data.total
  } catch (e: unknown) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

watch([selectedCategory], () => {
  currentPage.value = 0
  fetchProducts()
})

const onPage = (event: { first: number; rows: number }) => {
  currentPage.value = event.first
  pageSize.value = event.rows
  fetchProducts()
}

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <Select
        v-model="selectedCategory"
        :options="categories"
        placeholder="Todas las categorías"
        showClear
        class="sm:w-60"
      />
    </div>
    <div v-if="loading">
      <div class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
        <SkeletonProduct :quantity="10" />
      </div>
    </div> 
    <template v-else>
      <div v-if="!products.length" class="py-12 text-center text-neutral-500">
        No hay productos en esta categoría.
      </div>
      <template v-else>
        <div class="grid grid-cols-5 gap-6">
          <CardProduct 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
            class="h-full flex flex-col" 
          />
        </div>

        <div class="flex justify-end mt-6">
          <Paginator
            v-model:first="currentPage"
            :rows="pageSize"
            :total-records="total"
            :rows-per-page-options="[10, 20, 30]"
            @page="onPage"
          />
        </div>
      </template>
    </template>
  </div>
</template>