/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-01 16:34:52
 * @LastEditTime: 2021-09-01 16:58:39
 * @Description: file content
 */

export class UnionFind {
  count: number
  ids: number[]
  size: number[]
  i = 0

  constructor(count: number) {
    this.count = count
    this.ids = Array.from({ length: count }).map((_, i) => i)
    this.size = Array.from({ length: count }).map(() => 1)
  }
  union(p: number, q: number) {
    const pv = this.find(p)
    const qv = this.find(q)
    if (pv === qv) {
      return
    }
    if (this.size[qv] < this.size[pv]) {
      this.size[pv] += this.size[qv]
      this.set(qv, pv)
    } else {
      this.size[qv] += this.size[pv]
      this.set(pv, qv)
    }
  }

  get(i: number) {
    this.i++
    return this.ids[i]
  }

  set(i: number, v: number) {
    this.i++
    this.ids[i] = v
  }

  find(p: number) {
    const arr = [p]
    let n = this.get(p)
    while (n !== this.get(n)) {
      arr.push(n)
      n = this.get(n)
    }
    if (p !== n) {
      for (const v of arr) {
        this.set(v, n)
      }
    }
    return n
  }

  connected(p: number, q: number) {
    if (this.find(p) === this.find(q)) {
      return true
    }
    return false
  }
}


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