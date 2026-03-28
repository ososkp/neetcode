class Solution {
    decodeGroup(text) {
        const [x, y] = JSON.parse(text[0]);

        return text[text.length - 1 - y][x];
    }

    decodeSingle(text) {
        const result = [];
        let i = 0;

        while (i < text.length) {
            if (text[i] === '') {
                i++;
                continue;
            }
            /*
                i = index
                i + 1 = coords
                i + n... = text rows
            */
            const targetIndex = Number(text[i]);
            const [x, y] = JSON.parse(text[i + 1]);

            let endOfBlock = i + 2;
            while (endOfBlock < text.length && text[endOfBlock] !== '') {
                endOfBlock++;
            }

            const rowIndex = (endOfBlock - 1) - y;

            result[targetIndex] = text[rowIndex][x];

            i = endOfBlock + 1;
        }

        return result.join('');
    }

    decode(text) {
        const result = [];
        const indices = new Set();
        let i = 0;
        let maxIndex = -1;

        while (i < text.length) {
            if (text[i] === '') {
                i++;
                continue;
            }
            /*
                i = index
                i + 1 = coords
                i + n... = text rows
            */
            const targetIndex = Number(text[i]);

            // If we see a repeated index
            if (indices.has(targetIndex)) {
                // Check if current group is complete
                if (indices.size === maxIndex + 1) {
                    // If so, return - we're done
                    return result.join('');
                } else {
                    // If not, reset
                    result.length = 0;
                    maxIndex = -1;
                    indices.clear();
                }
            }

            indices.add(targetIndex);
            if (targetIndex > maxIndex) maxIndex = targetIndex;

            const [x, y] = JSON.parse(text[i + 1]);

            let endOfBlock = i + 2;
            while (endOfBlock < text.length && text[endOfBlock] !== '') {
                endOfBlock++;
            }

            const rowIndex = (endOfBlock - 1) - y;

            result[targetIndex] = text[rowIndex][x];

            i = endOfBlock + 1;
        }

        return result.join('');
    }
}

const text1 = ["[2, 3]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"];
const text2 = ["[0, 0]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"];
const text3 = ["[6, 3]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"];

const text4 = ["1", "[2, 3]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "",
    "0", "[0, 0]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"];

const text5 = ["2", "[2, 3]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "",
    "0", "[1, 2]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "",
    "1", "[0, 0]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "",
    "0", "[0, 1]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"];
// Output: "IVC"

const text6 = ["0", "[3, 2]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO", "",
    "1", "[1, 1]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO", "",
    "0", "[5, 0]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO", "",
    "2", "[2, 3]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO"];
// Output: "WB"

const text7 = ["3", "[0, 3]", "QWERTYUIOP", "ASDFGHJKLZ", "ZXCVBNMQWE", "POIUYTREWQ", "",
    "1", "[2, 1]", "ABCDEFGHIJ", "KLMNOPQRST", "UVWXYZABCD", "EFGHIJKLMN", "",
    "0", "[4, 2]", "ZYXWVUTSRQ", "PONMLKJIHG", "FEDCBAZYX", "WVUTSRQPON", "",
    "2", "[1, 0]", "HELLOWORLDX", "GOODBYEWORLD", "TESTSTRING", "FINALTEST", "",
    "1", "[3, 3]", "SHOULDNOTBE", "PROCESSEDXX", "XXXXXXXXXX", "XXXXXXXXXX", "",
    "4", "[6, 1]", "SHOULDNOTBE", "PROCESSEDXX", "XXXXXXXXXX", "XXXXXXXXXX"];
// Output: "LWIQ"

const sol = new Solution();
// console.log(sol.decode(text1));
// console.log(sol.decode(text2));
// console.log(sol.decode(text3));

// console.log(sol.decode(text4));

console.log(sol.decode(text5));
console.log(sol.decode(text6));
console.log(sol.decode(text7));