/**
 * 字符串转数字
 * @param {string} string 字符串
 * @param {string} radix 进制
 * @returns {number} 目前返回 整数 或 NaN
 */
function StringToNumber(string, radix) {
    if (typeof string !== 'string' && typeof string !== 'number') return NaN;

    if (
        radix &&
        (typeof radix !== 'number' ||
            /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(radix) ||
            radix > 36 ||
            radix < 2)
    )
        return NaN;

    string = String(string);

    let rexp =
            radix == 10
                ? /(-?)([0]?)([0-9]+)/
                : /(-?)([0]?[Xx]?)([0-9a-fA-F]+)/,
        a = string.match(rexp),
        sign = a[1],
        rawRadix = a[2],
        rawNum = a[3],
        result = 0,
        strArr = rawNum.split(''),
        len = strArr.length,
        numArr = [];

    if (a && !radix) {
        if (rawRadix.toUpperCase() === '0X') {
            radix = 16;
        } else if (rawRadix === '0') {
            radix = 8;
        } else {
            radix = 10;
        }
    }

    for (let i = 0; i < len; i++) {
        let num;
        let charCode = strArr[i].toUpperCase().charCodeAt(0);

        if (radix <= 36 && radix >= 11) {
            if (charCode >= 65 && charCode <= 90) {
                num = charCode - 55;
            } else {
                num = charCode - 48;
            }
        } else {
            num = charCode - 48;
        }

        if (num < radix) {
            numArr.push(num);
        } else {
            return NaN;
        }
    }

    if (numArr.length > 0)
        numArr.forEach(
            (item, j) =>
                (result += item * Math.pow(radix, numArr.length - j - 1))
        );

    if (sign === '-') result = -result;

    return result;
}

// 以下例子均返回15:
console.log(StringToNumber('F', 16));
console.log(StringToNumber('17', 8));
console.log(StringToNumber('15', 10));
console.log(StringToNumber(15.99, 10));
console.log(StringToNumber('FXX123', 16));
console.log(StringToNumber('1111', 2));
console.log(StringToNumber('15*3', 10));
console.log(StringToNumber('12', 13));

// 以下例子均返回 NaN:
console.log(StringToNumber('Hello', 8)); // Not a number at all
console.log(StringToNumber('546', 2)); // Digits are not valid for binary representations

// 以下例子均返回 -15：
console.log(StringToNumber('-F', 16));
console.log(StringToNumber('-0F', 16));
console.log(StringToNumber('-0XF', 16));
console.log(StringToNumber(-15.1, 10));
console.log(StringToNumber(' -17', 8));
console.log(StringToNumber(' -15', 10));
console.log(StringToNumber('-1111', 2));
console.log(StringToNumber('-15e1', 10));
console.log(StringToNumber('-12', 13));
// 下例中也全部返回 17，因为输入的 string 参数以 "0x" 开头时作为十六进制数字解释，而第二个参数假如经过 Number 函数转换后为 0 或 NaN，则将会忽略。
console.log(StringToNumber('0x11', 16));
console.log(StringToNumber('0x11', 0));
console.log(StringToNumber('0x11'));

// 下面的例子返回 224
console.log(StringToNumber('0e0', 16));

/**
 * 用作对象属性名。。。
 * @param {*} number 数字
 * @returns {string} 返回字符串
 */
function NumberToString(number) {
    const obj = {};
    obj[number] = true;
    return Object.getOwnPropertyNames(obj)[0];
}

console.log(NumberToString(123)); // -> "123"
console.log(NumberToString(1.23)); // -> "1.23"
console.log(NumberToString(NaN)); // -> "NaN"
console.log(NumberToString(Infinity)); // -> "Infinity"
console.log(NumberToString(-0)); // -> "0"
console.log(NumberToString(1e99)); // -> "1e+99"
console.log(NumberToString(0xd5)); // -> "213"
