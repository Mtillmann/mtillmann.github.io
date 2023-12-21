<template>
    <div v-for="(article, index) in posts" :key="index" class="post-list">
        <div class="post-header">
            <div class="post-title">

                <a :href="withBase(article.regularPath)">

                    <small>{{ new Date(article.frontMatter.date).toLocaleDateString() }}</small><br>
                    {{ article.frontMatter.title }}</a>
            </div>
        </div>
        <p v-if="article.frontMatter.description" class="description" v-html="article.frontMatter.description"></p>
        <!--
        <div class='post-info'>
            <a v-for="item in article.frontMatter.tags" :href="withBase(`/pages/tags.html?tag=${item}`)"><span> {{ item }}</span></a>

        </div>
        -->
    </div>

    <div class="pagination" v-if="pagesNum > 1">
        <a class="link" :class="{ active: pageCurrent === i }" v-for="i in pagesNum" :key="i"
            :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)"><span>{{ i }}</span></a>
    </div>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
const props = defineProps({
    posts: Array,
    pageCurrent: Number,
    pagesNum: Number
})
</script>

<style scoped>
.post-list {
    padding: 14px 0 14px 0;

}

.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0.1rem 0;
}

.post-info {
    font-size: 12px;
}

/*
.post-info span {
    display: inline-block;
    padding: 0 8px;
    background-color: var(--vp-c-bg-alt);
    margin-right: 10px;
    transition: 0.4s;
    border-radius: 2px;
    color: var(--vp-c-text-1);
}
*/

.post-info a {
    display: inline-block;

    margin-right: 10px;

    span {
        min-width: 48px;
        text-align: center;
        padding: 2px 9px;
        display: inline-block;
        background-color: var(--vp-c-bg-alt);
        transition: 0.4s;

        border-radius: 2px;
        color: var(--vp-c-text-1);
    }

    &:hover span {
        color: var(--vp-c-brand-2);

    }
}

.description {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    margin: 10px 0;
    line-height: 1.5rem;
}

.pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
}

.link {
    display: inline-block;
    width: 24px;
    text-align: center;
    border: 1px var(--vp-c-divider-light) solid;
    border-right: none;
    font-weight: 400;
}

.link.active {
    background: var(--vp-c-text-1);
    color: var(--vp-c-neutral-inverse);
    border: 1px solid var(--vp-c-text-1) !important;
}

.link:first-child {
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
}

.link:last-child {
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    border-right: 1px var(--vp-c-divider-light) solid;
}

@media screen and (max-width: 768px) {
    .post-info a {
        display: none;
    }

    .post-list {
        padding: 14px 0 14px 0;
    }

    .post-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .post-title {
        font-size: 1.0625rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width: 17rem;
    }

    .description {
        font-size: 0.9375rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin: 0.5rem 0 1rem;
    }

    .pagination {
        .link {
            padding:12px 19px;
            width: auto;
        }
    }
}
</style>
