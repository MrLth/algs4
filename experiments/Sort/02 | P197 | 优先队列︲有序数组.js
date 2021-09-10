/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-02 16:33:12
 * @LastEditTime: 2021-09-04 11:58:18
 * @Description: file content
 */
class MaxPQ extends Array {
    constructor(array, comparer) {
        super();
        if (comparer) {
            this.comparer = comparer;
        }
        for (let i = 0; i < array.length; i++) {
            this.insert(array[i]);
        }
    }
    insert(item) {
        let i = this.length
        while (i > 0) {
            if (this.comparer(this[i - 1], item) < 0) {
                break
            }
            this[i] = this[i - 1]
            i--
        }
        this[i] = item
    }
    max() {
        return this[this.length - 1]
    }
    delMax() {
        return this.pop()
    }
    comparer(a, b) {
        return Number(a) - Number(b);
    }
}
