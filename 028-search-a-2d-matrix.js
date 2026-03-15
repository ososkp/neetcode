class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        if (matrix.length === 0) return false;
        if (matrix.length === 1 && matrix[0].length === 1) return matrix[0][0] === target;
        // Get correct row
        let low = 0, high = matrix.length - 1;
        let mid = 0;

        while (low <= high) {
            mid = Math.floor((low + high) / 2);
            if (matrix[mid][0] === target) return true;
            if (matrix[mid][0] < target) low = mid + 1;
            if (matrix[mid][0] > target) high = mid - 1;
        }

        // The loop stopped because high < low
        // So high is the floor - if it's -1, there's no chance of finding the target
        if (high < 0) return false;
        const rowIdx = high;

        low = 0, high = matrix[rowIdx].length - 1;
        while (low <= high) {
            mid = Math.floor((low + high) / 2);
            if (matrix[rowIdx][mid] === target) return true;
            if (matrix[rowIdx][mid] < target) low = mid + 1;
            if (matrix[rowIdx][mid] > target) high = mid - 1;
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