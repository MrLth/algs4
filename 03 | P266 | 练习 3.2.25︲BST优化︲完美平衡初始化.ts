/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-14 14:11:23
 * @LastEditTime: 2021-09-15 08:27:23
 * @Description: file content
 */

import { BST } from "./03 | P252 | 符号表︲二叉查找树"

export class BSTExtConstructor<K, V> extends BST<K, V> {
  constructor(array: [K, V][]) {
    super([])

    array.sort((a, b) => Number(a[0]) - Number(b[0]))
    this.middleInsert(array, 0, array.length - 1)
  }

  middleInsert(array: [K, V][], lo: number, hi: number) {
    if (lo < hi) {
      return
    }
    const mid = lo + (hi - lo / 2) | 0
    this.set(array[mid][0], array[mid][1])
    this.middleInsert(array, lo, mid - 1)
    this.middleInsert(array, mid + 1, hi)
  }
}