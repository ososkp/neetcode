class Store {
    constructor() {
        this.store = new Map();
    }

    set(key, value, timestamp) {
        if (!this.store.has(key)) {
            this.store.set(key, []);
            this.store.get(key).push({ value, timestamp });
        } else {
            const vals = this.store.get(key);

            if (vals[vals.length - 1].timestamp <= timestamp) {
                vals.push({ value, timestamp });
                return;
            }

            let low = 0, high = vals.length;
            let ans = -1;
            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                if (vals[mid].timestamp <= timestamp) {
                    low = mid + 1;
                } else {
                    ans = mid;
                    high = mid - 1;
                }
            }

            vals.splice(ans, 0, { value, timestamp });
        }
    }

    get(key, timestamp) {
        const vals = this.store.get(key);
        if (!vals) return null;

        if (vals[vals.length - 1].timestamp <= timestamp) {
            return vals[vals.length - 1];
        }

        return this.search(vals, timestamp);

    }

    search(vals, ts) {
        let low = 0, high = vals.length - 1;
        let answer = null;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (vals[mid].timestamp <= ts) {
                answer = vals[mid].value;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return answer;
    }
}

const st = new Store();

st.set(1, 1, 1);
st.set(1, 6, 15);
st.set(1, 3, 3);
st.set(1, 5, 10);
st.set(1, 4, 5);
st.set(1, 2, 2);

console.log(st.store);

console.log(st.get(1, 1));
console.log(st.get(1, 2));
console.log(st.get(1, 3));
console.log(st.get(1, 4));
console.log(st.get(1, 5));
console.log(st.get(1, 6));
console.log(st.get(1, 7));
console.log(st.get(1, 8));
console.log(st.get(1, 9));
console.log(st.get(1, 10));
console.log(st.get(1, 0));