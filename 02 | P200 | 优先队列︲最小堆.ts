/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-06 10:26:32
 * @LastEditTime: 2021-09-08 10:55:25
 * @Description: file content
 */
export class MinPQ<T>  {
  private list: T[] = []
  size = 0

  constructor(array: T[], less?: (a: T, b: T) => boolean) {

    if (less) {
      this.large = less
    }

    for (let i = 0; i < array.length; i++) {
      this.insert(array[i])
    }
  }


  swim(k: number) {
    const { list } = this
    let p = k >>> 1
    while (k > 1 && this.large(list[p], list[k])) {
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
      if (j < N && this.large(list[j], list[j + 1])) {
        j++
      }
      if (this.large(list[j], list[k])) {
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
  min() {
    return this.list[1]
  }
  delMin() {
    const min = this.list[1]
    // 需要将值最低的元素放到堆顶，再从堆顶开始下沉，以确保堆有序
    this.list[1] = this.list.pop() as T
    this.size--
    this.sink(1)
    return min
  }

  large(a: T, b: T) {
    return (a as any).valueOf() > (b as any).valueOf()
  }
  exch(ai: number, bi: number) {
    const { list } = this
    const t = list[ai];
    list[ai] = list[bi];
    list[bi] = t;
  }
}