<template>
  <div class="button-container">
    <div>
      <a-space>
        <a-upload @change="onChange" :auto-upload="false">
          <template #upload-item></template>
        </a-upload>

        <a-divider direction="vertical" />

        <a-button @click="clearCanvas" type="outline">
          <template #icon>
            <icon-delete />
          </template>
          <template #default>清除画笔</template>
        </a-button>

        <a-button @click="clearCanvas" type="outline">
          <template #icon>
            <icon-undo />
          </template>
          <template #default>撤销</template>
        </a-button>
      </a-space>
    </div>

    <a-button @click="clearCanvas" type="outline">
      <template #icon>
        <icon-download />
      </template>
      <template #default>下载图片</template>
    </a-button>
  </div>

  <div class="canvas-container" ref="canvasContainer">
    <a-empty v-if="!image">
      <template #image>
        <icon-empty :strokeWidth="2" />
      </template>
      请上传图片
    </a-empty>

    <canvas
      v-show="image"
      ref="canvas"
      class="canvas"
      @mousedown="mousedown"
      @mousemove="mousemove"
      @mouseup="mouseup"
      @mouseleave="mouseup"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconDelete, IconEmpty, IconDownload,IconUndo } from '@arco-design/web-vue/es/icon';
import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces';

// refs
const file = ref<HTMLInputElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const image = ref<HTMLImageElement | null>(null);
const canvasContainer = ref<HTMLDivElement | null>(null);

const onChange = (uploadFile: FileItem[]) => {
  const tempFile = uploadFile[uploadFile.length - 1].file;
  if (!tempFile || !tempFile.type.startsWith('image/')) {
    if (file.value) {
      file.value.value = '';
    }
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      image.value = img;
      drawImageOnCanvas();
    };
    img.src = reader.result as string;
  };
  reader.readAsDataURL(tempFile);

  return false;
};

function drawImageOnCanvas() {
  if (!canvas.value || !canvasContainer.value || !image.value) return;
  const context = canvas.value.getContext('2d');
  if (!context) return;
  ctx.value = context;

  const canvasWidth = canvasContainer.value.clientWidth;
  const imgWidth = image.value.width;
  const imgHeight = image.value.height;

  const aspectRatio = imgWidth / imgHeight;
  const canvasHeight = canvasWidth / aspectRatio;

  canvas.value.width = canvasWidth;
  canvas.value.height = canvasHeight;
  context.drawImage(image.value, 0, 0, canvasWidth, canvasHeight);
}

// 绘画状态
const isDrawing = ref(false);
const lastX = ref(0);
const lastY = ref(0);
// const paths = ref<Array<{ x1: number; y1: number; x2: number; y2: number }>>(
//   []
// );

const mousedown = (e: MouseEvent) => {
  isDrawing.value = true;
  lastX.value = e.offsetX;
  lastY.value = e.offsetY;
};
const mousemove = (e: MouseEvent) => {
  if (!isDrawing.value || !ctx.value) return;

  ctx.value.beginPath();
  ctx.value.moveTo(lastX.value, lastY.value);
  ctx.value.lineTo(e.offsetX, e.offsetY);
  ctx.value.strokeStyle = 'red';
  ctx.value.lineWidth = 3;
  ctx.value.stroke();

  lastX.value = e.offsetX;
  lastY.value = e.offsetY;
};
const mouseup = () => {
  isDrawing.value = false;
};

const clearCanvas = () => {
  if (!ctx.value || !canvas.value || !image.value) return;

  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.value.drawImage(
    image.value,
    0,
    0,
    canvas.value.width,
    canvas.value.height
  );
};
</script>
<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.canvas-container {
  width: 100%;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas-container .arco-empty {
  padding: 120px 0;
}
.canvas {
  width: 100%;
  display: block;
  cursor: crosshair;
}
</style>
