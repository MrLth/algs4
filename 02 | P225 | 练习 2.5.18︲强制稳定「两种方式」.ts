/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-08 10:52:05
 * @LastEditTime: 2021-09-09 08:49:06
 * @Description: file content
 */
import { QuickSort } from './02 | P182 | 快速排序'
import { MergeSortRecursion } from './02 | P171 | 自顶而下的归并排序︲分治的典型应用'

class CanCheckQuickSort<T> extends QuickSort<T> {
  constructor(array: T[], compare?: (a: T, b: T) => number) {
    super(array, compare ? (a, b) => compare(a, b) < 0 : undefined);
    if (compare) {
      this.compare = compare
    }
  }

  compare(a: any, b: any) {
    return Number(a) - Number(b);
  }

  resortBad() {
    interface WrapItem {
      v: T
      i: number
    }
    const list = new QuickSort(this.map((v, i) => ({ v, i })), (a, b) => this.less(a.v, b.v))
    this.length = 0

    const compare = (a: WrapItem, b: WrapItem) => a.i - b.i
    const mapFn = (item: WrapItem) => item

    list.resort()

    let subList = []
    let prev = { v: null }
    for (const item of list) {
      if (this.compare(item.v, prev.v) === 0) {
        subList.push(item)
      } else {
        if (subList.length > 0) {
          subList.push(this.pop())
          this.push(...subList.sort(compare).map(mapFn))
          subList = []
        }
        this.push(item)
      }
      prev = item
    }
    if (subList.length > 0) {
      subList.push(this.pop())
      this.push(...subList.sort(compare).map(mapFn))
    }

    return this
  }

  // 更快更强
  resortSimple() {
    const list = new QuickSort(
      this.map((v, i) => ({ v, i })),
      (a, b) => {
        const ret = this.compare(a.v, b.v)
        if (ret !== 0) {
          return ret < 0
        }
        return a.i - b.i < 0
      }
    )
    list.resort()

    for (let i = 0; i < list.length; i++) {
      this[i] = list[i]
    }
    return this
  }
}


const list = Array.from({ length: 250000 }).map((_, i) => (Math.random() > 0.5 ? 100 : Math.random() * 300))


console.time('A')
const quickSortList = new CanCheckQuickSort(list)
quickSortList.resort()
console.timeEnd('A')

// 更快
console.time('B')
const resortSimpleList = new CanCheckQuickSort(list)
resortSimpleList.resortSimple()
console.timeEnd('B')

