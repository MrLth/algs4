/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-22 14:48:05
 * @LastEditTime: 2021-09-29 23:42:30
 * @Description: file content
 */
import { RedBlackBST234, RedBlackBSTNode } from './03 | P283 | 符号表︲自顶而下的 2-3-4 树';
class NodePath {
    constructor(_path, _direction) {
        this.path = _path;
        this.direction = _direction;
    }
    add(node, direction) {
        this.path.push(node);
        this.direction.push(direction);
    }
    setLast(node) {
        const i = this.path.length - 1;
        this.path[i][this.direction[i]] = node;
    }
    getLast() {
        const i = this.path.length - 1;
        return this.path[i][this.direction[i]];
    }
    get(i) {
        return this.path[i][this.direction[i]];
    }
    size() {
        return this.path.length;
    }
    rotateLeft(i) {
        const { path, direction } = this;
        let a = path[i][direction[i]];
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
        path[i - 1][direction[i - 1]] = b;
        path[i] = b;
        direction[i] = 'l';
        return b;
    }
    rotateRight(i) {
        const { path, direction } = this;
        let b = path[i][direction[i]];
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
        path.splice(i, 1);
        direction.splice(i, 1);
        return a;
    }
}
export class RedBlackBST234While extends RedBlackBST234 {
    constructor(array) {
        super(array);
    }
    set(k, v) {
        let node = this.root;
        if (node === null) {
            this.root = new RedBlackBSTNode(k, v);
            return v;
        }
        const { optimizeTree, refreshSize } = RedBlackBST234While;
        const nodePath = new NodePath(this, 'root');
        do {
            optimizeTree(nodePath);
            node = nodePath.getLast();
            const cmp = this.compare(k, node.k);
            if (cmp < 0) {
                nodePath.add(node, 'l');
                node = node.l;
            }
            else if (cmp > 0) {
                nodePath.add(node, 'r');
                node = node.r;
            }
            else {
                node.v = v;
                break;
            }
        } while (node !== null);
        if (node === null) {
            nodePath.setLast(new RedBlackBSTNode(k, v));
            optimizeTree(nodePath);
        }
        for (let i = nodePath.size() - 1; i >= 0; i--) {
            refreshSize(nodePath.get(i));
        }
    }
    static refreshSize(node) {
        node.size = 1 + (node.l ? node.l.size : 0) + (node.r ? node.r.size : 0);
    }
    static optimizeTree(nodePath) {
        let i = nodePath.size() - 1, temp;
        const { canFlip, canRotateRight, flipColor } = RedBlackBST234While;
        do {
            let node = nodePath.get(i);
            if (canFlip(node)) {
                flipColor(node);
                temp = null;
                i--;
            }
            else {
                nodePath.rotateLeft(i);
                if (i > 0 && canRotateRight(nodePath.get(i - 1))) {
                    temp = --i;
                }
                else {
                    break;
                }
            }
        } while (i >= 0);
        if (temp !== null) {
            nodePath.rotateRight(temp);
        }
    }
    static canFlip(node) {
        return (node.l && node.l.red) && (node.r && node.r.red);
    }
    static canRotateRight(node) {
        return (node.l && node.l.red) && (node.l && node.l.l && node.l.l.red);
    }
    static flipColor(node) {
        node.l.red = false;
        node.r.red = false;
        node.red = true;
        return node;
    }
}
