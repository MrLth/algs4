/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-14 14:11:23
 * @LastEditTime: 2021-09-14 15:37:12
 * @Description: file content
 */

import { BST } from "./03 | P252 | 符号表︲二叉查找树"

export class BSTExtRandomKey<K, V> extends BST<K, V> {
  constructor() {
    super([])
  }

  randomKey() {
    let k = Math.random() * this.size()

    let node = this.root
    while (node !== null) {
      const lSize = node.l ? node.l.size : 0
      if (k < lSize) {
        node = node.l
      } else if (k >= lSize && k < lSize + 1) {
        return node
      } else {
        k -= lSize + 1
        node = node.r
      }
    }
  }
}