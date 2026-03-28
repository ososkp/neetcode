const restoreIpAddresses = function (s) {
    if (s.length < 4) return [];
    const results = [];

    const isValid = (string) => {
        if (string.length === 1) return true;

        const asNumber = Number(string);
        return asNumber <= 255
            && asNumber.toString().length === string.length
    };

    const search = (startIndex, currentList) => {
        // Base case - we reached the end and our list has 4 items
        if (startIndex === s.length && currentList.length === 4) {
            results.push(currentList.join('.'));
        }

        if ((startIndex === s.length) !== (currentList.length === 4)) return;

        for (let endIndex = startIndex; endIndex < startIndex + 3; endIndex++) {
            if (endIndex >= s.length) break;
            const sub = s.slice(startIndex, endIndex + 1);

            if (isValid(sub)) {
                currentList.push(sub);
                search(endIndex + 1, currentList);
                currentList.pop();
            }
        }
    };

    search(0, []);
    return results;
}

const s1 = "25525511135";
// Output: ["255.255.11.135","255.255.111.35"]
const s2 = "0000"
// Output: ["0.0.0.0"]
const s3 = "101023"
// Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

console.log(restoreIpAddresses(s1));
console.log(restoreIpAddresses(s2));
console.log(restoreIpAddresses(s3));