<template>
  <div class="header roboto-font">
    <div class="header-logo">
      <RouterLink to="/" class="logo"> CosyRain. </RouterLink>
      <p class="role">Fullstack Developer</p>
    </div>

    <div class="header-nav">
      <div class="header-links">
        <RouterLink to="/" :class="{ active: isActive('/') }">Home</RouterLink>
        <RouterLink to="/post" :class="{ active: isActive('/post') }">Post</RouterLink>
        <RouterLink to="/tool" :class="{ active: isActive('/tool') }">Tool</RouterLink>
        <RouterLink to="/photo" :class="{ active: isActive('/photo') }">Photo</RouterLink>
        <RouterLink to="/movie" :class="{ active: isActive('/movie') }">Movie</RouterLink>
        <RouterLink to="/about" :class="{ active: isActive('/about') }">About</RouterLink>
      </div>
      <div class="header-icons">
        <icon-sun v-if="!isDarkMode" :size="20" @click="toggleDarkMode" />
        <icon-moon v-else :size="20" @click="toggleDarkMode" />
        <icon-search :size="20" @click="showSearchModal" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';

// 判断当前所在路由，并将链接高亮
const route = useRoute();
const isActive = (path: string) => {
  if (path === '/') {
    return path === route.path;
  } else {
    return route.path.indexOf(path) === 0;
  }
};

// 暗黑模式
const isDarkMode = ref(false);
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  // document.documentElement.classList.toggle('dark', isDarkMode.value);
};

// 搜索弹窗
const openSearchModal = inject('openSearchModal') as () => void;
function showSearchModal() {
  openSearchModal();
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 70px;
}

.header-logo {
  margin-bottom: 30px;

  .logo {
    display: inline-block;
    font-weight: bold;
    font-size: 2em;
    background: @green-bg;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 20px;
  }

  .role {
    display: inline-block;
    font-size: 1rem;
    color: var(--color-text-3);
    margin-bottom: 0;
  }
}

.header-nav {
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-shadow: @card-shadow;
  padding: 20px;

  .header-links {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 40px;

    a {
      color: var(--color-text-1);
      font-size: 0.95em;
      font-weight: bold;
    }

    a.active,
    a:hover,
    .header-links a.active {
      text-decoration: underline;
      color: @green-text;
    }
  }

  .header-icons {
    display: flex;
    gap: 10px;
    align-items: center;

    svg {
      cursor: pointer;
      outline: none;
    }
  }
}
</style>
