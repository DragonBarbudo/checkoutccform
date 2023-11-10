<script setup>
import {ref, onMounted} from 'vue'
import { Icon } from '@iconify/vue';
import { animate, spring } from "motion"

const props = defineProps({
    valid: Boolean
})

const outcircle = ref()
const iconcircle = ref()

watch(()=>props.valid, ()=>{
    if(props.valid){
        AnimEnter()
    } else {
        AnimExit()
    }
})

const AnimEnter = async () => {
    outcircle.value.classList.remove('opacity-0')
    animate(outcircle.value,
        { transform: ["scale(0)", "scale(1.5)", "scale(1)"] },
        { duration: 0.5 },
        
    )
    
    animate(iconcircle.value, 
        {transform: ["scale(0.5)", "scale(1)"]},
        { duration: 1 },
    )
    
}
const AnimExit = () => {
    animate(outcircle.value,
        { transform: ["scale(1.5)", "scale(0)"] },
        { duration: 0.2 },
        { easing: spring() }
    )
}

</script>

<template>
    <div ref="outcircle" class="opacity-0 text-white absolute -top-1 -right-1 w-4 h-4 bg-green-300 rounded-full flex justify-center items-center">
        <div ref="iconcircle"><Icon  icon="solar:check-circle-line-duotone"></Icon></div>
    </div>
</template>

<style>

</style>
