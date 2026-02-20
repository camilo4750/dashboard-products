<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Product } from '../types/Product'
import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'
import CardProduct from '../components/CardProduct.vue'
import { Divider } from 'primevue'

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)
const loading = ref<boolean>(true)
const error = ref<boolean>(false)

const relatedProducts = ref<Product[]>([])
const loadingRelated = ref<boolean>(false)

const fetchRelated = async (category: string, currentId: number): Promise<void> => {
  loadingRelated.value = true
  try {
    const { data } = await axios.get<{ products: Product[] }>(
      `https://dummyjson.com/products/category/${category}?limit=5`
    )
    relatedProducts.value = data.products.filter((p) => p.id !== currentId).slice(0, 4)
  } catch (e: unknown) {
    console.error(e)
  } finally {
    loadingRelated.value = false
  }
}

const fetchProduct = async (id: number): Promise<void> => {
  loading.value = true
  try {
    const { data } = await axios.get<Product>(`https://dummyjson.com/products/${id}`)
    product.value = data
    await fetchRelated(data.category, data.id)
  } catch (e: unknown) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchProduct(Number(route.params.id))
})
</script>

<template>
  <div class="w-full">
    <Button
      icon="pi pi-arrow-left"
      label="Volver"
      variant="text"
      class="mb-6"
      @click="router.back()"
    />

    <div v-if="loading" class="flex gap-8">
      <Skeleton width="420px" height="420px" class="shrink-0 rounded-xl" />
      <div class="flex-1 flex flex-col gap-4 pt-2">
        <Skeleton width="60%" height="2rem" />
        <Skeleton width="30%" height="1.2rem" />
        <Skeleton width="20%" height="2rem" />
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="80%" height="1rem" />
        <div class="flex gap-6 mt-4">
          <Skeleton width="120px" height="1.2rem" />
          <Skeleton width="120px" height="1.2rem" />
        </div>
      </div>
    </div>

    <div v-else-if="error" class="py-20 text-center text-neutral-500">
      No se pudo cargar el producto.
    </div>

    <div v-else-if="product" class="flex flex-col md:flex-row gap-10">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full md:w-[420px] h-[320px] md:h-[420px] object-cover rounded-xl shrink-0 bg-white"
      />

      <div class="flex flex-col gap-4 flex-1">
        <div>
          <span class="text-sm font-medium text-neutral-400 uppercase tracking-wide">
            {{ product.category }}
          </span>
          <h2 class="text-3xl font-bold text-[#1a1a2e] mt-1">{{ product.title }}</h2>
        </div>

        <span class="text-3xl font-semibold text-[#1a1a2e]">${{ product.price }}</span>

        <p class="text-neutral-600 leading-relaxed">{{ product.description }}</p>

        <Button
          icon="pi pi-shopping-cart"
          label="Agregar al carrito"
          class="w-fit mt-2"
          :disabled="product.stock === 0"
        />

        <div class="flex gap-8 mt-2">
          <div class="flex flex-col">
            <span class="text-xs text-neutral-400 uppercase tracking-wide mb-1">Rating</span>
            <div class="flex items-center gap-2">
              <i class="pi pi-star-fill text-yellow-400" />
              <span class="font-semibold text-[#1a1a2e]">{{ product.rating }}</span>
            </div>
          </div>
          <div class="flex flex-col">
            <span class="text-xs text-neutral-400 uppercase tracking-wide mb-1">Stock</span>
            <span
              class="font-semibold"
              :class="product.stock > 0 ? 'text-green-600' : 'text-red-500'"
            >
              {{ product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <template v-if="!loading && !error">
      <Divider />
      <h3 class="text-xl font-semibold text-[#1a1a2e] mb-4">Productos relacionados</h3>

      <div v-if="loadingRelated" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <SkeletonProduct :quantity="5" />
      </div>

      <div v-else-if="relatedProducts.length" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <CardProduct
          v-for="related in relatedProducts"
          :key="related.id"
          :product="related"
        />
      </div>
    </template>
  </div>
</template>
