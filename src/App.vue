<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <router-view></router-view>
  <SpeedInsights />
</template>

<style scoped></style>
