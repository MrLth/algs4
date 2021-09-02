/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 10:05:51
 * @LastEditTime: 2021-09-02 12:14:56
 * @Description: file content
 */
export class InsertSort<T> extends Array {
  constructor(array: T[], comparer?: (a: T, b: T) => boolean) {
    super(array.length)

    for (let i = 0; i < array.length; i++) {
      this[i] = array[i]
    }

    if (comparer) {
      this.less = comparer
    }
  }

  less(a: T, b: T) {
    return a.valueOf() < b.valueOf()
  }

  resort() {
    const N = this.length

    for (let i = 1; i < N; i++) {
      let min = i, v = this[i]

      for (let j = i - 1; j > -1 && this.less(v, this[j]); j--) {
        min = j
      }

      if (i !== min) {
        for (let j = i; j > min; j--) {
          this[j] = this[j - 1]
        }
        this[min] = v
      }
    }
    return this
  }
}