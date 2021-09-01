/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 11:28:28
 * @LastEditTime: 2021-08-30 12:03:39
 * @Description: 这种策略假设最近访问过的元素会再次访问，因此可以用于缓存，数据压缩等许多场景
 */

class MoveToFront<T> extends Array<T> {
  constructor(array: T[]) {
    super();
    this.push(...new Set(array));
  }
  add(item: T, isEqual = (listItem: T, item: T) => listItem === item) {
    for (let i = 0; i < this.length; i++) {
      if (isEqual(this[i], item)) {
        this.splice(i, 1)
        break
      }
    }
    this.unshift(item)
  }
}
