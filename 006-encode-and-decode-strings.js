class Solution {
    DELIMITER = '#'
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        return strs.map(str => this.buildStringEncoding(str)).join('')
    }

    buildStringEncoding(string) {
        return `${string.length}${this.DELIMITER}${string}`
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        const words = new Array()

        let i = 0
        while (i < str.length) {
            let j = str.indexOf(this.DELIMITER, i)

            const len = parseInt(str.substring(i, j))
            const wordStart = j + 1
            const wordEnd = wordStart + len

            words.push(str.substring(wordStart, wordEnd))

            i = wordEnd
        }

        return words
    }
}

const sol = new Solution()

input = ["Hello", "World"]

const encoded = sol.encode(input)
console.log(sol.decode(encoded))