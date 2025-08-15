<template>
  <div class="header roboto-font">
    <div class="logo-container">
      <RouterLink to="/" class="logo"> CosyRain. </RouterLink>
      <p class="header-role">Fullstack Developer</p>
    </div>

    <div class="header-nav">
      <div class="header-links">
        <RouterLink to="/posts">Post</RouterLink>
        <RouterLink to="/tools">Tool</RouterLink>
        <RouterLink to="/photo">Photo</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
      <div class="header-icons">
        <icon-search :size="20" @click="showSearchModal" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 搜索弹窗
const openSearchModal = inject('openSearchModal') as () => void;
function showSearchModal() {
  openSearchModal();
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
}

.logo-container {
  margin-bottom: 30px;
}
.logo {
  display: inline-block;
  font-weight: bold;
  font-size: 2em;
  background: #42f298;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 20px;
}
.logo img {
  width: 160px;
}

.header-role {
  display: inline-block;
  font-size: 1rem;
  color: #636363;
  margin-bottom: 0;
}
.header-nav {
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
  padding: 20px;
}

.header-links {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
}
.header-links a {
  color: #333;
  font-size: 0.95em;
  font-weight: bold;
}
.header-links a:hover {
  text-decoration: underline;
}

.header-icons {
  display: flex;
  gap: 10px;
  align-items: center;
}
.header-icons svg {
  cursor: pointer;
  outline: none;
}
</style>
