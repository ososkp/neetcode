class Solution {
    buildFreqString(str) {
        const freqArray = new Uint32Array(26)

        for (const char of str) {
            freqArray[char.charCodeAt(0) - 97]++
        }

        return freqArray.join('_')
    }

    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    groupAnagrams(strs) {
        const anagramMap = new Map()

        strs.forEach(str => {
            let freqString = this.buildFreqString(str)

            const list = anagramMap.get(freqString) || []
            list.push(str)
            anagramMap.set(freqString, list)
        })

        return Array.from(anagramMap.values())
    }
}

const sol = new Solution()

strs = ["act", "pots", "tops", "cat", "stop", "hat"]

console.log(sol.groupAnagrams(strs))