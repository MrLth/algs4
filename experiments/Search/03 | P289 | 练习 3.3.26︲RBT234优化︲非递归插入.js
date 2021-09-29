/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-22 14:48:05
 * @LastEditTime: 2021-09-24 15:04:20
 * @Description: file content
 */
class RedBlackBST234While extends RedBlackBST234 {
    constructor(array) {
        super(array);
    }

    set(k, v) {
        if (k === "forthcoming]") {
            debugger
        }

        this.setBase(k, v)

        if (!this.isBST()) {
            console.log(this.root, k, v)
            // console.log(this.root, JSON.parse(json), k)
            debugger
        }

        return v
    }

    setBase(k, v) {
        if (this.root === null) {
            this.root = new RedBlackBSTNode(k, v);
            this.root.red = false;
            return v;
        }
        const chain = [];
        let node = this.root;
        do {
            chain.push(node);
            this.flipColor(node);
            this.rotateRightWp(chain, 3);
            node = this.rotateLeftWp(chain, 1);
            node = this.rotateRightWp(chain, 1);
            const cmp = this.compare(k, node.k);
            if (cmp < 0) {
                node = node.l;
            }
            else if (cmp > 0) {
                node = node.r;
            }
            else {
                this.root.red = false;
                return node.v = v;
            }
        } while (node !== null);

        const parent = chain[chain.length - 1];
        parent[this.compare(k, parent.k) < 0 ? 'l' : 'r'] = new RedBlackBSTNode(k, v);
        this.flipColor(parent);
        this.rotateLeftWp(chain, 1);
        this.rotateRightWp(chain, 2);


        // for (let i = chain.length - 1; i >= 0; i--) {
        //     const node = chain[i];
        //     node.size = 1 + (node.l ? node.l.size : 0) + (node.r ? node.r.size : 0);
        // }
        for (const node of chain) {
            node.size++
        }
        this.root.red = false;
        return v;
    }
    rotateRightWp(chain, _i) {
        const len = chain.length;
        const i = len - _i;
        const b = chain[i];
        if (len < _i || !(b.l && b.l.red) || !(b.l && b.l.l && b.l.l.red)) {
            return b;
        }
        const a = b.l;
        b.l = a.r;
        a.r = b;
        a.red = b.red;
        b.red = true;
        a.size = b.size;
        b.size = 1 + (b.l ? b.l.size : 0) + (b.r ? b.r.size : 0);
        if (_i === 1) {
            chain[i] = a;
        } else if (_i === 2) {
            chain.splice(i, 1);
        } else if (_i === 3) {
            let t = chain[i];
            chain[i] = chain[i + 1]
            chain[i + 1] = t
        }
        const parent = chain[i - 1];
        if (parent) {
            if (this.compare(a.k, parent.k) < 0) {
                parent.l = a;
            } else {
                parent.r = a;
            }
        } else {
            this.root = a
        }

        return a;
    }
    rotateLeftWp(chain, _i) {
        const len = chain.length;
        const i = len - _i;
        const a = chain[i];
        if (len < _i || !(a.r && a.r.red) || (a.l && a.l.red)) {
            return a;
        }
        const b = a.r;
        a.r = b.l;
        b.l = a;
        b.red = a.red;
        a.red = true;
        b.size = a.size;
        a.size = 1 + (a.l ? a.l.size : 0) + (a.r ? a.r.size : 0);
        const parent = chain[i - 1]
        if (parent) {
            if (this.compare(a.k, parent.k) < 0) {
                parent.l = b;
            } else {
                parent.r = b;
            }
        } else {
            this.root = b
        }

        chain[i] = b;
        return b;
    }
}
