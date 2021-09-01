/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 10:19:16
 * @LastEditTime: 2021-08-30 10:28:12
 * @Description: file content
 */
class RandomBag<T> {
  list: T[] = []
  add(item: T) {
    this.list.push(item)
  }

  get size() {
    return this.list.length
  }

  *[Symbol.iterator]() {
    let t
    for (let i = 0; i < this.list.length; i++) {
      const random = Math.random() * this.list.length | 0
      t = this.list[random]
      this.list[random] = this.list[i]
      this.list[i] = t
    }
    for (const item of this.list) {
      yield item
    }
  }
}