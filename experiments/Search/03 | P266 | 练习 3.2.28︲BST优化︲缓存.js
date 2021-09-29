/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-14 14:11:23
 * @LastEditTime: 2021-09-15 09:09:40
 * @Description: file content
 */
class BSTExtCache extends LinearBST {
    constructor() {
        super([]);
        this.cacheItem = null;
    }
    get(k) {
        if (this.cacheItem && this.cacheItem[0] === k) {
            return this.cacheItem[1];
        }
        return super.get(k);
    }
    set(k, v) {
        this.cacheItem = [k, v];
        return super.set(k, v);
    }
}
