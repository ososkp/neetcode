function mergeIntervals(intervals) {
    if (intervals.length < 1) return intervals;
    intervals.sort((a, b) => a[0] - b[0]);

    const result = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        const lastInterval = result[result.length - 1];
        if (currentInterval[0] <= lastInterval[1]) {
            // Same interval, extend end of necessary
            lastInterval[1] = Math.max(currentInterval[1], lastInterval[1]);
        } else {
            // New interval, push result...
            result.push(currentInterval);
        }
    }

    return result;
}


const intervals1 = [[1, 3], [2, 6], [8, 10], [15, 18]];
// Output: [[1,6],[8,10],[15,18]]
const intervals2 = [[1, 4], [4, 5]]
// Output: [[1,5]]
const intervals3 = [[4, 7], [1, 4]]
// Output: [[1,7]]

console.log(mergeIntervals(intervals1));
console.log(mergeIntervals(intervals2));
console.log(mergeIntervals(intervals3));  