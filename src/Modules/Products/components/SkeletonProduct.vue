<script setup lang="ts">
const props = defineProps({
  quantity: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <Card v-for="i in props.quantity" :key="i">
    <template #content>
      <Skeleton width="100%" height="200px" class="mb-4" />
      <Skeleton width="80%" height="1.5rem" class="mb-2" />
      <Skeleton width="50%" height="1rem" class="mb-2" />
      <Skeleton width="40%" height="1.5rem" />
    </template>
  </Card>
</template>