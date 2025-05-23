---
title: 多个任务并行执行队列
date: 2025-04-23 10:05:58
tag: TS
---

## 代码实现

定义类：

```js
class Queue {
  constructor(workerLen) {
    this.workerLen = workerLen ?? 3; // 同时执行的任务数
    this.list = []; // 任务队列
    this.worker = new Array(this.workerLen); // 正在执行的任务
  }

  /**
   * 执行一个任务
   * @param { number } index
   * @param { Function } fn: 执行的函数
   * @param { Array } args: 传递给执行函数的参数
   */
  *executionFunc(index, fn, ...args) {
    const _this = this;

    yield fn.call(...args).then(function () {
      // 任务执行完毕后，再次分配任务并执行任务
      _this.worker[index] = undefined;
      _this.run();
    });
  }

  /**
   * 添加到任务队列
   * @param { Array<any[]> } list: 任务队列
   */
  addList(list) {
    for (const item of list) {
      this.list.unshift(item);
    }
  }

  // 分配并执行任务
  run() {
    const runIndex = []; // // 需要运行的任务index，eg: [0, 1, 2]

    for (let i = 0; i < this.workerLen; i++) {
      const len = this.list.length;

      if (!this.worker[i] && len > 0) {
        // 需要执行的任务
        this.worker[i] = this.executionFunc(i, ...this.list[len - 1]);

        runIndex.push(i);

        // 从任务队列内删除任务
        this.list.pop();
      }
    }

    // 执行任务
    for (const index of runIndex) {
      this.worker[index].next();
    }
  }
}
```

调用：

```js
// 延迟执行的函数
function sleep(id, time) {
  console.log('开始id', id);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('结束id', id);
      resolve();
    }, time * 1000);
  });
}

const queue = new Queue();

// 添加到任务队列
queue.addList([
  [sleep, undefined, '0001', 3],
  [sleep, undefined, '0002', 5],
  [sleep, undefined, '0003', 8],
  [sleep, undefined, '0004', 1],
  [sleep, undefined, '0005', 12],
  [sleep, undefined, '0006', 8],
  [sleep, undefined, '0007', 2],
  [sleep, undefined, '0008', 10],
]);

// 执行任务
queue.run();
```

输出:

```
开始id 0001
开始id 0002
开始id 0003
结束id 0001
开始id 0004
结束id 0004
开始id 0005
结束id 0002
开始id 0006
结束id 0003
开始id 0007
结束id 0007
开始id 0008
结束id 0006
结束id 0005
结束id 0008
```

## 代码演示

每个任务经过一段时间后完成。当前任务执行完后自动执行下一任务，最多有 3 个任务在执行。

<MultipleTaskQueue />

<script setup>
  import MultipleTaskQueue from '../../src/components/MultipleTaskQueue.vue'
</script>
