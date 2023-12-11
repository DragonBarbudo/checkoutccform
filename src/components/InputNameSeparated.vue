<script setup>
import { useIMask } from 'vue-imask';
import { useConfigStore } from '../stores/configuration';
import { useEventBus } from '@vueuse/core'
const bus = useEventBus('invalids')
bus.on((ev)=>{
  blurred.value = true
})
const config = useConfigStore()
const isvalid = ref(false)
const blurred = ref(false)
const emit = defineEmits(['update:modelValue'])
const { el, masked } = useIMask(
    {
        mask: /^[a-zA-Z\s]+$/,
    },
    {
        onAccept: () => {
            isvalid.value = masked.value.length > 2
            emit('update:modelValue', masked.value.toUpperCase())
            config.formIsValid['cardFname'] = isvalid.value
        }
    }
)


</script>

<template>
    <div class="relative">
        <InputValidation :text="config.l('cardNameVer')" :blurred="blurred" :notvalid="!isvalid">
        <div class="relative">
            <input @blur="blurred=true" ref="el" type="text" id="cardFname" name="cardFname"
                class="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-cmain focus:ring-cmain "
                placeholder="">
                <FormCheck :valid="isvalid"></FormCheck>
            <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                <TheFormIcon icon="ph:user-list"></TheFormIcon>
            </div>
        </div>
        </InputValidation>
    </div>
</template>

<style scoped>
input {
    text-transform: uppercase;
}
</style>