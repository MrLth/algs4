/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-28 16:22:50
 * @LastEditTime: 2021-08-30 09:35:50
 * @Description: file content
 */
interface LinkListNode<T> {
  item: T
  next: LinkListNode<T> | null
}

class LinkList<T> {
  size = 0
  first: LinkListNode<T> | null = null

  add(item: T) {
    this.size++;
    const node = {
      item,
      next: this.first
    }

    this.first = node
  }

  remove(index: number) {
    let j = 0, i = index - 1
    if (i < 0) {
      const node = this.first
      if (!node) return null
      this.first = node.next
      this.size--
      return node.item
    }

    for (let node = this.first; node !== null; node = node.next) {
      if (i === j) {
        const rstNode = node.next
        if (rstNode) {
          node.next = rstNode.next
          rstNode.next = null
          this.size--
          return rstNode.item
        }
        return null
      }
      j++
    }

    return null
  }

  reverse() {
    let first = this.first
    let reverse = null
    let second = null
    while (first !== null) {
      second = first.next
      first.next = reverse
      reverse = first
      first = second
    }
    this.first = reverse
    return this
  }

  has(item: T) {
    for (const nodeItem of this) {
      if (nodeItem === item) {
        return true
      }
    }
    return false
  }

  removeNodesByItem(item: T) {
    if (!this.first) {
      return 0
    }
    let node: LinkListNode<T> | null
    let prev: LinkListNode<T> | null
    let i = 0
    node = prev = this.first
    if (node.item === item) {
      this.size--
      this.first = node.next
    }
    while (prev && (node = node.next)) {
      if (item === node.item) {
        i++
        this.size--
        prev.next = node.next
      } else {
        prev = prev.next
      }
    }
    return i
  }

  *[Symbol.iterator]() {
    for (let node = this.first; node !== null; node = node.next) {
      yield node.item;
    }
  }
}


const linkList = new LinkList()
linkList.add(1)
linkList.add(2)
linkList.add(3)
linkList.add(4)
linkList.add(5)
linkList.add(6)


// console.log(linkList.size)
// linkList.removeNodesByItem(1)
// console.log(linkList.size)

for (const item of linkList) {
  console.log('item', item)
}

for (const item of linkList.reverse()) {
  console.log('item', item)
}