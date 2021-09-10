/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-10 09:23:18
 * @LastEditTime: 2021-09-10 10:03:19
 * @Description: file content
 */

import { MinPQ } from "./02 | P211 | 练习 2.4.31︲最小堆优化2︲快速插入(插入~loglogN次比较)";


type Point = [number, number]

function angelTo(a: Point, b: Point) {
  return Math.atan2(a[1] - b[1], a[0] - b[0])
}

function drawPolygon(points: Point[]) {
  const pq = new MinPQ(points, (a, b) => {
    const ret = b[1] - a[1]
    if (ret !== 0) {
      return ret < 0
    }
    return b[0] - a[0] < 0
  });

  const minPoint = pq.delMin()

  return [
    minPoint,
    ...pq.tree().sort((a, b) => {
      return angelTo(a, minPoint) - angelTo(b, minPoint)
    })
  ]
}

console.log(drawPolygon([
  [1, 1],
  [2, 1],
  [2, 2],
  [1, 2],
  [3, 1.5],
  [1.5, 3]
]))