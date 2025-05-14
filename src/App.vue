<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <SpeedInsights />
  <router-view></router-view>
</template>

<style scoped></style>
