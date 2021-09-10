/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-09 09:24:33
 * @LastEditTime: 2021-09-09 10:43:41
 * @Description: file content
 */
export class Inversions {
  static bruteForce<T>(array: T[], lo = 0, hi = array.length) {
    let count = 0
    for (let i = lo; i <= hi; i++) {
      for (let j = i + 1; j <= hi; j++) {
        if (array[i] > array[j]) {
          count++
        }
      }
    }
    return count
  }
  static count<T>(array: T[], lo = 0, hi = array.length - 1) {
    if (hi <= lo) return 0
    const mid = lo + (hi - lo) / 2 | 0
    let count = 0
    count += Inversions.count(array, lo, mid)
    count += Inversions.count(array, mid + 1, hi)
    count += Inversions.merge(array, lo, mid, hi)
    return count
  }
  static merge<T>(array: T[], lo: number, mid: number, hi: number) {
    let count = 0
    const aux: T[] = []
    for (let i = lo; i <= hi; i++) {
      aux[i] = array[i]
    }
    // i: 左子数组第一个元素，j：右子数组第一个元素
    let i = lo, j = mid + 1
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        array[k] = aux[j++];
      } else if (j > hi) {
        array[k] = aux[i++];
      } else if (aux[i] < aux[j]) {
        array[k] = aux[i++];
      } else {
        // 右子数组里的元素小于左子数组里的元素，添加元素，消除了倒置
        array[k] = aux[j++];
        count += mid - i + 1
        // 左子数组剩余元素个数，因为两个子数组都是有序的，
        // 此时右子数之前的元素都比当前要添加的元素小，所以不必计数
      }
    }
    return count
  }

}