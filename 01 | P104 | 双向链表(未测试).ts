/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 09:36:34
 * @LastEditTime: 2021-08-30 10:09:41
 * @Description: file content
 */
interface DoubleLinkListNode<T> {
  item: T
  prev: DoubleLinkListNode<T>
  next: DoubleLinkListNode<T> | null
}

class DoubleLinkList<T> {
  first: DoubleLinkListNode<T> | null = null
  size = 0

  unshift(item: T) {
    this.size++
    if (this.first) {
      this.first = {
        item,
        next: this.first,
        prev: this.first.prev
      }
    } else {
      const node = {
        item,
        next: this.first
      } as DoubleLinkListNode<T>
      this.first = node;
      node.prev = node
    }
  }

  push(item: T) {
    this.size++
    if (!this.first) {
      this.unshift(item)
      return
    }

    const prev = this.first.prev
    this.first.prev = prev.next = {
      item,
      prev,
      next: null
    }
    this.first.prev
  }

  shift() {
    const node = this.first
    if (!node) {
      return null
    }
    this.size--
    this.first = node.next
    this.first.prev = node.prev
    node.prev = node.next = null
    return node.item
  }

  pop() {
    let node = this.first
    if (!node) {
      return null
    }
    this.size--
    node = node.prev
    this.first.prev = node.prev
    node.prev.next = null
    node.next = node.prev = null
    return node.item
  }

  get(index: number, returnItem: true): T
  get(index: number, returnItem: false): DoubleLinkListNode<T>
  get(index: number, returnItem = true) {
    if (index < 0 || index >= this.size) {
      return null
    }
    for (let node = this.first, i = 0; node !== null; node = node.next, i++) {
      if (i === index) {
        return returnItem ? node.item : node
      }
    }
    return null
  }

  insert(index: number, item: T) {
    const node = this.get(index, false)
    if (node) {
      node.next = node.next.prev = {
        item,
        next: node.next,
        prev: node
      }
      this.size++
    }
  }

  remove(index: number) {
    const node = this.get(index, false)
    if (node) {
      node.prev.next = node.next
      node.next.prev = node.prev
      node.next = node.prev = null
      this.size--
    }
  }

  *[Symbol.iterator]() {
    for (let node = this.first; node !== null; node = node.next) {
      yield node.item;
    }
  }
}