<script setup>
    import { useIMask } from 'vue-imask';
    import { useConfigStore } from '../stores/configuration';
    import { useEventBus } from '@vueuse/core'
const bus = useEventBus('invalids')
bus.on((ev)=>{
  blurred.value = true
})
const config = useConfigStore()
  const props = defineProps({
    name: String,
    type: String,
    validation: String,
    norequired: Boolean
  })
  const isvalid = ref(false)
  const input = ref('')
  const istype = props.type?props.type:'text'
  const emit = defineEmits(['update:modelValue'])
  
  const onchange = () => {
    isvalid.value = input.value.length > 2
    if(props.norequired){isvalid.value = true}
    emit('update:modelValue', input.value)
    config.formIsValid[props.name] = isvalid.value
}
const blurred = ref(false)
onMounted(() => {
  onchange()
})
</script>
<template>
  <InputValidation :text="validation" :blurred="blurred" :notvalid="!isvalid">
  <div class="relative">
    <input @blur="blurred=true" @input="onchange" v-model="input" :id="name" :name="name" class="py-3 px-4  block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-cmain focus:ring-cmain " placeholder="">
    <FormCheck :valid="isvalid" v-if="!norequired"></FormCheck>
    <slot></slot>
  </div>
</InputValidation>
</template>