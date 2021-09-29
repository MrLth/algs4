/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-10 15:46:50
 * @LastEditTime: 2021-09-10 16:59:25
 * @Description: file content
 */

interface Wrapper<K, V> {
  k: K
  v: V
}

export class BinarySearchST<K, V> {
  list: Wrapper<K, V>[] = []

  constructor(compare?: (a: K, b: K) => number) {
    if (compare) {
      this.compare = compare
    }
  }

  compare(a: K, b: K) {
    return Number(a) - Number(b)
  }


  rank(k: K) {
    const { list } = this
    let lo = 0, hi = this.size - 1
    while (lo <= hi) {
      const mid = lo + (hi - lo) / 2 | 0
      const ret = this.compare(k, list[mid].k)
      if (ret < 0) {
        lo = mid + 1
      } else if (ret > 0) {
        hi = mid - 1
      } else {
        return mid
      }
    }
    return lo // 当数组长度只有 1 时，lo 依然有可能返回 1，这是错误的, 但对于 JavaScript 无影响，毕竟也是 undefined
  }

  set(k: K, v: V) {
    let ret = 0
    if (this.size > 0) {
      ret = this.rank(k)
      if (this.compare(k, this.list[ret].k) === 0) {
        this.list[ret].v = v
        return
      }
    }
    for (let i = this.size; i > ret; i--) {
      this.list[i] = this.list[i - 1]
    }
    this.list[ret] = { k, v }
  }

  get(k: K) {
    if (this.size === 0) {
      return
    }
    const ret = this.rank(k)
    if (this.compare(k, this.list[ret].k) === 0) {
      return this.list[ret].v
    }
  }

  select(index: number) {
    return this.list[index]?.v
  }

  min() {
    return this.list[0]?.v
  }

  max() {
    return this.list[this.size - 1]?.v
  }

  get size() {
    return this.list.length
  }
}