class Solution {
    decodeSingle(stream) {
        const [placeInString, row] = JSON.parse(stream[0]);
        stream.splice(0, 1);

        const targetRow = stream.length - 1 - row;
        return stream[targetRow][placeInString];
    }

    decode(stream) {
        const visited = new Set();
        let result = [];
        let maxIndex = -1;

        let i = 0;
        while (i < stream.length) {
            if (stream[i] === '') {
                i++;
                continue;
            }

            // First get index where this will go
            const index = Number(stream[i + 0])

            // If we've seen this index...
            if (visited.has(index)) {
                // Check if the answer is finished, return if so
                if (visited.size === maxIndex + 1) {
                    return result.join('');
                } else {
                    // If not, start over
                    visited.clear();
                    result.length = 0;
                    maxIndex = -1;
                }
            }
            visited.add(index);
            maxIndex = Math.max(index, maxIndex);

            let endOfBlock = i + 1;
            while (endOfBlock < stream.length && stream[endOfBlock] !== '') endOfBlock++;

            const stringRows = stream.slice(i + 1, endOfBlock);
            const answerForIndex = this.decodeSingle(stringRows);

            result[index] = answerForIndex;

            i = endOfBlock;
        }
        return result.join('');
    }
}

const text1 = ["[2, 3]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"]
// Output: "C"
const text2 = ["[0, 0]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"]
// Output: "V"
const text3 = ["[6, 3]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"]
// Output: "G"

const sol = new Solution();

console.log(sol.decodeSingle(text1));
console.log(sol.decodeSingle(text2));
console.log(sol.decodeSingle(text3));


const text4 = ["1", "[2, 3]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "", "0", "[0, 0]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"];
// Output: "VC"
const text5 = ["1", "[3, 1]", "GHIJKLM", "NOPQRST", "UVWXYZX", "ABCDEFY", "", "2", "[0, 3]", "PQRSTUV", "WXYZABC", "DEFGHIJ", "KLMNOPQ", "", "0", "[2, 2]", "STUVWXY", "ZABCDEF", "GHIJKLM", "NOPQRST"];
// Output: "BXP"
const text6 = ["0", "[6, 2]", "MNOPQRS", "TUVWXYZ", "ABCDEFZ", "GHIJKLM", "", "1", "[2, 0]", "BCDEFGH", "IJKLMNO", "PQRSTUV", "WXYZABC"];
// Output: "ZY"

console.log(sol.decode(text4));
console.log(sol.decode(text5));
console.log(sol.decode(text6));

const text7 = ["2", "[2, 3]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "", "0", "[1, 2]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "", "1", "[0, 0]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "", "0", "[0, 1]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"]
// Output: "IVC"
const text8 = ["0", "[3, 2]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO", "", "1", "[1, 1]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO", "", "0", "[5, 0]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO", "", "2", "[2, 3]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO"]
// Output: "WB"
const text9 = ["3", "[0, 3]", "QWERTYUIOP", "ASDFGHJKLZ", "ZXCVBNMQWE", "POIUYTREWQ", "", "1", "[2, 1]", "ABCDEFGHIJ", "KLMNOPQRST", "UVWXYZABCD", "EFGHIJKLMN", "", "0", "[4, 2]", "ZYXWVUTSRQ", "PONMLKJIHG", "FEDCBAZYX", "WVUTSRQPON", "", "2", "[1, 0]", "HELLOWORLDX", "GOODBYEWORLD", "TESTSTRING", "FINALTEST", "", "1", "[3, 3]", "SHOULDNOTBE", "PROCESSEDXX", "XXXXXXXXXX", "XXXXXXXXXX", "", "4", "[6, 1]", "SHOULDNOTBE", "PROCESSEDXX", "XXXXXXXXXX", "XXXXXXXXXX"]
// Output: "LWIQ"

console.log(sol.decode(text7));
console.log(sol.decode(text8));
console.log(sol.decode(text9));
