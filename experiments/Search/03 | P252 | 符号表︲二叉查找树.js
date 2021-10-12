/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-13 13:39:03
 * @LastEditTime: 2021-10-11 11:28:17
 * @Description: file content
 */
let count = 0

class BST {
    constructor(array, compare) {
        this.count = 0
        this.root = null;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
        for (const k of array) {
            this.set(k, k);
        }
    }
    compare(a, b) {
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        else {
            return 0;
        }
    }
    size() {
        return this.root ? this.root.size : 0;
    }
    // 在性能优先的实现中，查找的次数比插入多得多，所以 get 有必要使用非递归，而 set 不是那么必要
    get(k) {
        const { root, compare } = this;
        let node = root;
        while (node !== null) {
            this.count++
            const ret = compare(k, node.k);
            if (ret > 0) {
                node = node.r;
            }
            else if (ret < 0) {
                node = node.l;
            }
            else {
                return node.v;
            }
        }
        return null;
    }
    set(k, v) {
        const { root, compare } = this;
        let node = root;
        let parent = this;
        let stack = ['root'];
        while (node !== null) {
            const ret = compare(k, node.k);
            if (ret > 0) {
                parent = node;
                stack.push('r');
                node = node.r;
            }
            else if (ret < 0) {
                parent = node;
                stack.push('l');
                node = node.l;
            }
            else {
                break;
            }
        }
        if (node !== null) {
            node.v = v;
        }
        else {
            const o = parent[stack.pop()] = {
                k, v, l: null, r: null, size: 1
            };

            Object.defineProperty(o, 'k', {
                get: () => {
                    count++
                    return k;
                },
                set: (v) => {
                    count++
                    return k = v
                }
            })

            let node = this;
            for (const key of stack) {
                node = node[key];
                node.size++;
            }
        }
        return v;
    }
    min() {
        let node = this.root;
        if (node === null) {
            return null;
        }
        while (true) {
            if (node.l === null) {
                return node.v;
            }
            else {
                node = node.l;
            }
        }
    }
    max() {
        let node = this.root;
        if (node === null) {
            return null;
        }
        while (true) {
            if (node.r === null) {
                return node.v;
            }
            else {
                node = node.r;
            }
        }
    }
    floor(k) {
        const { root, compare } = this;
        let node = root;
        let target = null;
        while (node !== null) {
            const ret = compare(k, node.k);
            if (ret < 0) {
                node = node.l;
            }
            else if (ret > 0) {
                target = node;
                node = node.r;
            }
            else {
                return node.v;
            }
        }
        return target ? target.v : null;
    }
    ceil(k) {
        const { root, compare } = this;
        let node = root;
        let target = null;
        while (node !== null) {
            const ret = compare(k, node.k);
            if (ret < 0) {
                target = node;
                node = node.l;
            }
            else if (ret > 0) {
                node = node.r;
            }
            else {
                return node.v;
            }
        }
        return target ? target.v : null;
    }
    select(index) {
        let node = this.root;
        if (node === null || node.size <= index || index < 0) {
            return null;
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
        return node.v;
    }
    rank(k) {
        const { root, compare } = this;
        let index = 0;
        let node = root;
        while (node !== null) {
            const ret = compare(k, node.k);
            if (ret < 0) {
                node = node.l;
            }
            else if (ret > 0) {
                if (node.l) {
                    index += node.l.size + 1;
                }
                node = node.r;
            }
            else {
                return index + (node.l ? node.l.size : 0);
            }
        }
        return -1;
    }
    static deleteMinBase(parent, key) {
        let node = parent[key];
        if (node === null) {
            return null;
        }
        while (true) {
            if (node.l === null) {
                parent[key] = node.r;
                return node;
            }
            else {
                key = "l";
                node.size--;
                parent = node;
                node = node.l;
            }
        }
    }
    deleteMin() {
        const node = LinearBST.deleteMinBase(this, 'root');
        return node ? node.v : null;
    }
    deleteMax() {
        let parent = null;
        let node = this.root;
        if (node === null) {
            return null;
        }
        while (true) {
            if (node.r === null) {
                if (parent === null) {
                    this.root = node.l;
                }
                else {
                    parent.r = node.l;
                }
                return node.v;
            }
            else {
                node.size--;
                parent = node;
                node = node.r;
            }
        }
    }
    delete(k) {
        const { root, compare } = this;
        let node = root;
        let parent = this;
        let keys = ['root'];
        // 寻找 node，记住路径但不更新 size
        while (node !== null) {
            const ret = compare(k, node.k);
            if (ret > 0) {
                parent = node;
                keys.push('r');
                node = node.r;
            }
            else if (ret < 0) {
                parent = node;
                keys.push('l');
                node = node.l;
            }
            else {
                break;
            }
        }
        // 没找到退出
        if (node === null) {
            return null;
        }
        // 更新 size
        let n = this;
        for (const key of keys) {
            n = n[key];
            n.size--;
        }
        // 更新树
        const minNode = LinearBST.deleteMinBase(node, 'r');
        const rst = node.v;
        if (minNode === null) {
            parent[keys.pop()] = node.l;
        }
        else {
            node.k = minNode.k;
            node.v = minNode.v;
        }
        return rst;
    }
    *range(min, max) {
        const { root, compare } = this;
        const stack = [];
        const values = [];
        let node = root;
        while (node !== null) {
            const ret = compare(min, node.k);
            if (ret > 0) {
                node = node.r;
                continue;
            }
            node.r && stack.push(node.r);
            values.push(node.v);
            stack.push(null);
            if (ret < 0) {
                node = node.l;
            }
            else {
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
            }
            else {
                yield node.v;
                if (compare(max, node.k) <= 0) {
                    break;
                }
            }
        }
    }
    // 遍历深度为 4 的完美二叉树用时：0.068ms
    *values() {
        const stack = [];
        const values = [];
        let node = this.root;
        while (node !== null) {
            node.r && stack.push(node.r);
            values.push(node.v);
            stack.push(null);
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
            }
            else {
                yield node.v;
            }
        }
    }
    // 遍历深度为 4 的完美二叉树用时：0.367ms
    *valuesRecursion(node = this.root) {
        if (node.l) {
            for (const value of this.valuesRecursion(node.l)) {
                yield value;
            }
        }
        yield node.v;
        if (node.r) {
            for (const value of this.valuesRecursion(node.r)) {
                yield value;
            }
        }
    }
    * keys() {
        const stack = [];
        const keys = [];
        let node = this.root;
        while (node !== null) {
            node.r && stack.push(node.r);
            keys.push(node.k);
            stack.push(null);
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
            }
            else {
                yield node.k;
            }
        }
    }
    isUniqueKey(node = this.root, min, max) {
        if (node === null) {
            return true;
        }
        if (node.r && this.compare(node.r.k, node.k) === 0) {
            return false;
        }
        if (node.l && this.compare(node.l.k, node.k) === 0) {
            return false;
        }
        return this.isUniqueKey(node.l, min, max) && this.isUniqueKey(node.r, min, max);
    }
    validateSize() {
        return this.validateSizeRecursion()[0];
    }
    validateSizeRecursion(node = this.root) {
        if (node === null) {
            return [true, 0];
        }
        const [rb, rs] = this.validateSizeRecursion(node.r);
        const [lb, ls] = this.validateSizeRecursion(node.l);
        return [rb && lb && rs + ls + 1 === node.size, rs + ls + 1];
    }
    isOrdered(node = this.root, min, max) {
        if (node === null) {
            return true;
        }
        if (node.r && (node.r.k < node.k || (max && node.r.k > max))) {
            console.log('unOrder node', node)
            return false;
        }
        if (node.l && (node.l.k > node.k || (min && node.l.k < min))) {
            console.log('unOrder node', node)
            return false;
        }
        return this.isOrdered(node.l, min, node.k) && this.isOrdered(node.r, node.k, max);
    }
    isBST() {
        if (!this.validateSize()) {
            console.log('大小不对')
            return false;
        } if (!this.isOrdered()) {
            console.log('键值无序')
            return false;
        } if (!this.isUniqueKey()) {
            console.log('键值不唯一')
            return false;
        }
        return true;
    }
    is23(node = this.root) {
        if (!node) {
            return true
        }
        if (node.r && node.r.red) {
            return false
        }
        if (node.l && node.l.red && node.l.l && node.l.l.red) {
            return false
        }
        return this.is23(node.l) && this.is23(node.r)
    }
    isBalanced(
        node = this.root,
        ref = { current: null, rst: true },
        height = 0,
    ) {
        if (!node) {
            if (ref.current === null) {
                ref.current = height
                return true
            }
            return ref.rst = (ref.current === height)
        }
        if (ref.rst) {
            height = node.red ? height : height + 1
            return this.isBalanced(node.l, ref, height) && this.isBalanced(node.r, ref, height)
        }
        return false
    }
}
