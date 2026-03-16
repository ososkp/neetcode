class Solution {
    sortBoxes(str) {
        const arr = str.split('').map(Number);
        const stack = [];
        const counts = new Array(10).fill(0);

        let p = 0;

        for (const num of arr) {
            while (stack.length > 0 && num < stack[stack.length - 1]) {
                const top = stack.pop();
                counts[Math.min(top + 1, 9)]++;
            }
            stack.push(num);
            p++;
        }

        for (const num of stack) {
            counts[num]++;
        }

        let result = '';
        for (let i = 0; i <= 9; i++) {
            result += String(i).repeat(counts[i]);
        }

        return result;
    }
}

const sol = new Solution();

const str1 = '26547';
const str2 = '123456';
const str3 = '654321';

console.log(sol.sortBoxes(str1));
console.log(sol.sortBoxes(str2));
console.log(sol.sortBoxes(str3));