const wordPattern = function (pattern, string) {
    const d = {};
    const visited = new Set();

    const search = (patternPointer, stringPointer) => {
        console.log(JSON.stringify(d), JSON.stringify([...visited]));
        // If both at the end, everything has been matched
        if (patternPointer === pattern.length && stringPointer === string.length) return true;
        // If one has reached the end and the other hasn't, we can't reach a solution
        if ((patternPointer === pattern.length) !== (stringPointer === string.length)) return false;
        // Prune branches where we can't assign at least on char to one pattern symbol
        if ((pattern.length - patternPointer) > (string.length - stringPointer)) return false;

        const char = pattern[patternPointer];
        // This pattern char has been seen before so we know what it should map to
        if (Object.hasOwn(d, char)) {
            const expectedWord = d[char];
            const wordLength = expectedWord.length;

            // See if there are even enough letters left in the string
            if (stringPointer + wordLength > string.length) return false;

            const actualWord = string.slice(stringPointer, stringPointer + wordLength);

            // If it's a match, we don't need to loop - add the length of the word and recurse
            if (actualWord === expectedWord) {
                return search(patternPointer + 1, stringPointer + wordLength);
            } else {
                // If not a match, no need to keep searching
                return false;
            }
        }

        for (let k = stringPointer; k < string.length; k++) {
            const substring = string.substring(stringPointer, k + 1);

            // If substring is in visited, this branch fails
            //  Since in order to get here we know the pattern char isn't in d
            if (!visited.has(substring)) {
                d[char] = substring;
                visited.add(substring);
                const result = search(patternPointer + 1, k + 1);

                if (result) {
                    return true;
                }

                delete d[char];
                visited.delete(substring);
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