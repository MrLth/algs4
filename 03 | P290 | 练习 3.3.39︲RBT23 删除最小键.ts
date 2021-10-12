/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-10-11 15:46:37
 * @LastEditTime: 2021-10-12 09:37:34
 * @Description: file content
 */
import { RedBlackBST } from './03 | P281 | 符号表︲红黑树'

export class RBT23DeleteMin<K, V> extends RedBlackBST<K, V> {
  deleteMin() {
    if (this.root === null) return null

    if (!this.root.l?.red && !this.root.r?.red) {
      this.root.red = true
    }

    const ctx = { v: undefined }

    this.root = this.deleteMinBase(ctx, this.root)

    if (this.root) this.root.red = false

    return ctx.v
  }

  deleteMinBase(ctx, node) {
    if (node.l === null) {
      ctx.v = node.v
      return null
    }

    if (!node.l.red && !node.l.l?.red) {
      node = this.moveRedLeft(node)
    }

    node.l = this.deleteMinBase(ctx, node.l)
    return this.balance(node)
  }


  moveRedLeft(node) {
    this.reverseColor(node)
    if (node.r?.l?.red) {
      node.r = this.rotateRightBase(node.r)
      node = this.rotateLeftBase(node)
      this.reverseColor(node)
    }
    return node
  }

  balance(node) {
    if (node.r?.red && !node.l?.red) node = this.rotateLeftBase(node)
    if (node.l?.red && node.l?.l?.red) node = this.rotateRightBase(node)
    if (node.l?.red && node.r?.red) this.reverseColor(node)
    node.size = 1 + (node.l ? node.l.size : 0) + (node.r ? node.r.size : 0)
    return node
  }

  rotateLeftBase(a) {
    const b = a.r;
    a.r = b.l;
    b.l = a;
    b.red = a.red;
    a.red = true;
    b.size = a.size;
    a.size = 1 + (a.l ? a.l.size : 0) + (a.r ? a.r.size : 0);
    return b;
  }

  rotateRightBase(b) {
    const a = b.l;
    b.l = a.r;
    a.r = b;
    a.red = b.red;
    b.red = true;
    a.size = b.size;
    b.size = 1 + (b.l ? b.l.size : 0) + (b.r ? b.r.size : 0);
    return a;
  }

  reverseColor(node) {
    node.red = !node.red
    node.l.red = !node.l.red
    node.r.red = !node.r.red
  }
}

