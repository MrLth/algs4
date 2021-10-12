/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-22 14:48:05
 * @LastEditTime: 2021-10-11 09:14:11
 * @Description: file content
 */
class RedBlackBST234AllowRightRed extends RedBlackBST234 {
    constructor(array) {
        super(array);
    }
    set(k, v) {
        this.root = this.setBase(this.root, k, v);
        this.root.red = false;
        return v;
    }
    setBase(node, k, v) {
        if (node === null) {
            return new RedBlackBSTNode(k, v);
        }
        this.flipColor(node); // 只需要变动这一条
        const cmp = this.compare(k, node.k);
        if (cmp < 0)
            node.l = this.setBase(node.l, k, v);
        else if (cmp > 0)
            node.r = this.setBase(node.r, k, v);
        else
            node.v = v;
        node = this.legalize(node);
        // node = this.rotateRight(this.rotateLeft(node))
        node.size = 1 + (node.l ? node.l.size : 0) + (node.r ? node.r.size : 0);
        return node;
    }
    legalize(node) {
        if (node.l && node.l.red) {
            if (node.l.l && node.l.l.red) {
                return this.rotateRight(node);
            }
            else if (node.l.r && node.l.r.red) {
                node.l = this.rotateLeft(node.l);
                return this.rotateRight(node);
            }
        }
        else if (node.r && node.r.red) {
            if (node.r.r && node.r.r.red) {
                return this.rotateLeft(node);
            }
            else if (node.r.l && node.r.l.red) {
                node = this.rotateLeft(node);
                node.l = this.rotateLeft(node.l);
                return this.rotateRight(node);
            }
        }
        return node
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
