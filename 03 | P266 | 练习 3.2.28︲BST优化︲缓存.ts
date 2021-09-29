/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-14 14:11:23
 * @LastEditTime: 2021-09-15 09:12:00
 * @Description: file content
 */

import { BST } from "./03 | P252 | 符号表︲二叉查找树"

// 缓存对于性能有一定提升，但非常不明显

export class BSTExtCache<K, V> extends BST<K, V> {
  cacheItem: [K, V] | null = null
  constructor() {
    super([])
  }

  get(k: K) {
    if (this.cacheItem && this.cacheItem[0] === k) {
      return this.cacheItem[1]
    }
    return super.get(k)
  }

  set(k: K, v: V) {
    this.cacheItem = [k, v]
    return super.set(k, v)
  }
}