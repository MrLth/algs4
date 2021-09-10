/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-04 11:02:23
 * @LastEditTime: 2021-09-06 15:00:52
 * @Description: file content
 */

export class MinPQ<T>  {
  private list: T[] = []
  size = 0
  max: T | null = null

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
    const v = list[k]
    let p = k
    while (k > 1 && this.large(list[p >>= 1], v)) {
      list[k] = list[p]
      k = p
    }
    list[k] = v
  }

  sink(k: number) {
    const { list, large } = this
    const N = this.size
    const v = list[k]
    let c = k
    while ((c <<= 1) < N) {
      if (large(list[c], list[c + 1])) c++
      if (large(list[c], v)) break
      list[k] = list[c]
      k = c
    }
    console.log(c)
    if (c === N && large(v, list[c])) {
      list[k] = list[c]
      k = c
    }
    console.log(list, c, k, N)
    list[k] = v
  }

  insert(item: T) {
    this.size++;
    this.list[this.size] = item
    this.swim(this.size)
    // max 逻辑
    if (this.max === null) {
      this.max = item
    } else if (this.large(item, this.max)) {
      this.max = item
    }
  }
  get min() {
    return this.list[1]
  }
  delMin() {
    if (this.size === 0) {
      return
    }
    if (this.size === 1) {
      this.size = 0
      this.max = null
      return this.list.pop()
    }
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

  compare(a: T, b: T) {
    return Number(a) - Number(b)
  }
}

const q = new MinPQ([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
console.log(q, q.max)
q.delMin()
console.log(q)
q.delMin()
console.log(q)
q.delMin()
console.log(q)
q.delMin()
console.log(q)
q.delMin()
console.log(q)
q.delMin()
q.insert(11)
console.log(q)
q.delMin()
console.log(q)
q.delMin()
console.log(q)
q.delMin()
console.log(q)
q.delMin()
q.insert(12)
console.log(q)
q.delMin()
console.log(q)
q.delMin()
console.log(q)