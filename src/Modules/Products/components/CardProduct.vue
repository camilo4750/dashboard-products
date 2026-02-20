<script setup lang="ts">
import type { Product } from '../types/Product'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

const router = useRouter()
</script>

<template>
  <Card class="h-full flex flex-col">
    <template #header>
      <img :src="props.product.thumbnail" :alt="props.product.title" class="w-full h-[200px] object-cover" />
    </template>
    <template #title>{{ props.product.title }}</template>
    <template #subtitle>{{ props.product.category }}</template>
    <template #content>
      <p class="text-sm text-neutral-500 mb-3 line-clamp-2">{{ props.product.description }}</p>
      <div class="flex items-center justify-between mt-1">
        <span class="text-xl font-semibold text-[#1a1a2e]">${{ props.product.price }}</span>
        <Button
          label="Ver detalle"
          size="small"
          variant="outlined"
          @click="router.push({ name: 'product-detail', params: { id: product.id } })"
        />
      </div>
    </template>
  </Card>
</template>