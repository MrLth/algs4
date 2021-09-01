/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 10:29:25
 * @LastEditTime: 2021-08-30 10:35:40
 * @Description: file content
 */
class RandomQueue<T> {
  list: T[] = []


  enqueue(item: T) {
    this.list.push(item)
  }

  dequeue() {
    const len = this.list.length
    const random = Math.random() * len | 0
    let t = this.list[random]
    this.list[random] = this.list[len - 1]
    this.list[len - 1] = t

    return this.list.pop()
  }

  sample() {
    const random = Math.random() * this.list.length | 0
    return this.list[random]
  }

  get size() {
    return this.list.length
  }

  *[Symbol.iterator]() {
    let t, len = this.list.length
    for (let i = 0; i < len; i++) {
      const random = Math.random() * len | 0
      t = this.list[random]
      this.list[random] = this.list[i]
      this.list[i] = t
    }
    for (const item of this.list) {
      yield item
    }
  }

}