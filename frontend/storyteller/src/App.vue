<script setup lang="ts">
import { RouterView } from 'vue-router'
import Logo from '@/components/Logo.vue'
</script>

<template>
  <v-sheet class="container" elevation="2">
      <Logo></Logo>
      <RouterView />
  </v-sheet>
  
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background-color: var(--color-card);
  border-radius: 25px;
  padding: 1rem;
  flex: 1;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  color: var(--color-text);
}

</style>
