<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      <button
        v-for="(src, i) in imagesList"
        :key="i"
        @click="open(i)"
        class="relative aspect-square overflow-hidden rounded-md bg-zinc-100/50"
        type="button"
        aria-label="Open image"
      >
        <NuxtImg
          v-if="hasImage"
          :src="normalize(src)"
          :alt="`Image ${i + 1}`"
          class="w-full h-full object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          loading="lazy"
          placeholder="empty"
        />
        <img
          v-else
          :src="normalize(src)"
          :alt="`Image ${i + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </button>
    </div>

    <div v-if="opened !== null" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <button class="absolute top-4 right-4 text-white text-2xl" @click="close" aria-label="Close">✕</button>
      <div class="max-w-[95vw] max-h-[95vh]">
        <NuxtImg
          v-if="hasImage"
          :src="normalize(imagesList[opened])"
          class="max-w-full max-h-[90vh] object-contain"
          :alt="`Open image ${opened + 1}`"
        />
        <img
          v-else
          :src="normalize(imagesList[opened])"
          class="max-w-full max-h-[90vh] object-contain"
          :alt="`Open image ${opened + 1}`"
        />
      </div>
      <div class="absolute left-4 text-white">
        <button @click="prev" class="px-3 py-2">←</button>
      </div>
      <div class="absolute right-4 text-white">
        <button @click="next" class="px-3 py-2">→</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNuxtApp } from '#app'

const props = defineProps<{
  images?: Array<string | { src: string; alt?: string }>
  contentPath?: string
}>()

const nuxtApp = useNuxtApp()
const hasImage = Boolean(nuxtApp?.$image)

const opened = ref<number | null>(null)
const localImages = ref<Array<string | { src: string; alt?: string }>>([])

async function loadFromContent(path?: string) {
  if (!path) return
  try {
    // @ts-ignore - queryContent is provided by @nuxt/content if installed
    const items = await queryContent(path).find()
    const imgs = items.flatMap((it: any) => (it.images ?? []).map((i: any) => (typeof i === 'string' ? i : i.src || i)))
    localImages.value = imgs
  } catch (e) {
    localImages.value = []
  }
}

if (props.images && props.images.length) {
  localImages.value = props.images
} else if (props.contentPath) {
  await loadFromContent(props.contentPath)
} else {
  localImages.value = []
}

const imagesList = computed(() => localImages.value.map((i: any) => (typeof i === 'string' ? i : i?.src || '')))

function normalize(src: string) {
  if (!src) return ''
  return src.startsWith('/') ? src : `/${src}`
}

function open(i: number) {
  opened.value = i
}

function close() {
  opened.value = null
}

function next() {
  if (opened.value === null) return
  opened.value = (opened.value + 1) % imagesList.value.length
}

function prev() {
  if (opened.value === null) return
  opened.value = (opened.value - 1 + imagesList.value.length) % imagesList.value.length
}
</script>

<style scoped></style>
