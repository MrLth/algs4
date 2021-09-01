/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 10:43:15
 * @LastEditTime: 2021-08-30 11:20:02
 * @Description: file content
 */
class RingBuffer<T> {
  list: T[] = []
  length: number
  private enWaitQueue: (() => void)[] = []
  private deWaitQueue: (() => void)[] = []
  constructor(length: number) {
    this.length = length
    const nativePop = this.list.pop
    const nativePush = this.list.push
    this.list.pop = () => {
      console.log('pop')
      return nativePop.call(this.list)
    }
    this.list.push = (...rest: T[]) => {
      console.log('push')
      return nativePush.apply(this.list, rest)
    }
  }
  enqueue(item: T) {
    if (this.list.length >= this.length) {
      return new Promise(resolve => this.enWaitQueue.push(() => {
        resolve(this.list.push(item))
      }))
    }
    const result = this.list.push(item)
    const callback = this.deWaitQueue.shift()
    callback && callback()
    return result
  }
  dequeue() {
    if (this.list.length === 0) {
      return new Promise(resolve => this.deWaitQueue.push(() => {
        resolve(this.list.pop())
      }))
    }
    const result = this.list.pop()
    const callback = this.enWaitQueue.shift()
    callback && callback()
    return result
  }
  get size() {
    return this.list.length
  }
  *[Symbol.iterator]() {
    for (const item of this.list) {
      yield item;
    }
  }
}

const ringBuffer = new RingBuffer(3);

ringBuffer.enqueue(1)
ringBuffer.enqueue(2)
ringBuffer.enqueue(3)
ringBuffer.enqueue(4)
ringBuffer.dequeue()
console.log(ringBuffer.list)