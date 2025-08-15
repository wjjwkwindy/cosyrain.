<template>
  <a-space direction="vertical" :size="40" style="display: block">
    <!-- 文章 -->
    <a-row>
      <a-col :span="24">
        <ArticleList />
      </a-col>
    </a-row>

    <!-- 卡片数据 -->
    <a-row :gutter="[24, 24]">
      <a-col :span="12">
        <HomeAirQuality />
      </a-col>
      <a-col :span="12">
        <HomeAirQuality />
      </a-col>
      <a-col :span="12">
        <HomeAirQuality />
      </a-col>
      <a-col :span="12">
        <HomeAirQuality />
      </a-col>
    </a-row>
  </a-space>
</template>

<script setup lang="ts">
import HomeAirQuality from '@/views/HomeAirQuality.vue';
import ArticleList from '@/components/ArticleList.vue';
</script>

<style scoped></style>
