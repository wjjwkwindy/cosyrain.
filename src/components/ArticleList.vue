<template>
  <a-card>
    <a-list item-layout="horizontal" :data-source="routes">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            {{ formatDate(item.meta.date) }}
          </template>
          <a-list-item-meta>
            <template #title>
              <a :href="item.path">
                <span>{{ item.meta.title }}</span>
                <a-tag v-if="item.meta.tag" size="small" color="orange">
                  <template #icon>
                    <icon-camera />
                  </template>
                  {{ item.meta.tag }}
                </a-tag>
              </a>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { formatDate } from '../logics';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    date: string;
    tag?: string;
  }
}

const router = useRouter();
const routes = router
  .getRoutes()
  .filter((i) => i.path.startsWith('/posts') && i.path !== '/posts');
</script>

<style scoped lang="less"></style>
