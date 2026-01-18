<template>
  <div>
    <div v-if="error" class="text-red-600">Failed to load gallery.</div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(img, idx) in images"
          :key="img + idx"
          class="overflow-hidden rounded shadow-sm bg-gray-50"
        >
          <NuxtImg
            :src="img"
            :alt="`Gallery image ${idx + 1}`"
            class="w-full h-full object-contain"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/gallery')

const images = computed(() => {
  if (!data.value) return []
  // Flatten all gallery subfolders into a single array
  return data.value.flatMap((g: any) => g.images ?? [])
})
</script>
