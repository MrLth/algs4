/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-04 11:04:20
 * @LastEditTime: 2021-09-04 11:13:25
 * @Description: file content
 */

function defaultComparer<T>(a: T, b: T) {
  return Number(a) - Number(b);
}

export default function binarySearch<T>(array: T[], key: T, comparer = defaultComparer) {
  let lo = 0, hi = array.length - 1
  while (lo <= hi) {
    const mid = lo + (hi - lo) / 2 | 0
    const rst = comparer(key, array[mid])
    if (rst < 0) {
      hi = mid - 1
    } else if (rst > 0) {
      lo = mid + 1
    } else {
      return mid
    }
  }
  return -1
}