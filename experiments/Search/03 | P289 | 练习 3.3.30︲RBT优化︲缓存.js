/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-22 14:48:05
 * @LastEditTime: 2021-10-11 10:18:35
 * @Description: file content
 */
class RedBlackBSTCache extends RedBlackBST234 {
    constructor(array) {
        super(array);
    }
    get(k) {
        if (this.cache && this.compare(this.cache.k, k) === 0) {
            return this.cache.v;
        }
        const { root, compare } = this;
        let node = root;
        while (node !== null) {
            const ret = compare(k, node.k);
            if (ret > 0) {
                node = node.r;
            }
            else if (ret < 0) {
                node = node.l;
            }
            else {
                this.cache = node;
                return node.v;
            }
        }
        return null;
    }
    set(k, v) {
        this.root = this.setBase(this.root, k, v);
        this.root.red = false;
        return v;
    }
    setBase(node, k, v) {
        if (node === null) {
            return this.cache = new RedBlackBSTNode(k, v);
        }
        const cmp = this.compare(k, node.k);
        if (cmp < 0)
            node.l = this.setBase(node.l, k, v);
        else if (cmp > 0)
            node.r = this.setBase(node.r, k, v);
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
