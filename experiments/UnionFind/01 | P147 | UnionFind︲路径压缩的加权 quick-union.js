/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-01 16:34:52
 * @LastEditTime: 2021-09-01 16:58:39
 * @Description: file content
 */
var UnionFind = /** @class */ (function () {
    function UnionFind(count) {
        this.i = 0;
        this.count = count;
        this.ids = Array.from({ length: count }).map(function (_, i) { return i; });
        this.size = Array.from({ length: count }).map(function () { return 1; });
    }
    UnionFind.prototype.union = function (p, q) {
        var pv = this.find(p);
        var qv = this.find(q);
        if (pv === qv) {
            return;
        }
        if (this.size[qv] < this.size[pv]) {
            this.size[pv] += this.size[qv];
            this.set(qv, pv);
        }
        else {
            this.size[qv] += this.size[pv];
            this.set(pv, qv);
        }
    };
    UnionFind.prototype.get = function (i) {
        this.i++;
        return this.ids[i];
    };
    UnionFind.prototype.set = function (i, v) {
        this.i++;
        this.ids[i] = v;
    };
    UnionFind.prototype.find = function (p) {
        var arr = [p];
        var n = this.get(p);
        while (n !== this.get(n)) {
            arr.push(n);
            n = this.get(n);
        }
        if (p !== n) {
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var v = arr_1[_i];
                this.set(v, n);
            }
        }
        return n;
    };
    UnionFind.prototype.connected = function (p, q) {
        if (this.find(p) === this.find(q)) {
            return true;
        }
        return false;
    };
    return UnionFind;
}());
// const uf = new UnionFind(10);
// [
//   [4, 3],
//   [3, 8],
//   [6, 5],
//   [9, 4],
//   [2, 1],
//   [8, 9],
//   [5, 0],
//   [7, 2],
//   [6, 1],
//   [1, 0],
//   [6, 7]
// ].map(([p, q]) => {
//   if (uf.connected(p, q)) {
//     return
//   }
//   uf.union(p, q)
//   console.log(p, q)
// })
// console.log(uf.count + 'components', uf.i)
