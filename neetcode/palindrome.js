class Solution {
    isPalindrome(s) {
        let l = 0, r = s.length - 1;

        while (l < r) {
            while (!this.isAlphanumeric(s[l])) l++;
            while (!this.isAlphanumeric(s[r])) r--;

            if (s[l] !== s[r]) return false;

            l++;
            r--;
        }

        return true;
    }

    isAlphanumeric(c) {
        return /[A-Za-z0-9]/.test(c);
    }
}

const sol = new Solution();

const s1 = "race car?";
const s2 = "!!amannama";
const s3 = "race cat";

console.log(sol.isPalindrome('')); // true
console.log(sol.isPalindrome(s1)); // true
console.log(sol.isPalindrome(s2)); // true
console.log(sol.isPalindrome(s3)); // false