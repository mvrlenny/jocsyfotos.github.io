<script setup lang="ts">
import { withTrailingSlash } from "ufo";
import type { Story } from "~/types/story";

const props = defineProps({
  path: {
    type: String,
    default: "stories",
  },
});

const { data: _stories } = await useAsyncData<Story[]>(
  "stories",
  async () => {
    const raw = await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find();
    return (raw as any[]).filter((s): s is Story => typeof s?._path === 'string' && typeof s?.title === 'string');
  }
);

const stories = computed(() => _stories.value || []);
</script>

<template>
  <div
    v-if="stories?.length"
    class="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    <StoryListItem v-for="story in stories" :key="story._path" :story="story" />
    
  </div>
  <div v-else>
    <p class="">No Stories found.</p>
  </div>
</template>
