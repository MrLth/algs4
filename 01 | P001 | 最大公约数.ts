/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-28 08:49:28
 * @LastEditTime: 2021-08-28 09:11:35
 * @Description: 2300 年前的欧几里得算法
 */
function gcd(p: number, q = 0) {
  if (q === 0) {
    return p
  }
  return gcd(q, p % q)
}