import { PriorityQueue } from '@datastructures-js/priority-queue';

class Solution {
    minq = new PriorityQueue((a, b) => b - a);
    maxq = new PriorityQueue((a, b) => a - b);

    add(value) {
        this.maxq.enqueue(value)
        const localMin = this.maxq.dequeue();
        this.minq.enqueue(localMin);

        if (this.minq.size() > this.maxq.size()) {
            const localMax = this.minq.dequeue();
            this.maxq.enqueue(localMax);
        }
    }
}

const sol = new Solution();

sol.add(3);
sol.add(1);
sol.add(5);
sol.add(6);
sol.add(2);
sol.add(4);

console.log(sol.minq.front());
console.log(sol.maxq.toArray());