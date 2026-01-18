<script setup lang="ts">
import type { PropType } from 'vue';
import type { Image } from "~/types/image";

type Story = {
  _path: string;
  title: string;
  description?: string;
  cover?: Image;
  date?: string;
  tags?: string[];
};

const props = defineProps({
  story: {
    type: Object as PropType<Story>,
    required: true,
    validator: (value: Story) =>{
      if (value?._path && value?.title) {
        return true;
      }
      return false;
    }
  },
});

// compute cover src (support string or object)
const coverSrcStory = computed(() => {
  // @ts-ignore
  const c: any = (props as any)?.story?.cover
  if (c && typeof c === 'object' && c.src) return c.src.startsWith('/') ? c.src : `/${c.src}`
  const imgs: any = (props as any)?.story?.images || []
  if (imgs.length) {
    const first = imgs[0]
    if (typeof first === 'string') return first.startsWith('/') ? first : `/${first}`
    if (first && first.src) return first.src.startsWith('/') ? first.src : `/${first.src}`
  }
  return '/img/placeholder.jpg'
})
</script>

<template>
  <NuxtLink :to="story._path" class="group">
    <div
      class="relative w-full overflow-hidden rounded-lg sm:aspect-[3/2] md:aspect-square lg:aspect-[2/3] dark:bg-zinc-800"
    >
      <NuxtImg
        :src="coverSrcStory"
        :alt="(story.cover && story.cover.alt) || story.title"
        :width="story.cover?.width || 2"
        :height="story.cover?.height || 3"
        class="h-full w-full object-cover object-center group-hover:opacity-75"
        sizes="sm:100vw md:50vw lg:30vw"
        loading="lazy"
        placeholder="empty"
        onerror="this.onerror=null;this.src='/img/placeholder.jpg'"
      />
    </div>
    <div
      class="mt-4 flex items-center justify-between text-base font-medium dark:text-zinc-300"
    >
      <h3>{{ story.title }}</h3>
    </div>
    <p v-if="story.date" class="mt-1 text-sm italic dark:text-zinc-500">
      {{ formatDate(story.date) }}
    </p>
  </NuxtLink>
</template>
