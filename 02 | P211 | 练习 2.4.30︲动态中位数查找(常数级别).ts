/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-06 15:14:48
 * @LastEditTime: 2021-09-06 16:21:18
 * @Description: file content
 */
import { MinPQ } from './02 | P211 | 练习 2.4.26︲最小堆优化1︲无需交换的堆'
import { MaxPQ } from './02 | P200 | 优先队列︲最大堆'


export class DynamicMedian<T> {
  maxPq = new MaxPQ<T>([])
  minPq = new MinPQ<T>([])
  middleVal: number | null = null
  middle: T | null = null
  size = 0

  constructor(array?: T[]) {
    if (array) {
      for (const item of array) {
        this.add(item)
      }
    }
    this.add = this.add.bind(this)
  }

  add(item: T) {
    this.size++
    this.middleVal = Number(item)
    this.middle = item
    this.minPq.insert(item)
    this.add = this.nextAdd.bind(this)
    return
  }

  get() {
    return this.middle
  }

  nextAdd(item: T) {
    this.size++

    const { minPq, maxPq } = this

    if (Number(item) > (this.middleVal as number)) {
      minPq.insert(item)
    } else {
      maxPq.insert(item)
    }

    let difference = this.maxPq.size - this.minPq.size
    if (difference !== 0) {
      const [remove, add] = difference > 0
        ? [maxPq.delMax.bind(maxPq), minPq.insert.bind(minPq)]
        : [minPq.delMin.bind(minPq), maxPq.insert.bind(maxPq)]


      let i = Math.abs(difference) >> 1
      while (i--) {
        add(remove() as T)
      }
    }

    difference = this.maxPq.size - this.minPq.size
    if (difference > 0) {
      this.middle = this.maxPq.max()
      this.middleVal = Number(this.middle)
      return
    }
    if (difference < 0) {
      this.middleVal = Number(this.middle)
    } else {
      this.middleVal = (Number(this.minPq.min()) + Number(this.maxPq.max())) / 2
    }
    this.middle = this.minPq.min()
    console.log(this, item)
  }
}

const list = new DynamicMedian([23, 29, 20, 32, 23, 21, 33, 25])

console.log(list)

const listA = new DynamicMedian([10, 20, 20, 20, 30])

console.log(listA)