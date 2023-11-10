<script setup>
const props = defineProps({
    text: String,
    notvalid: Boolean,
    blurred: Boolean
})
const notvalid = computed(() => {
    if(props.blurred){
      return props.notvalid
    } else {
      return false
    }
  })





</script>
<template>

<VDropdown :distance="-6" :arrow-padding="20" placement="top-end" :triggers="[]" :shown="notvalid" :autoHide="false" :data-invalid="notvalid">
        <div><slot></slot></div>
        <template #popper>
            {{ text }}
        </template>
    </VDropdown>
    
</template>