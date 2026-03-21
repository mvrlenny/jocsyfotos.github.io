<template>
  <div class="not-prose">
    <div class="mx-auto max-w-2xl rounded-3xl ring-1 ring-zinc-200 dark:ring-zinc-50/5 lg:mx-0 lg:flex lg:max-w-none lg:items-stretch">

      <!-- Content section -->
      <section class="p-8 sm:p-10 lg:flex-auto">
        <!-- Title -->
        <h3 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200">{{ title }}</h3>

        <!-- Description -->
        <p v-if="description" class="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-500">
          {{ description }}
        </p>

        <!-- Features list -->
        <ul
          v-if="includedFeatures.length"
          role="list"
          class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
        >
          <li v-for="feature in includedFeatures" :key="feature" class="flex gap-x-2 items-center">
            <Icon name="heroicons:check" class="h-6 w-5 flex-none text-yellow-600" />
            <span>{{ feature }}</span>
          </li>
        </ul>
      </section>

      <!-- Price / Image section -->
      <aside class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-sm lg:flex-shrink-0">
        <div
          class="relative overflow-hidden rounded-2xl py-10 text-center ring-1 ring-inset ring-zinc-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 lg:h-full"
          :class="[image ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-zinc-100 dark:bg-zinc-800/30']"
        >
          <!-- Background image -->
          <div v-if="image" class="absolute inset-0 mix-blend-overlay">
            <img
              :src="image.src"
              :alt="image.alt || title"
              :width="image.width"
              :height="image.height"
              class="w-full h-full object-cover"
              onerror="this.onerror=null;this.src='/img/placeholder.jpg'"
            />
          </div>

          <!-- Price display -->
          <div class="mx-auto max-w-xs px-8 z-10">
            <p class="flex items-baseline justify-center gap-x-2">
              <span class="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"> {{ price }} </span>
              <span v-if="currency" class="text-sm font-semibold leading-6 tracking-wide text-zinc-800 dark:text-zinc-200">{{ currency }}</span>
            </p>
            <!-- Optional badge -->
            <p v-if="badge" class="mt-4 text-xs font-semibold text-white bg-yellow-600 rounded-full px-2 py-1 inline-block">
              {{ badge }}
            </p>
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Image } from "~/types/image";

interface Props {
  title: string;
  description?: string;
  includedFeatures: string[];
  price?: string; // <-- allow it to be optional
  currency?: string;
  image?: Image;
  badge?: string;
}

// Default values
withDefaults(defineProps<Props>(), {
  description: "",
  price: "N/A",   // <-- default here
  currency: "",
  badge: "",
});
</script>