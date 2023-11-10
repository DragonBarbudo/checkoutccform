<script setup>
import {ref} from 'vue'
import { useConfigStore } from '../stores/configuration';
const input = ref(false)
const config = useConfigStore()
const emit = defineEmits(['update:modelValue'])
const onchange = () => {
  emit('update:modelValue', input.value)
}
</script>

<template>


  <label for="remember" class="flex p-3 block w-full bg-white border border-gray-200 rounded-md text-sm focus:border-cmain focus:ring-cmain ">
    <input @change="onchange" v-model="input" type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-cmain pointer-events-none focus:ring-cmain " id="remember">
    <span class="text-sm text-gray-500 ml-3 ">{{ input?config.l('cardRememberYes'):config.l('cardRememberNo') }} </span>
  </label>


</template>

<style scoped>
    input{
        text-transform: uppercase;
    }
</style>