class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        if (s.length % 2 === 1) return false;

        const complements = {
            ')': '(',
            ']': '[',
            '}': '{'
        };

        const stack = new Array();

        for (let i = 0; i < s.length; i++) {
            if (complements[s[i]]) {
                const top = stack.pop();
                if (top !== complements[s[i]]) return false;
            } else {
                stack.push(s[i]);
            }
        }

        return stack.length === 0;
    }
}

const sol = new Solution();

const s = '[]';

const s2 = '([{}])';

const s3 = '[(])';

console.log(sol.isValid(s));
console.log(sol.isValid(s2));
console.log(sol.isValid(s3));