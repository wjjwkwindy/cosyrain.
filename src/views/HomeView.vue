<template>
  <a-space direction="vertical" size="large">
    <!-- 文章列表 -->
    <a-row>
      <a-col :span="24">
        <ArticleList />
      </a-col>
    </a-row>

    <!-- 卡片数据 -->
    <a-row :gutter="[24, 24]">
      <a-col :span="12" v-for="item in 4">
        <HomeAirQuality />
      </a-col>
    </a-row>
  </a-space>
</template>

<script setup lang="ts">
import ArticleList from '@/components/ArticleList.vue';
import HomeAirQuality from '@/views/HomeAirQuality.vue';
</script>

<style scoped></style>
