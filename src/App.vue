<template>
  <div id="app" class="font-sans min-h-screen">
    <header class="bg-[#1a1a2e] text-white px-8 py-4">
      <h1 class="text-xl">Dashboard Products</h1>
    </header>
    <div class="flex min-h-[calc(100vh-56px)]">
      <aside class="w-60 p-6 bg-neutral-100 border-r border-neutral-200">
        <label class="block mb-2 font-medium text-sm">Categoría</label>
        <Select
          v-model="selectedCategory"
          :options="categories"
          placeholder="Todas las categorías"
          showClear
          fluid
        />
      </aside>
      <main class="flex-1 p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

const categories: string[] = [
  'Electronics',
  'Accessories',
  'Audio',
  'Photography',
  'Storage',
  'Networking',
  'Furniture',
  'Wearables',
  'Gaming',
  'Home',
  'Office'
]

const selectedCategory = ref<string | null>(null)
provide('selectedCategory', selectedCategory)
</script>
