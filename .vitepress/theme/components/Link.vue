<script setup>


const props = defineProps({
    href: {
        type: String
    },
    target: {
        type: String
    }
});

</script>
<template>
    <a :href="href" :target="target"><slot></slot></a>
        
</template>
