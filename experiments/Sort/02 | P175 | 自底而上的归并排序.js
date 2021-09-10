/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 16:33:12
 * @LastEditTime: 2021-09-03 11:05:29
 * @Description: file content
 */
class MergeSort extends Array {
    constructor(array, comparer) {
        super(array.length);
        this.aux = [];
        for (let i = 0; i < array.length; i++) {
            this[i] = array[i];
        }
        if (comparer) {
            this.less = comparer;
        }
    }
    less(a, b) {
        return a.valueOf() < b.valueOf();
    }
    exch(ai, bi) {
        const t = this[ai];
        this[ai] = this[bi];
        this[bi] = t;
    }
    merge(lo, mid, hi) {
        let i = lo, j = mid + 1;
        for (let k = lo; k <= hi; k++) {
            this.aux[k] = this[k];
        }
        for (let k = lo; k <= hi; k++) {
            if (i > mid) {
                this[k] = this.aux[j++];
            }
            else if (j > hi) {
                this[k] = this.aux[i++];
            }
            else if (this.less(this.aux[i], this.aux[j])) {
                this[k] = this.aux[i++];
            }
            else {
                this[k] = this.aux[j++];
            }
        }
        return this;
    }
    resort() {
        const N = this.length;
        for (let sz = 1; sz < N; sz += sz) { // sz 子数组大小
            for (let lo = 0; lo < N - sz; lo += sz + sz) {
                this.merge(lo, lo + sz - 1, Math.min(N - 1, lo + sz + sz - 1));
            }
        }
    }
}
