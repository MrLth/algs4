/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 10:05:51
 * @LastEditTime: 2021-09-02 12:13:52
 * @Description: file content
 */
class InsertSortPro extends Array {
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
