/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-15 09:56:34
 * @LastEditTime: 2021-09-22 14:53:16
 * @Description: file content
 */

export class BSTNode<K, V> {
  k: K
  v: V
  l: BSTNode<K, V> | null = null
  r: BSTNode<K, V> | null = null
  pred: BSTNode<K, V> | null = null
  succ: BSTNode<K, V> | null = null
  size: number = 1
  constructor(k: K, v: V) {
    this.k = k
    this.v = v
  }
}

type NodeParent<K, V> = BST<K, V> | BSTNode<K, V>

type PathNode = 'root' | 'r' | 'l'




export class BST<K, V> {
  root: BSTNode<K, V> | null = null
  cache: BSTNode<K, V> | null = null
  constructor(array: K[]) {
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

  get(k: K) {
    const [node] = this.getNode(k)
    return node ? node.v : null
  }

  set(k: K, v: V) {
    const [node, path] = this.getNode(k)

    if (node === null) {
      const newNode = new BSTNode(k, v)
      this.cache = newNode
      this.updateSizeAndSet(path, newNode)
      this.updatePredOrSucc(path, newNode)
    } else {
      node.v = v
    }

    return v
  }

  private updateSizeAndSet(_path: PathNode[], newNode: BSTNode<K, V>) {
    const path = _path.slice()
    const key = path.pop()
    let node: NodeParent<K, V> = this
    for (const key of path) {
      node = node[key];
      (node as BSTNode<K, V>).size++
    }
    node[key] = newNode
  }

  private updateSize(path: PathNode[], value = 1) {
    let node: NodeParent<K, V> = this
    for (const key of path) {
      node = node[key];
      (node as BSTNode<K, V>).size += value
    }
  }

  private updatePredOrSucc(_path: PathNode[], newNode: BSTNode<K, V>) {
    const path = _path.slice();
    const last = path[path.length - 1];
    const key = last === 'l' ? 'succ' : 'pred';
    const keyRevert = last === 'l' ? 'pred' : 'succ';
    const stack: PathNode[] = [];
    while (path.length) {
      const key = path.pop();
      stack.push(key);
      if (key !== last) {
        break;
      }
    }
    let node = this;
    if (path.length > 0) {
      for (const key of path) {
        node = node[key];
      }
      node[key] = newNode;
      (newNode as any)[keyRevert] = node;
    }
    if (stack.length > 1) {
      do {
        const key = stack.pop();
        node = node[key];
      } while (stack.length > 1);
      (newNode as any)[key] = node;
      node[keyRevert] = newNode;
    }
  }

  static updateTree<K, V>(
    type: 'min' | 'max',
    root: NodeParent<K, V>,
    key: PathNode,
    parent: NodeParent<K, V>,
    node: BSTNode<K, V>
  ) {
    let pred: 'pred' | 'succ';
    let l: 'l' | 'r';
    let succ: 'pred' | 'succ';
    let oldNode: BSTNode<K, V>;

    if (type === 'min') {
      pred = 'pred';
      l = 'l';
      succ = 'succ';
    }
    else {
      pred = 'succ';
      l = 'r';
      succ = 'pred';
    }

    if (root === parent) {
      oldNode = root[key];
      root[key] = node;
    }
    else {
      oldNode = parent[l];
      parent[l] = node;
    }

    if (oldNode[succ]) {
      oldNode[succ][pred] = null
    }
    if (succ in root) {
      if (node) {
        root[succ] = node;
      }
      else if (root !== parent) {
        root[succ] = parent;
      }
    }
  }

  static minmax<K, V>(type: 'min' | 'max', root: BSTNode<K, V>) {
    const k = type === 'min' ? 'l' : 'r'
    let node = root
    if (node === null) {
      return null
    }
    while (true) {
      if (node[k] === null) {
        return node
      } else {
        node = node[k]
      }
    }
  }

  min() {
    const node = BST.minmax<K, V>('min', this.root)
    return node ? node.v : null
  }

  max() {
    const node = BST.minmax<K, V>('max', this.root)
    return node ? node.v : null
  }

  static deleteBase<K, V>(
    type: 'min' | 'max',
    root: NodeParent<K, V>,
    key: PathNode
  ): BSTNode<K, V> | null {
    let node: BSTNode<K, V> = root[key]
    if (node === null) {
      return null
    }
    let parent = root
    let k = type === 'min' ? 'l' : 'r'
    while (true) {
      if (node[k] === null) {
        BST.updateTree(type, root, key, parent, node[type === 'min' ? 'r' : 'l']);
        return node
      } else {
        node.size--
        parent = node
        node = node[k]
      }
    }
  }

  deleteMin() {
    const node = BST.deleteBase<K, V>('min', this, 'root')
    if (node) {
      if (node === this.cache) {
        this.cache = null
      }
      return [node.k, node.v]
    }
    return null
  }

  deleteMax() {
    const node = BST.deleteBase<K, V>('max', this, 'root')
    if (node) {
      if (node === this.cache) {
        this.cache = null
      }
      return [node.k, node.v]
    }
    return null
  }

  delete(k: K) {
    const [node, path, parent] = this.getNode(k, false)

    this.cache = null
    if (node === null) {
      return null
    }

    // 更新 size
    this.updateSize(path, -1)

    // 更新树
    const minNode = BST.deleteBase<K, V>('min', node, 'r')
    const rst = node.v
    if (minNode === null) {
      if (node.pred) {
        node.pred.succ = node.succ
      }
      if (node.succ) {
        node.succ.pred = node.pred
      }
      parent[path.pop()] = node.l
    } else {
      node.k = minNode.k;
      node.v = minNode.v;
      node.succ = minNode.succ;
      if (minNode.succ) {
        minNode.succ.pred = node
      }
    }
    return rst
  }

  isLinear() {
    if (this.root === null) {
      return true
    }
    const set = new Set<K>()
    let node = BST.minmax('min', this.root)
    while (node.succ) {
      if (this.compare(node.k, node.succ.k) >= 0) {
        return false
      }
      if (node.succ.pred !== node) {
        return false
      }
      if (set.has(node.k)) {
        return false
      }
      set.add(node.k)
      node = node.succ
    }
    return true
  }

  private getNode(k: K, useCache: false): [BSTNode<K, V> | null, PathNode[], BSTNode<K, V> | BST<K, V>]
  private getNode(k: K, useCache?: true): [BSTNode<K, V> | null, PathNode[], BSTNode<K, V> | BST<K, V>] | [BSTNode<K, V>, null, null]
  private getNode(k: K, useCache = true): [BSTNode<K, V> | null, PathNode[], BSTNode<K, V> | BST<K, V>] | [BSTNode<K, V>, null, null] {
    if (useCache && this.cache && this.compare(this.cache.k, k) === 0) {
      return [this.cache, null, null]
    }
    const { root, compare } = this
    let parent: BSTNode<K, V> | BST<K, V> = this
    const path: PathNode[] = ['root']
    let node = root
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
        this.cache = node
        return [node, path, parent]
      }
    }
    return [null, path, parent]
  }

  next(k: K) {
    if (this.root === null) {
      return null
    }
    const [node] = this.getNode(k)
    if (node === null) {
      return null
    }
    if (node.succ) {
      this.cache = node.succ
      return node.succ.v
    }
    return null
  }

  prev(k: K) {
    if (this.root === null) {
      return null
    }
    const [node] = this.getNode(k)
    if (node === null) {
      return null
    }
    if (node.pred) {
      this.cache = node.pred
      return node.pred.v
    }
    return null
  }
}