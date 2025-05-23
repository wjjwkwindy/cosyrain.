<template>
  <div>
    <ul class="tool-list">
      <li class="tool" v-for="route in toolsRoutes" :key="route.path">
        <router-link :to="route.path" class="tool-inner">
          <div
            class="tool-img"
            :style="{ backgroundImage: `url(/${route.meta.bg})` }"
          ></div>
          <div class="tool-text">
            <component
              :is="route.meta.icon"
              :size="30"
              class="tool-icon"
            ></component>
            <h2>{{ route.name }} <a-tag size="small">photo</a-tag></h2>
            <p>{{ route.meta.memo }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 获取所有路由
import { ref, shallowRef } from 'vue';
import type { Component } from 'vue';
import { useRouter } from 'vue-router';
import type { RouteRecordNormalized } from 'vue-router';
import * as ArcoIcons from '@arco-design/web-vue/es/icon';

const toolsRoutes = ref<RouteRecordNormalized[]>([]);
const router = useRouter();

toolsRoutes.value = router
  .getRoutes()
  .filter(
    (route) => route.path.startsWith('/tools') && route.name !== 'ToolsView'
  );

toolsRoutes.value.forEach((route) => {
  const iconName = route.meta.icon as string;
  if (iconName) {
    route.meta.icon = shallowRef(resolveIcon(iconName));
  }
});

function resolveIcon(iconName: string): Component {
  const icon = (ArcoIcons as Record<string, Component>)[iconName];
  if (icon) {
    return icon;
  } else {
    return ArcoIcons.IconFile;
  }
}
</script>

<style scoped>
.tool-list {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
}

.tool {
  border: 8px solid #fff;
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
}
.tool-inner {
  display: block;
  background: #fff;
  overflow: hidden;
  border: 1px solid #dbdbdbab;
}
.tool-img {
  background: #f5f5f5;
  height: 100px;
  background-repeat: repeat;
  background-position: center;
  background-size: cover;
}
.tool-text {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  padding-bottom: 15px;
  padding-top: 20px;
  position: relative;
}

.tool-text .tool-icon {
  position: absolute;
  top: -15px;
  left: 15px;
  background: #fff;
  border-radius: 5px;
  border: 2px solid #fff;
  box-sizing: content-box;
}
.tool-text h2 {
  font-weight: 400;
  margin-bottom: 5px;
}
.tool-text p {
  color: #727272;
}
</style>
