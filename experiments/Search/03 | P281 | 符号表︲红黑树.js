/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-22 14:48:05
 * @LastEditTime: 2021-09-23 10:29:44
 * @Description: file content
 */
class RedBlackBSTNode extends BSTNode {
    constructor(k, v) {
        super(k, v);
        this.l = null;
        this.r = null;
        this.red = true;
    }
}
class RedBlackBST extends BST {
    constructor(array) {
        super(array);
    }
    set(_k, _v) {
        const stack = [this, 'root'];
        const { compare } = this;
        let node = this.root;
        while (node !== null) {
            const ret = compare(_k, node.k);
            if (ret < 0) {
                stack.push(node, 'l');
                node = node.l;
            }
            else if (ret > 0) {
                stack.push(node, 'r');
                node = node.r;
            }
            else {
                node.v = _v;
                break
            }
        }
        let k = stack.pop()
        let n = stack.pop()
        if (node === null) {
            n[k] = new RedBlackBSTNode(_k, _v);
        }
        while (stack.length) {
            k = stack.pop()
            n = stack.pop()
            n = n[k] = this.flipColor(this.rotateRight(this.rotateLeft(n[k])));
            n.size = 1 + (n.l ? n.l.size : 0) + (n.r ? n.r.size : 0);
        }
        this.root.red = false;
        return _v;
    }
    setRecursion(k, v) {
        this.root = this.setRecursionBase(this.root, k, v);
        this.root.red = false;
    }
    setRecursionBase(node, k, v) {
        if (node === null) {
            return new RedBlackBSTNode(k, v);
        }
        const cmp = this.compare(k, node.k);
        if (cmp < 0)
            node.l = this.setRecursionBase(node.l, k, v);
        else if (cmp > 0)
            node.r = this.setRecursionBase(node.r, k, v);
        else
            node.v = v;
        node = this.flipColor(this.rotateRight(this.rotateLeft(node)));
        node.size = 1 + (node.l ? node.l.size : 0) + (node.r ? node.r.size : 0);
        return node;
    }
    rotateLeft(a) {
        if (!(a.r && a.r.red) || (a.l && a.l.red)) {
            return a;
        }
        const b = a.r;
        a.r = b.l;
        b.l = a;
        b.red = a.red;
        a.red = true;
        b.size = a.size;
        a.size = 1 + (a.l ? a.l.size : 0) + (a.r ? a.r.size : 0);
        return b;
    }
    rotateRight(b) {
        if (!(b.l && b.l.red) || !(b.l && b.l.l && b.l.l.red)) {
            return b;
        }
        const a = b.l;
        b.l = a.r;
        a.r = b;
        a.red = b.red;
        b.red = true;
        a.size = b.size;
        b.size = 1 + (b.l ? b.l.size : 0) + (b.r ? b.r.size : 0);
        return a;
    }
    flipColor(node) {
        if (!(node.l && node.l.red) || !(node.r && node.r.red)) {
            return node;
        }
        node.l.red = false;
        node.r.red = false;
        node.red = true;
        return node;
    }
    heightRecursion(node = this.root, height = 1) {
        if (node === null) {
            return height - 1
        }

        return Math.max(
            this.heightRecursion(node.r, height + 1),
            this.heightRecursion(node.l, height + 1)
        )
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
