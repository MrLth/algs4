/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 16:33:12
 * @LastEditTime: 2021-09-07 16:27:57
 * @Description: file content
 */
export class QuickSortSelect<T> extends Array {
  aux: T[] = []
  constructor(array: T[], comparer?: (a: T, b: T) => boolean) {
    super(array.length)

    const N = array.length
    for (let i = 0; i < N; i++) {
      this[i] = array[i]
    }

    // 打乱，消除对输入的依赖
    for (let i = 0; i < N; i++) {
      const j = Math.random() * N | 0
      const t = this[j]
      this[j] = this[i]
      this[i] = t
    }

    if (comparer) {
      this.less = comparer
    }
  }

  less(a: T, b: T) {
    return a.valueOf() < b.valueOf()
  }

  exch(ai: number, bi: number) {
    const t = this[ai]
    this[ai] = this[bi]
    this[bi] = t
  }

  partition(lo: number, hi: number) {
    let i = lo, j = hi + 1, v = this[lo]
    while (true) {
      // 比 v 小的留在原地，否则终止循环等待交换 A
      while (this.less(this[++i], v)) {
        if (i === hi) {
          break
        }
      }
      // 比 v 大的留在原地，否则终止循环等待交换 B
      while (this.less(v, this[--j])) { }
      if (i >= j) {
        break
      }
      // 交换 A B，直到 i===j,即 i 左侧全小于 v，右侧全大于 v
      this.exch(i, j)
    }
    // 此时 j 才代表左子数组的最右侧元素
    this.exch(lo, j)
    return j
  }

  resort(lo = 0, hi = this.length - 1) {
    if (hi <= lo) {
      return
    }
    const j = this.partition(lo, hi)
    this.resort(lo, j - 1)
    this.resort(j + 1, hi)
  }

  select(k: number) {
    const N = this.length
    let lo = 0, hi = N - 1
    const i = this.partition(lo, hi)
    if (i === k) {
      return this[k]
    } else if (i > k) {
      return this.partition(lo, i - 1)
    } else {
      return this.partition(i + 1, hi)
    }
  }
}