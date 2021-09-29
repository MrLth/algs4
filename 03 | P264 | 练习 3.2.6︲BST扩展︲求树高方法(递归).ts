/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-14 13:42:41
 * @LastEditTime: 2021-09-14 14:10:25
 * @Description: file content
  ? 还有一种方法，既像 size 一样，每个节点都维护其所在树的最高高度，但是空间是线性的，虽然查询时间是常数级别(此属性在维护平衡BST时估计有用)
  ? 要做到需要修改的方法不少：
  ?   1. set
  ?   2. deleteMin
  ?   3. deleteMax
  ?   4. delete
  ? 但要做的事大差不差：添加修改节点时从下往上更新 height(Math.max，只有高度大于原高度才更新)，可以用栈保存访问节点时的路径
 */
import { BST } from './03 | P252 | 符号表︲二叉查找树'

export class BSTExtHeight<K, V> extends BST<K, V> {
  constructor() {
    super([])
  }

  height() {
    let node = this.root
    if (node === null) {
      return 0
    }
    const stack = [{ node: this.root, height: 1 }]
    let maxHeight = 0
    while (stack.length > 0) {
      const { height, node } = stack.pop()
      maxHeight = Math.max(height, maxHeight)
      if (node.l) {
        stack.push({ height: height + 1, node: node.l })
      }
      if (node.r) {
        stack.push({ height: height + 1, node: node.r })
      }
    }
    return maxHeight
  }

  heightRecursion(node = this.root, height = 1) {
    if (node === null) {
      return height - 1
    }

    return Math.max(
      this.heightRecursion(node.r, height + 1),
      this.heightRecursion(node.l, height + 1)
    )
  }
}