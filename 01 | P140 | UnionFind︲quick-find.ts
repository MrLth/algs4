/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 16:47:22
 * @LastEditTime: 2021-09-01 16:58:43
 * @Description: 著名的连通性问题
 */
export class UnionFind {
  count: number
  ids: number[]
  i = 0

  constructor(count: number) {
    this.count = count
    this.ids = Array.from({ length: count }).map((_, i) => i)
  }
  union(p: number, q: number) {
    const pv = this.get(p)
    const qv = this.get(q)
    if (pv === qv) {
      return
    }
    for (let i = 0; i < this.ids.length; i++) {
      if (this.get(i) === pv) {
        this.set(i, qv)
      }
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

  find(p) {
    return this.ids[p]
  }

  connected(p: number, q: number) {
    if (this.get(p) === this.get(q)) {
      return true
    }
    return false
  }
}


const uf = new UnionFind(10);

[
  [4, 3],
  [3, 8],
  [6, 5],
  [9, 4],
  [2, 1],
  [8, 9],
  [5, 0],
  [7, 2],
  [6, 1],
  [1, 0],
  [6, 7]
].map(([p, q]) => {
  if (uf.connected(p, q)) {
    return
  }
  uf.union(p, q)
  console.log(p, q)
})
console.log(uf.count + 'components', uf.i)