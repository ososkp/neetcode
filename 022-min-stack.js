class MinStack {
    stack;
    length;
    minStack;

    constructor() {
        this.stack = new Array();
        this.minStack = new Array();
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.stack.push(val);

        const minStackLength = this.minStack.length;

        if (minStackLength === 0 || val <= this.minStack[minStackLength - 1]) {
            this.minStack.push(val);
        } else if (val <= this.minStack[minStackLength - 1]) {
            this.minStack.push(this.minStack[minStackLength - 1]);
        }
    }

    /**
     * @return {void}
     */
    pop() {
        const popped = this.stack.pop();

        if (popped === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    /**
     * @return {number}
     */
    top() {
        return this.stack[this.stack.length - 1]
    }

    /**
     * @return {number}
     */
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

const minStack = new MinStack();

minStack.push(8);
minStack.push(1);
minStack.push(6);
minStack.push(3);
minStack.push(2);
minStack.push(0);

console.log(minStack.stack);
console.log(minStack.minStack);
console.log(minStack.getMin());


console.log(minStack.top());

minStack.pop();
console.log(minStack.getMin());
minStack.pop();
console.log(minStack.getMin());
minStack.pop();

console.log(minStack.stack);
console.log(minStack.minStack);
console.log(minStack.getMin());

minStack.pop();
minStack.pop();
minStack.pop();

minStack.push(5);
minStack.push(5);
minStack.push(5);
minStack.push(5);
minStack.push(5);
minStack.push(5);

console.log(minStack.stack);
console.log(minStack.minStack);

minStack.pop();
minStack.pop();
minStack.pop();

console.log(minStack.minStack);
