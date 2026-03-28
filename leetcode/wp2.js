const wordPattern = function (pattern, string) {
    const d = new Map();
    const visited = new Set();

    const search = (p, s) => {
        // Base good: both reached the end
        if (p === pattern.length && s === string.length) {
            return true;
        }

        // Base bad: only one reached the end
        // Shortstop: not enough string letters for the pattern
        if ((p === pattern.length) !== (s === string.length)
            || pattern.length - p > string.length - s) {
            return false;
        }

        // Pattern letter p exists in dict - extract substring
        if (d.has(pattern[p])) {
            const wordFromPattern = d.get(pattern[p]);

            // If there's not enough of the string left
            if (wordFromPattern.length + s > string.length) {
                return false;
            }

            const wordFromString = string.slice(s, s + wordFromPattern.length);

            if (wordFromPattern === wordFromString) {
                return search(p + 1, s + wordFromString.length);
            } else {
                return false;
            }
        }

        // Otherwise, iterate through the rest of the string
        for (let endIndex = s + 1; endIndex <= string.length; endIndex++) {
            const substring = string.slice(s, endIndex);

            if (!visited.has(substring)) {
                visited.add(substring);
                d.set(pattern[p], substring);

                const result = search(p + 1, endIndex);

                if (!result) {
                    visited.delete(substring);
                    d.delete(pattern[p], substring);
                } else {
                    return true;
                }
            }
        }

        return false;
    }
    return search(0, 0);
}

const pattern1 = "abab"
const string1 = "redblueredblue"
const pattern2 = "aaaa"
const string2 = "asdasdasdasd"
const pattern3 = "ab"
const string3 = "aa"
const pattern4 = "aba"
const string4 = "xyzblablayyz"

console.log(wordPattern(pattern1, string1));
console.log(wordPattern(pattern2, string2));
console.log(wordPattern(pattern3, string3));
console.log(wordPattern(pattern4, string4));