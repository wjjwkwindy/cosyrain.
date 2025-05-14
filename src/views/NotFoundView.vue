<template>
  <div class="notfound">
    <a-empty description="404" />
    <div class="notfound-link">
      <router-link to="/">Go to Home</router-link>
      <MoveRight :size="18" color="#18794e" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoveRight } from 'lucide-vue-next';
</script>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.notfound-link a {
  color: #000;
  color: #18794e;
}
.notfound-link{
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
