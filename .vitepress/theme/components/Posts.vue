<template>
    <h4 v-if="headline && posts.length > 0" class="tag-header">{{ headline }}</h4>
    <a :href="withBase(article.regularPath)" v-for="(article, index) in posts" :key="index" class="posts">
        <div class="post-container">
            <div class="post-dot"></div>
            {{ article.frontMatter.title }}
        </div>
        <div class="date">{{ new Date(article.frontMatter.date).toLocaleDateString() }}</div>
    </a>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const props = defineProps({
    tag: {
        type: String,
        default: () => null
    },
    headline: {
        type: String,
        default: () => null
    }
})
const { theme } = useData()

const posts = computed(() => {
    return theme.value.posts.filter(post => {
        return post.frontMatter?.tags?.includes(props.tag)
    })
})

</script>