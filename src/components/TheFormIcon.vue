<script setup>
import {ref, onMounted} from 'vue'
import { Icon } from '@iconify/vue';
const props = defineProps({
    icon: String
})
import { animate, spring } from "motion"

const icony = ref()

onMounted(() => {
    animate(icony.value, 
            {transform: ["scale(1)", "scale(1.1)", "scale(0.9)", "scale(1)"]},
            { duration: 2, repeat: Infinity },
            { easing: spring() }
        )
})

</script>
<template>
<div ref="icony">
    <Icon :icon="icon"></Icon>
</div>
</template>
<style scoped>

.iconify{
    color: var(--main);
}
</style>