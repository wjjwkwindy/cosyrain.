<template>
  <div style="margin-bottom: 16px">
    <a-space direction="vertical" style="width: 100%">
      <!-- 按钮 -->
      <a-row justify="end">
        <a-col>
          <a-button v-if="displayReset" @click="handleTaskReset" :disabled="taskStatus">重置</a-button>
          <a-button v-else type="primary" @click="handleTaskStart">启动</a-button>
        </a-col>
      </a-row>
      <!-- 表格 -->
      <a-row>
        <a-col :span="24">
          <a-table :columns="columns" :dataSource="data" :pagination="false">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'time'">
                {{ record.time * 1000 }}
              </template>
              <template v-else-if="column.key === 'status'">
                <a-tag :color="tagColor(record.status)">
                  {{ tagName(record.status) }}
                </a-tag>
              </template>
            </template>
          </a-table>
        </a-col>
      </a-row>
      <!-- 已完成任务 -->
      <a-row>
        <a-col>
          <span>已完成的任务：</span>
          <a-space>
            <a-tag v-if="!completedList.length">无</a-tag>
            <a-tag v-else v-for="item in completedList" color="purple">
              {{ item }}
            </a-tag>
          </a-space>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Queue from '@/logics/Queue';

type Status = 0 | 1 | 2;
interface Task {
  id: string;
  time: number;
  status: Status;
}

// 标签颜色
function tagColor(status: Status) {
  const colors = {
    0: '',
    1: 'red',
    2: 'green',
  };

  return colors[status];
}

// 标签名称
function tagName(status: Status) {
  const names = {
    0: '未执行',
    1: '执行中',
    2: '执行完毕',
  };

  return names[status];
}

// 模拟异步任务
const data = ref<Task[]>([
  { id: '任务1', time: 1, status: 0 },
  { id: '任务2', time: 3, status: 0 },
  { id: '任务3', time: 2, status: 0 },
  { id: '任务4', time: 3, status: 0 },
  { id: '任务5', time: 5, status: 0 },
  { id: '任务6', time: 1, status: 0 },
]);

// 表格列
const columns = [
  { title: '任务ID', dataIndex: 'id', key: 'id' },
  { title: '执行时间(ms)', slotName: 'time', key: 'time' },
  { title: '执行状态', slotName: 'status', key: 'status' },
];

const completedList = ref([] as Array<any>);
const displayReset = ref(false);
const taskStatus = ref(true);
const queue = new Queue();

function handleTaskStart() {
  displayReset.value = true;

  const list = data.value.map((item) => [sleep, item]);
  queue.addlist(list);
  queue.run();
}

function handleTaskReset() {
  taskStatus.value = true;
  displayReset.value = false;
  completedList.value = [];
  data.value.map((item) => {
    item.status = 0;
  });
}

function setCompletedList(taskId: string) {
  completedList.value.push(taskId);
}

function sleep(task: Task) {
  task.status = 1;

  return new Promise((resolve) => {
    setTimeout(() => {
      task.status = 2;
      resolve(true);

      setCompletedList(task.id);

      if (completedList.value.length === data.value.length) {
        taskStatus.value = false;
      }
    }, task.time * 1000);
  });
}
</script>

<style scoped></style>
