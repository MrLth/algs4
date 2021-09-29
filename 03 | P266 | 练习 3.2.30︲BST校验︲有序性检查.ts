/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-15 09:56:34
 * @LastEditTime: 2021-09-15 10:09:58
 * @Description: file content
 */

import { BST } from "./03 | P252 | 符号表︲二叉查找树"


export class BSTExtValidate<K, V> extends BST<K, V> {
  constructor() {
    super([])
  }

  isOrdered(node = this.root, min?: K, max?: K) {
    if (node === null) {
      return true
    }
    if (node.r && (node.r.k < node.k || (max && node.r.k > max))) {
      return false
    }

    if (node.l && (node.l.k > node.k || (min && node.l.k < min))) {
      return false
    }
    return this.isOrdered(node.l, min, max) && this.isOrdered(node.r, min, max)
  }


}