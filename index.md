---
page: true
title: home
aside: false
---

<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(0,10)
</script>
<h1>Latest Posts</h1>
<Page :posts="posts" :pageCurrent="1" :pagesNum="2" />