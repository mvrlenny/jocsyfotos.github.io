<script setup lang="ts">
import { withTrailingSlash } from "ufo";
import type { Gallery } from "~/types/gallery";

const props = defineProps({
  path: {
    type: String,
    default: "galleries",
  },
});

const { data: _galleries } = await useAsyncData<Gallery[]>(
  "galleries",
  async () => {
    const raw = await queryContent(withTrailingSlash(props.path)).find();
    return (raw as any[]).filter((g): g is Gallery => typeof g?._path === 'string' && typeof g?.title === 'string');
  }
);

const galleries = computed(() => _galleries.value || [])

</script>

<template>
  <div v-if="galleries?.length" class="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <GalleryListItem
        v-for="(gallery, index) in galleries"
        :key="index"
        :gallery="gallery"
      />
    </div>
    <div v-else>
      <p class="">
        No galleries found.
      </p>
    </div>
</template>
