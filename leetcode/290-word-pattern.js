const wordPattern = function (pattern, s) {
    const pMap = {};
    const sMap = {};

    const words = s.split(' ');
    if (pattern.length !== words.length) return false;

    for (let i = 0; i < pattern.length; i++) {
        const letter = pattern[i];
        const word = words[i];

        if (Object.hasOwn(pMap, letter) && pMap[letter] !== word) return false;
        if (Object.hasOwn(sMap, word) && sMap[word] !== letter) return false;

        sMap[word] = letter;
        pMap[letter] = word;
    }

    return true;
}


const pattern1 = "abba", s1 = "dog cat cat dog";
const pattern2 = "abba", s2 = "dog cat cat fish";
const pattern3 = "aaaa", s3 = "dog cat cat dog";

console.log(wordPattern(pattern1, s1));
console.log(wordPattern(pattern2, s2));
console.log(wordPattern(pattern3, s3));