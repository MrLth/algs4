/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-04 11:02:23
 * @LastEditTime: 2021-09-10 09:03:35
 * @Description: file content
 */


type Wrapper<T> = { item: T, time: number }

export class MaxPQ<T>  {
  private list: Wrapper<T>[] = []
  size = 0
  private i = 0

  constructor(array: T[], compare?: (a: T, b: T) => number) {

    if (compare) {
      this.compare = compare
    }

    for (let i = 0; i < array.length; i++) {
      this.insert(array[i])
    }
  }


  swim(k: number) {
    const { list } = this
    let p = k >>> 1
    while (k > 1 && this.less(list[p], list[k])) {
      this.exch(p, k)
      k = p
      p = k >>> 1
    }
  }

  sink(k: number) {
    const { list } = this
    const N = this.size
    while (k << 1 <= N) {
      let j = k << 1
      if (j < N && this.less(list[j], list[j + 1])) {
        j++
      }
      if (this.less(list[j], list[k])) {
        break
      }
      this.exch(k, j)
      k = j
    }
  }

  insert(item: T) {
    this.size++;
    this.list[this.size] = {
      item,
      time: this.i++
    }
    this.swim(this.size)
  }
  max() {
    return this.list[1].item
  }
  delMax() {
    if (this.size === 0) {
      return
    }
    if (this.size === 1) {
      return this.list.pop()?.item
    }
    this.size--
    const max = this.list[1]
    // 需要将值最低的元素放到堆顶，再从堆顶开始下沉，以确保堆有序
    this.list[1] = this.list.pop() as Wrapper<T>
    this.sink(1)
    return max.item
  }

  compare(a: T, b: T) {
    return Number(a) - Number(b)
  }

  less(a: Wrapper<T>, b: Wrapper<T>) {
    const ret = this.compare(a.item, b.item)
    if (ret !== 0) {
      return ret < 0
    }
    return b.time - a.time < 0
  }
  exch(ai: number, bi: number) {
    const { list } = this
    const t = list[ai];
    list[ai] = list[bi];
    list[bi] = t;
  }
}


const pq = new MaxPQ([
  { v: 1 }, { v: 10, i: 0 }, { v: 10, i: 1 }, { v: 10, i: 2 }],
  (a, b) => a.v - b.v
)

// console.log(JSON.stringify(pq, null, 2))
console.log(pq.delMax())
console.log(pq.delMax())
console.log(pq.delMax())
console.log(pq.delMax())