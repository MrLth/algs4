/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-10 15:46:50
 * @LastEditTime: 2021-09-13 08:26:28
 * @Description: file content
 */
class BinarySearchST {
    constructor(dotGraph, compare) {
        this.dotGraph = dotGraph
        this.count = 0
        this.compareCount = 0
        this.keys = new Proxy([], {
            get: (target, key) => {
                if (/\d+/.test(key)) {
                    this.count++;
                }
                return target[key];
            },
            set: (target, key, value) => {
                if (/\d+/.test(key)) {
                    // this.count++
                }

                return Reflect.set(target, key, value)
            }
        });
        this.values = [];
        if (compare) {
            this.compare = compare;
        }
    }
    compare(a, b) {
        this.compareCount++
        if (a < b) {
            return -1
        } else if (a > b) {
            return 1
        } else {
            return 0
        }
        // return Number(a) - Number(b);
    }
    rank(k) {


        const { keys } = this;
        let lo = 0, hi = this.size - 1;
        while (lo <= hi) {
            const mid = lo + (hi - lo) / 2 | 0;
            const ret = this.compare(k, keys[mid]);
            if (ret < 0) {
                hi = mid - 1;
            } else if (ret > 0) {
                lo = mid + 1;
            } else {
                this.dotGraph.dot(this.i, mid, '#ffbbbb', 1)

                return mid;
            }
        }
        this.dotGraph.dot(this.i, lo, '#ff1111', 1)

        return lo; // 当数组长度只有 1 时，lo 依然有可能返回 1，这是错误的, 但对于 JavaScript 无影响，毕竟也是 undefined
    }
    set(k, v) {
        if (this.size === 0 || k > this.keys[this.size - 1]) {
            this.keys.push(k);
            this.values.push(v);
            return
        }
        if (k < this.keys[0]) {
            this.keys.unshift(k)
            this.values.unshift(v)
            return
        }
        let ret = this.rank(k);
        if (this.compare(k, this.keys[ret]) === 0) {
            this.values[ret] = v;
            return;
        }
        this.keys.splice(ret, 0, k)
        this.values.splice(ret, 0, v)


        // let ret = 0;
        // if (this.size > 0) {
        //     ret = this.rank(k);

        //     if (this.compare(k, this.keys[ret]) === 0) {
        //         this.values[ret] = v;
        //         return;
        //     }
        // }
        // for (let i = this.size; i > ret; i--) {
        //     this.keys[i] = this.keys[i - 1];
        //     this.values[i] = this.values[i - 1];
        // }
        // this.keys[ret] = k;
        // this.values[ret] = v;
    }
    get(k) {
        if (this.size === 0) {
            return;
        }
        const ret = this.rank(k);
        if (this.compare(k, this.keys[ret]) === 0) {
            return this.values[ret];
        }
    }
    select(index) {
        return this.values[index];
    }
    min() {
        return this.values[0];
    }
    max() {
        return this.values[this.size - 1];
    }
    get size() {
        return this.values.length;
    }
}
