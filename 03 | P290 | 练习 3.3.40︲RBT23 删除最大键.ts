/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-10-11 15:46:37
 * @LastEditTime: 2021-10-12 10:26:08
 * @Description: file content
 */
import { RBT23DeleteMin } from './03 | P290 | 练习 3.3.39︲RBT23 删除最小键'

export class RBT23DeleteMax<K, V> extends RBT23DeleteMin<K, V> {
  deleteMax() {
    if (this.root === null) return null

    if (!this.root.l?.red && !this.root.r?.red) {
      this.root.red = true
    }

    const ctx = { v: undefined }

    this.root = this.deleteMaxBase(ctx, this.root)

    if (this.root) this.root.red = false

    return ctx.v
  }

  deleteMaxBase(ctx, node) {
    if (node.l?.red) {
      node = this.rotateRightBase(node)
    }

    if (node.r === null) {
      ctx.v = node.v
      return null
    }

    if (!node.r.red && !node.r.l?.red) {
      node = this.moveRedRight(node)
    }

    node.r = this.deleteMaxBase(ctx, node.r)
    return this.balance(node)
  }


  moveRedRight(node) {
    this.reverseColor(node)
    if (node.l?.l?.red) {
      node = this.rotateRightBase(node)
      this.reverseColor(node)
    }
    return node
  }

}

