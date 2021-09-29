/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-10 15:46:50
 * @LastEditTime: 2021-09-13 09:02:47
 * @Description: file content
 */
export class BinarySearchST<K, V> {
  keys: K[] = []
  values: V[] = []

  constructor(compare?: (a: K, b: K) => number) {
    if (compare) {
      this.compare = compare
    }
  }

  compare(a: K, b: K) {
    return Number(a) - Number(b)
  }

  rank(k: K) {
    const { keys } = this
    let lo = 0, hi = this.size - 1
    while (lo <= hi) {
      const mid = lo + (hi - lo) / 2 | 0
      const ret = this.compare(k, keys[mid])
      if (ret < 0) {
        hi = mid - 1
      } else if (ret > 0) {
        lo = mid + 1
      } else {
        return mid
      }
    }
    return lo // 当数组长度只有 1 时，lo 依然有可能返回 1，这是错误的, 但对于 JavaScript 无影响，毕竟也是 undefined
  }

  set(k: K, v: V) {
    if (this.size === 0 || k > this.keys[this.size - 1]) {
      this.keys.push(k);
      this.values.push(v);
      return
    }
    if (k < this.keys[0]) {
      this.keys.unshift(k)
      this.values.unshift(v)
      return
    }
    let ret = this.rank(k);
    if (this.compare(k, this.keys[ret]) === 0) {
      this.values[ret] = v;
      return;
    }
    this.keys.splice(ret, 0, k)
    this.values.splice(ret, 0, v)

  }

  get(k: K) {
    if (this.size === 0) {
      return
    }
    const ret = this.rank(k)
    if (this.compare(k, this.keys[ret]) === 0) {
      return this.values[ret]
    }
  }

  select(index: number) {
    return this.values[index]
  }

  min() {
    return this.values[0]
  }

  max() {
    return this.values[this.size - 1]
  }

  get size() {
    return this.values.length
  }
}