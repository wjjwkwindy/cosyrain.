<template>
  <a-card>
    <a-list item-layout="horizontal" :data-source="routes" class="article-list">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            {{ formatDate(item.meta.date) }}
          </template>
          <a-list-item-meta>
            <template #title>
              <a :href="item.path">
                <span>{{ item.meta.title }}</span>
                <a-tag v-if="item.meta.tag" size="small" :color="getTagIconColor(item.meta.tag)">
                  <template #icon>
                    <component :is="getTagIcon(item.meta.tag)"></component>
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
import { formatDate } from '@/logics';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    date: string;
    tag?: string;
  }
}

const tagCategory = {
  ts: {
    color: 'blue',
    icon: 'icon-code-block'
  },
  photography: {
    color: 'orange',
    icon: 'icon-camera'
  },
};

const router = useRouter();
const routes = router
  .getRoutes()
  .filter((i) => i.path.startsWith('/posts') && i.path !== '/posts');

const getTagIcon  = (tag: string) => {
  const key = tag.toLowerCase() as keyof typeof tagCategory;
  return tagCategory[key]?.icon || 'icon-file';
};
const getTagIconColor  = (tag: string) => {
  const key = tag.toLowerCase() as keyof typeof tagCategory;
  return tagCategory[key]?.color || 'default';
};
</script>

<style scoped lang="less">
.article-list {
  a {
    display: block;
    font-weight: normal;
    font-size: 15px;
  }

  span:first-child {
    margin-right: 10px;
  }
}
</style>
