/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 16:33:12
 * @LastEditTime: 2021-09-04 11:01:45
 * @Description: file content
 */
export class MaxPQ<T> extends Array {
  constructor(array: T[], comparer?: (a: T, b: T) => boolean) {
    super()

    if (comparer) {
      this.less = comparer
    }

    for (let i = 0; i < array.length; i++) {
      this.insert(array[i])
    }
  }

  insert(item: T) {
    this.push(item)
  }

  max() {
    let max = this[0]
    for (let i = 1; i < this.length; i++) {
      if (this.less(max, this[i])) {
        max = this[i]
      }
    }
    return max
  }

  delMax() {
    let maxI = 0, maxV = this[0]
    for (let i = 1; i < this.length; i++) {
      if (this.less(maxV, this[i])) {
        maxV = this[i]
        maxI = i
      }
    }
    return this.splice(maxI, 1)[0]
  }

  less(a: T, b: T) {
    return a.valueOf() < b.valueOf()
  }

}