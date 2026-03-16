class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        const res = new Array(temperatures.length).fill(0);
        const stack = []; // Storing indices

        for (let i = 0; i < temperatures.length; i++) {
            while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
                const stackIdx = stack.pop();
                res[stackIdx] = i - stackIdx;
            }
            stack.push(i);
        }
        return res;
    }
}

const sol = new Solution();

const temperatures = [30, 38, 30, 36, 35, 40, 28]

console.log(sol.dailyTemperatures(temperatures));

const temperatures2 = [22, 21, 20]

console.log(sol.dailyTemperatures(temperatures2));
