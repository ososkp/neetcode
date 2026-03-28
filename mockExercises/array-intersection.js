function findIntersection(arr1, arr2) {
    const arrMap = {};
    for (const el of arr1) {
        if (!Object.hasOwn(arrMap, el)) arrMap[el] = 0;
        arrMap[el]++;
    }

    const result = [];

    for (const el of arr2) {
        if (Object.hasOwn(arrMap, el) && arrMap[el] > 0) {
            result.push(el);
            arrMap[el]--;
        }
    }

    return result;
}

function findIntersectionUnique(arr1, arr2) {
    const set = new Set();
    arr1.forEach(el => set.add(el));

    const result = new Set();
    arr2.forEach(el => {
        if (set.has(el)) result.add(el);
    });

    return [...result];
}

function findIntersectionSorted(arr1, arr2) {
    let arr1Ptr = 0;
    let arr2Ptr = 0;

    const results = [];

    while (arr1Ptr < arr1.length && arr2Ptr < arr2.length) {
        if (arr1[arr1Ptr] < arr2[arr2Ptr]) arr1Ptr++;
        else if (arr2[arr2Ptr] < arr1[arr1Ptr]) arr2Ptr++;
        else if (arr1[arr1Ptr] === arr2[arr2Ptr]) {
            results.push(arr1[arr1Ptr]);
            arr1Ptr++;
            arr2Ptr++;
        }
    }

    return results;
}



let array1 = [4, 9, 5, 4, 9, 9];
let array2 = [9, 4, 9, 8, 4];

console.log(findIntersection(array1, array2));
console.log(findIntersectionUnique(array1, array2));

array1 = [1, 1, 2, 3, 5, 5, 8];

array2 = [1, 1, 1, 2, 5, 5, 6];

console.log(findIntersectionSorted(array1, array2));

array1 = [2, 4, 4, 4, 6, 8, 10, 12, 14, 16];

array2 = [4, 4, 8, 16, 20];

console.log(findIntersectionSorted(array1, array2));
