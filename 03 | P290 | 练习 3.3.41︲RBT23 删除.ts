/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-10-12 09:49:53
 * @LastEditTime: 2021-10-12 11:06:37
 * @Description: file content
 */

import { RBT23DeleteMin } from './03 | P290 | 练习 3.3.39︲RBT23 删除最小键'
import { RBT23DeleteMax } from './03 | P290 | 练习 3.3.40︲RBT23 删除最大键'



export class RBT23Delete<K, V> extends RBT23DeleteMin<K, V>  {
  delete(k: K) {
    if (this.root === null) return null

    if (!this.root.l?.red && !this.root.r?.red) {
      this.root.red = true
    }

    const ctx = { v: undefined }

    this.root = this.deleteBase(ctx, this.root, k)

    if (this.root) this.root.red = false

    return ctx.v
  }


  deleteBase(ctx, node, k) {
    if (this.compare(k, node.k) < 0) {
      if (node.l === null) {
        return node
      }

      if (!node.l.red && !node.l.l?.red) {
        node = this.moveRedLeft(node)
      }
      node.l = this.deleteBase(ctx, node.l, k)
    } else {
      if (node.l?.red) {
        node = this.rotateRightBase(node)
      }
      if (node.r === null) {
        if (this.compare(k, node.k) === 0) {
          ctx.v = node.v
          return null
        }
        return node
      }
      if (!node.r.red && !node.r.l?.red) {
        node = this.moveRedRight(node)
      }
      if (this.compare(k, node.k) === 0) {
        const t = node.v
        const { k, v } = this.minBase(node.r)
        node.v = v
        node.k = k
        node.r = this.deleteMinBase(ctx, node.r)
        ctx.v = t
      } else {
        node.r = this.deleteBase(ctx, node.r, k)
      }
    }

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

  minBase(node) {
    if (node === null) {
      return null
    }
    while (true) {
      if (node.l === null) {
        return node
      } else {
        node = node.l
      }
    }
  }
}

