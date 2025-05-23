<template>
  <ul class="article-list">
    <li v-for="route in routes" :key="route.path">
      <RouterLink :to="route.path">
        <div class="title-container">
          <span class="title">{{ route.meta.title }}</span>

          <a-tag v-if="route.meta.tag" size="small" color="orangered">
            <template #icon>
              <icon-camera />
            </template>
            {{ route.meta.tag }}
          </a-tag>
        </div>

        <span class="date">{{ formatDate(route.meta.date) }}</span>
      </RouterLink>
    </li>
    <!-- 读取路由展示 -->
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { formatDate } from '../logics';
import { IconCamera } from '@arco-design/web-vue/es/icon';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    date: string;
    tag?: string;
  }
}

const router = useRouter();
const routes = router.getRoutes().filter((i) => i.path.startsWith('/blogs'));
</script>

<style scoped>
.article-list {
  background: #fff;
  padding: 20px;
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
}
li {
  border-bottom: 1px solid #8882;
  padding: 10px 0;
  color: #333;
  font-size: 1rem;
  font-size: 15px;
}
li a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 1px;
}
.title {
  margin-right: 10px;
}
.date {
  color: #9a9a9a;
  font-size: 0.9em;
}
</style>
