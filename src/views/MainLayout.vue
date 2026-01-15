<template>
  <div class="container">
    <Header />
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
</script>

<style scoped>
.container {
  padding: 20px 0;
}
</style>
