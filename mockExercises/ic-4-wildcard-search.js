class Solution {
    searchIndex(pattern, str) {
        if (pattern.length === 0) return -1;

        // Pointers
        let p = 0, s = 0;
        // The index of the most recent *
        let starIdx = -1;
        // The index in str currently being absorbed by *
        let matchIdx = -1;
        // The beginning of the match
        let startIdx = 0;

        while (s < str.length) {
            // Exact match
            if (p < pattern.length && pattern[p] === str[s]) {
                p++;
                s++;
                if (p === pattern.length) return startIdx;
            } else if (p < pattern.length && pattern[p] === '*') {
                // Wildcard found
                starIdx = p;
                matchIdx = s;
                p++;
                if (p === pattern.length) return startIdx;
            } else if (starIdx === -1) {
                // No match and we're not on a *, so reset
                startIdx++;
                s = startIdx;
                p = 0;
            } else {
                // No match but we have a *
                matchIdx++;
                s = matchIdx;
                p = starIdx + 1;
            }
        }

        while (p < pattern.length && pattern[p] === '*') p++;

        return p === pattern.length ? startIdx : -1;
    }
}

const pattern1 = "**A";
const str1 = "CDFGAGB";
const pattern2 = "A*";
const str2 = "CDFGAGB";
const pattern3 = "B**Y";
const str3 = "PROGRAMMING";
const str4 = "TESTING"
const pattern4 = ""

const sol = new Solution();
console.log(sol.searchIndex(pattern1, str1));
console.log(sol.searchIndex(pattern2, str2));
console.log(sol.searchIndex(pattern3, str3));
console.log(sol.searchIndex(pattern4, str4));