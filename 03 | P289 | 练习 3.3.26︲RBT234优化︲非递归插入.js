/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-22 14:48:05
 * @LastEditTime: 2021-09-24 09:35:36
 * @Description: file content
 */
import { RedBlackBST234, RedBlackBSTNode } from './03 | P283 | 符号表︲自顶而下的 2-3-4 树';
export class RedBlackBST234While extends RedBlackBST234 {
    constructor(array) {
        super(array);
    }
    set(k, v) {
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
                node.v = v;
                break;
            }
        } while (node !== null);
        if (node === null) {
            const parent = chain[chain.length - 1];
            parent[this.compare(k, parent.k) < 0 ? 'l' : 'r'] = new RedBlackBSTNode(k, v);
            this.flipColor(parent);
            this.rotateLeftWp(chain, 1);
            this.rotateRightWp(chain, 2);
        }
        for (const node of chain) {
            node.size += 1;
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
        }
        else {
            chain.splice(i, 1);
        }
        const parent = chain[i - 1];
        if (this.compare(a.k, parent.k) < 0) {
            parent.l = a;
        }
        else {
            parent.r = a;
        }
        return a;
    }
    rotateLeftWp(chain, _i) {
        const len = chain.length;
        const i = len - _i;
        const a = chain[i];
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
        const parent = chain[i - 1];
        if (this.compare(a.k, parent.k) < 0) {
            parent.l = a;
        }
        else {
            parent.r = a;
        }
        chain[i] = b;
        return b;
    }
}
