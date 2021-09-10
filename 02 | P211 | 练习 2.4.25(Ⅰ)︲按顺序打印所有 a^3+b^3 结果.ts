/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-06 10:10:14
 * @LastEditTime: 2021-09-06 11:00:27
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
  const pq = new MinPQ(Array.from({ length: N }).map((_, i) => new Item(i + 1, 0)))

  while (pq.size) {
    const top = pq.delMin()
    console.log(top)
    if (top.j < N) {
      pq.insert(new Item(top.i, top.j + 1))
    }
  }
}

main(10)