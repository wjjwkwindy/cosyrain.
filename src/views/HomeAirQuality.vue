<template>
  <div class="air">
    <div class="air-header">
      <h1>Air Quality</h1>
      <p>Chengdu, Sichuang, China</p>
    </div>
    <div class="air-main">
      <div class="air-main-left">
        <span>20</span>
      </div>
      <!-- <div class="air-main-right">
        <h2>Moderate</h2>
        <p>Air quality is acceptable.</p>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
/* 卡片 */
.air {
  background: #fff;
  box-shadow: @card-shadow;
  padding: 10px 20px;
}

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

    span {
      font-size: 30px;
      font-weight: 300;
      line-height: 1;
      color: var(--color-text-1);
    }
  }
}
</style>
