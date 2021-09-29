/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-11 13:56:08
 * @LastEditTime: 2021-09-13 09:41:11
 * @Description: file content
 */

class CacheST extends BinarySearchST {
    constructor(dotGraph, compare) {
        super(dotGraph, compare);
        this.cacheIndex = -1;
        if (compare) {
            this.compare = compare;
        }
    }
    set(k, v) {
        if (this.keys[this.cacheIndex] && this.compare(k, this.keys[this.cacheIndex]) === 0) {
            return this.values[this.cacheIndex] = v;
        }
        return super.set(k, v)
    }

    get(k) {
        if (this.keys[this.cacheIndex] && this.compare(k, this.keys[this.cacheIndex]) === 0) {
            return this.values[this.cacheIndex]
        }
        return super.get(k)
    }
}
