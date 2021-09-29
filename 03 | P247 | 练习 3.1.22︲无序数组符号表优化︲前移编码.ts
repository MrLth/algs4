/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-11 08:39:10
 * @LastEditTime: 2021-09-11 08:45:57
 * @Description: file content
 */
interface Wrapper<K, V> {
  k: K
  v: V
}

export class DisorderArrayST<K, V> extends Array<Wrapper<K, V>> {
  constructor(array: [K, V][]) {
    super();
    for (const [k, v] of array) {
      this.set(k, v);
    }
  }
  get(k: K) {
    for (let i = 0; i < this.length; i++) {
      if (this[i].k === k) {
        const rst = this[i]
        for (let j = i; j > 0; j--) {
          this[j] = this[j - 1]
        }
        return this[0] = rst
      }
    }
  }
  set(k: K, v: V) {
    this.unshift({ k, v })
  }
}
