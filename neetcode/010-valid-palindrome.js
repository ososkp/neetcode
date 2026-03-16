class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        let p1 = 0, p2 = s.length - 1

        while (p1 <= p2) {
            while (p1 < p2 && !this.isAlphaNumeric(s[p1])) p1++;
            while (p1 < p2 && !this.isAlphaNumeric(s[p2])) p2--;
            if (s[p1].toLowerCase() !== s[p2].toLowerCase()) return false;

            p1++, p2--;
        }

        return true
    }

    isAlphaNumeric(char) {
        return /[A-Za-z0-9]/.test(char)
    }
}

const sol = new Solution()

const s = "Was it a car or a cat I saw?"

console.log(sol.isPalindrome(s))