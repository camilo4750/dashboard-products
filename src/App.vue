<template>
  <div id="app" class="h-dvh w-full overflow-hidden flex flex-col font-sans">
    <header class="shrink-0 bg-[#1a1a2e] text-white px-8 py-4">
      <h1 class="text-xl">Dashboard Products</h1>
    </header>
    <div class="flex flex-1 overflow-hidden">
      <aside class="w-60 p-6 bg-neutral-100 border-r border-neutral-200 overflow-y-auto overflow-x-hidden shrink-0">
        <label class="block mb-2 font-medium text-sm text-black">Categoría</label>
        <Select
              class="text-black bg-white"
              v-model="selectedCategory"
              :options="categories"
              placeholder="Todas las categorías"
              showClear
              fluid
            />
      </aside>

      <main class="flex-1 p-8 bg-gray-300 overflow-y-auto overflow-x-hidden">
        <router-view />
      </main>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import axios from 'axios'

const categories = ref<string[]>([])
const selectedCategory = ref<string | null>(null)
provide('selectedCategory', selectedCategory)

const fetchCategories = async () => {
  try {
    const { data } = await axios.get<string[]>('https://dummyjson.com/products/category-list')
    categories.value = data
  } catch (e) {
    console.error(e)
  }
}

onMounted(fetchCategories)
</script>
