<template>
  <a-card>
    <div class="air-header">
      <h1>Air Quality</h1>
      <p>Chengdu, Sichuang, China</p>
    </div>
    <div class="air-main">
      <div class="air-main-left">
        <span>20</span>
      </div>
      <div class="air-main-right">
        <chart :option="option" />
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import chart from '@/components/chart/index.vue';

const option = ref({
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
    min: 0,
  },
  series: [
    {
      data: [0, 230, 224, 218, 135, 147, 260],
      type: 'line',
      smooth: true,
      showSymbol: false,
    },
  ],
})
</script>

<style scoped lang="less">
/* 头部 */
.air-header {
  margin-bottom: 10px;

  h1 {
    font-size: 1.1em;
    margin: 0;
    margin-bottom: 3px;
    color: var(--color-text-2);
  }

  p {
    font-size: 0.8em;
    color: var(--color-text-3);
  }
}

/* 主体 */
.air-main {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  &-left {
    padding-top: 10px;
    flex: 1;

    span {
      font-size: 30px;
      font-weight: 300;
      line-height: 1;
      color: var(--color-text-1);
    }
  }

  &-right {
    width: 100px;
    height: 43px;
  }
}
</style>
