<script setup>
import {ref, onMounted} from 'vue'
import { animate, spring, timeline } from "motion"

const config = useConfigStore()

const preloader = ref()
const card = ref()
const endPreload = async () => {
    if(config.status>0){
        return false
    }
    config.status = 1
    /* card */
    const cardtransform = getTransformValues(card.value)
    preloader.value.classList.remove('active')
    card.value.style.transform = cardtransform
    await animate(card.value, 
        { transform: "translateY(1200%) rotateY(1220deg) scale(4)" },
        { duration: 1 },
        { easing: spring() }
    ).finished

    await animate(preloader.value, 
        { top: "-300%", transform: "rotateZ(20deg) scale(2)" },
        { duration: 2.4 },
        { easing: spring() }
    ).finished
    config.status = 2
    
}

function getTransformValues(element) {
  const styles = window.getComputedStyle(element);
  const transform = styles.transform;
  return transform
}

onMounted(() => {
    setTimeout(()=>{
            endPreload()
    }, 4000)
})

defineExpose({endPreload})
</script>
<template>
<div @click="endPreload()" class="preloader overflow-hidden z-50 bg-cmain fixed left-0 top-0 w-full h-full grid place-items-center active" ref="preloader">
    <div class="cardwrapper">
        <div class="card animating" ref="card">
            <div class="cardfaces">
                <div class="cardface back drop-shadow-md bg-clight"></div>
                <div class="cardface back bg-clight"></div>
                <div class="cardface back  shadow-md bg-clight relative">
                    <div class="w-[98%] mx-auto bg-slate-500 h-1/6 mt-[5%] opacity-80 rounded-sm"></div>
                    <div class="w-[60%] mr-[30%] mx-auto bg-white h-1/6 mt-[15%]"></div>
                </div>
                <div class="cardface front bg-white relative">
                    <div class="reflection"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
    .preloader{
        --size: 80px;
        --duration: 3s;
        --start: 45deg;
    }
   .cardwrapper{
    transform-style: preserve-3d;
    perspective: 1000px;
}
    .active .cardwrapper {
        animation: loading var(--duration) infinite;
    }
   
   @keyframes loading {
    0%{
        transform: translateY(calc(-var(--size) * .5));
        animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    }

    45%{
        transform: translateY(calc(var(--size) * .5));
        animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    }
    100%{
        transform: translateY(calc(-var(--size) * .5));
        
    }
   }
   .card{
        transform-style: preserve-3d;
    }
    .active .card {
        animation: rotation var(--duration) infinite;
    }
   @keyframes rotation {
    0% {
        transform: rotateY(15deg);
        animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    }
    50% {
        transform: rotateY(90deg) rotateZ(15deg);
    }
    
    100%{
        transform: rotateY(calc( 375deg ));
        
    }
   }
   .cardfaces{
        transform-style: preserve-3d;
        height: calc(var(--size)/1.8);
        width: var(--size);
        position: relative;
        transform-origin: 0 0;
        transform: translateX(0) translateY(0), translateZ(calc(-var(--size) / 2));
        
   }
   .cardface{
        position: absolute;
        inset: 0;
        border: var(--dark);
        border-radius: 4px;
   }
   .cardface.front{
        transform-origin: 0 50%;

        
   }
   .cardface.back{
        transform-origin: 0 50%;
        transform: translateZ(-1.5px);
   }
   .cardface.back:nth-child(1){
        background: theme('colors.slate.400');
    }
    .cardface.back:nth-child(2){
        background: theme('colors.slate.400');
    }




.reflection{
    width: 100%; height: 100%;
    position: absolute;
    background-image: linear-gradient(80deg,rgba(0,0,0,0.2) 30%, rgba(255,255,255,.4) 40%, rgba(100,100,100,0.1));
    background-size: 300% 300%;
    background-position: -100% 0%;
    border-radius: 4px;
    opacity: 1;
    animation: reflectionani var(--duration) ease infinite;
}

@keyframes reflectionani {
    0% {
        opacity:0.5;
        background-position: 0% 0%;
        animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    }
    50% {
        opacity:0.8;
        background-position: 100% 50%;
    }
    100% {
        opacity:0.5;
        background-position: 0% 0%;
    }
}
</style>