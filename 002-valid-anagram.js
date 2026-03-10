class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) return false;

        const charMap = {}

        for (let i = 0; i < s.length; i++) {
            charMap[s[i]] = (charMap[s[i]] || 0) + 1
        }

        for (let i = 0; i < t.length; i++) {
            if (!charMap[t[i]]) return false
            charMap[t[i]] = (charMap[t[i]] || 0) - 1
        }

        return true
    }
}

const sol = new Solution()

const s = 'racecar'
const t = 'carrace'
const u = 'racecara'

console.log(sol.isAnagram(s, t))