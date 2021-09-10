/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 16:33:12
 * @LastEditTime: 2021-09-08 08:37:39
 * @Description: file content
 */
class StackSort extends Array {
    constructor(array, comparer) {
        super();
        const N = array.length;
        this.push(null)
        for (let i = 0; i < N; i++) {
            this.push(array[i])
        }
        if (comparer) {
            this.less = comparer;
        }
    }
    swim(k) {
        let p = k >>> 1;
        while (k > 1 && this.less(this[p], this[k])) {
            this.exch(p, k);
            k = p;
            p = k >>> 1;
        }
    }
    sink(k, N) {
        while (k << 1 <= N) {
            let j = k << 1;
            if (j < N && this.less(this[j], this[j + 1])) {
                j++;
            }
            if (this.less(this[j], this[k])) {
                break;
            }
            this.exch(k, j);
            k = j;
        }
        /* // 以下为另一种实现方法，它省略了 j<N, 看起来更快，但语句更多了
        while (k << 1 < N) {
          let j = k << 1
          if (this.less(this[j], this[j + 1])) {
            j++
          }
          if (this.less(this[j], this[k])) {
            break
          }
          this.exch(k, j)
          k = j
        }
        if(k<<1 === N && this.less(this[k], this[N])){
            this.exch(k, N)
        }
        */
    }
    less(a, b) {
        return a.valueOf() < b.valueOf();
    }
    compare(a, b) {
        return Number(a) - Number(b);
    }
    exch(ai, bi) {
        const t = this[ai];
        this[ai] = this[bi];
        this[bi] = t;
    }
    resort() {
        let N = this.length - 1;
        for (let i = N / 2 | 0; i > 0; i--) {
            this.sink(i, N);
        }
        while (N > 1) {
            this.exch(1, N);
            this.sink(1, --N);
        }
    }
    get size() {
        return this.length - 1
    }
}
