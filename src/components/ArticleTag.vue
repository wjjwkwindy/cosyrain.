<template>
  <a-tag class="tag">{{ title }}</a-tag>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: String
});
</script>

<style scoped>
.tag{
  margin-left: 10px;
}
</style>