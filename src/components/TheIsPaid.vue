<script setup>
import { Icon } from '@iconify/vue';
import { animate, spring, inView } from "motion"
import { useConfigStore } from '../stores/configuration';
const config = useConfigStore()
const endcard = ref(null)
onMounted(() => {
    animate(endcard.value, 
            {transform: "translateY(0%) scale(1)", opacity: "1" },
            { duration: 2 },
            { easing: spring() }
        )
})
</script>
<template>
<div class="fixed inset-0 flex justify-center items-center z-20">
    <div ref="endcard" class="mx-auto w-full max-w-md py-4  gap-3 bg-white p-3 rounded border shadow-xl flex justify-center items-center flex-col -translate-y-5 opacity-0 scale-90">
        <div class="w-80 h-40 max-w-full mx-auto mb-5 overflow-hidden relative">
            <img :src="config.theLogo" class="absolute h-full w-full object-contain">
        </div>

        <div class="bg-teal-400 text-white rounded p-4 text-center  w-full">
            <Icon icon="ph:shield-check" class="text-4xl mx-auto mb-3"></Icon>
            <h2 class="text-xl">{{ config.l('payDone') }}</h2>
            <div>{{ config.l('isPaidText') }}</div>
        </div>
       
        <a :href="config.thePoweredLink" target="_blank" class="block w-80 h-40 max-w-[30%] mx-auto mt-5 overflow-hidden relative">
            <img :src="config.thePowered" class="absolute h-full w-full object-contain">
        </a>
    </div>

</div>
</template>