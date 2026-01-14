<template>
  <!-- 统计 -->
  <a-row :gutter="16">
    <a-col :span="12">
      <a-card>
        <a-statistic title="总小时" :value="11.28" :value-style="{ color: '#3f8600' }">
          <template #prefix>
            <icon-clock-circle />
          </template>
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card>
        <a-statistic title="已观看" :value="12" :value-style="{ color: '#cf1322' }">
          <template #suffix>
            <span>/ 250</span>
          </template>
        </a-statistic>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less"></style>