<template>
  <div id="app" class="h-dvh w-full overflow-hidden flex flex-col font-sans">
    <header class="shrink-0 bg-[#1a1a2e] text-white px-8 py-4">
      <h1 class="text-xl">Dashboard Products</h1>
    </header>
    <main class="flex-1 p-8 bg-gray-300 overflow-y-auto overflow-x-hidden">
      <router-view />
    </main>
  </div>  
</template>

<script setup lang="ts">
</script>
