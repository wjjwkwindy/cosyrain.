<template>
  <div class="footer">
    <div class="container">
      <span>CosyRain © 2025. Deployed by </span>
      <vercel />
    </div>
  </div>
</template>

<script setup lang="ts">
import vercel from '@/assets/vercel.svg';
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  font-size: 0.9em;
  color: var(--color-text-2);
  margin-top: auto;
  text-align: center;

  svg {
    width: 50px;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #8882;

    span {
      margin-right: 5px;
    }
  }
}
</style>
