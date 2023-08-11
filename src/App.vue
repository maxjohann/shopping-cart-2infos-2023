<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <h1 class="h1Titulo">Livraria</h1>
  <div class="container-geral">
    <router-view />
  </div>
</template>

<style scoped>
.container-geral {
  display: flex;
  justify-content: space-between;
  background-color: rgb(94, 132, 155) ;
}

.h1Titulo {
  background-color: rgb(94, 132, 155) ;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>