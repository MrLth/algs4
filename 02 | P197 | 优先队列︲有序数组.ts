/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-04 11:02:23
 * @LastEditTime: 2021-09-04 13:53:30
 * @Description: file content
 */

export class MaxPQ<T> extends Array {
  constructor(array: T[], comparer?: (a: T, b: T) => number) {
    super()

    if (comparer) {
      this.comparer = comparer
    }

    for (let i = 0; i < array.length; i++) {
      this.insert(array[i])
    }
  }

  insert(item: T) {
    let i = this.length
    while (i > 0) {
      if (this.comparer(this[i - 1], item) < 0) {
        break
      }
      this[i] = this[i - 1]
      i--
    }
    this[i] = item
  }
  max() {
    return this[this.length - 1]
  }
  delMax() {
    return this.pop()
  }

  comparer(a: T, b: T) {
    return Number(a) - Number(b)
  }


}