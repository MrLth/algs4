/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-07 08:43:02
 * @LastEditTime: 2021-09-07 09:23:07
 * @Description: 比较简单的实现是通过队列，时间的线性的，基于树的实现是对数的，性能会好点
 * @Use: 比较好的适用场景就是抽奖奖池的概率计算
 */


export class Node {
  value: number
  childrenSum = 0
  constructor(value: number) {
    this.value = value
  }
}

class Sample {
  nodes: Node[] = [new Node(0)]

  constructor(array: number[]) {
    for (const item of array) {
      this.nodes.push(new Node(item))
    }

    this.computeSum()
    console.log(this.nodes[1])
  }

  computeSum() {
    const { nodes } = this
    // 有些子节点可能不存在，所以不能直接从 N/2 开始
    for (let i = this.size; i > 0; i--) {
      nodes[i >> 1].childrenSum += nodes[i].value + nodes[i].childrenSum
    }
  }

  random() {
    const { nodes } = this
    let r = Math.random() * this.sum
    let i = 1
    // 小于子树和就表示 r 处理这个节点的概率之间
    while (r < nodes[i].childrenSum) {
      i <<= 1
      const sumLeft = nodes[i].childrenSum + nodes[i].value
      // 大于左子树就去掉左子树的概率，往右子树走
      if (r > sumLeft) {
        r -= sumLeft
        i++
      }
    }
    return i - 1
  }

  change(i: number, v: number) {
    i++
    const { nodes } = this
    const difference = v - nodes[i].value
    nodes[i].value = v

    while (i) {
      nodes[i >>= 1].childrenSum += difference
    }
  }


  get size() {
    return this.nodes.length - 1
  }

  get sum() {
    return this.nodes[0].childrenSum
  }
}

const sample = new Sample([23, 124, 54, 123, 63])

console.log(sample)

sample.change(3, 10)
console.log(sample)


Array.from({ length: 10 }).map(() => console.log(sample.random()))
