/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-15 09:56:34
 * @LastEditTime: 2021-09-15 10:14:33
 * @Description: file content
 */
import { BST } from "./03 | P252 | 符号表︲二叉查找树";
export class BSTExtValidate extends BST {
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
