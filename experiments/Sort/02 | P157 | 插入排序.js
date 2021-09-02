/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 10:05:51
 * @LastEditTime: 2021-09-02 11:07:10
 * @Description: file content
 */
class InsertSort extends Array {
    constructor(array, comparer) {
        super(array.length);
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
