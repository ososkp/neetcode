class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        if (s.length <= 1) return s.length;

        let charSet = new Set()
        let l = 0, maxCount = 0;

        for (let r = 0; r < s.length; r++) {
            while (charSet.has(s[r])) {
                charSet.delete(s[l]);
                l++;
            }
            charSet.add(s[r])
            maxCount = Math.max(maxCount, charSet.size)
        }

        return maxCount;
    }
}

const sol = new Solution();

const s = "zxyzxyz";

console.log(sol.lengthOfLongestSubstring(s));

const s2 = "xxxx";

console.log(sol.lengthOfLongestSubstring(s2));
