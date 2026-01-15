<script setup lang="ts">
import type { Image } from "~/types/image";

type Props = {
  images: Image[];
};

const props = defineProps<Props>();
</script>

<template>
  <div class="not-prose">
    <PhotoSwipe>
      <div>
        <MasonryWall :items="props.images" :ssr-columns="1" :column-width="300" :gap="32" class="grid grid-cols-2 lg:grid-cols-3 gap-8">
          <template #default="{ item }">
            <a class="photoswipe-item rounded-xl overflow-hidden block dark:bg-zinc-800 bg-zinc-200" :href="(item as any).src" data-cropped="true" :data-pswp-width="(item as any).width" :data-pswp-height="(item as any).height">
              <NuxtImg :src="(item as any).src" alt="Some image" sizes="sm:90vw md:50vw lg:30vw" class="w-full h-full object-cover object-center" :width="(item as any).width" :height="(item as any).height" loading="lazy" />
            </a>
          </template>
        </MasonryWall>
      </div>
    </PhotoSwipe>
  </div>
</template>
