/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 16:33:12
 * @LastEditTime: 2021-09-02 17:07:01
 * @Description: file content
 */
export class MergeSortRecursion<T> extends Array {
  aux: T[] = []
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

  exch(ai: number, bi: number) {
    const t = this[ai]
    this[ai] = this[bi]
    this[bi] = t
  }

  merge(lo: number, mid: number, hi: number) {
    let i = lo, j = mid + 1
    for (let k = lo; k <= hi; k++) {
      this.aux[k] = this[k]
    }
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        this[k] = this.aux[j++]
      } else if (j > hi) {
        this[k] = this.aux[i++]
      } else if (this.less(this.aux[i], this.aux[j])) {
        this[k] = this.aux[i++]
      } else {
        this[k] = this.aux[j++]
      }
    }
    return this
  }

  resort() {
    const sort = (lo, hi) => {
      if (hi <= lo) {
        return;
      }
      const mid = lo + (hi - lo) / 2 | 0;
      sort(lo, mid);
      sort(mid + 1, hi);
      this.merge(lo, mid, hi);
    }
    sort(0, this.length - 1);
    return this;

  }
}