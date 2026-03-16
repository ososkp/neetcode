class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        const freqMap = new Map();
        let l = 0;
        let maxFreq = 0;
        let maxCount = 0;

        for (let r = 0; r < s.length; r++) {
            freqMap.set(s[r], (freqMap.get(s[r]) ?? 0) + 1);
            maxFreq = Math.max(maxFreq, freqMap.get(s[r]));

            while ((r - l + 1) - maxFreq > k) {
                freqMap.set(s[l], freqMap.get(s[l]) - 1);
                l++;
            }

            maxCount = Math.max(maxCount, r - l + 1);
        }
        return maxCount;
    }
}

const sol = new Solution();

const s = "XYYX";
const k = 2;

console.log(sol.characterReplacement(s, k));

const s2 = "AAABABB";
const k2 = 1;

console.log(sol.characterReplacement(s2, k2));
