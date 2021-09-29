/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-15 11:49:50
 * @LastEditTime: 2021-09-17 14:53:57
 * @Description: file content
 */


let count1 = 0

class BSTNode {
    constructor(k, v) {
        this.l = null;
        this.r = null;
        this.pred = null;
        this.succ = null;
        this.size = 1;
        this.k = k;
        this.v = v;
        Object.defineProperty(this, 'k', {
            get: () => {
                count1++
                return k;
            },
            set: (v) => {
                count1++
                return k = v
            }
        })
    }
}
class LinearBST {
    constructor(array) {
        this.root = null;
        this.cache = null;
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
    get(k) {
        const [node] = this.getNode(k);
        return node ? node.v : null;
    }
    set(k, v) {
        const [node, path] = this.getNode(k);
        if (node === null) {
            const newNode = new BSTNode(k, v);
            this.cache = newNode;
            this.updateSizeAndSet(path, newNode);
            this.updatePredOrSucc(path, newNode);
        }
        else {
            node.v = v;
        }
        return v;
    }
    updateSizeAndSet(_path, newNode) {
        const path = _path.slice();
        const key = path.pop();
        let node = this;
        for (const key of path) {
            node = node[key];
            node.size++;
        }
        node[key] = newNode;
    }
    updateSize(path, value = 1) {
        let node = this;
        for (const key of path) {
            node = node[key];
            node.size += value;
        }
    }
    updatePredOrSucc(_path, newNode) {
        const path = _path.slice();
        const last = path[path.length - 1];
        const key = last === 'l' ? 'succ' : 'pred';
        const keyRevert = last === 'l' ? 'pred' : 'succ';
        const stack = [];
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
            newNode[keyRevert] = node;
        }
        if (stack.length > 1) {
            do {
                const key = stack.pop();
                node = node[key];
            } while (stack.length > 1);
            newNode[key] = node;
            node[keyRevert] = newNode;
        }
    }
    static updateTree(type, root, key, parent, node) {
        let pred;
        let l;
        let succ;
        let oldNode;
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
            oldNode[succ][pred] = null;
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
    static minmax(type, root) {
        const k = type === 'min' ? 'l' : 'r';
        let node = root;
        if (node === null) {
            return null;
        }
        while (true) {
            if (node[k] === null) {
                return node;
            }
            else {
                node = node[k];
            }
        }
    }
    min() {
        const node = LinearBST.minmax('min', this.root);
        return node ? node.v : null;
    }
    max() {
        const node = LinearBST.minmax('max', this.root);
        return node ? node.v : null;
    }
    static deleteBase(type, root, key) {
        let node = root[key];
        if (node === null) {
            return null;
        }
        let parent = root;
        let k = type === 'min' ? 'l' : 'r';
        while (true) {
            if (node[k] === null) {
                LinearBST.updateTree(type, root, key, parent, node[type === 'min' ? 'r' : 'l']);
                return node;
            }
            else {
                node.size--;
                parent = node;
                node = node[k];
            }
        }
    }
    deleteMin() {
        const node = LinearBST.deleteBase('min', this, 'root');
        if (node) {
            if (node === this.cache) {
                this.cache = null;
            }
            return [node.k, node.v];
        }
        return null;
    }
    deleteMax() {
        const node = LinearBST.deleteBase('max', this, 'root');
        if (node) {
            if (node === this.cache) {
                this.cache = null;
            }
            return [node.k, node.v];
        }
        return null;
    }
    delete(k) {
        const [node, path, parent] = this.getNode(k, false);
        this.cache = null;
        if (node === null) {
            return null;
        }
        // 更新 size
        this.updateSize(path, -1);
        // 更新树
        const minNode = LinearBST.deleteBase('min', node, 'r');
        const rst = node.v;
        if (minNode === null) {
            if (node.pred) {
                node.pred.succ = node.succ;
            }
            if (node.succ) {
                node.succ.pred = node.pred;
            }
            parent[path.pop()] = node.l;
        }
        else {
            node.k = minNode.k;
            node.v = minNode.v;
            node.succ = minNode.succ;
            if (minNode.succ) {
                minNode.succ.pred = node;
            }
        }
        return rst;
    }
    isLinear() {
        if (this.root === null) {
            return true;
        }
        const set = new Set();
        let node = LinearBST.minmax('min', this.root);
        while (node.succ) {
            if (this.compare(node.k, node.succ.k) >= 0) {
                return false;
            }
            if (node.succ.pred !== node) {
                return false;
            }
            if (set.has(node.k)) {
                return false;
            }
            set.add(node.k);
            node = node.succ;
        }
        return true;
    }
    getNode(k, useCache = true) {
        if (useCache && this.cache && this.compare(this.cache.k, k) === 0) {
            return [this.cache, null, null];
        }
        const { root, compare } = this;
        let parent = this;
        const path = ['root'];
        let node = root;
        while (node !== null) {
            const ret = compare(k, node.k);
            if (ret > 0) {
                parent = node;
                path.push('r');
                node = node.r;
            }
            else if (ret < 0) {
                parent = node;
                path.push('l');
                node = node.l;
            }
            else {
                this.cache = node;
                return [node, path, parent];
            }
        }
        return [null, path, parent];
    }
    next(k) {
        if (this.root === null) {
            return null;
        }
        const [node] = this.getNode(k);
        if (node === null) {
            return null;
        }
        if (node.succ) {
            this.cache = node.succ;
            return node.succ.v;
        }
        return null;
    }
    prev(k) {
        if (this.root === null) {
            return null;
        }
        const [node] = this.getNode(k);
        if (node === null) {
            return null;
        }
        if (node.pred) {
            this.cache = node.pred;
            return node.pred.v;
        }
        return null;
    }
}


class BSTExtValidate extends LinearBST {
    constructor() {
        super([]);
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
            return false;
        }
        if (node.l && (node.l.k > node.k || (min && node.l.k < min))) {
            return false;
        }
        return this.isOrdered(node.l, min, max) && this.isOrdered(node.r, min, max);
    }
    isBST() {
        if (!this.validateSize())
            return false;
        if (!this.isOrdered())
            return false;
        if (!this.isUniqueKey())
            return false;
        return true;
    }
}