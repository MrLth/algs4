/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 16:33:12
 * @LastEditTime: 2021-09-03 16:05:58
 * @Description: file content
 */
export class QuickSort<T> extends Array {
  aux: T[] = []
  constructor(array: T[], comparer?: (a: T, b: T) => boolean) {
    super(array.length)

    const N = array.length
    for (let i = 0; i < N; i++) {
      this[i] = array[i]
    }

    if (comparer) {
      this.less = comparer
    }
  }

  less(a: T, b: T) {
    return a.valueOf() < b.valueOf()
  }

  compare(a: T, b: T) {
    return Number(a) - Number(b)
  }

  exch(ai: number, bi: number) {
    const t = this[ai]
    this[ai] = this[bi]
    this[bi] = t
  }

  resort(lo = 0, hi = this.length - 1) {
    let lt = lo, gt = hi, i = 1
    while (i <= gt) {
      const cmp = this.compare(this[i], this[lt])
      if (cmp < 0) {
        this.exch(lt++, i++)
      } else if (cmp > 0) {
        this.exch(i, gt--)
      } else {
        i++
      }
    }
  }
}