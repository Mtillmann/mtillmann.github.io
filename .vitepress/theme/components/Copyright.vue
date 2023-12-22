<template>
    <div class="site-footer">

        <span xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">
            <a property="dct:title" rel="cc:attributionURL" href="https://mtillmann.blog">{{ title }}</a>
            by
            <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/Mtillmann">Martin
                Tillmann</a>

            is licensed under

            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank"
                rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0
                <img width="12" height="12" alt="cc icon" src="/cc-icons/cc.svg?ref=chooser-v1"><img width="12" height="12" alt="by icon"  src="/cc-icons/by.svg?ref=chooser-v1"><img
                    alt="nc icon"  src="/cc-icons/nc.svg?ref=chooser-v1"><img width="12" height="12" alt="sa icon" src="/cc-icons/sa.svg?ref=chooser-v1"></a>
        </span>
        
         &mdash; <a :href="withBase('/pages/imprint.html')">Imprint</a>
    </div>
</template>
<script lang="ts" setup>
import { useData, withBase } from 'vitepress'

const { site, theme } = useData()
const url = theme.value.website
const title = site.value.title

</script>

<style>
.site-footer {
    color: #888;
    text-align: center;
    font-size: 0.66rem;
    width: 100%;
    padding: 15px 0;
    overflow: auto;

    & a {
        color: var(--vp-c-text-1) !important;
        font-weight: 700;

        & img {
            display: initial;
            height:12px!important;
            margin-left:3px;
            vertical-align:text-bottom;
        }
    }
}
</style>
