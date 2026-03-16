/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if (num1 === '0' || num2 === '0') {
        return '0'
    }

    const m = num1.length
    const n = num2.length
    let arr = new Array(m + n).fill(0)

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const dig1 = parseInt(num1[i])
            const dig2 = parseInt(num2[j])

            const res = dig1 * dig2
            arr[i + j + 1] += res
        }
    }

    for (let i = m + n - 1; i > 0; i--) {
        arr[i - 1] += Math.trunc(arr[i] / 10)
        arr[i] = arr[i] % 10
    }

    if (arr[0] === 0) {
        arr.shift()
    }

    return arr.join('')
};

console.log(multiply("4", "5"))
console.log(multiply("11", "13"))