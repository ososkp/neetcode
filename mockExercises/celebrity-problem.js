class Solution {
    matrix;

    knows(a, b) {
        return this.matrix[a][b] === 1;
    }

    traverseMatrixGreedy(matrix) {
        this.matrix = matrix;
        let candidate = 0;

        for (let i = 0; i < matrix.length; i++) {
            if (this.knows(candidate, i)) candidate = i;
        }

        for (let i = 0; i < matrix.length; i++) {
            if (i === candidate) continue;

            if (this.knows(candidate, i) || !this.knows(i, candidate)) return -1;
        }

        return candidate;
    }

    traverseMatrix(matrix) {
        this.matrix = matrix;
        let l = 0, r = matrix.length - 1;

        while (l !== r) {
            if (this.knows(l, r)) l++;
            else if (this.knows(r, l)) r--;
        }

        const candidate = l;

        for (let i = 0; i < this.matrix.length; i++) {
            if (i === candidate) continue;
            if (this.knows(candidate, i) || !this.knows(i, candidate)) return -1;
        }

        return candidate;
    }
}


const input1 = [[1, 1, 0], [0, 1, 0], [1, 1, 1]];
const input2 = [[1, 1, 0], [0, 1, 1], [1, 0, 1]]
const input3 = [[1, 1], [1, 1]];

const sol1 = new Solution();

console.log(sol1.traverseMatrix(input1)); // 1
console.log(sol1.traverseMatrix(input2)); // -1
console.log(sol1.traverseMatrix(input3)); // -1