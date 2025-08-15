<template>
  <ul class="list">
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
  </ul>
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

<style scoped lang="less">
.list {
  background: #fff;
  padding: 20px;
  box-shadow: @card-shadow;

  li {
    border-bottom: 1px solid #8882;
    padding: 10px 0;
    color: #333;
    font-size: 1rem;
    font-size: 15px;

    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      letter-spacing: 1px;
    }
  }

  .title {
    margin-right: 10px;
  }

  .date {
    color: #9a9a9a;
    font-size: 0.9em;
  }
}
</style>
