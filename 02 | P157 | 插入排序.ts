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

  exch(ai: number, bi: number) {
    const t = this[ai]
    this[ai] = this[bi]
    this[bi] = t
  }

  resort() {
    const N = this.length;
    for (let i = 1; i < N; i++) {
      for (let j = i; j > 0 && this.less(this[j], this[j - 1]); j--) {
        this.exch(j, j - 1);
      }
    }
    return this;
  }
}