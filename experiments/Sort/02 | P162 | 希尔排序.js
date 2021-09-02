/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 14:55:38
 * @LastEditTime: 2021-09-02 15:28:06
 * @Description: file content
 */
class ShellSort extends Array {
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
        let h = 1;
        while (h < N / 3)
            h = 3 * h + 1 | 0;
        while (h >= 1) {
            for (let i = h; i < N; i++) {
                for (let j = i; j >= h && this.less(this[j], this[j - h]); j -= h) {
                    this.exch(j, j - h);
                }
            }
            h = h / 3 | 0;
        }
        return this;
    }
}
