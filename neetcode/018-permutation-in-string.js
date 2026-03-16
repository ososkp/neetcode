class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        if (s1.length > s2.length) return false;

        const counts = new Array(26).fill(0);
        let cm = 0;

        for (let i = 0; i < s1.length; i++) {
            counts[s1.charCodeAt(i) - 97]++;
            counts[s2.charCodeAt(i) - 97]--;
        }

        for (let i = 0; i < 26; i++) {
            if (counts[i] === 0) cm++;
        }

        for (let i = 0; i < s2.length - s1.length; i++) {
            if (cm === 26) return true;

            let leftChar = s2.charCodeAt(i) - 97;
            let rightChar = s2.charCodeAt(i + s1.length) - 97;

            if (counts[rightChar] === 0) cm--;
            counts[rightChar]--;
            if (counts[rightChar] === 0) cm++;

            if (counts[leftChar] === 0) cm--;
            counts[leftChar]++;
            if (counts[leftChar] === 0) cm++;
        }

        return cm === 26;
    }
}

const sol = new Solution();

const s1 = "abc"
const s2 = "lecabee"

console.log(sol.checkInclusion(s1, s2));

const s3 = "abc";
const s4 = "lecaabee";

console.log(sol.checkInclusion(s3, s4));

function pr(l, r, s) {
    let out = '';
    for (let i = 0; i < s.length; i++) {
        if (i === l) out += '|';
        out += s[i];
        if (i === r) out += '|';
    }

    console.log(out);
}
