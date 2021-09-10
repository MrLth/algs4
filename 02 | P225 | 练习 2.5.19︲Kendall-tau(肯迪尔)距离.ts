/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-09 08:59:41
 * @LastEditTime: 2021-09-09 10:20:08
 * @Description:
 ? 思路: 假设数组A是有序的[1,2,3,...]，通过哈希表得出数组B相对数组A的顺序，然后再通过之前写好函数得出结果就好
 */

import { Inversions } from './02 | P181 | 练习 2.2.19︲求倒置数(线性对数级别)'

function kendallTau<T>(a: T[], b: T[]) {
  if (a.length !== b.length) {
    return
  }
  const n = a.length
  const map = new Map<T, number>()
  for (let i = 0; i < n; i++) {
    map.set(a[i], i)
  }
  const indexes: number[] = []
  for (let i = 0; i < n; i++) {
    const index = map.get(b[i])
    if (index === undefined) {
      console.log('index', i, a, b, map)
      return
    }
    indexes[i] = index
  }
  console.log(Inversions.bruteForce(indexes))
  return Inversions.count(indexes)
}

const listA = Array.from({ length: 10 }).map((_, i) => i)
for (let i = 0; i < listA.length; i++) {
  const j = Math.random() * listA.length | 0
  const t = listA[j]
  listA[j] = listA[i]
  listA[i] = t
}

const listB = Array.from({ length: 10 }).map((_, i) => i)
for (let i = 0; i < listB.length; i++) {
  const j = Math.random() * listB.length | 0
  const t = listB[j]
  listB[j] = listB[i]
  listB[i] = t
}

console.log(kendallTau(listB, listA))