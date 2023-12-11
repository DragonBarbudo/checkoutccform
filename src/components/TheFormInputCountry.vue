<script setup>
    import { useIMask } from 'vue-imask';
  const props = defineProps({
    name: String,
    paises: Array,
    countries: Array
  })
  const input = ref(_a.countryDefault)
  const emit = defineEmits(['update:modelValue'])
  
const onchange = () => {
  emit('update:modelValue', input.value)
}

  onMounted(() => {
    emit('update:modelValue', input.value)
  })
</script>
<template>
    <div>
        <select @change="onchange" :id="name" :name="name" v-model="input" class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-cmain focus:ring-cmain ">
            <option v-for="(item, index) in countries" :key="index" :value="item" :selected="index==0">{{ item.name }}</option>
        </select>
    </div>
  </template>