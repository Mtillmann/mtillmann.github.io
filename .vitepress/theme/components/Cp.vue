<script setup>
import copyToClipboard from "../copyToClipboard";
import { ref, onMounted } from "vue";

const btn = ref(null);
const codeElement = ref(null);


const props = defineProps({
    position: {
        // start, end, auto
        type: String,
        default: 'auto'
    },
    code: {
        // before, after, auto
        type: String,
        default: 'auto'
    }
});

onMounted(() => {


    const elementBefore = btn.value.previousElementSibling?.tagName === 'CODE' ? btn.value.previousElementSibling : null;
    const elementAfter = btn.value.nextElementSibling?.tagName === 'CODE' ? btn.value.nextElementSibling : null;

    if (props.code === 'auto') {
        codeElement.value = elementBefore || elementAfter;
    } else if (props.code === 'before') {
        codeElement.value = elementBefore;
    } else if (props.code === 'after') {
        codeElement.value = elementAfter;
    }

    if (!codeElement.value) {
        return;
    }

    let insertPosition = 'beforeend';

    if (props.position === 'auto') {
        if (elementBefore) {
            insertPosition = 'beforeend';
        } else if (elementAfter) {
            insertPosition = 'afterbegin';
        }
    } else if (props.position === 'start') {
        insertPosition = 'afterbegin';
    } else if (props.position === 'end') {
        insertPosition = 'beforeend';
    }

    const text = codeElement.value.innerText;
    codeElement.value.innerText = '';
    codeElement.value.insertAdjacentHTML('beforeend', `<span>${text}</span>`);




    codeElement.value.insertAdjacentElement(insertPosition, btn.value);
    btn.value.classList.add('copy-btn', `copy-btn-${insertPosition}`);
});

async function copy() {
    await copyToClipboard(codeElement.value.querySelector('span').innerText);
    btn.value.classList.add('copied');
    setTimeout(() => {
        btn.value.classList.remove('copied');
    }, 1000);
}

</script>
<template>
    <span ref="btn" @click="copy"></span>
</template>
<style scoped>
.copy-btn {
    position: relative;
    vertical-align: middle;
    border: 1px solid var(--vp-code-copy-code-border-color);
    border-radius: 4px;
    display: inline-block;
    width: 18px;
    height: 18px;
    background-color: var(--vp-code-copy-code-bg);

    cursor: pointer;
    background-image: var(--vp-icon-copy);
    background-position: 50%;
    background-size: 20px;
    background-repeat: no-repeat;

    &.copy-btn-beforeend {
        margin-left: 5px;
    }

    &.copy-btn-afterbegin {
        margin-right: 5px;
    }

    &.copied::after {
        content: "copied";
        position: absolute;
        top: 0;
        left:50%;
        color:var(--vp-c-text-1);
        opacity:0;
        animation: notify 1s ease-out;
    }
}

@keyframes notify {
    0% {
        opacity: 0;
        transform:translate(-50%, -100%);
    }

    50% {
        opacity: 1;
        transform:translate(-50%, -150%);
    }

    100% {
        opacity: 0;
        transform:translate(-50%, -200%);
    }
}
</style>