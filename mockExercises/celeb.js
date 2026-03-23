class Solution {
    traverseMatrix(matrix) {
        function knows(a, b) {
            return matrix[a][b] === 1;
        }

        let l = 0, r = matrix.length - 1;

        while (l < r) {
            if (knows(l, r)) l++;
            else if (knows(r, l)) r--;
        }

        for (let i = 0; i < matrix.length; i++) {
            if (l === i) continue;
            if (knows(l, i) || !knows(i, l)) return -1;
        }

        return l;
    }
}

const input1 = [[1, 1, 0], [0, 1, 0], [1, 1, 1]];
const input2 = [[1, 1, 0], [0, 1, 1], [1, 0, 1]]
const input3 = [[1, 1], [1, 1]];

const sol = new Solution();

console.log(sol.traverseMatrix(input1)); // 1
console.log(sol.traverseMatrix(input2)); // -1
console.log(sol.traverseMatrix(input3)); // -1