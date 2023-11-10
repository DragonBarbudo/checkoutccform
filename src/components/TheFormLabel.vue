<script setup>
const props = defineProps({
    for:String,
    mini:String
})
</script>
<template>
<div class="text-sm">
    <label :for="for" class="block font-medium  mb-1">
        <slot></slot>
        <span v-if="mini" class="text-xs opacity-50 ml-2">{{ mini }}</span>
    </label>
</div>
</template>