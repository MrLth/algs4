/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-08 10:09:27
 * @LastEditTime: 2021-09-08 10:23:32
 * @Description: file content
 */
import { MinPQ } from './02 | P211 | 练习 2.4.31︲最小堆优化2︲快速插入(插入~loglogN次比较)'

class Task {
  name: string;
  needTime: number // ms
  constructor(name: string, needTime: number) {
    this.name = name;
    this.needTime = needTime;
  }
}

export class SPT {
  pq = new MinPQ<Task>([], (a: Task, b: Task) => a.needTime < b.needTime);
  add(name: string, needTime: number) {
    this.pq.insert(new Task(name, needTime));
  }
  popup() {
    return this.pq.delMin()
  }
}