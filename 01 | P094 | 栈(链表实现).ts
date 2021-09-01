/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-28 14:46:21
 * @LastEditTime: 2021-08-28 15:19:11
 * @Description: file content
 */
interface LinkListNode<T> {
  item: T
  next: LinkListNode<T> | null
}

class Stack<T> {
  size = 0;
  first: LinkListNode<T> | null = null

  push(item: T) {
    this.size++;
    const node = {
      item,
      next: this.first
    }

    this.first = node
  }

  pop() {
    if (this.first) {
      this.size--
      const node = this.first;
      this.first = node.next
      return node.item
    } else {
      return null
    }
  }

  isEmpty() {
    return this.size === 0
  }
}

const stack = new Stack<number>()

console.log(stack.push(0))
console.log(stack.push(1))
console.log(stack.push(2))
console.log(stack.push(3))

console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())

console.log(stack.isEmpty())
console.log(stack.size)

console.log(stack.push(4))
console.log(stack.pop())
console.log(stack.pop())

console.log(stack.isEmpty())
console.log(stack.size)
