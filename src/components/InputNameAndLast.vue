<script setup>
import { ref } from 'vue'
import { useIMask } from 'vue-imask';
import { useConfigStore } from '../stores/configuration';
import { useEventBus } from '@vueuse/core'
const bus = useEventBus('invalids')
bus.on((ev)=>{
  blurred.value = true
})
const config = useConfigStore()
const blurred = ref(false)
const isvalidF = ref(false)
const isvalidL = ref(false)

const emit = defineEmits(['update:modelValue', 'update:full', 'update:first', 'update:last'])
const { el, masked } = useIMask(
    {
        mask: /^[a-zA-Z\s]+$/,
    },
    {
        onAccept: () => {
            isvalidF.value = masked.value.length > 5
            emit('update:first', masked.value.toUpperCase())
            config.formIsValid['cardnameF'] = isvalidF.value
        }
    }
)
/*
const { ellast, maskedL } = useIMask(
    {
        mask: /^[a-zA-Z\s]+$/,
    },
    {
        onAccept: () => {
            isvalidL.value = maskedL.value.length > 5
            emit('update:last', maskedL.value.toUpperCase())
            config.formIsValid['cardnameL'] = isvalidL.value
        }
    }
)
*/

</script>

<template>
    <div class="grid md:grid-cols-2 gap-1">
        
        <div class="relative">
            <TheFormLabel for="cardnameF">{{ config.l('inputName') }}</TheFormLabel>
            <InputValidation :text="config.l('cardNameFVer')" :blurred="blurred" :notvalid="!isvalidF">
            <div class="relative">
                <input @blur="blurred=true" ref="el" type="text" id="cardnameF" name="cardnameF"
                    class="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-cmain focus:ring-cmain "
                    placeholder="">
                    <FormCheck :valid="isvalidF"></FormCheck>
                <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                    <TheFormIcon icon="ph:user-list"></TheFormIcon>
                </div>
            </div>
            </InputValidation>
        </div>
        <!--
        <div class="relative">
            <TheFormLabel for="cardnameL">{{ config.l('inputLastname') }}</TheFormLabel>
            <InputValidation :text="config.l('cardNameLVer')" :blurred="blurred" :notvalid="!isvalidL">
            <div class="relative">
                <input @blur="blurred=true" ref="ellast" type="text" id="cardnameL" name="cardnameL"
                    class="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-cmain focus:ring-cmain "
                    placeholder="">
                    <FormCheck :valid="isvalidL"></FormCheck>
                <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                    <TheFormIcon icon="ph:user-list"></TheFormIcon>
                </div>
            </div>
            </InputValidation>
        </div>
        -->
    </div>

<!--
    <div class="grid md:grid-cols-2 gap-1">
        <div class="bg-slate-100 p-2 rounded">
            <TheFormLabel for="infoFirstName" >{{ config.l('inputName') }}</TheFormLabel>
            <TheFormInputtext :validation="config.l('inputNameVer')" name="infoFirstName" v-model="config.form.information.firstName">
                <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                    <TheFormIcon icon="ph:user"></TheFormIcon>
                </div>
            </TheFormInputtext>
        </div>
        <div class="bg-slate-100 p-2 rounded">
            <TheFormLabel for="infoLastName" >{{ config.l('inputLastname') }}</TheFormLabel>
            <TheFormInputtext :validation="config.l('inputLastnameVer')" name="infoLastName" v-model="config.form.information.lastName">
                <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                    <TheFormIcon icon="ph:user"></TheFormIcon>
                </div>
            </TheFormInputtext>
        </div>
    </div>
-->
</template>

<style scoped>
input {
    text-transform: uppercase;
}
</style>