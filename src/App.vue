<script setup>
import {ref} from 'vue'
import PreLoader from './components/PreLoader.vue'
import TheForm from './components/TheForm.vue'
import TheSuccess from './components/TheSuccess.vue'
import { useConfigStore } from './stores/configuration';
const config = useConfigStore()
const refPreloader = ref()
const endPreload = () => {
  refPreloader.value.endPreload()
}
</script>

<template>
  <PreLoader v-if="config.status<2" ref="refPreloader"  @click="endPreload"></PreLoader>
  
  <main>
    
    <TheForm v-if="config.status>=1"></TheForm>
    <TheSuccess v-if="config.status==4"></TheSuccess>
  </main>
  


</template>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  padding: 50px 15px;
  justify-items: center;
  align-items: center;
  @media screen and (max-width: 700px), (max-height: 500px) {
    flex-wrap: wrap;
    flex-direction: column;
    justify-items: normal;
    align-items: normal;
  }
  background-image: radial-gradient(
    farthest-corner at 40px 40px,
    var(--light) 60%,
    var(--second) 100%
    
  );
}
</style>
