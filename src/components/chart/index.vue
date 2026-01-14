<template>
  <VCharts
    v-if="renderChart"
    :option="option"
    :autoresize="autoResize"
    :style="{ width, height }"
  />
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

import { use } from 'echarts/core';
import { PieChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VCharts from 'vue-echarts';

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PieChart,
  LineChart,
  CanvasRenderer,
]);

defineProps({
  option: {
    type: Object,
    default() {
      return {
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
      };
    },
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
});

const renderChart = ref(false);
nextTick(() => {
  renderChart.value = true;
});
</script>

<style scoped lang="less"></style>
