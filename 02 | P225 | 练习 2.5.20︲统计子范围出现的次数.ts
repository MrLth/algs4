/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-09 11:27:18
 * @LastEditTime: 2021-09-09 16:12:45
 ? 原题是计算CPU的空闲时间，给一系列任务的起始时间和结束时间，计算CPU的最长空闲时间和最长的繁忙时间。
 ? 用下面的方法得到各范围的频率，很轻松就能得到结果
 */
import { MinPQ } from "./02 | P211 | 练习 2.4.31︲最小堆优化2︲快速插入(插入~loglogN次比较)";

function statistic(array: [number, number][]) {
  const pq = new MinPQ(array.map(([a, b]) => [a, b, 1]), (a, b) => {
    const ret = a[0] - b[0]
    if (ret !== 0) {
      return ret > 0
    }
    return b[1] - a[1] > 0
  })

  const rst: number[][] = []

  while (pq.size > 1) {
    const [a, b, countA] = pq.delMin()
    const [c, d, countB] = pq.delMin()

    if (b <= c) {
      rst.push([a, b, countA])
      pq.insert([c, d, countB])
    } else if (d > b) {
      pq.insert([a, c, countA])
      pq.insert([c, b, countA + countB])
      pq.insert([b, d, countB])
    } else if (d === b) {
      if (a === c) {
        pq.insert([a, b, countA + countB])
      } else {
        pq.insert([a, c, countA])
        pq.insert([c, d, countA + countB])
      }
    } else if (a === c) {
      pq.insert([a, d, countA + countB])
      pq.insert([d, b, countB])
    } else {
      pq.insert([a, c, countA])
      pq.insert([c, d, countA + countB])
      pq.insert([d, b, countA])
    }
  }

  rst.push(pq.delMin())

  return rst

}

console.log(statistic([[6, 10], [6, 9], [8, 11], [10, 11], [11, 20]]))