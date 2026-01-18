<script setup lang="ts">
import type { PropType } from 'vue';
import type { Image } from "~/types/image";
type Gallery = {
  _path: string;
  title: string;
  description?: string;
  cover?: Image;
  images?: Image[];
};

const props = defineProps({
  gallery: {
    type: Object as PropType<Gallery>,
    required: true,
    validator: (value: Gallery) => {
      if (value?._path && value.title) {
        return true;
      }
      return false;
    },
  },
});

const coverSrc = computed(() => {
  const c: any = (props as any)?.gallery?.cover
  // handle object { src } or string paths in gallery.images
  if (c && typeof c === 'object' && c.src) return c.src.startsWith('/') ? c.src : `/${c.src}`
  const imgs: any = (props as any)?.gallery?.images || []
  if (imgs.length) {
    const first = imgs[0]
    if (typeof first === 'string') return first.startsWith('/') ? first : `/${first}`
    if (first && first.src) return first.src.startsWith('/') ? first.src : `/${first.src}`
  }
  return '/img/placeholder.jpg'
})

function thumbSrc(thumbnail: any) {
  if (!thumbnail) return '/img/placeholder.jpg'
  if (typeof thumbnail === 'string') return thumbnail.startsWith('/') ? thumbnail : `/${thumbnail}`
  if (thumbnail.src) return thumbnail.src.startsWith('/') ? thumbnail.src : `/${thumbnail.src}`
  return '/img/placeholder.jpg'
}
</script>

<template>
  <NuxtLink :to="gallery._path" class="group">
    <div
      class="relative w-full overflow-hidden rounded-lg aspect-[3/2] md:aspect-[2/3] dark:bg-zinc-800"
    >
      <NuxtImg
        :src="coverSrc"
        :alt="(gallery.cover && gallery.cover.alt) || gallery.title"
        :width="gallery.cover?.width"
        :height="gallery.cover?.height"
        class="h-full w-full object-cover object-center group-hover:opacity-75"
        sizes="sm:100vw md:50vw lg:30vw"
        loading="lazy"
        placeholder="empty"
        onerror="this.onerror=null;this.src='/img/placeholder.jpg'"
      />
      <div class="absolute bottom-0 w-full p-4 grid grid-cols-4 gap-3" v-if="gallery?.images?.length">
        <div
          v-for="(thumbnail, index) in gallery.images.slice(0, 4)"
          :key="index"
          class="col-span-1 aspect-square w-full rounded-lg overflow-hidden group-hover:opacity-75 dark:bg-zinc-800"
        >
          <NuxtImg
            :src="thumbSrc(thumbnail)"
            :alt="(thumbnail && thumbnail.alt) || gallery.title"
            class="h-full w-full object-cover object-center"
            loading="lazy"
            sizes="sm:70px md:75px"
            placeholder
            onerror="this.onerror=null;this.src='/img/placeholder.jpg'"
          />
        </div>
      </div>
    </div>
    <div
      class="mt-4 flex items-center justify-between text-base font-medium dark:text-zinc-200"
    >
      <h3>{{ gallery.title }}</h3>
    </div>
  </NuxtLink>
</template>
