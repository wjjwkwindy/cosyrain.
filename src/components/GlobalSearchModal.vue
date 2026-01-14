<template>
  <a-modal
    v-model:open="visible"
    :hide-title="true"
    :footer="false"
    @open="openSearchModal"
  >
    <template #title> 搜索 </template>
    <div>
      <a-input placeholder="搜索内容" class="search-input" size="large">
        <template #prefix>
          <icon-search />
        </template>
      </a-input>
      <a-list :max-height="300" :split="false" size="small">
        <a-list-item v-for="value in searchResults" :key="value.path">
          <router-link
            :to="value.path"
            class="search-link"
            @click="visible = false"
          >
            <span>{{ value.name || '[文章]' + value.meta.title }}</span>
            <span>{{ value.path }}</span>
          </router-link>
        </a-list-item>
      </a-list>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import type { RouteRecordNormalized } from 'vue-router';

const visible = ref(false);
const searchResults = ref<RouteRecordNormalized[]>([]);

defineExpose({
  visible,
});

// 打开搜索弹窗时聚焦焦点到输入框
const openSearchModal = () => {
  nextTick(() => {
    const inputElement = document.querySelector(
      '.arco-input'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  });
};

// 打印所有路由
const router = useRouter();
console.log(`🚀 ~ 搜索页面 - 所有路由：`, router.getRoutes());
searchResults.value = router.getRoutes();
</script>

<style scoped lang="less">
.search-input {
  margin-bottom: 20px;
}

.search-link {
  display: flex;
  justify-content: space-between;

  span:last-child {
    font-size: 0.7rem;
    color: var(--color-text-3);
  }
}
</style>
