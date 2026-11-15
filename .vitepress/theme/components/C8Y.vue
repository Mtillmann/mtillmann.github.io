<script setup lang="ts">
import { useSlots, computed } from 'vue'
import { useData } from 'vitepress'

const CLOUD_NAME = 'dwdy72yg0'
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`
const FULL_SIZE = 't_large2'
const DEFAULT_THUMBNAIL = 'c_fill,w_400,ar_3:2'
const AUTO = 'f_auto/q_auto'

const props = withDefaults(defineProps<{
  publicId: string
  thumbnail?: string
  link?: boolean
}>(), {
  thumbnail: DEFAULT_THUMBNAIL
})

const srcUrl = `${BASE_URL}/${props.thumbnail}/${AUTO}/${props.publicId}`
const hrefUrl = `${BASE_URL}/${FULL_SIZE}/${AUTO}/${props.publicId}`

const slots = useSlots()
const { page } = useData()

const caption = computed(() => slots.default?.().map(n => n.children).join('').trim() ?? '')
// Prepend the parent document's full post title, e.g. "The XX5X CPU Artwork Project — 775: wide lip, no tabs, small notch"
const alt = computed(() => {
  const title = page.value.frontmatter?.title ?? page.value.title ?? ''
  return [title, caption.value].filter(Boolean).join(' — ')
})



</script>

<template>
  <figure>
    <a v-if="link" target="_blank" :href="hrefUrl">
      <img :src="srcUrl" :alt="alt">
    </a>
    <img v-else :src="srcUrl" :alt="alt">
    <figcaption><slot /></figcaption>
  </figure>
</template>
