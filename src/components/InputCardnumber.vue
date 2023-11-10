<script setup>
import { ref, onMounted, watch } from 'vue'
import { useIMask } from 'vue-imask';
import InputValidation from './InputValidation.vue';
import { useConfigStore } from '../stores/configuration';
import { useEventBus } from '@vueuse/core'
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
    mask: '0000-0000-0000-0000',
    radix: '.',
    lazy: true
  },
  {
    onAccept: () => {
      isvalid.value = masked.value.length === 18 || masked.value.length === 19
      emit('update:modelValue', masked.value)
      config.formIsValid['cardnumber'] = isvalid.value
    }
  }
);




</script>
<template>
  <div>
    <InputValidation :text="config.l('cardNumberVer')" :blurred="blurred" :notvalid="!isvalid">
      <div class="relative">
        <input @blur="blurred = true" ref="el" type="text" id="cardnum" name="cardnum"
          class="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-cmain focus:ring-cmain "
          placeholder="">
          <FormCheck :valid="isvalid"></FormCheck>
        <!--ph:credit-card-->
        <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">

          <TheFormIcon icon="ph:credit-card"></TheFormIcon>
        </div>
      </div>
    </InputValidation>
  </div>
</template>