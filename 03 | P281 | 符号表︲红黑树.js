/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-22 14:48:05
 * @LastEditTime: 2021-09-23 09:56:04
 * @Description: file content
 */
import { BSTNode, BST } from './03 | P266 | 练习 3.2.34︲线性符号表';
class RedBlackBSTNode extends BSTNode {
    constructor(k, v) {
        super(k, v);
        this.l = null;
        this.r = null;
        this.red = true;
    }
}
export class RedBlackBST extends BST {
    constructor(array) {
        super(array);
    }
    set(k, v) {
        const stack = [[this, 'root']];
        const { compare } = this;
        let node = this.root;
        while (node !== null) {
            const ret = compare(k, node.k);
            if (ret < 0) {
                stack.push([node, 'l']);
                node = node.l;
            }
            else if (ret > 0) {
                stack.push([node, 'r']);
                node = node.r;
            }
            else {
                node.v = v;
            }
        }
        let key, t;
        if (node === null) {
            [node, key] = stack.pop();
            node[key] = new RedBlackBSTNode(k, v);
        }
        while (stack.length) {
            ;
            [node, key] = stack.pop();
            t = node[key] = this.flipColor(this.rotateRight(this.rotateLeft(node[key])));
            t.size = 1 + (t.l ? t.l.size : 0) + (t.r ? t.r.size : 0);
        }
        this.root.red = false;
        return v;
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
}
