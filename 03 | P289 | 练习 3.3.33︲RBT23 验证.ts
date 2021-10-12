/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-22 14:48:05
 * @LastEditTime: 2021-10-11 11:30:05
 * @Description: file content
 */

import { BSTNode, BST } from './03 | P266 | 练习 3.2.34︲线性符号表'
class RedBlackBSTNode<K, V> extends BSTNode<K, V>  {
  l: RedBlackBSTNode<K, V> | null = null
  r: RedBlackBSTNode<K, V> | null = null
  red = true
  constructor(k: K, v: V) {
    super(k, v)
  }
}


export class RedBlackBST<K, V> extends BST<K, V> {
  root: RedBlackBSTNode<K, V> | null
  cache: RedBlackBSTNode<K, V> | null

  constructor(array) {
    super(array)
  }


  set(k: K, v: V) {
    this.root = this.setBase(this.root, k, v)
    this.root.red = false
    return v
  }

  private setBase(node: RedBlackBSTNode<K, V>, k: K, v: V) {
    if (node === null) {
      return new RedBlackBSTNode(k, v)
    }

    const cmp = this.compare(k, node.k)
    if (cmp < 0) node.l = this.setBase(node.l, k, v)
    else if (cmp > 0) node.r = this.setBase(node.r, k, v)
    else node.v = v

    node = this.flipColor(this.rotateRight(this.rotateLeft(node)))
    node.size = 1 + (node.l ? node.l.size : 0) + (node.r ? node.r.size : 0)
    return node
  }


  private rotateLeft(a: RedBlackBSTNode<K, V>) {
    if (!(a.r && a.r.red) || (a.l && a.l.red)) {
      return a
    }
    const b = a.r
    a.r = b.l
    b.l = a
    b.red = a.red
    a.red = true
    b.size = a.size
    a.size = 1 + (a.l ? a.l.size : 0) + (a.r ? a.r.size : 0)
    return b
  }

  private rotateRight(b: RedBlackBSTNode<K, V>) {
    if (!(b.l && b.l.red) || !(b.l && b.l.l && b.l.l.red)) {
      return b
    }
    const a = b.l
    b.l = a.r
    a.r = b
    a.red = b.red
    b.red = true
    a.size = b.size
    b.size = 1 + (b.l ? b.l.size : 0) + (b.r ? b.r.size : 0)
    return a
  }

  private flipColor(node: RedBlackBSTNode<K, V>) {
    if (!(node.l && node.l.red) || !(node.r && node.r.red)) {
      return node;
    }
    node.l.red = false
    node.r.red = false
    node.red = true
    return node
  }


  is23(node: RedBlackBSTNode<K, V> = this.root) {
    if (!node) {
      return true
    }
    if (node.r && node.r.red) {
      return false
    }
    if (node.l && node.l.red && node.l.l && node.l.l.red) {
      return false
    }
    return this.is23(node.l) && this.is23(node.r)
  }

  // 所有空链接到根结点的高度应该相等
  isBalanced(
    node: RedBlackBSTNode<K, V> = this.root,
    ref = { current: null, rst: true },
    height = 0,
  ) {
    if (!node) {
      if (ref.current === null) {
        ref.current = height
        return true
      }
      return ref.rst = (ref.current === height)
    }
    if (ref.rst) {
      height = node.red ? height : height + 1
      return this.isBalanced(node.l, ref, height) && this.isBalanced(node.r, ref, height)
    }
    return false
  }
}