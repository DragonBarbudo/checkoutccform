<script setup>
import { useEventBus } from '@vueuse/core'


import { Icon } from '@iconify/vue';
import { animate, spring, inView } from "motion"
import { useConfigStore } from '../stores/configuration';
import TermsPrivacy from './TermsPrivacy.vue';
const config = useConfigStore()

const bus = useEventBus('invalids')



const text = ref(null)
const progress = ref(null)
const lock = ref(null)

const doIt = async () => {
    if(!formIsReady.value || config.status == 3){
        bus.emit('invalids')
        scrollToFirstInvalidElement()
        return false
    }
    config.status = 3 //Status: Paying

    animate(text.value, 
        {transform: "translateY(-200%)" },
        { duration: 0.5 },
        { easing: spring() }
    )
    animate(lock.value, 
        {transform: "translateY(0%)" },
        { duration: 0.5 },
        { easing: spring() }
    )
    await animate(progress.value, 
        {width: "100%" },
        { duration: 2 },
        { easing: spring() }
    ).finished
    config.status = 4
}


const formIsReady = computed(()=>{
    let alltrue = true
    for(var i of Object.keys(config.formIsValid)){
        let item = config.formIsValid[i]
        if(!item){
            alltrue = false
        }
    }
    for(var i of Object.keys(config.acceptance)){
        let item = config.acceptance[i]
        if(!item){
            alltrue = false
        }
    }
    
    return alltrue
})



function scrollToFirstInvalidElement() {
  // Select the first element in the document with data-invalid="true"
  const firstInvalidElement = document.querySelector('[data-invalid="true"]');

  // Check if the element exists
  if (firstInvalidElement) {
    // Use the scrollIntoView method to scroll the element into view
    firstInvalidElement.scrollIntoView({
      behavior: 'smooth', // smooth scroll
      block: 'center',    // vertically align in the center
      inline: 'nearest'   // horizontally align to the nearest edge
    });
  } 
}


</script>
<template>
    <TermsPrivacy></TermsPrivacy>
    
    <div class="logos flex gap-4 flex-wrap  justify-center items-center text-xs my-10">
        <div v-for="(item, index) in config.theLogos" :key="index" class="overflow-hidden relative h-10 w-16" >
            <img :src="item" class="absolute h-full w-full object-contain" />
        </div>
    </div>
<!---->


    <button   :class="['button my-3', formIsReady?'':'opacity-40']" @click="doIt">
        <div class="text-white text-lg flex items-center justify-center gap-2" ref="text">
            <span>{{ config.l('payProcess') }}</span>
        </div>
        <div ref="lock" class="z-10 absolute left-0 top-0 right-0 h-full w-full flex justify-center items-center text-white translate-y-full">
            <Icon icon="ph:lock"></Icon>
        </div>
        <div class="absolute left-0 top-0 h-full w-0 bg-teal-400 rounded" ref="progress"></div>
    </button>


    <a :href="config.thePoweredLink" target="_blank" class="block w-80 h-40 max-w-[40%] mx-auto mb-5 overflow-hidden relative">
        <img :src="config.thePowered" class="absolute h-full w-full object-contain">
    </a>
        


</template>

<style scoped>
.button {
    @apply w-full bg-csecond rounded p-2 cursor-pointer select-none transition-all duration-150 shadow-xl overflow-hidden relative
        active:translate-y-1 active:bg-cmain
        disabled:opacity-40 disabled:cursor-default
}
</style>