<script setup>
  import {ref, onMounted, watch} from 'vue'
  import { useIMask } from 'vue-imask';
  import { useConfigStore } from '../stores/configuration';
  import { useEventBus } from '@vueuse/core'
  const props = defineProps({
    name: String
  })
  const bus = useEventBus('invalids')
bus.on((ev)=>{
  blurred.value = true
})
  const config = useConfigStore()
  
  const emit = defineEmits(['update:modelValue'])
  const isvalid = ref(false)
  const blurred = ref(false)
  const { el, masked } = useIMask(
    {
      mask: '00000',
      radix: '.',
      lazy: true
    },
    {
        onAccept: () => {
          isvalid.value = masked.value.length == 5
          emit('update:modelValue', isvalid.value ? masked.value:'')
          config.formIsValid['infoZipcode'] = isvalid.value
        }
    }
  );


</script>
<template>

<InputValidation :text="config.l('inputZipVer')" :blurred="blurred" :notvalid="!isvalid">
  <div class="relative">

    <input @blur="blurred=true" ref="el" type="text" :id="name" :name="name" class="py-3 px-4  block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-cmain focus:ring-cmain " placeholder="">
    <FormCheck :valid="isvalid"></FormCheck>
    <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
        <TheFormIcon icon="ph:align-center-horizontal-simple"></TheFormIcon>
    </div>
  </div>
</InputValidation>
</template>