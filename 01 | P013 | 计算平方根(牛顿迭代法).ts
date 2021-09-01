/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-28 09:12:34
 * @LastEditTime: 2021-08-28 09:15:00
 * @Description: 牛顿迭代法
 */
function sqrt(c: number) {
  if (c < 0) {
    return NaN
  }
  const err = 1e-15
  let t = c
  while (Math.abs(t - c / t) > err * t) {
    t = (c / t + t) / 2
  }
  return t
}
