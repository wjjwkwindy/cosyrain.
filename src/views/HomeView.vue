<template>
  <!-- 文章列表 -->
  <div class="home-box">
    <a-typography-title :level="4">
      <span>
        <router-link to="/post">Article.</router-link>
      </span>
    </a-typography-title>
    <a-row>
      <a-col :span="24">
        <ArticleList />
      </a-col>
    </a-row>
  </div>

  <!-- 卡片数据 -->
  <div class="home-box">
    <a-typography-title :level="4"><span><i>Weather.</i></span></a-typography-title>
    <a-row :gutter="[24, 24]">
      <a-col :span="12" v-for="n in 1">
        <HomeAirQuality :data-index="n" />
      </a-col>
    </a-row>
  </div>

  <!-- 电影数据 -->
  <div class="home-box">
    <a-typography-title :level="4">
      <span>
        <router-link to="/movie">Moive.</router-link>
      </span>
    </a-typography-title>
    <a-row>
      <a-col :span="24">
        <MoiveStatistic />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import ArticleList from '@/components/article/ArticleList.vue';
import HomeAirQuality from '@/views/HomeAirQuality.vue';
import MoiveStatistic from '@/components/movies/MoiveStatistic.vue';
</script>

<style scoped>
.home-box {
  margin-bottom: 30px;
}
</style>
