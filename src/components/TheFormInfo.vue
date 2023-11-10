<script setup>

const config = useConfigStore()

const currency = (price) => {
    return new Intl.NumberFormat().format(price)+" "+_a.payment.currency
}
</script>
<template>

<div class="flex flex-col  gap-1   cardstyle ">

    <div v-for="(item, index) in config.form.payment" :key="index" class="grid grid-cols-2 items-center bg-slate-50 rounded p-1">
        <div class="text-cmain" :class="item[2]"><strong>{{item[0]}}</strong></div>
        <div class="text-right" :class="item[2]" v-if="item[3]">${{ currency(item[1]) }}</div>
        <div v-else class="text-right" :class="item[2]">{{item[1]}}</div>
    </div>
</div>
</template>

<style scoped>
</style>