/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-11 13:56:08
 * @LastEditTime: 2021-09-11 17:17:36
 * @Description: file content
 */

class InsertValueST extends BinarySearchST {
    constructor(dotGraph, compare) {
        super(dotGraph, compare);
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
    }
    rank(k) {
        const { keys } = this;
        let lo = 0, hi = this.size - 1;

        while (lo <= hi) {
            if (k < keys[lo]) {
                // ! k < keys[lo] 会导致 mid 的取值小于 lo，出现死循环。
                // ? 取中位数的做法不可能 mid 小于 lo，所以会在循环条件语句时退出循环
                // ? 本身满足此条件时就是正确的位置了
                return lo
            }

            const division = keys[hi] - keys[lo];
            const mid = Math.min(
                division === 0
                    ? lo    // 分母不可为 0
                    : lo + Math.floor((k - keys[lo]) * (hi - lo) / division),
                hi
            )

            const ret = this.compare(k, keys[mid]);
            if (ret < 0) {
                hi = mid - 1;
            } else if (ret > 0) {
                lo = mid + 1;
            } else {
                // this.dotGraph.dot(this.i, mid, '#bbffbb', 1)
                return mid;
            }
        }
        // this.dotGraph.dot(this.i, lo, '#11ff11', 1)

        return lo; // 当数组长度只有 1 时，lo 依然有可能返回 1，这是错误的, 但对于 JavaScript 无影响，毕竟也是 undefined
    }
}
