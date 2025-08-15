<template>
  <!-- 标题 -->
  <div class="prose">
    <div class="article-header">
      <h1 class="article-title">{{ frontmatter.title }}</h1>
    </div>
    <p class="article-meta">
      <span>{{ formatDate(frontmatter.date) }}</span>
      <a-tag>{{ frontmatter.tag }}</a-tag>
    </p>
  </div>

  <!-- 正文 -->
  <article>
    <slot />
  </article>
</template>

<script setup lang="ts">
import { formatDate } from '@/logics';
const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
});
console.log('🚀 ~ frontmatter:', frontmatter);
</script>

<style scoped lang="less">
.prose {
  margin-bottom: 50px;
}

.article {
  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  &-title {
    font-size: 2em;
    margin-bottom: 0;
    margin-right: 10px;
  }

  &-meta {
    display: flex;
    font-size: 1em;
    color: #9a9a9a;
    gap: 10px;
    align-items: center;
  }
}
</style>
