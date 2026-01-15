<template>
  <a-card>
    <div class="air-header">
      <h1>AQI (US)</h1>
      <p>{{ city }}</p>
      <p>更新时间：{{ updateTime }}</p>
    </div>
    <div class="air-main">
      <div class="air-main-left" :style="{ color: aqiLevel }">
        <span class="air-main-left-aqi">{{ aqi }}</span>
        <span class="air-main-left-aqi2">{{ aqiLevelChinese }}</span>
      </div>
      <div class="air-main-right">
        <chart :option="option" />
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
let cachedData: any = null;
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import chart from '@/components/chart/index.vue';

import { getAqicnData } from '@/utils/api';

let city = ref('');
let updateTime = ref('');
let aqi = ref(0);
let aqiLevel = ref('');
let aqiLevelChinese = ref('');

onMounted(async () => {
  if (cachedData) {
    updateAQI(cachedData);
    return;
  }

  try {
    const res = await getAqicnData();
    // @ts-ignore
    if (res.status !== 'ok') throw new Error('获取 AQI 数据失败！');
    cachedData = res.data;

    updateAQI(res.data);
  } catch (error) {
    console.error(error);
    message.error('获取 AQI 数据失败！');
  }
});

function updateAQI(data: any) {
  option.value.series[0].data = data.forecast.daily.pm25.map((item: any) => item.avg);
  option.value.xAxis.data = data.forecast.daily.pm25.map((item: any) => item.day);
  city.value = data.city.name;
  updateTime.value = data.time.s;
  aqi.value = data.aqi;
  switch (true) {
    case aqi.value <= 50:
      aqiLevel.value = 'rgb(89, 182, 31)';
      aqiLevelChinese.value = '良好';
      break;
    case aqi.value <= 100:
      aqiLevel.value = 'rgb(238, 199, 50)';
      aqiLevelChinese.value = '适中';
      break;
    case aqi.value <= 150:
      aqiLevel.value = 'rgb(234, 140, 52)';
      aqiLevelChinese.value = '差';
      break;
    case aqi.value <= 200:
      aqiLevel.value = 'rgb(233, 84, 120)';
      aqiLevelChinese.value = '不健康';
      break;
    case aqi.value <= 300:
      aqiLevel.value = 'rgb(179, 63, 186)';
      aqiLevelChinese.value = '严重';
      break;
    case aqi.value > 300:
      aqiLevel.value = 'rgb(201, 32, 51)';
      aqiLevelChinese.value = '危险';
      break;
    default:
      break;
  }
}

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
    data: [],
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
    min: 0,
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true,
      showSymbol: false,
      itemStyle: {
        color: '#86909c',
      },
    },
  ],
});
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
    margin-bottom: 0;
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
    display: flex;
    align-items: center;

    &-aqi {
      font-size: 30px;
      font-weight: 400;
      line-height: 1;
      margin-right: 1rem;
    }

    &-aqi2 {
      font-size: 16px;
      font-weight: 300;
      line-height: 1;
    }
  }

  &-right {
    width: 100px;
    height: 43px;
  }
}
</style>
