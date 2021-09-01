/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-28 14:46:21
 * @LastEditTime: 2021-08-28 15:09:30
 * @Description: file content
 */
interface LinkListNode<T> {
  item: T
  next: LinkListNode<T> | null
}

class Queue<T> {
  size = 0;
  first: LinkListNode<T> | null = null
  last: LinkListNode<T> | null = null

  enqueue(item: T) {
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

  dequeue() {
    if (this.first) {
      this.size--
      const node = this.first
      this.first = node.next
      if (node === this.last) {
        this.last = null
      }
      return node.item
    } else {
      return null
    }
  }

  isEmpty() {
    return this.size === 0
  }

}

const queue = new Queue<number>()

console.log(queue.enqueue(0))
console.log(queue.enqueue(1))
console.log(queue.enqueue(2))
console.log(queue.enqueue(3))

console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())

console.log(queue.isEmpty())
console.log(queue.size)

console.log(queue.enqueue(4))
console.log(queue.dequeue())
console.log(queue.dequeue())

console.log(queue.isEmpty())
console.log(queue.size)
