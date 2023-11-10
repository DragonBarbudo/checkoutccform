<script setup>
    import { useIMask } from 'vue-imask';
  const props = defineProps({
    name: String,
    states: Array,
    countryid: Number
  })
  const input = ref(null)
  const emit = defineEmits(['update:modelValue'])
  

  const listStates = computed(() => {
    if(props.countryid){
        return props.states.filter((item)=>{
            return item.id_country == props.countryid
        })
    } else {
        return []
    }
  })



  const onchange = () => {
    emit('update:modelValue', input.value)
}


  onMounted(() => {
    emit('update:modelValue', input.value)

      setTimeout(() => {
        if(listStates.value.length){
          input.value = listStates.value[0]
        }
      }, 200);

  })
</script>
<template>
    <div>
        <select @change="onchange" v-model="input" class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-cmain focus:ring-cmain ">
            <option v-for="(item, index) in listStates" :key="index" :value="item" :selected="index==0">{{ item.name }}</option>
        </select>
    </div>
  </template>