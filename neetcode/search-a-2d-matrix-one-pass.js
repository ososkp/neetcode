class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        let low = 0, high = ((rows * cols) - 1);

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const row = Math.floor(mid / cols);
            const col = mid % cols;

            if (matrix[row][col] === target) return true;
            else if (matrix[row][col] < target) low = mid + 1;
            else if (matrix[row][col] > target) high = mid - 1;
        }

        return false;
    }
}

const sol = new Solution();

const matrix1 = [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]];
const target1 = 10;

const matrix2 = [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]];
const target2 = 15;

const matrix3 = [[1, 2, 4, 8], [10, 11, 12, 13], [14, 15, 30, 40]];
const target3 = 15;

const matrix4 = [[1, 2, 4, 8], [10, 11, 12, 13], [14, 15, 30, 40]];
const target4 = 11;

const matrix5 = [[1, 2, 4, 8], [10, 11, 12, 13], [14, 15, 30, 40]];
const target5 = 4;

const matrix6 = [[1, 1]]
const target6 = 0

const matrix7 = [[1, 3]]
const target7 = 3

console.log(sol.searchMatrix(matrix1, target1));
console.log(sol.searchMatrix(matrix2, target2));
console.log(sol.searchMatrix(matrix3, target3));
console.log(sol.searchMatrix(matrix4, target4));
console.log(sol.searchMatrix(matrix5, target5));
console.log(sol.searchMatrix(matrix6, target6));
console.log(sol.searchMatrix(matrix7, target7));