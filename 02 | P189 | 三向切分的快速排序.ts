/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 16:33:12
 * @LastEditTime: 2021-09-03 15:14:34
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

  compare(a: T, b: T) {
    return Number(a) - Number(b)
  }

  exch(ai: number, bi: number) {
    const t = this[ai]
    this[ai] = this[bi]
    this[bi] = t
  }


  resort(lo = 0, hi = this.length - 1) {
    if (hi <= lo) {
      return
    }
    let lt = lo, i = lo + 1, gt = hi, v = this[lo]
    while (i <= gt) {
      const cmp = this.compare(this[i], v)
      if (cmp < 0) {
        this.exch(lt++, i++)
      } else if (cmp > 0) {
        this.exch(i, gt--)
      } else {
        i++
      }
    }
    this.resort(lo, lt - 1)
    this.resort(gt + 1, hi)
  }
}