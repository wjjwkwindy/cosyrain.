class Queue {
  workerLen: number;
  list: Array<any[]>;
  worker: Array<any>;

  constructor(workerLen?: number) {
    this.workerLen = workerLen ?? 3;
    this.list = [];
    this.worker = new Array(this.workerLen);
  }

  *executionFunc(index: number, fn: Function, ...args: any[]) {
    const _this = this;

    yield fn.call(null, ...args).then(function () {
      _this.worker[index] = null;
      _this.run();
    });
  }

  addlist(list: Array<any[]>) {
    for (const item of list) {
      this.list.unshift(item);
    }
  }

  run() {
    const runIndex = []; // 运行的索引

    // 分配任务
    for (let i = 0; i < this.workerLen; i++) {
      const len = this.list.length;
      if (!this.worker[i] && len > 0) {
        const [fn, ...args] = this.list[len - 1];
        this.worker[i] = this.executionFunc(i, fn, ...args);
        runIndex.push(i);
        this.list.pop();
      }
    }

    // 执行任务
    for (const index of runIndex) {
      this.worker[index].next();
    }
  }
}

export default Queue;