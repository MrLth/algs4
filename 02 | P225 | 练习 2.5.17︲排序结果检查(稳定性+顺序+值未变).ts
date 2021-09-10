/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-08 10:52:05
 * @LastEditTime: 2021-09-08 12:17:33
 * @Description: file content
 */
import { MinPQ } from './02 | P211 | 练习 2.4.31︲最小堆优化2︲快速插入(插入~loglogN次比较)'

import { QuickSort } from './02 | P182 | 快速排序'
import { MergeSortRecursion } from './02 | P171 | 自顶而下的归并排序︲分治的典型应用'

class CanCheckQuickSort<T> extends MergeSortRecursion<T> {
  constructor(array: T[], compare?: (a: T, b: T) => boolean) {
    super(array, compare);
  }

  check() {
    const array: { v: T, i: number }[] = []
    const valuesMap = new Map<T, number>()

    for (let i = 0; i < this.length; i++) {
      const v = this[i]
      array.push({ v, i })
      const count = valuesMap.get(v)
      valuesMap.set(v, count ? count + 1 : 1)
    }

    const list = new MergeSortRecursion(array, (a, b) => this.less(a.v, b.v))

    list.resort()

    console.log(valuesMap)


    // 值不变检查
    for (const { v } of list) {
      const count = valuesMap.get(v)
      if (count === 1) {
        valuesMap.delete(v)
        continue
      }
      if (count) {
        valuesMap.set(v, count - 1)
      } else {
        console.log(count, v)
        return false
      }
    }
    if (valuesMap.size !== 0) {
      console.log('value', valuesMap)
      return false
    }

    for (let i = 0; i < list.length - 1; i++) {
      // 顺序检查
      if (list.less(list[i + 1], list[i])) {
        console.log('sort')
        return false
      }
      // 稳定性检查
      if (list[i].v === list[i + 1].v && list[i].i > list[i + 1].i) {
        console.log('ability')

        return false
      }
    }

    return true
  }
}


const list = Array.from({ length: 10 }).map((_, i) => (Math.random() > 0.7 ? 100 : Math.random() * 300))

console.log(list)

const quickSortList = new CanCheckQuickSort(list)

console.log(quickSortList.check())