<template>
  <!-- 影片列表 -->
  <a-card>
    <a-list item-layout="horizontal" :data-source="movies" class="">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a-tag v-if="item.watched" color="green">已观看</a-tag>
            <a-tag v-else color="default">未观看</a-tag>
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a :href="item.link">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script setup lang="ts">
import doubanData from '@/assets/douban-250.json';

interface Moives {
  title: string;
  description: string;
  link: string;
  watched: boolean;
}

const movies: Moives[] = doubanData.movies;
</script>

<style scoped></style>