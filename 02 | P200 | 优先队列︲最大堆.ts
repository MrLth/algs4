/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-04 11:02:23
 * @LastEditTime: 2021-09-06 16:10:43
 * @Description: file content
 */

export class MaxPQ<T>  {
  private list: T[] = []
  size = 0

  constructor(array: T[], less?: (a: T, b: T) => boolean) {

    if (less) {
      this.less = less
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
    this.list[this.size] = item
    this.swim(this.size)
  }
  max() {
    return this.list[1]
  }
  delMax() {
    if (this.size === 0) {
      return
    }
    if (this.size === 1) {
      return this.list.pop()
    }
    this.size--
    const max = this.list[1]
    // 需要将值最低的元素放到堆顶，再从堆顶开始下沉，以确保堆有序
    this.list[1] = this.list.pop() as T
    this.sink(1)
    return max
  }

  less(a: T, b: T) {
    return (a as any).valueOf() < (b as any).valueOf()
  }
  exch(ai: number, bi: number) {
    const { list } = this
    const t = list[ai];
    list[ai] = list[bi];
    list[bi] = t;
  }
}