/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-13 13:39:03
 * @LastEditTime: 2021-09-15 10:18:06
 * @Description: file content
 */

interface BSTNode<K, V> {
  k: K
  v: V
  l: BSTNode<K, V> | null
  r: BSTNode<K, V> | null
  size: number
}

export class BST<K, V>{
  root: BSTNode<K, V> | null = null
  constructor(array: K[], compare?: (a: K, b: K) => number) {
    if (typeof compare === 'function') {
      this.compare = compare
    }

    for (const k of array) {
      this.set(k, k as any)
    }
  }

  compare(a: K, b: K): number {
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    } else {
      return 0
    }
  }

  size() {
    return this.root ? this.root.size : 0
  }

  // 在性能优先的实现中，查找的次数比插入多得多，所以 get 有必要使用非递归，而 set 不是那么必要
  get(k: K) {
    const { root, compare } = this
    let node = root
    while (node !== null) {
      const ret = compare(k, node.k)
      if (ret > 0) {
        node = node.r
      } else if (ret < 0) {
        node = node.l
      } else {
        return node.v
      }
    }
    return null
  }

  set(k: K, v: V) {
    const { root, compare } = this
    let node = root
    let parent: BST<K, V> | BSTNode<K, V> = this
    let path: ('root' | 'r' | 'l')[] = ['root']
    while (node !== null) {
      const ret = compare(k, node.k)
      if (ret > 0) {
        parent = node
        path.push('r')
        node = node.r
      } else if (ret < 0) {
        parent = node
        path.push('l')
        node = node.l
      } else {
        break
      }
    }
    if (node !== null) {
      node.v = v
    } else {
      parent[path.pop()] = {
        k, v, l: null, r: null, size: 1
      }
      let node: BSTNode<K, V> | BST<K, V> = this
      for (const key of path) {
        node = node[key];
        (node as BSTNode<K, V>).size++
      }
    }
    return v
  }

  min() {
    let node = this.root
    if (node === null) {
      return null
    }
    while (true) {
      if (node.l === null) {
        return node.v
      } else {
        node = node.l
      }
    }
  }

  max() {
    let node = this.root
    if (node === null) {
      return null
    }
    while (true) {
      if (node.r === null) {
        return node.v
      } else {
        node = node.r
      }
    }
  }

  floor(k: K) {
    const { root, compare } = this
    let node = root
    let target: BSTNode<K, V> | null = null
    while (node !== null) {
      const ret = compare(k, node.k)
      if (ret < 0) {
        node = node.l
      } else if (ret > 0) {
        target = node
        node = node.r
      } else {
        return node.v
      }
    }

    return target ? target.v : null
  }

  ceil(k: K) {
    const { root, compare } = this
    let node = root
    let target: BSTNode<K, V> | null = null
    while (node !== null) {
      const ret = compare(k, node.k)
      if (ret < 0) {
        target = node
        node = node.l
      } else if (ret > 0) {
        node = node.r
      } else {
        return node.v
      }
    }

    return target ? target.v : null

  }

  select(index: number) {
    let node = this.root;
    if (node === null || node.size <= index || index < 0) {
      return null
    }
    while (node.l !== null) {
      const size = node.l.size;
      if (size > index) {
        node = node.l;
      }
      else if (size < index) {
        node = node.r;
        index -= size + 1;
      }
      else {
        return node.v;
      }
    }
    return node.v
  }

  rank(k: K) {
    const { root, compare } = this
    let index = 0
    let node = root
    while (node !== null) {
      const ret = compare(k, node.k)
      if (ret < 0) {
        node = node.l
      } else if (ret > 0) {
        if (node.l) {
          index += node.l.size + 1
        }
        node = node.r
      } else {
        return index + (node.l ? node.l.size : 0)
      }
    }

    return -1
  }

  static deleteMinBase<K, V>(
    parent: BSTNode<K, V> | BST<K, V>,
    key: 'r' | 'l' | 'root'
  ): BSTNode<K, V> | null {
    let node = parent[key]
    if (node === null) {
      return null
    }
    while (true) {
      if (node.l === null) {
        parent[key] = node.r
        return node
      } else {
        key = "l"
        node.size--
        parent = node
        node = node.l
      }
    }
  }

  deleteMin() {
    const node = BST.deleteMinBase(this, 'root')
    return node ? node.v : null
  }


  deleteMax() {
    let parent = null
    let node = this.root
    if (node === null) {
      return null
    }
    while (true) {
      if (node.r === null) {
        if (parent === null) {
          this.root = node.l
        } else {
          parent.r = node.l
        }
        return node.v
      } else {
        node.size--
        parent = node
        node = node.r
      }
    }
  }

  delete(k: K) {
    const { root, compare } = this
    let node = root
    let parent: BSTNode<K, V> | BST<K, V> = this
    let keys: ('r' | 'l' | 'root')[] = ['root']

    // 寻找 node，记住路径但不更新 size
    while (node !== null) {
      const ret = compare(k, node.k)
      if (ret > 0) {
        parent = node
        keys.push('r')
        node = node.r
      } else if (ret < 0) {
        parent = node
        keys.push('l')
        node = node.l
      } else {
        break
      }
    }

    // 没找到退出
    if (node === null) {
      return null
    }

    // 更新 size
    let n: BSTNode<K, V> | BST<K, V> = this
    for (const key of keys) {
      n = n[key];
      (n as BSTNode<K, V>).size--
    }

    // 更新树
    const minNode = BST.deleteMinBase(node, 'r')
    const rst = node.v
    if (minNode === null) {
      parent[keys.pop()] = node.l
    } else {
      node.k = minNode.k
      node.v = minNode.v
    }
    return rst
  }

  *range(min: K, max: K) {
    const { root, compare } = this;
    const stack: (BSTNode<K, V> | null)[] = [];
    const values: V[] = [];
    let node = root;
    while (node !== null) {
      const ret = compare(min, node.k);
      if (ret > 0) {
        node = node.r;
        continue
      }
      node.r && stack.push(node.r);
      values.push(node.v)
      stack.push(null)
      if (ret < 0) {
        node = node.l;
      } else {
        break;
      }
    }
    while (stack.length > 0) {
      const node = stack.pop();
      if (node === null) {
        yield values.pop();
        continue;
      }
      node.r && stack.push(node.r);
      if (node.l) {
        values.push(node.v);
        stack.push(null, node.l);
      } else {
        yield node.v;
        if (compare(max, node.k) <= 0) {
          break
        }
      }
    }
  }
  // 遍历深度为 4 的完美二叉树用时：0.068ms
  *values() {
    const stack: (BSTNode<K, V> | null)[] = [];
    const values: V[] = [];
    let node = this.root;
    while (node !== null) {
      node.r && stack.push(node.r);
      values.push(node.v)
      stack.push(null)
      node = node.l;
    }
    while (stack.length > 0) {
      const node = stack.pop();
      if (node === null) {
        yield values.pop();
        continue;
      }
      node.r && stack.push(node.r);
      if (node.l) {
        values.push(node.v);
        stack.push(null, node.l);
      } else {
        yield node.v;
      }
    }
  }
  // 遍历深度为 4 的完美二叉树用时：0.367ms
  *valuesRecursion(node: BSTNode<K, V> = this.root) {
    if (node.l) {
      for (const value of this.valuesRecursion(node.l)) {
        yield value
      }
    }
    yield node.v
    if (node.r) {
      for (const value of this.valuesRecursion(node.r)) {
        yield value
      }
    }
  }
  *keys() {
    const stack: (BSTNode<K, V> | null)[] = [];
    const keys: K[] = [];
    let node = this.root;
    while (node !== null) {
      node.r && stack.push(node.r);
      keys.push(node.k)
      stack.push(null)
      node = node.l;
    }
    while (stack.length > 0) {
      const node = stack.pop();
      if (node === null) {
        yield keys.pop();
        continue;
      }
      node.r && stack.push(node.r);
      if (node.l) {
        keys.push(node.k);
        stack.push(null, node.l);
      } else {
        yield node.k;
      }
    }
  }
}