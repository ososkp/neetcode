function findIntervals(intervals) {
    if (intervals.length <= 1) return 0;
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let lastEndTime = -Infinity;

    for (const [start, end] of intervals) {
        if (start >= lastEndTime) {
            lastEndTime = end;
        } else {
            count++;
        }
    }

    return count;
}

const intervals1 = [[1, 2], [2, 3], [3, 4], [1, 3]];
// Output: 1

const intervals2 = [[1, 2], [1, 2], [1, 2]];
// Output: 2

const intervals3 = [[1, 2], [2, 3]];
// Output: 0

console.log(findIntervals(intervals1));
console.log(findIntervals(intervals2));
console.log(findIntervals(intervals3));