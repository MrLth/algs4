/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 16:47:22
 * @LastEditTime: 2021-09-01 09:20:57
 * @Description: 著名的连通性问题
 */
class UnionFind {
  count: number
  ids: number[]
  constructor(count: number) {
    this.count = count
    this.ids = Array.from({ length: count }).map((_, i) => i)
  }
  union(p: number, q: number) {
    if (p < 0 || p >= this.count || q < 0 || q >= this.count) {
      throw new Error('错误的 p, q 输入')
    }

  }
  find(p: number) {
    if (p < 0 || p >= this.count) {
      throw new Error('错误的 p 输入')
    }
  }

  connected(p: number, q: number) {
    if (p < 0 || p >= this.count || q < 0 || q >= this.count) {
      throw new Error('错误的 p, q 输入')
    }
    return false
  }


}


const uf = new UnionFind(100);

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
console.log(uf.count + 'components')