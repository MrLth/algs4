class SelectSort extends Array {
    constructor(array, comparer) {
        super(array.length);
        for (let i = 0; i < array.length; i++) {
            this[i] = array[i];
        }
        if (comparer) {
            this.less = comparer;
        }
    }
    less(a, b) {
        return a.valueOf() < b.valueOf();
    }
    exch(ai, bi) {
        const t = this[ai];
        this[ai] = this[bi];
        this[bi] = t;
    }
    resort() {
        const N = this.length;
        for (let i = 0; i < N; i++) {
            let min = i;
            for (let j = i + 1; j < N; j++) {
                if (this.less(this[j], this[min])) {
                    min = j;
                }
            }
            this.exch(min, i);
        }
        return this;
    }
}
