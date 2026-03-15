class Solution {
    isPalindrome(s) {
        if (s.length === 0) return false;

        let l = 0, r = s.length - 1;

        while (l <= r) {
            while (!this.isAlphanumeric(s[l])) l++;
            while (!this.isAlphanumeric(s[r])) r--;

            if (s[l] !== s[r]) return false;

            l++;
            r--;
        }
        return true;
    }

    isAlphanumeric(char) {
        return /[a-zA-Z0-9]/g.test(char)
    }
}

const sol = new Solution();

const s1 = "race car?";
const s2 = "!!amannama";
const s3 = "race cat";

console.log(sol.isPalindrome(''));
console.log(sol.isPalindrome(s1));
console.log(sol.isPalindrome(s2));
console.log(sol.isPalindrome(s3));