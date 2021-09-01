/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 11:28:28
 * @LastEditTime: 2021-08-30 13:18:46
 * @Description: 这种策略假设最近访问过的元素会再次访问，因此可以用于缓存，数据压缩等许多场景
 */
import { Bag } from './01 | P098 | 背包(链表实现)'

class MoveToFrontLnkList<T> extends Bag<T> {
  add(item: T, isEqual = (listItem: T, item: T) => listItem === item) {
    let prev = this.first

    if (prev) {
      if (prev.item === item) {
        return
      }

      let node = prev.next

      while (node !== null) {
        if (isEqual(item, node.item)) {
          this.size--
          prev.next = node.next
          break
        }
        prev = node
        node = node.next
      }
    }

    this.size++
    this.first = {
      item,
      next: this.first
    }
  }
}


const moveToFrontLnkList = new MoveToFrontLnkList()


moveToFrontLnkList.add(1)
moveToFrontLnkList.add(1)
moveToFrontLnkList.add(2)
moveToFrontLnkList.add(3)

for (const item of moveToFrontLnkList) {
  console.log('item', item)
}

moveToFrontLnkList.add(1)
console.log([...moveToFrontLnkList])
