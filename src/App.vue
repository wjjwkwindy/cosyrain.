<template>
  <router-view></router-view>
  <GlobalSearchModal ref="searchModalRef" />
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';

import GlobalSearchModal from './components/GlobalSearchModal.vue';

const searchModalRef = ref();
function openSearchModal() {
  searchModalRef.value.visible = true;
}

provide('openSearchModal', openSearchModal);
</script>

<style scoped></style>
