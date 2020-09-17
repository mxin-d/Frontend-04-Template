// const Buffer = require('buffer');
/**
 * 字符串 UTF-8 编码
 * @param {*} string
 */
function UTF8_Encoding(string) {
    const code = encodeURIComponent(string);
    const bytes = [];
    for (let i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else {
            bytes.push(c.charCodeAt(0));
        }
    }
    return bytes;
}

/**
 * 字符串解码
 * @param {*} array
 */
function UTF8_Decoding(array) {
    let result = '';
    for (const i of array) {
        result += `%` + i.toString(16);
    }
    return decodeURI(result);
}

const bytes = UTF8_Encoding('前端进阶训练营');

console.log(bytes);
console.log(UTF8_Decoding(bytes));
