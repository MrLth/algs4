/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-28 14:46:21
 * @LastEditTime: 2021-08-30 13:07:22
 * @Description: file content
 */
interface LinkListNode<T> {
  item: T
  next: LinkListNode<T> | null
}

export class Bag<T> {
  size = 0;
  first: LinkListNode<T> | null = null
  last: LinkListNode<T> | null = null

  add(item: T) {
    this.size++;
    const node = {
      item,
      next: null
    }
    if (this.last) {
      this.last.next = node
    }
    this.last = node
    if (!this.first) {
      this.first = node
    }
  }

  isEmpty() {
    return this.size === 0
  }


  *[Symbol.iterator]() {
    for (let node = this.first; node !== null; node = node.next) {
      yield node.item;
    }
  }

}

const bag = new Bag<number>()

console.log(bag.add(0))
console.log(bag.add(1))
console.log(bag.add(2))
console.log(bag.add(3))

for (const item of bag) {
  console.log('item', item)
}

console.log(bag.isEmpty())
console.log(bag.size)

console.log(bag.add(4))

console.log(bag.isEmpty())
console.log(bag.size)
