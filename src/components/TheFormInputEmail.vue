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
    type: String
  })
  const istype = props.type?props.type:'text'
  const emit = defineEmits(['update:modelValue'])
  const isvalid = ref(false)
  const { el, masked } = useIMask(
    {
        mask: /^\S*@?\S*$/
    },
    {
        onAccept: () => {
            const email = masked.value.trim();
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
            isvalid.value = emailRegex.test(email)
            emit('update:modelValue', masked.value)
            config.formIsValid['infoEmail'] = isvalid.value
        }
    }
  );

const blurred = ref(false)

</script>
<template>
<InputValidation text="Correo electrónico inválido." :blurred="blurred" :notvalid="!isvalid">
  <div class="relative">
    <input @complete="onComplete" @blur="blurred=true" ref="el"  :type="istype" :id="name" :name="name" class="py-3 px-4  block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-cmain focus:ring-cmain " placeholder="">
    <FormCheck :valid="isvalid"></FormCheck>
    <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
        <TheFormIcon icon="ph:at"></TheFormIcon>
    </div>
  </div>
</InputValidation>
</template>