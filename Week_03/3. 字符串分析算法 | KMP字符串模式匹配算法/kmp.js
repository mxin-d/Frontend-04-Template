/**
 * KMP算法
 * @param {*} source 字符串
 * @param {*} pattern 样本
 * @returns 如果字符串中包含样本返回该样本第一次出现的index，否则为-1，如果样本为空返回0
 */
function kmp(source, pattern) {
  if (pattern == '') return 0
  // 计算table
  let table = new Array(pattern.length).fill(0)

  {
    let i = 1,
      j = 0
    while (i < pattern.length) {
      // 两两对比，如果有重复项继续向后对比，计算table，将重复数量记录至i位置
      if (pattern[i] === pattern[j]) {
        ++i, ++j
        table[i] = j
      } else {
        // 对比不匹配，如果j>0，向前跳转到table[j]（当前位置自重复数量用作j的跳转位置）
        if (j > 0) {
          j = table[j]
        }
        // 剩余情况i继续向后匹配，j不变
        else {
          ++i
        }
      }
    }
  }

  {
    let i = 0,
      j = 0
    while (i < source.length) {
      if (pattern[j] === source[i]) {
        i++, j++
      } else {
        // 对比不匹配，如果j>0，向前跳转到table[j]（当前位置自重复数量用作j的跳转位置）
        if (j > 0) {
          j = table[j]
        }
        // 剩余情况i继续向后匹配，j不变
        else {
          ++i
        }
      }

      if (j === pattern.length) return { i, j, index: i - j }
    }

    return -1
  }
}

console.log(kmp('mississippi', 'issip')) // 4
console.log(kmp('', '')) // 0
console.log(kmp('', 'asd')) // -1
console.log(kmp('asd', '')) // 0
console.log(kmp('asd', 'eew')) // -1
