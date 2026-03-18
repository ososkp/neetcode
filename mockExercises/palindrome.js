function isPalindrome(s) {
    if (s.length <= 1) return true;

    let l = 0, r = s.length - 1;

    while (l < r) {
        while (l < r && !isAlphaNumeric(s[l])) l++;
        while (l < r && !isAlphaNumeric(s[r])) r--;


        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;

        l++;
        r--;
    }

    return true;
}

function isAlphaNumeric(c) {
    return /[A-Za-z0-9]/.test(c)
}

const s1 = "a man, a pla, a canal: panama!";
const s2 = "a man a plan";
const s3 = "";
const s4 = "a";
const s5 = "Race! Car!";
const s6 = "/.'.].!";

console.log(isPalindrome(s1));
console.log(isPalindrome(s2));
console.log(isPalindrome(s3));
console.log(isPalindrome(s4));
console.log(isPalindrome(s5));
console.log(isPalindrome(s6));