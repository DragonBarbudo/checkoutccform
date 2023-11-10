
<script setup>
  import { useIMask } from 'vue-imask';
  import { useConfigStore } from '../stores/configuration';
  import { useEventBus } from '@vueuse/core'
const bus = useEventBus('invalids')
bus.on((ev)=>{
  blurred.value = true
})
  const emit = defineEmits(['update:modelValue'])
  const config = useConfigStore()
    const isvalid = ref(false)
  const { el, masked } = useIMask(
    {
        mask: IMask.MaskedRange,
        from: 1,
        to: 9999,
        maxLength: 4
    },
    {
        onAccept: () => {
            isvalid.value = masked.value.length >= 3
            emit('update:modelValue', masked.value)
            config.formIsValid['cardcvc'] = isvalid.value
        }
    }
);
const blurred = ref(false)
</script>
<template>
<InputValidation :text="config.l('cardCVCVer')" :blurred="blurred" :notvalid="!isvalid">
<div class="relative">
    <input @blur="blurred=true" ref="el" type="password" id="cardcvc" name="cardcvc" class="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-cmain focus:ring-cmain " placeholder="">
    <FormCheck :valid="isvalid"></FormCheck>
    <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
        <TheFormIcon icon="ph:password"></TheFormIcon>
    </div>
</div>
</InputValidation>
</template>