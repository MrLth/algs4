/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-04 11:02:23
 * @LastEditTime: 2021-09-04 14:35:46
 * @Description: file content
 */
class MaxPQ {
    constructor(array, less) {
        this.list = [null];
        this.size = 0;
        if (less) {
            this.less = less;
        }
        for (let i = 0; i < array.length; i++) {
            this.insert(array[i]);
        }
    }
    swim(k) {
        const { list } = this;
        let p = k >>> 1;
        while (k > 1 && this.less(list[p], list[k])) {
            this.exch(p, k);
            k = p;
            p = k >>> 1;
        }
    }
    sink(k) {
        const { list } = this;
        const N = this.size;
        while (k << 1 <= N) {
            let j = k << 1;
            if (j < N && this.less(list[j], list[j + 1])) {
                j++;
            }
            if (this.less(list[j], list[k])) {
                break;
            }
            this.exch(k, j);
            k = j;
        }
    }
    insert(item) {
        this.size++;
        this.list[this.size] = item;
        this.swim(this.size);
    }
    max() {
        return this.list[1];
    }
    delMax() {
        const max = this.list[1];
        // 需要将值最低的元素放到堆顶，再从堆顶开始下沉，以确保堆有序
        this.list[1] = this.list.pop();
        this.size--;
        this.sink(1);
        return max;
    }
    less(a, b) {
        return a.valueOf() < b.valueOf();
    }
    exch(ai, bi) {
        const { list } = this
        const t = list[ai];
        list[ai] = list[bi];
        list[bi] = t;
    }
}
