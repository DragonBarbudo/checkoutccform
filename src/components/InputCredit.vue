<script setup>
import {ref} from 'vue'
const emit = defineEmits(['update:modelValue'])
const input = ref()
const options = ref(_a.fees)
const onchange = () => {
  emit('update:modelValue', input.value)
}
onMounted(() => {
  input.value = options.value[0]
  onchange()
})
</script>
<template>
  <div>
<select @change="onchange" v-model="input" class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-cmain focus:ring-cmain ">
  <option v-for="(item, index) in options" :key="index" :value="item" :selected="index==0">{{ item.name }}</option>
</select>
</div>
</template>