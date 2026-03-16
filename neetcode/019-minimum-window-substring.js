class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
        const targetMap = new Map();
        const windowMap = new Map();
        let matches = 0;
        let requiredMatches;
        let minLength = Infinity;
        let ind = [-1, -1];

        for (let char of t) {
            targetMap.set(char, (targetMap.get(char) ?? 0) + 1)
        }

        requiredMatches = targetMap.size

        let l = 0, r = 0;

        while (r < s.length) {
            if (targetMap.has(s[r])) {
                windowMap.set(s[r], (windowMap.get(s[r]) ?? 0) + 1)

                if (targetMap.get(s[r]) === windowMap.get(s[r])) matches++;
            }

            while (l <= r && matches === requiredMatches) {
                if (r - l + 1 < minLength) {
                    ind = [l, r + 1]
                    minLength = r - l + 1;
                }

                if (targetMap.has(s[l])) {
                    windowMap.set(s[l], (windowMap.get(s[l]) ?? 0) - 1)

                    if (windowMap.get(s[l]) < targetMap.get(s[l])) matches--;
                }
                l++;
            }

            r++;
        }

        return ind[0] === -1 ? "" : s.substring(ind[0], ind[1]);
    }
}

const sol = new Solution();

const s = "OUZODYXAZV";
const t = "XYZ";

console.log(sol.minWindow(s, t));

const s2 = "xyz";
const t2 = "xyz"

console.log(sol.minWindow(s2, t2))

const s3 = "x";
const t3 = "xy"

console.log(sol.minWindow(s3, t3))