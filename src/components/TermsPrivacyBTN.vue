<script setup>
import { Icon } from '@iconify/vue';
import { useEventBus } from '@vueuse/core'
import { animate, spring, inView } from "motion"
import { useConfigStore } from '../stores/configuration';
const bus = useEventBus('invalids')
const config = useConfigStore()
bus.on((ev)=>{
    blurred.value = true
    animate(checkboxy.value,
        { transform: ["translateX(-30%)", "translateX(20%)", "translateX(-10%)", "translateX(0%)"] },
        { duration: 0.7 }
    )

})
const blurred = ref(false)
const checkboxy = ref()
const emit = defineEmits(['update:modelValue'])

    const props = defineProps({
        label: String,
        link: String,
    })

    const input = ref(false)


    const dialog = ref()
    const openDialog = () => {
        dialog.value.showModal()
    }
    const closeDialog = () => {
        dialog.value.close()
    }
const onchange = () => {
    emit('update:modelValue', input.value)
}

onMounted(()=>{
    onchange()
})


</script>
<template>
    <div class="relative w-fit">
    <InputValidation :text="config.l('payAccept')+' ' + link +'.'" :blurred="blurred" :notvalid="!input">
        <div class="flex gap-2 items-center">
            <label class="flex block  bg-white  rounded-md text-sm" ref="checkboxy">
                <input @change="onchange" v-model="input" type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-cmain pointer-events-none focus:ring-cmain">
            </label>
            <div>
                <span>{{ label }}</span>
                <span @click="openDialog()" class="cursor-pointer font-bold text-cmain">{{ props.link }}</span>
            </div>
        </div>
        <dialog ref="dialog" class="max-w-2xl p-2 rounded shadow-xl border">
            <div class="flex justify-between p-2 text-xl">
                <div class="h2  text-cmain">{{ link }}</div>
                <div @click="closeDialog" class="cursor-pointer hover:text-cmain">
                    <Icon icon="solar:close-circle-broken"></Icon>
                </div>
            </div>
            <div class="p-2">
                <slot></slot>
            </div>
        </dialog>
    </InputValidation>
</div>
</template>