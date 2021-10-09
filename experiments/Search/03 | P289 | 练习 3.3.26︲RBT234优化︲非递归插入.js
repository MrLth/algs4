/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-22 14:48:05
 * @LastEditTime: 2021-10-01 22:34:31
 * @Description: file content
 */
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
        this.path.pop();
        this.direction.pop()
    }
    getLast() {
        const i = this.path.length - 1;
        return this.path[i][this.direction[i]];
    }
    get(i) {
        if (i >= this.path.length) {
            return
        }
        return this.path[i][this.direction[i]];
    }
    set(i, node) {
        if (i >= this.path.length) {
            return
        }
        return this.path[i][this.direction[i]] = node
    }
    delete(i) {
        if (i >= this.path.length) {
            return
        }
        return [this.path.splice(i, 1)[0], this.direction.splice(i, 1)[0]]
    }
    update(i, node, _direction) {
        this.path[i] = node
        this.direction[i] = _direction
    }
    size() {
        return this.path.length;
    }
    rotateLeft(i) {
        let a = this.get(i);
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
        this.set(i, b)
        this.delete(i + 1)
        return b;
    }
    rotateRight(i) {
        let b = this.get(i);
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
        this.set(i, a)
        if (a.r === this.get(i + 2)) {
            this.update(i + 1, a, 'r')
            this.update(i + 2, b, 'l')
        } else {
            this.delete(i + 1)
        }
        return a;
    }
    optimizeTree() {
        let i = this.size() - 1, temp = null;
        const { canFlip, canRotateRight, flipColor } = RedBlackBST234While;
        do {
            let node = this.get(i);
            if (canFlip(node)) {
                flipColor(node);
                temp = null;
                i--;
            }
            else {
                this.rotateLeft(i);
                if (i > 0 && canRotateRight(this.get(i - 1))) {
                    temp = --i;
                }
                else {
                    break;
                }
            }
        } while (i >= 0);
        if (temp !== null) {
            this.rotateRight(temp);
        }
    }
}
class RedBlackBST234While extends RedBlackBST234 {
    constructor(array) {
        super(array);
    }
    set(k, v) {
        let node = this.root;
        if (node === null) {
            this.root = new RedBlackBSTNode(k, v);
        } else {
            const { refreshSize } = RedBlackBST234While;
            const nodePath = new NodePath([this], ['root']);
            do {
                nodePath.optimizeTree(nodePath);
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
                // debugger
                nodePath.setLast(new RedBlackBSTNode(k, v));
                nodePath.optimizeTree(nodePath);
                for (let i = nodePath.size() - 1; i >= 0; i--) {
                    nodePath.get(i).size += 1;
                }
            }
        }
        this.root.red = false
        return v
    }
    static refreshSize(node) {
        node.size = 1 + (node.l ? node.l.size : 0) + (node.r ? node.r.size : 0);
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
