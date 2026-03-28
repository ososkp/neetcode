class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) this.keyStore.set(key, []);

        this.keyStore.get(key).push({
            value,
            timestamp
        });
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        if (!this.keyStore.has(key)) return '';

        const arr = this.keyStore.get(key);

        if (timestamp < arr[0].timestamp) return '';

        let l = 0, r = arr.length - 1;
        let closestIndex = -1;

        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (arr[mid].timestamp === timestamp) {
                return arr[mid].value;
            }

            if (arr[mid].timestamp < timestamp) {
                closestIndex = mid;
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return closestIndex === -1 ? '' : arr[closestIndex].value
    }
}

const input1 = ["TimeMap",
    "set", ["alice", "happy", 1],
    "get", ["alice", 1],
    "get", ["alice", 2],
    "set", ["alice", "sad", 3],
    "get", ["alice", 3]]

// Output:
// [null, null, "happy", "happy", null, "sad"]

const tm = new TimeMap();
console.log(tm.set("alice", "happy", 1));
console.log(tm.get("alice", 1));
console.log(tm.get("alice", 2));
console.log(tm.set("alice", "sad", 3));
console.log(tm.get("alice", 3));

