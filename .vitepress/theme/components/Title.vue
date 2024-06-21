<template>
    <h1 class="title" style="padding-top:0;">
        <template v-if="!!slots.default">
            <slot />
        </template>
        <template v-else>
            {{ page.title }}
        </template>
    </h1>
    <div style="margin-top: 4px; margin-bottom:0px">
        <small>
            <span v-if="date">Posted on
                <span>{{ date }}</span>
            </span>
            <span v-if="updated"> (updated on
                <span>{{ updated }}</span>)
            </span>

            <span v-if="page.frontmatter.tags?.length > 0">

                in
                <span v-for="(item, index) in page.frontmatter.tags">
                    <a :href="withBase(`/pages/tags.html?tag=${item}`)">{{ item }}</a>
                    <template v-if="index < page.frontmatter.tags.length - 1">, </template> 
                </span> 
            </span>
        </small>
    </div>
    
</template>
<script setup>
import { useSlots, ref, onBeforeMount } from 'vue';
import { useData, withBase } from 'vitepress';
const slots = useSlots();
const { page } = useData();

const date = ref(null);
const updated = ref(null);

onBeforeMount(() => {
    if (page.value.frontmatter.date) {
        date.value = new Date(page.value.frontmatter.date).toLocaleDateString();
    }
    if (page.value.frontmatter.lastUpdated) {
        updated.value = new Date(page.value.frontmatter.lastUpdated).toLocaleDateString();
    }
});

</script>