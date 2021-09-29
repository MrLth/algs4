/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-11 13:56:08
 * @LastEditTime: 2021-09-13 09:41:33
 * @Description: file content
 */

import { BinarySearchST } from "./03 | P240 | 符号表︲有序平行数组"

export class CacheST<K extends number, V> extends BinarySearchST<K, V> {
  cacheIndex = -1
  constructor(compare?: (a: K, b: K) => number) {
    super(compare)
    if (compare) {
      this.compare = compare
    }
  }

  set(k: K, v: V) {
    if (this.keys[this.cacheIndex] && this.compare(k, this.keys[this.cacheIndex]) === 0) {
      return this.values[this.cacheIndex] = v;
    }
    return super.set(k, v)
  }

  get(k: K) {
    if (this.keys[this.cacheIndex] && this.compare(k, this.keys[this.cacheIndex]) === 0) {
      return this.values[this.cacheIndex]
    }
    return super.get(k)
  }

}