<script setup>
import {ref, onMounted, watch, computed} from 'vue'
import { animate, spring, inView } from "motion"
import { useParallax } from '@vueuse/core'
import  creditCardType  from 'credit-card-type'
import { Icon } from '@iconify/vue';

const config = useConfigStore()
const thecard = ref(null)
const thecardwrap = ref(null)
const { tilt, roll, source } = useParallax(thecardwrap)


const cardStyle = computed(()=>{
    const sty = {
        transition: '.3s ease-out all',
        transform: `rotateX(${roll.value * 20}deg) rotateY(${tilt.value * 20}deg)`,
    }
    return sty
})

const startAnim = () => {
    //inView(thecard.value, ()=>{
        animate(thecard.value, 
            {transform: "translateY(0%) rotateY(0deg)" },
            { duration: 1 },
            { easing: spring() }
        )
    //})
}


const cardnumber  = computed(()=>{
    const cn = config.form.card.number
    const missingDigits = "####-####-####-####";
    const formattedNumber = cn.padEnd(19, "#").slice(0, 19);
    return formattedNumber.replace(/#/g, (match, index) => missingDigits[index]);
})

const cardname = computed(()=>{
    let cn = config.form.card.name
    if (cn.length > 16) {
        return cn.slice(0, 16) + "...";
    }
    if(cn.length==0){
        return ' '
    }
    return cn;
})
const cardexpire = computed(()=>{
    let cn = config.form.card.expire
    const missingDigits = "MM/YY"
    return cn + missingDigits.slice(cn.length)
})

const ccType = computed(()=>{
    if(config.form.card.number){
        const ty = creditCardType(config.form.card.number)[0]
        return ty ? ty.type : '' 
    } else {
        return ''
    }
})

onMounted(() => {
    setTimeout(()=>{
        startAnim()
    }, 800)
})
</script>
<template>
<div ref="thecardwrap"  class="thecardwrap max-w-md  w-full mx-auto aspect-video p-2 overflow-hidden text-[8px] sm:text-[10px] ">

<div class="max-w-xs mx-auto aspect-video  p-2" :style="cardStyle">
    <div  class="thecard overflow-hidden relative w-full h-full bg-cmain rounded flex flex-col justify-evenly items-center text-clight" ref="thecard">
        <div class="reflection"></div>
        <div class="w-full px-4 h-1/6 text-right flex justify-end text-white text-4xl mix-blend-overlay">
            <div class="logosenter" v-if="ccType=='mastercard'"><Icon icon="formkit:mastercard"></Icon></div>
            <div class="logosenter" v-else-if="ccType=='visa'"><Icon icon="formkit:visa"></Icon></div>
            <div class="logosenter" v-else-if="ccType=='american-express'"><Icon icon="formkit:amex"></Icon></div>
            <div v-else><Icon icon="iconoir:credit-card"></Icon></div>
        </div>
        <div class=" w-full px-4">
            <div class="chip w-full text-gray-200 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M10 4h10c1.11 0 2 .89 2 2v2h-3.41L16 10.59v4l-2 2V20h-4v-3.41l-2-2V9.41l2-2V4m8 7.41V14h4v-4h-2.59L18 11.41M6.59 8L8 6.59V4H4c-1.11 0-2 .89-2 2v2h4.59M6 14v-4H2v4h4m2 3.41L6.59 16H2v2c0 1.11.89 2 2 2h4v-2.59M17.41 16L16 17.41V20h4c1.11 0 2-.89 2-2v-2h-4.59Z"/></svg>
            </div>
        </div>
        <div class="flex text-xs gap-0.5 sm:gap-1">
            <div v-for="(item, index) in cardnumber" :key="index" :class="['', ( item=='#' ? 'digitoff':'digiton' )]" >
                <span v-if="item!='-'">{{ item }}</span>
            </div>
        </div>
        <div class="w-full grid grid-cols-3 px-4 gap-2">
            <div class="col-span-2">
                <div class="text-[6px] opacity-50">NOMBRE</div>
                <div class=" flex gap-[1px] ">
                    <div v-for="(item, index) in cardname" :key="index" :class="[( item=='#' ? 'digitoff':'digiton' )]" >
                        <span>{{ item }}</span>
                        <span v-if="item==' '">&nbsp;&nbsp;</span>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <div class="text-[6px] opacity-50">EXPIRACIÓN</div>
                <div class="flex gap-0.5  justify-end">
                    <div v-for="(item, index) in cardexpire" :key="index" :class="[( item=='M' || item=='Y' ? 'digitoff':'digiton' )]" >
                        <span>{{ item }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

</template>

<style scoped>
.thecardwrap {
    transform-style: preserve-3d;
    perspective: 1000px;
}

.thecard {
    font-family: 'Orbitron Variable', sans-serif;
    transform: translateY(100%) rotateY(-90deg);
    text-shadow: 0 4px 4px rgba(0,0,0,0.1), 0 -2px 2px rgba(255,255,255,0.1);
}


.reflection{
    width: 100%; height: 100%;
    position: absolute;
    background-image: linear-gradient(80deg,rgba(0,0,0,0.5) 20%, rgba(255,255,255,.4) 40%, rgba(0,0,0,0.1));
    background-size: 300% 300%;
    background-position: -100% 0%;
    mix-blend-mode: overlay;
    opacity: 1;
    animation: reflectionani 4s ease infinite;
}

@keyframes reflectionani {
    0% {
        opacity:0.5;
        background-position: 0% 0%;
    }
    30% {
        opacity:0.8;
        background-position: 50% 0%;
    }
    50% {
        opacity:0.3;
        background-position: 100% 50%;
    }
    100% {
        opacity:0.5;
        background-position: 0% 0%;
    }
}

.digitoff{
    opacity: 0.5;
    animation: exitdigit 2s ease;
}
.digiton{
    animation: enterdigit 3s ease;
}

@keyframes exitdigit{
    0% {
        transform: scale(1.3);
        opacity:1;
    }
    10% {
        transform: scale(1);
        opacity:0.5;
    }
}
@keyframes enterdigit{
    0% {
        transform: scale(0.5) translateY(-50%);
        opacity:0;
    }
    10% {
        transform: scale(1)  translateY(0%);
        opacity:1;
    }
}

.logosenter{
    animation: logosenterAnim 1s ease;
}
@keyframes logosenterAnim {
    0%{
        transform:scale(0);
        opacity: 0;
    }
    100%{
        transform:scale(1);
        opacity: 1;
    }
}

</style>