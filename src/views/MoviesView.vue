<template>
  <a-space direction="vertical" size="large" style="width:100%;">
    <MoiveStatistic />
    <MovieList />
  </a-space>
</template>

<script setup lang="ts">
import MoiveStatistic from "@/components/movies/MoiveStatistic.vue";
import MovieList from "@/components/movies/MovieList.vue";
</script>

<style scoped></style>