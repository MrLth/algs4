/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-15 09:56:34
 * @LastEditTime: 2021-09-15 10:11:09
 * @Description: file content
 */

import { BST } from "./03 | P252 | 符号表︲二叉查找树"


export class BSTExtValidate<K, V> extends BST<K, V> {
  constructor() {
    super([])
  }

  isUniqueKey(node = this.root, min?: K, max?: K) {
    if (node === null) {
      return true
    }
    if (node.r && this.compare(node.r.k, node.k) === 0) {
      return false
    }

    if (node.l && this.compare(node.l.k, node.k) === 0) {
      return false
    }
    return this.isUniqueKey(node.l, min, max) && this.isUniqueKey(node.r, min, max)
  }
}