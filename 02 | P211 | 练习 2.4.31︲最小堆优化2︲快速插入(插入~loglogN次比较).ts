/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-04 11:02:23
 * @LastEditTime: 2021-09-10 09:44:39
 * @Description: file content
 */

export class MinPQ<T>  {
  private list: T[] = []
  size = 0

  constructor(array: T[], large?: (a: T, b: T) => boolean) {

    if (large) {
      this.large = large
    }

    for (let i = 0; i < array.length; i++) {
      this.insert(array[i])
    }
  }


  swim(k: number) {
    const { list } = this

    const ancestorIndex = this.getTargetIndex(k)
    const v = list[k]
    let p = k

    while (k > ancestorIndex) {
      list[k] = list[p >>= 1]
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
    if (c === N && large(v, list[c])) {
      list[k] = list[c]
      k = c
    }
    list[k] = v
  }

  getTargetIndex(k: number) {
    const { list } = this
    let lvTop = 0
    let lv = Math.log2(k) | 0
    let lvBottom = lv

    while (lvTop < lvBottom) {
      const lvMiddle = lvTop + (lvBottom - lvTop) / 2 | 0
      const p = k >> (lv - lvMiddle)
      if (this.large(list[p], list[k])) {
        lvBottom = lvMiddle
      } else {
        lvTop = lvMiddle + 1
      }
    }

    return k >> (lv - lvTop)
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
    return (a as any)?.valueOf() > (b as any)?.valueOf()
  }

  tree() {
    return this.list.slice(1)
  }
}

/*
const q = new MinPQ([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
console.log(q)
/* */