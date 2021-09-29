/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-14 14:11:23
 * @LastEditTime: 2021-09-15 09:54:02
 * @Description: file content
 */

import { BST } from "./03 | P252 | 符号表︲二叉查找树"


export class BSTExtValidate<K, V> extends BST<K, V> {
  constructor() {
    super([])
  }

  validateSimple(node = this.root) {
    if (node === null) {
      return true
    }
    const rs = node.r ? node.r.size : 0
    const ls = node.l ? node.l.size : 0
    if (node.size !== rs + 1 + ls) {
      return false
    }
    return this.validateSimple(node.r) && this.validateSimple(node.l)
  }

  validateSize() {
    return this.validateSizeRecursion()[0]
  }

  validateSizeRecursion(node = this.root) {
    if (node === null) {
      return [true, 0]
    }
    const [rb, rs] = this.validateSizeRecursion(node.r)
    const [lb, ls] = this.validateSizeRecursion(node.l)

    return [rb && lb && rs + ls + 1 === node.size, rs + ls + 1]
  }
}