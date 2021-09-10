/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-06 10:10:14
 * @LastEditTime: 2021-09-06 11:39:22
 * @Description: file content
 */
import { MinPQ } from "./02 | P200 | 优先队列︲最小堆"

class Item {
  i: number
  j: number
  sum: number
  constructor(i: number, j: number) {
    this.i = i
    this.j = j
    this.sum = i ** 3 + j ** 3
  }

  valueOf() {
    return this.sum
  }
}

function main(N: number) {
  const pq = new MinPQ(Array.from({ length: N ** (1 / 2) }).map((_, i) => new Item(i + 1, 0)))
  let initItem = new Item(0, 0)
  let prev = initItem

  let equalList: number[][] = []

  while (pq.size) {
    const top = pq.delMin()
    if (top.sum > N) {
      break
    }
    if (prev.sum === top.sum) {
      if (top.i !== prev.j && !equalList.find(v => v.includes(top.i))) {
        console.log(top.i, top.j, prev.i, prev.j, '=' + top.sum)
        equalList.push([top.i, top.j, prev.i, prev.j])
      }
    } else {
      equalList = []
    }
    prev = top
    if (top.j < N) {
      pq.insert(new Item(top.i, top.j + 1))
    }
  }
}

main(1e6)