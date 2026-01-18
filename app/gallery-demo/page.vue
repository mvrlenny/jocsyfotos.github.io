<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-6">Demo Gallery (queryContent)</h1>
    <ThumbnailGallery contentPath="galleries" />
    <hr class="my-8" />
    <h2 class="text-xl font-medium mb-4">Static array example</h2>
    <ThumbnailGallery :images="staticImages" />
  </div>
</template>

<script setup lang="ts">
import ThumbnailGallery from '~/components/ThumbnailGallery.vue'

const staticImages = [
  '/img/galleries/gal1/afwjp6wytar25uidu64e.webp',
  '/img/galleries/gal1/ajlfdemaupqqsd4j8ccw.webp',
  '/img/galleries/gal1/aqe1lvyk7lykqunhefbo.webp'
]
</script>
