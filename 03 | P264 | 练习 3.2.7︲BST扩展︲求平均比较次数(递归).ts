/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-14 14:11:23
 * @LastEditTime: 2021-09-14 15:23:54
 * @Description: file content
 */

import { BST } from "./03 | P252 | 符号表︲二叉查找树"

export class BSTExtAvgCompares<K, V> extends BST<K, V> {
  constructor() {
    super([])
  }

  avgComparesRecursion() {
    return this.avgComparesRecursionBase() / this.size() + 1
  }

  avgComparesRecursionBase(node = this.root, count = 1) {
    if (node == null) {
      return 0;
    }

    count += this.avgComparesRecursionBase(node.l, count + 1)
    count += this.avgComparesRecursionBase(node.l, count + 1)

    return count;
  }
}