class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        const stack = [];
        let maxArea = 0;
        const h = [...heights, 0];

        for (let i = 0; i < h.length; i++) {
            while (stack.length > 0 && h[i] < h[stack[stack.length - 1]]) {
                const height = h[stack.pop()];
                const width = stack.length === 0
                    ? i // This bar is the entirety of the rectangle's width
                    : i - stack[stack.length - 1] - 1;

                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}

const sol = new Solution();

const heights1 = [7, 1, 7, 2, 2, 4];
const heights2 = [1, 3, 7];

console.log(sol.largestRectangleArea(heights1));
console.log(sol.largestRectangleArea(heights2));

/*
    largestRectangleArea(heights) {
        let maxArea = 0;
        const stack = [0];
        const h = [...heights, 0];

        for (let i = 0; i < h.length; i++) {
            while (stack.length > 0 && h[i] < h[stack[stack.length - 1]]) {
                const height = h[stack.pop()];
                const width = stack.length === 0
                    ? i
                    : i - stack[stack.length - 1] - 1;

                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }

        return maxArea;
    }
*/