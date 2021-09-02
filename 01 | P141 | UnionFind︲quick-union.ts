/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 16:47:22
 * @LastEditTime: 2021-09-01 16:32:32
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
    const pv = this.find(p)
    const qv = this.find(q)
    if (pv === qv) {
      return
    }
    this.set(pv, qv)
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
    let n = this.get(p)
    while (n !== this.get(n)) {
      n = this.get(n)
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