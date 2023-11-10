
<script setup>
import { useIMask } from 'vue-imask';
import { useConfigStore } from '../stores/configuration';
import { useEventBus } from '@vueuse/core'
const bus = useEventBus('invalids')
bus.on((ev)=>{
  blurred.value = true
})
const config = useConfigStore()
const currentYear = new Date().getFullYear().toString().slice(-2);
const maxYear = (parseInt(currentYear) + 10).toString().padStart(2, '0');
const isvalid = ref(false)
const emit = defineEmits(['update:modelValue'])
const { el, masked } = useIMask(
    {
        mask: 'MM/YY',
        radix: '.',
        lazy: true,
        autofix: true,
        placeholder:"YY/MM",
        blocks: {
            YY: {
                mask: IMask.MaskedRange,
                from: parseInt(currentYear),
                to: parseInt(maxYear),
                autofix: 'pad'
            },
            MM: {
                mask: IMask.MaskedRange,
                from:1, 
                to: 12,
                autofix: 'pad'
            },
            
        }
    },
    {
        onAccept: () => {
            isvalid.value = masked.value.length == 5
            emit('update:modelValue', masked.value)
            config.formIsValid['cardexpire'] = isvalid.value
        }
    }
);
const blurred = ref(false)
</script>
<template>
<InputValidation :text="config.l('cardExpiryVer')" :blurred="blurred" :notvalid="!isvalid">
<div class="relative">
    <input @blur="blurred=true" ref="el"  type="text" id="cardexpire" name="cardexpire" class="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-cmain focus:ring-cmain " placeholder="">
    <FormCheck :valid="isvalid"></FormCheck>
    <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
        <TheFormIcon icon="ph:calendar-blank"></TheFormIcon>
    </div>
</div>

</InputValidation>
</template>