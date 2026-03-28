const partition = function (s) {
    const results = [];
    const search = function (startIndex, currentPath) {
        if (startIndex === s.length) {
            results.push([...currentPath]);
        }

        for (let endIndex = startIndex; endIndex < s.length; endIndex++) {
            const sub = s.slice(startIndex, endIndex + 1);
            if (isPalindrome(sub)) {
                currentPath.push(sub);
                search(endIndex + 1, currentPath);
                currentPath.pop();
            }
        }
    }

    const isPalindrome = function (s) {
        let l = 0, r = s.length - 1;
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++;
            r--;
        }
        return true;
    }

    search(0, []);

    return results;
}




const s1 = "aab";
// Output: [["a","a","b"],["aa","b"]]

const s2 = "a";
// Output: [["a"]]

console.log(partition(s1));
console.log(partition(s2));